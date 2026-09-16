/* ============================================================
   AMMIIN — upload.js
   Logic upload / delete ke Firebase Firestore + Storage.
   Semua operasi langsung dari browser, tidak butuh backend.
   ============================================================ */

/* ─── CEK FIREBASE & CLOUDINARY SUDAH DIKONFIGURASI ─────────── */
let FIREBASE_READY = false;
let CLOUDINARY_READY = false;

try {
  firebase.app();
  FIREBASE_READY = typeof firebaseConfig !== "undefined" && !firebaseConfig.apiKey.startsWith("PASTE_YOUR");
} catch (e) {
  console.warn("[AMMIIN] Firebase tidak tersedia:", e.message);
}

try {
  CLOUDINARY_READY = typeof cloudinaryConfig !== "undefined" &&
    !cloudinaryConfig.cloudName.startsWith("PASTE_YOUR") &&
    !cloudinaryConfig.uploadPreset.startsWith("PASTE_YOUR");
} catch (e) {
  console.warn("[AMMIIN] Cloudinary config tidak tersedia:", e.message);
}

/* ─── ENTRY POINT ───────────────────────────────────────────── */
document.addEventListener("DOMContentLoaded", () => {

  /* Banner kalau konfigurasi belum lengkap */
  if (!FIREBASE_READY || !CLOUDINARY_READY) {
    const banner = document.getElementById("firebaseBanner");
    if (banner) banner.classList.add("is-visible");
  }


  /* Set default tahun ke tahun sekarang */
  const currentYear = String(new Date().getFullYear());
  ["memoryYear", "videoYear"].forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.value = currentYear;
  });

  /* ── Tab switching ─────────────────────────────────────── */
  const tabs   = document.querySelectorAll(".upload-tab");
  const panels = document.querySelectorAll(".upload-panel");

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((t)   => t.classList.remove("is-active"));
      panels.forEach((p) => p.classList.remove("is-active"));
      tab.classList.add("is-active");
      document.getElementById(tab.dataset.panel).classList.add("is-active");
    });
  });

  /* ── Setup dropzones ────────────────────────────────────── */
  setupDropzone("memoryDrop",  "memoryFile",  "memoryPreview",  false, ["image/"]);
  setupDropzone("galleryDrop", "galleryFile", "galleryPreview", true,  ["image/"]);
  setupDropzone("videoDrop",   "videoFile",   "videoPreview",   false, ["video/"]);
  setupDropzone("posterDrop",  "posterFile",  "posterPreview",  false, ["image/"]);

  /* ── Form submit listeners ─────────────────────────────── */
  document.getElementById("memoryForm").addEventListener("submit",  handleMemorySubmit);
  document.getElementById("galleryForm").addEventListener("submit", handleGallerySubmit);
  document.getElementById("videoForm").addEventListener("submit",   handleVideoSubmit);

  const editForm = document.getElementById("editForm");
  if (editForm) editForm.addEventListener("submit", handleEditSubmit);

  const editModalClose = document.getElementById("editModalClose");
  if (editModalClose) editModalClose.addEventListener("click", closeEditModal);

  const editModalBackdrop = document.getElementById("editModalBackdrop");
  if (editModalBackdrop) editModalBackdrop.addEventListener("click", closeEditModal);

  const editCancelBtn = document.getElementById("editCancelBtn");
  if (editCancelBtn) editCancelBtn.addEventListener("click", closeEditModal);


  /* ── Load existing items kalau Firebase siap ───────────── */
  if (FIREBASE_READY) {
    loadExistingMemories();
    loadExistingGallery();
    loadExistingVideos();
  } else {
    ["existingMemories", "existingGallery", "existingVideos"].forEach((id) => {
      document.getElementById(id).innerHTML =
        '<p class="status-text">Konfigurasi Firebase dulu untuk melihat data yang sudah ada.</p>';
    });
  }
});

/* ─── DROPZONE SETUP ────────────────────────────────────────── */
function setupDropzone(dropId, inputId, previewId, multiple, acceptTypes) {
  const drop    = document.getElementById(dropId);
  const input   = document.getElementById(inputId);
  const preview = document.getElementById(previewId);

  if (!drop || !input) return;

  drop.addEventListener("click", () => input.click());

  drop.addEventListener("dragover", (e) => {
    e.preventDefault();
    drop.classList.add("is-dragging");
  });

  drop.addEventListener("dragleave", (e) => {
    if (!drop.contains(e.relatedTarget)) {
      drop.classList.remove("is-dragging");
    }
  });

  drop.addEventListener("drop", (e) => {
    e.preventDefault();
    drop.classList.remove("is-dragging");

    const files = [...e.dataTransfer.files].filter((f) =>
      acceptTypes.some((t) => f.type.startsWith(t))
    );

    if (!files.length) {
      showToast("Format file tidak didukung.", "error");
      return;
    }

    /* Inject files ke input element */
    const dt = new DataTransfer();
    (multiple ? files : [files[0]]).forEach((f) => dt.items.add(f));
    input.files = dt.files;

    showPreview(multiple ? files : [files[0]], preview);
  });

  input.addEventListener("change", () => {
    if (input.files.length) {
      showPreview([...input.files], preview);
    }
  });
}

function showPreview(files, previewEl) {
  previewEl.innerHTML = "";

  files.forEach((file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const item = document.createElement("div");
      item.className = "preview-item";

      let mediaHtml = "";
      if (file.type.startsWith("image/")) {
        mediaHtml = `<img src="${e.target.result}" alt="preview" />`;
      } else if (file.type.startsWith("video/")) {
        mediaHtml = `<video src="${e.target.result}" muted></video>`;
      }

      item.innerHTML = `
        ${mediaHtml}
        <span class="preview-item-name">${file.name}</span>
      `;
      previewEl.appendChild(item);
    };
    reader.readAsDataURL(file);
  });
}

/* ─── UPLOAD FILE KE CLOUDINARY (100% GRATIS, TANPA KARTU) ─── */
function uploadFile(file, progressWrapId) {
  return new Promise((resolve, reject) => {
    if (!CLOUDINARY_READY) {
      reject(new Error("Cloudinary belum dikonfigurasi! Isi cloudName & uploadPreset di js/firebase-config.js"));
      return;
    }

    const isVideo = file.type.startsWith("video/");
    const endpoint = `https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloudName}/${isVideo ? "video" : "image"}/upload`;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", cloudinaryConfig.uploadPreset);

    const xhr = new XMLHttpRequest();
    xhr.open("POST", endpoint);

    const progressWrap = progressWrapId ? document.getElementById(progressWrapId) : null;
    const progressFill = progressWrap ? progressWrap.querySelector(".progress-fill") : null;
    const progressLbl  = progressWrap ? progressWrap.querySelector(".progress-label") : null;

    if (progressWrap) progressWrap.classList.add("is-active");

    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable) {
        const pct = Math.round((e.loaded / e.total) * 100);
        if (progressFill) progressFill.style.width = pct + "%";
        if (progressLbl)  progressLbl.textContent   = pct + "%";
      }
    };

    xhr.onload = () => {
      if (progressWrap) progressWrap.classList.remove("is-active");
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const res = JSON.parse(xhr.responseText);
          resolve(res.secure_url);
        } catch (e) {
          reject(new Error("Gagal membaca respon dari Cloudinary"));
        }
      } else {
        try {
          const errRes = JSON.parse(xhr.responseText);
          reject(new Error(errRes.error?.message || `Upload gagal (Status ${xhr.status})`));
        } catch {
          reject(new Error(`Upload gagal (Status ${xhr.status})`));
        }
      }
    };

    xhr.onerror = () => {
      if (progressWrap) progressWrap.classList.remove("is-active");
      reject(new Error("Koneksi gagal saat mengunggah file."));
    };

    xhr.send(formData);
  });
}

/* ─── TOAST NOTIFICATION ────────────────────────────────────── */
function showToast(message, type = "success") {
  const container = document.getElementById("toastContainer");
  const toast     = document.createElement("div");
  toast.className = `toast toast--${type}`;
  toast.textContent = message;
  container.appendChild(toast);

  /* Trigger animation */
  requestAnimationFrame(() => {
    requestAnimationFrame(() => toast.classList.add("is-visible"));
  });

  setTimeout(() => {
    toast.classList.remove("is-visible");
    setTimeout(() => toast.remove(), 380);
  }, 3200);
}

/* ─── DISABLE / ENABLE SUBMIT BUTTON ───────────────────────── */
function setSubmitting(btn, isSubmitting, defaultLabel) {
  btn.disabled     = isSubmitting;
  btn.textContent  = isSubmitting ? "Mengupload…" : defaultLabel;
}

/* ============================================================
   MEMORY — Submit
   ============================================================ */
async function handleMemorySubmit(e) {
  e.preventDefault();
  if (!FIREBASE_READY)   { showToast("Firestore belum dikonfigurasi!", "error"); return; }
  if (!CLOUDINARY_READY) { showToast("Cloudinary belum dikonfigurasi di firebase-config.js!", "error"); return; }

  const fileInput = document.getElementById("memoryFile");
  const title     = document.getElementById("memoryTitle").value.trim();
  const year      = document.getElementById("memoryYear").value.trim();
  const story     = document.getElementById("memoryStory").value.trim();

  if (!fileInput.files[0])  { showToast("Pilih foto dulu!", "error"); return; }
  if (!title)               { showToast("Judul harus diisi!", "error"); return; }
  if (!year)                { showToast("Tahun harus diisi!", "error"); return; }

  const btn = e.target.querySelector(".btn-submit");
  setSubmitting(btn, true, "Simpan Memory");

  try {
    const file     = fileInput.files[0];
    const imageUrl = await uploadFile(file, "memoryProgress");

    await db.collection("memories").add({
      title,
      year,
      story,
      imageUrl,
      uploadedAt: firebase.firestore.FieldValue.serverTimestamp()
    });

    showToast("Memory berhasil disimpan! ✓");
    e.target.reset();
    document.getElementById("memoryPreview").innerHTML = "";
    document.getElementById("memoryYear").value = String(new Date().getFullYear());
    loadExistingMemories();

  } catch (err) {
    console.error(err);
    showToast("Upload gagal: " + err.message, "error");
  } finally {
    setSubmitting(btn, false, "Simpan Memory");
  }
}

/* ============================================================
   GALLERY — Submit
   ============================================================ */
async function handleGallerySubmit(e) {
  e.preventDefault();
  if (!FIREBASE_READY)   { showToast("Firestore belum dikonfigurasi!", "error"); return; }
  if (!CLOUDINARY_READY) { showToast("Cloudinary belum dikonfigurasi di firebase-config.js!", "error"); return; }

  const fileInput = document.getElementById("galleryFile");
  if (!fileInput.files.length) { showToast("Pilih foto dulu!", "error"); return; }

  const btn   = e.target.querySelector(".btn-submit");
  const files = [...fileInput.files];
  setSubmitting(btn, true, "Simpan ke Gallery");

  let successCount = 0;

  try {
    for (let i = 0; i < files.length; i++) {
      const file     = files[i];
      const imageUrl = await uploadFile(file, "galleryProgress");

      await db.collection("gallery").add({
        imageUrl,
        uploadedAt: firebase.firestore.FieldValue.serverTimestamp()
      });

      successCount++;
    }

    showToast(`${successCount} foto berhasil diupload ke Gallery! ✓`);
    e.target.reset();
    document.getElementById("galleryPreview").innerHTML = "";
    loadExistingGallery();

  } catch (err) {
    console.error(err);
    showToast(`${successCount} foto berhasil, tapi ada error: ${err.message}`, "error");
  } finally {
    setSubmitting(btn, false, "Simpan ke Gallery");
  }
}

/* ============================================================
   VIDEO — Submit
   ============================================================ */
async function handleVideoSubmit(e) {
  e.preventDefault();
  if (!FIREBASE_READY)   { showToast("Firestore belum dikonfigurasi!", "error"); return; }
  if (!CLOUDINARY_READY) { showToast("Cloudinary belum dikonfigurasi di firebase-config.js!", "error"); return; }

  const videoInput  = document.getElementById("videoFile");
  const posterInput = document.getElementById("posterFile");
  const title       = document.getElementById("videoTitle").value.trim();
  const year        = document.getElementById("videoYear").value.trim();
  const synopsis    = document.getElementById("videoSynopsis").value.trim();

  if (!videoInput.files[0])  { showToast("Pilih file video dulu!", "error"); return; }
  if (!posterInput.files[0]) { showToast("Pilih gambar poster dulu!", "error"); return; }
  if (!title)                { showToast("Judul harus diisi!", "error"); return; }
  if (!year)                 { showToast("Tahun harus diisi!", "error"); return; }

  const btn = e.target.querySelector(".btn-submit");
  setSubmitting(btn, true, "Simpan Video");

  try {
    const videoFile  = videoInput.files[0];
    const posterFile = posterInput.files[0];

    showToast("Mengupload video & poster ke Cloudinary…", "info");

    const [videoUrl, posterUrl] = await Promise.all([
      uploadFile(videoFile,  "videoProgress"),
      uploadFile(posterFile, null)
    ]);

    await db.collection("videos").add({
      title,
      year,
      synopsis,
      videoUrl,
      posterUrl,
      uploadedAt: firebase.firestore.FieldValue.serverTimestamp()
    });

    showToast("Video berhasil disimpan! ✓");
    e.target.reset();
    document.getElementById("videoPreview").innerHTML  = "";
    document.getElementById("posterPreview").innerHTML = "";
    document.getElementById("videoYear").value = String(new Date().getFullYear());
    loadExistingVideos();

  } catch (err) {
    console.error(err);
    showToast("Upload gagal: " + err.message, "error");
  } finally {
    setSubmitting(btn, false, "Simpan Video");
  }
}

/* ─── LOAD EXISTING — MEMORIES ──────────────────────────────── */
async function loadExistingMemories() {
  const grid = document.getElementById("existingMemories");
  grid.innerHTML = '<p class="status-text">Memuat…</p>';

  try {
    const snap = await db.collection("memories").orderBy("uploadedAt", "desc").get();

    if (snap.empty) {
      grid.innerHTML = '<p class="status-text">Belum ada memory yang diupload lewat halaman ini.</p>';
      return;
    }

    grid.innerHTML = "";
    snap.forEach((doc) => {
      const d = doc.data();
      grid.appendChild(buildExistingCard({
        id:          doc.id,
        thumbUrl:    d.imageUrl,
        title:       d.title,
        year:        d.year,
        story:       d.story || "",
        collection:  "memories"
      }));
    });

  } catch (err) {
    grid.innerHTML = `<p class="status-text status-text--error">Gagal memuat data Firestore: ${err.message || "Cek console"}</p>`;
    console.error(err);
  }
}

/* ─── LOAD EXISTING — GALLERY ───────────────────────────────── */
async function loadExistingGallery() {
  const grid = document.getElementById("existingGallery");
  grid.innerHTML = '<p class="status-text">Memuat…</p>';

  try {
    const snap = await db.collection("gallery").orderBy("uploadedAt", "desc").get();

    if (snap.empty) {
      grid.innerHTML = '<p class="status-text">Belum ada foto gallery yang diupload lewat halaman ini.</p>';
      return;
    }

    grid.innerHTML = "";
    snap.forEach((doc) => {
      const d = doc.data();
      grid.appendChild(buildExistingCard({
        id:         doc.id,
        thumbUrl:   d.imageUrl,
        title:      "",
        year:       "",
        story:      "",
        collection: "gallery"
      }));
    });

  } catch (err) {
    grid.innerHTML = `<p class="status-text status-text--error">Gagal memuat data Firestore: ${err.message || "Cek console"}</p>`;
    console.error(err);
  }
}

/* ─── LOAD EXISTING — VIDEOS ────────────────────────────────── */
async function loadExistingVideos() {
  const grid = document.getElementById("existingVideos");
  grid.innerHTML = '<p class="status-text">Memuat…</p>';

  try {
    const snap = await db.collection("videos").orderBy("uploadedAt", "desc").get();

    if (snap.empty) {
      grid.innerHTML = '<p class="status-text">Belum ada video yang diupload lewat halaman ini.</p>';
      return;
    }

    grid.innerHTML = "";
    snap.forEach((doc) => {
      const d = doc.data();
      grid.appendChild(buildExistingCard({
        id:         doc.id,
        thumbUrl:   d.posterUrl,
        title:      d.title,
        year:       d.year,
        story:      d.synopsis || "",
        collection: "videos"
      }));
    });

  } catch (err) {
    grid.innerHTML = `<p class="status-text status-text--error">Gagal memuat data Firestore: ${err.message || "Cek console"}</p>`;
    console.error(err);
  }
}

/* ─── BUILD EXISTING CARD ───────────────────────────────────── */
function buildExistingCard({ id, thumbUrl, title, year, story, collection }) {
  const card = document.createElement("div");
  card.className = "existing-card";

  card.innerHTML = `
    <div class="existing-card-thumb">
      <img src="${thumbUrl}" alt="${title || 'Media'}" loading="lazy" />
    </div>
    ${(title || year) ? `
    <div class="existing-card-body">
      ${title ? `<p class="existing-card-title">${title}</p>` : ""}
      ${year  ? `<p class="existing-card-year">${year}</p>`   : ""}
    </div>` : ""}
    <div class="existing-card-actions">
      ${collection !== "gallery" ? `<button class="card-action-btn edit-btn" title="Edit">✏️</button>` : ""}
      <button class="card-action-btn delete-btn" title="Hapus">✕</button>
    </div>
  `;

  if (collection !== "gallery") {
    card.querySelector(".edit-btn").addEventListener("click", () =>
      openEditModal({ id, collection, thumbUrl, title, year, story, cardEl: card })
    );
  }

  card.querySelector(".delete-btn").addEventListener("click", () =>
    deleteItem({ id, collection, cardEl: card })
  );

  return card;
}

/* ─── EDIT MODAL LOGIC ──────────────────────────────────────── */
let currentEditCard = null;

function openEditModal({ id, collection, thumbUrl, title, year, story, cardEl }) {
  const modal = document.getElementById("editModal");
  if (!modal) return;
  currentEditCard = cardEl;

  document.getElementById("editId").value = id;
  document.getElementById("editCollection").value = collection;
  document.getElementById("editThumb").src = thumbUrl || "";
  document.getElementById("editTitle").value = title || "";
  document.getElementById("editYear").value = year || "";
  document.getElementById("editStory").value = story || "";

  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
}

function closeEditModal() {
  const modal = document.getElementById("editModal");
  if (!modal) return;
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  currentEditCard = null;
}

async function handleEditSubmit(e) {
  e.preventDefault();
  const id         = document.getElementById("editId").value;
  const collection = document.getElementById("editCollection").value;
  const title      = document.getElementById("editTitle").value.trim();
  const year       = document.getElementById("editYear").value.trim();
  const story      = document.getElementById("editStory").value.trim();
  const saveBtn    = document.getElementById("editSaveBtn");

  if (!id || !collection) return;

  saveBtn.disabled = true;
  saveBtn.textContent = "Menyimpan…";

  try {
    const updateData = {};
    if (collection === "memories") {
      updateData.title = title;
      updateData.year = year;
      updateData.story = story;
    } else if (collection === "videos") {
      updateData.title = title;
      updateData.year = year;
      updateData.synopsis = story;
    }

    await db.collection(collection).doc(id).update(updateData);

    if (currentEditCard) {
      const titleEl = currentEditCard.querySelector(".existing-card-title");
      const yearEl  = currentEditCard.querySelector(".existing-card-year");
      if (titleEl) titleEl.textContent = title;
      if (yearEl)  yearEl.textContent  = year;
    }

    showToast("Perubahan berhasil disimpan! ✓");
    closeEditModal();
  } catch (err) {
    console.error(err);
    showToast("Gagal menyimpan perubahan: " + err.message, "error");
  } finally {
    saveBtn.disabled = false;
    saveBtn.textContent = "Simpan Perubahan";
  }
}

/* ─── DELETE ITEM ───────────────────────────────────────────── */
async function deleteItem({ id, collection, cardEl }) {
  const confirmed = confirm("Hapus item ini? Tindakan ini tidak bisa dibatalkan.");
  if (!confirmed) return;

  try {
    /* Hapus dokumen Firestore */
    await db.collection(collection).doc(id).delete();

    /* Animasi hapus */
    cardEl.classList.add("is-deleting");
    setTimeout(() => cardEl.remove(), 420);
    showToast("Item berhasil dihapus.");

  } catch (err) {
    console.error(err);
    showToast("Gagal menghapus: " + err.message, "error");
  }
}

/* ─── HELPER: SANITIZE FILENAME ─────────────────────────────── */
function sanitizeFilename(name) {
  return name.replace(/[^a-zA-Z0-9._-]/g, "_");
}


