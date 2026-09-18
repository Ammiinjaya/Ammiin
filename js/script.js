/* =========================================================
   AMMIIN — script.js
   SPA router + data rendering + Firebase integration.
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* ===================================================
     CEK FIREBASE
     =================================================== */
  let FIREBASE_OK = false;
  try {
    firebase.app();
    FIREBASE_OK = !firebaseConfig.apiKey.startsWith("PASTE_YOUR");
  } catch (e) {
    console.info("[AMMIIN] Firebase belum dikonfigurasi — hanya data statis yang ditampilkan.");
  }

  /* ===================================================
     1. DATA — MEMORIES (statis / hardcoded)
     =================================================== */
  const memoriesStatic = [
    {
      title: "Satu Frame, Satu Keluarga",
      year: "2025",
      image: "images/memory-01.jpg",
      story: "Berkumpul di teras tua, saling rangkul dan bercanda — foto yang diambil dalam satu tarikan napas, tapi diingat bertahun-tahun."
    },
    {
      title: "Makan Bareng, Piring Sama",
      year: "2025",
      image: "images/memory-02.jpg",
      story: "Tidak ada yang lebih hangat dari duduk melingkar, tangan saling berebut di piring yang sama, sambil tertawa tanpa alasan jelas."
    },
    {
      title: "Rebahan Setelah Lelah",
      year: "2025",
      image: "images/memory-03.jpg",
      story: "Setelah kegiatan panjang, kami tertidur berjajar begitu saja — lelah yang paling nyaman karena dilewati bersama-sama."
    },
    {
      title: "Ketahuan Kamera",
      year: "2025",
      image: "images/memory-04.jpg",
      story: "Sedang santai makan sambil main HP, tiba-tiba menoleh ke kamera — momen candid yang jujur, tidak dibuat-buat."
    },
    {
      title: "Ngumpul di Sekre",
      year: "2024",
      image: "images/memory-05.jpg",
      story: "Lantai penuh catatan, gitar dimainkan asal-asalan, dan obrolan yang tidak tahu kapan harus berhenti — begitulah biasanya sore kami."
    }
  ];

  /* ===================================================
     2. DATA — MEMBERS
     =================================================== */
  const members = [
    { name: "Ageng",  role: "Member of AMMIIN", image: "images/member-01.jpg", quote: "Some memories are worth keeping forever.", desc: "Lengkapi deskripsi singkat tentang Ageng di sini." },
    { name: "April",  role: "Member of AMMIIN", image: "images/member-02.jpg", quote: "Together, always.",                        desc: "Lengkapi deskripsi singkat tentang April di sini." },
    { name: "Indra",  role: "Member of AMMIIN", image: "images/member-04.jpg", quote: "We're better when we're together.",         desc: "Lengkapi deskripsi singkat tentang Indra di sini." },
    { name: "Mek",    role: "Member of AMMIIN", image: "images/member-05.jpg", quote: "This is just the beginning.",               desc: "Lengkapi deskripsi singkat tentang Mek di sini." },
    { name: "Sikibb", role: "Member of AMMIIN", image: "images/member-06.jpg", quote: "Small moments, big memories.",              desc: "Lengkapi deskripsi singkat tentang Sikibb di sini." },
    { name: "Thariq", role: "Member of AMMIIN", image: "images/member-07.jpg", quote: "I'm always here.",                          desc: "Lengkapi deskripsi singkat tentang Thariq di sini." },
    { name: "Umar",   role: "Member of AMMIIN", image: "images/member-08.jpg", quote: "Let's just go, we'll figure it out.",       desc: "Lengkapi deskripsi singkat tentang Umar di sini." },
    { name: "Wendi",  role: "Member of AMMIIN", image: "images/member-09.jpg", quote: "One group, one story.",                     desc: "Lengkapi deskripsi singkat tentang Wendi di sini." }
  ];

  /* ===================================================
     3. DATA — GALLERY (statis)
     =================================================== */
  const galleryStatic = [
    "images/gallery-01.jpg",
    "images/gallery-02.jpg",
    "images/gallery-03.jpg",
    "images/gallery-04.jpg",
    "images/gallery-05.jpg"
  ];

  /* ===================================================
     3b. DATA — VIDEOS (statis)
     =================================================== */
  const videosStatic = [
    {
      title: "Bercanda Receh",
      year: "2025",
      poster: "images/vidio1-poster.jpg",
      src: "videos/vidio1.mp4",
      synopsis: "Candaan kecil yang direkam asal-asalan, tapi justru jadi salah satu klip yang paling sering diputar ulang saat kangen-kangenan."
    },
    {
      title: "Ngobrol di Bawah Bendera",
      year: "2025",
      poster: "images/vidio2-poster.jpg",
      src: "videos/vidio2.mp4",
      synopsis: "Duduk santai di bawah bendera AMMIIN, ngobrol ngalor-ngidul sambil ditemani minuman dingin — obrolan biasa yang jadi luar biasa karena dikenang."
    },
    {
      title: "Cerita dari Dekat",
      year: "2025",
      poster: "images/vidio3-poster.jpg",
      src: "videos/vidio3.mp4",
      synopsis: "Rekaman singkat dari sudut pandang paling dekat — jujur, spontan, dan apa adanya."
    },
    {
      title: "Masak Bareng di Luar",
      year: "2024",
      poster: "images/vidio4-poster.jpg",
      src: "videos/vidio4.mp4",
      synopsis: "Berkumpul di luar ruangan, sibuk masak bersama sambil sesekali diselingi tawa — bukti bahwa kegiatan sesederhana apa pun jadi seru kalau dilakukan rame-rame."
    },
    {
      title: "Obrolan Malam",
      year: "2024",
      poster: "images/vidio5-poster.jpg",
      src: "videos/vidio5.mp4",
      synopsis: "Malam yang tenang, lampu kota terlihat dari kejauhan, dan obrolan santai yang menemani sampai larut."
    },
    {
      title: "Berendam Air Panas",
      year: "2024",
      poster: "images/vidio6-poster.jpg",
      src: "videos/vidio6.mp4",
      synopsis: "Berendam bersama di tengah udara dingin — salah satu momen healing paling diingat dari semua perjalanan yang pernah kami lakukan."
    }
  ];

  /* ===================================================
     4. SPA ROUTER
     Tiap page menampilkan section yang berbeda.
     =================================================== */
  /* Aktifkan SPA mode — CSS akan menyembunyikan section yang tidak aktif */
  document.body.classList.add("js-spa");

  const PAGE_MAP = {
    home:     ["hero", "intro", "closing"],
    memories: ["memories"],
    story:    ["story", "transition"],
    people:   ["people"],
    videos:   ["videos"],
    gallery:  ["gallery"]
  };

  const allSections = document.querySelectorAll("main > section");

  /* Track halaman mana yang sudah pernah dibuka (untuk Firebase lazy-load) */
  const visitedPages = new Set();

  function showPage(pageKey) {
    const key      = PAGE_MAP[pageKey] ? pageKey : "home";
    const sectionIds = PAGE_MAP[key];

    /* Sembunyikan semua section */
    allSections.forEach((s) => s.classList.remove("page-active"));

    /* Tampilkan section untuk halaman ini */
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      el.classList.add("page-active");
    });

    /* Trigger scroll-reveal untuk section yang ditampilkan */
    setTimeout(() => {
      sectionIds.forEach((id) => {
        const el = document.getElementById(id);
        if (!el) return;
        el.querySelectorAll(".scroll-reveal:not(.is-visible)").forEach((item) => {
          item.classList.add("is-visible");
        });
      });
    }, 80);

    /* Update nav active state */
    document.querySelectorAll(".nav-link").forEach((link) => {
      const linkPage = link.getAttribute("href").slice(1);
      link.classList.toggle("is-active", linkPage === key);
    });

    /* Scroll ke atas */
    window.scrollTo({ top: 0, behavior: "instant" });

    /* Firebase lazy-load — hanya pertama kali page dibuka */
    if (FIREBASE_OK && !visitedPages.has(key)) {
      visitedPages.add(key);
      if (key === "memories") loadFirebaseMemories();
      if (key === "gallery")  loadFirebaseGallery();
      if (key === "videos")   loadFirebaseVideos();
    }
  }

  function handleRoute() {
    const hash    = window.location.hash.slice(1) || "home";
    const pageKey = PAGE_MAP[hash] ? hash : "home";
    showPage(pageKey);
  }

  window.addEventListener("hashchange", handleRoute);
  handleRoute(); /* Initial render */

  /* ===================================================
     4b. LOCALSTORAGE HELPERS (edit & delete statis)
     =================================================== */
  function getDeletedStatic() {
    try { return JSON.parse(localStorage.getItem("ammiin_deleted") || "[]"); }
    catch { return []; }
  }
  function addDeletedStatic(key) {
    const list = getDeletedStatic();
    if (!list.includes(key)) {
      list.push(key);
      localStorage.setItem("ammiin_deleted", JSON.stringify(list));
    }
  }

  function getEditedStatic() {
    try { return JSON.parse(localStorage.getItem("ammiin_edited") || "{}"); }
    catch { return {}; }
  }
  function setEditedStatic(key, data) {
    const map = getEditedStatic();
    map[key] = { ...(map[key] || {}), ...data };
    localStorage.setItem("ammiin_edited", JSON.stringify(map));
  }

  /* ===================================================
     5. RENDER — MEMORY CARDS
     =================================================== */
  const memoryGrid = document.getElementById("memoryGrid");

  function renderMemoryCard(memory, prepend = false) {
    const card = document.createElement("article");
    card.className = "memory-card scroll-reveal";

    card.innerHTML = `
      <div class="memory-card-media">
        <img class="memory-card-img" src="${memory.image}" alt="${memory.title}" loading="lazy" />
        <div class="memory-card-scrim"></div>
        <div class="memory-card-info">
          <p class="memory-card-year">${memory.year}</p>
          <h3 class="memory-card-title">${memory.title}</h3>
        </div>
      </div>
    `;

    const itemObj = { ...memory, cardEl: card, collection: "memories" };
    card.addEventListener("click", () => openLightbox(itemObj));
    if (prepend && memoryGrid.firstChild) {
      memoryGrid.insertBefore(card, memoryGrid.firstChild);
    } else {
      memoryGrid.appendChild(card);
    }
  }

  const deletedKeys = getDeletedStatic();
  const editedMap   = getEditedStatic();

  memoriesStatic.forEach((m) => {
    const key = m.title;
    if (deletedKeys.includes(key)) return;
    const ed = editedMap[key] || {};
    renderMemoryCard({
      ...m,
      title: ed.title || m.title,
      year:  ed.year  || m.year,
      story: ed.story || m.story,
      isStatic: true,
      key
    }, false);
  });

  /* ===================================================
     6. RENDER — MEMBER CARDS
     =================================================== */
  const memberGrid = document.getElementById("memberGrid");

  members.forEach((member) => {
    const card = document.createElement("article");
    card.className = "member-card scroll-reveal";

    card.innerHTML = `
      <div class="member-card-media">
        <img class="member-card-img" src="${member.image}" alt="${member.name}" loading="lazy" />
        <div class="member-card-scrim"></div>
        <p class="member-card-quote">&ldquo;${member.quote}&rdquo;</p>
      </div>
      <h3 class="member-card-name">${member.name}</h3>
      <p class="member-card-role">${member.role}</p>
    `;

    card.addEventListener("click", () => openMemberModal(member));
    memberGrid.appendChild(card);
  });

  /* ===================================================
     7. RENDER — GALLERY
     =================================================== */
  const galleryGrid = document.getElementById("galleryGrid");

  function renderGalleryItem(itemData, prepend = false) {
    const src = typeof itemData === "string" ? itemData : itemData.image;
    const cardObj = typeof itemData === "string" ? { image: src, isStatic: true, key: src } : itemData;

    const item = document.createElement("div");
    item.className = "gallery-item scroll-reveal";
    item.innerHTML = `<img src="${src}" alt="Kenangan AMMIIN" loading="lazy" />`;
    item.addEventListener("click", () => openLightbox({
      ...cardObj,
      image: src,
      title: "",
      year: "",
      story: "",
      cardEl: item,
      isGallery: true
    }));

    if (prepend && galleryGrid.firstChild) {
      galleryGrid.insertBefore(item, galleryGrid.firstChild);
    } else {
      galleryGrid.appendChild(item);
    }
  }

  galleryStatic.forEach((src) => {
    if (deletedKeys.includes(src)) return;
    renderGalleryItem(src, false);
  });

  /* ===================================================
     7b. VIDEO — gate + render + player
     =================================================== */
  const videoGate    = document.getElementById("videoGate");
  const videoGateBtn = document.getElementById("videoGateBtn");
  const videoGrid    = document.getElementById("videoGrid");

  function renderVideoCard(clip) {
    const card = document.createElement("article");
    card.className = "video-card";

    card.innerHTML = `
      <div class="video-card-media">
        <img class="video-card-poster" src="${clip.poster}" alt="${clip.title}" loading="lazy" />
        <div class="video-card-scrim"></div>
        <span class="video-card-play">▶</span>
      </div>
      <h3 class="video-card-title">${clip.title}</h3>
      <p class="video-card-synopsis">${clip.synopsis}</p>
    `;

    const clipData = {
      id:         clip.id,
      collection: "videos",
      isStatic:   clip.isStatic,
      key:        clip.key || clip.title,
      title:      clip.title,
      year:       clip.year,
      poster:     clip.poster,
      src:        clip.src || clip.videoUrl,
      synopsis:   clip.synopsis,
      cardEl:     card
    };

    card.addEventListener("click", () => openVideoModal(clipData));
    videoGrid.appendChild(card);
  }

  videoGateBtn.addEventListener("click", () => {
    if (videoGrid.childElementCount === 0) {
      videosStatic.forEach((v) => {
        const key = v.title;
        if (deletedKeys.includes(key)) return;
        const ed = editedMap[key] || {};
        renderVideoCard({
          ...v,
          title:    ed.title    || v.title,
          year:     ed.year     || v.year,
          synopsis: ed.synopsis || v.synopsis,
          isStatic: true,
          key
        });
      });
    }
    videoGate.classList.add("is-hidden");
    videoGrid.classList.add("is-visible");
  });

  /* ===================================================
     8. FIREBASE — Load data tambahan dari Firestore
     =================================================== */

  /* Memories dari Firebase */
  async function loadFirebaseMemories() {
    try {
      const snap = await db.collection("memories").orderBy("uploadedAt", "desc").get();
      snap.forEach((doc) => {
        const d = doc.data();
        if (d.imageUrl) {
          renderMemoryCard({
            id:         doc.id,
            collection: "memories",
            image:      d.imageUrl,
            title:      d.title,
            year:       d.year,
            story:      d.story || "",
            isStatic:   false
          }, true);
        }
      });
    } catch (e) {
      console.warn("[AMMIIN] Tidak bisa load Firebase memories:", e.message);
    }
  }

  /* Gallery dari Firebase */
  async function loadFirebaseGallery() {
    try {
      const snap = await db.collection("gallery").orderBy("uploadedAt", "desc").get();
      snap.forEach((doc) => {
        const d = doc.data();
        if (d.imageUrl) {
          renderGalleryItem({
            id:         doc.id,
            collection: "gallery",
            image:      d.imageUrl,
            isStatic:   false
          }, true);
        }
      });
    } catch (e) {
      console.warn("[AMMIIN] Tidak bisa load Firebase gallery:", e.message);
    }
  }

  /* Videos dari Firebase (ditambahkan ke grid setelah gate dibuka) */
  async function loadFirebaseVideos() {
    try {
      const snap = await db.collection("videos").orderBy("uploadedAt", "desc").get();
      if (snap.empty) return;

      const renderAllVideos = () => {
        snap.forEach((doc) => {
          const d = doc.data();
          if (d.videoUrl) {
            renderVideoCard({
              id:         doc.id,
              collection: "videos",
              title:      d.title,
              year:       d.year,
              poster:     d.posterUrl || "",
              videoUrl:   d.videoUrl,
              synopsis:   d.synopsis || "",
              isStatic:   false
            });
          }
        });
      };

      if (videoGrid.classList.contains("is-visible")) {
        renderAllVideos();
      } else {
        videoGateBtn.addEventListener("click", () => {
          setTimeout(renderAllVideos, 80);
        }, { once: true });
      }
    } catch (e) {
      console.warn("[AMMIIN] Tidak bisa load Firebase videos:", e.message);
    }
  }

  /* Jalankan loader Firebase jika terhubung */
  if (FIREBASE_OK) {
    loadFirebaseMemories();
    loadFirebaseGallery();
    loadFirebaseVideos();
  }



  /* ===================================================
     9. VIDEO MODAL
     =================================================== */
  const videoModal          = document.getElementById("videoModal");
  const videoModalPlayer    = document.getElementById("videoModalPlayer");
  const videoModalSource    = document.getElementById("videoModalSource");
  const videoModalTitle     = document.getElementById("videoModalTitle");
  const videoModalDate      = document.getElementById("videoModalDate");
  const videoModalStory     = document.getElementById("videoModalStory");
  const videoModalClose     = document.getElementById("videoModalClose");
  const videoModalBackdrop  = document.getElementById("videoModalBackdrop");
  const videoModalFallback  = document.getElementById("videoModalFallback");
  const videoModalFallbackLink = document.getElementById("videoModalFallbackLink");
  const videoModalEditBtn   = document.getElementById("videoModalEditBtn");
  const videoModalDeleteBtn = document.getElementById("videoModalDeleteBtn");

  let activeVideoItem = null;

  videoModalPlayer.addEventListener("error", () => {
    videoModalFallback.hidden = false;
  });

  function openVideoModal(clip) {
    activeVideoItem = clip;
    videoModalFallback.hidden = true;
    videoModalFallbackLink.href  = clip.src;
    videoModalSource.src         = clip.src;
    videoModalPlayer.poster      = clip.poster;
    videoModalPlayer.load();
    videoModalTitle.textContent  = clip.title;
    videoModalDate.textContent   = clip.year;
    videoModalStory.textContent  = clip.synopsis;

    videoModal.classList.add("is-open");
    videoModal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";

    const playPromise = videoModalPlayer.play();
    if (playPromise && typeof playPromise.catch === "function") {
      playPromise.catch(() => {
        videoModalPlayer.muted = true;
        videoModalPlayer.play().catch(() => {});
      });
    }
  }

  function closeVideoModal() {
    videoModalPlayer.pause();
    videoModalPlayer.currentTime = 0;
    videoModalPlayer.muted = false;
    videoModalSource.removeAttribute("src");
    videoModalPlayer.load();
    videoModal.classList.remove("is-open");
    videoModal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    activeVideoItem = null;
  }

  videoModalClose.addEventListener("click", closeVideoModal);
  videoModalBackdrop.addEventListener("click", closeVideoModal);

  if (videoModalEditBtn) {
    videoModalEditBtn.addEventListener("click", () => {
      if (activeVideoItem) {
        openSiteEditModal(activeVideoItem);
      }
    });
  }

  if (videoModalDeleteBtn) {
    videoModalDeleteBtn.addEventListener("click", () => {
      if (activeVideoItem) {
        handleDeleteItem(activeVideoItem, closeVideoModal);
      }
    });
  }

  /* ===================================================
     10. LIGHTBOX (memory & gallery)
     =================================================== */
  const lightbox         = document.getElementById("lightbox");
  const lightboxImg      = document.getElementById("lightboxImg");
  const lightboxTitle    = document.getElementById("lightboxTitle");
  const lightboxDate     = document.getElementById("lightboxDate");
  const lightboxStory    = document.getElementById("lightboxStory");
  const lightboxCaption  = document.getElementById("lightboxCaption");
  const lightboxClose    = document.getElementById("lightboxClose");
  const lightboxBackdrop = document.getElementById("lightboxBackdrop");
  const lightboxEditBtn  = document.getElementById("lightboxEditBtn");
  const lightboxDeleteBtn= document.getElementById("lightboxDeleteBtn");

  let activeLightboxItem = null;

  function openLightbox(memory) {
    activeLightboxItem = memory;
    lightboxImg.src              = memory.image;
    lightboxImg.alt              = memory.title || "Kenangan AMMIIN";
    lightboxTitle.textContent    = memory.title || "";
    lightboxDate.textContent     = memory.year || "";
    lightboxStory.textContent    = memory.story || "";
    lightboxCaption.style.display = "block";

    // Show/hide edit button: Gallery items without title/story can only be deleted
    if (lightboxEditBtn) {
      lightboxEditBtn.style.display = (memory.collection === "gallery" && !memory.title) ? "none" : "";
    }

    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    activeLightboxItem = null;
  }

  lightboxClose.addEventListener("click", closeLightbox);
  lightboxBackdrop.addEventListener("click", closeLightbox);

  if (lightboxEditBtn) {
    lightboxEditBtn.addEventListener("click", () => {
      if (activeLightboxItem) {
        openSiteEditModal(activeLightboxItem);
      }
    });
  }

  if (lightboxDeleteBtn) {
    lightboxDeleteBtn.addEventListener("click", () => {
      if (activeLightboxItem) {
        handleDeleteItem(activeLightboxItem, closeLightbox);
      }
    });
  }

  /* ===================================================
     UNIVERSAL EDIT & DELETE LOGIC (Memories, Gallery, Videos)
     =================================================== */
  const siteEditModal         = document.getElementById("siteEditModal");
  const siteEditModalClose    = document.getElementById("siteEditModalClose");
  const siteEditModalBackdrop = document.getElementById("siteEditModalBackdrop");
  const siteEditCancelBtn     = document.getElementById("siteEditCancelBtn");
  const siteEditForm          = document.getElementById("siteEditForm");
  const siteEditTitle         = document.getElementById("siteEditTitle");
  const siteEditYear          = document.getElementById("siteEditYear");
  const siteEditStory         = document.getElementById("siteEditStory");
  const siteEditSaveBtn       = document.getElementById("siteEditSaveBtn");

  let activeEditingItem = null;

  function openSiteEditModal(item) {
    if (!item) return;
    activeEditingItem = item;

    siteEditTitle.value = item.title || "";
    siteEditYear.value  = item.year || "";
    siteEditStory.value = item.story || item.synopsis || "";

    siteEditModal.classList.add("is-open");
    siteEditModal.setAttribute("aria-hidden", "false");
  }

  function closeSiteEditModal() {
    if (siteEditModal) {
      siteEditModal.classList.remove("is-open");
      siteEditModal.setAttribute("aria-hidden", "true");
    }
    activeEditingItem = null;
  }

  if (siteEditModalClose) siteEditModalClose.addEventListener("click", closeSiteEditModal);
  if (siteEditModalBackdrop) siteEditModalBackdrop.addEventListener("click", closeSiteEditModal);
  if (siteEditCancelBtn) siteEditCancelBtn.addEventListener("click", closeSiteEditModal);

  if (siteEditForm) {
    siteEditForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      if (!activeEditingItem) return;

      const newTitle = siteEditTitle.value.trim();
      const newYear  = siteEditYear.value.trim();
      const newStory = siteEditStory.value.trim();

      if (!newTitle) {
        alert("Judul tidak boleh kosong!");
        return;
      }

      siteEditSaveBtn.disabled = true;
      siteEditSaveBtn.textContent = "Menyimpan...";

      try {
        const item = activeEditingItem;
        const isVideo = item.collection === "videos" || !!item.videoUrl || !!item.src;

        if (!item.isStatic && item.id && item.collection && FIREBASE_OK) {
          const updateData = {
            title: newTitle,
            year:  newYear,
          };
          if (isVideo) {
            updateData.synopsis = newStory;
          } else {
            updateData.story = newStory;
          }
          await db.collection(item.collection).doc(item.id).update(updateData);
        } else if (item.isStatic && item.id) {
          setEditedStatic(item.id, {
            title: newTitle,
            year:  newYear,
            story: newStory,
            synopsis: newStory
          });
        }

        // Update in-memory data
        item.title = newTitle;
        item.year  = newYear;
        if (isVideo) {
          item.synopsis = newStory;
        } else {
          item.story = newStory;
        }

        // Update active modal view
        if (activeLightboxItem === item) {
          lightboxTitle.textContent = newTitle;
          lightboxDate.textContent  = newYear;
          lightboxStory.textContent = newStory;
        }
        if (activeVideoItem === item) {
          videoModalTitle.textContent = newTitle;
          videoModalDate.textContent  = newYear;
          videoModalStory.textContent = newStory;
        }

        // Update grid card DOM
        if (item.cardEl) {
          const titleEl = item.cardEl.querySelector(".memory-card-title, .video-card-title");
          const dateEl  = item.cardEl.querySelector(".memory-card-date, .video-card-date");
          const descEl  = item.cardEl.querySelector(".memory-card-desc, .video-card-synopsis");
          if (titleEl) titleEl.textContent = newTitle;
          if (dateEl)  dateEl.textContent  = newYear;
          if (descEl)  descEl.textContent  = newStory;
        }

        closeSiteEditModal();
      } catch (err) {
        console.error("[AMMIIN] Gagal menyimpan perubahan:", err);
        alert("Gagal menyimpan perubahan: " + err.message);
      } finally {
        siteEditSaveBtn.disabled = false;
        siteEditSaveBtn.textContent = "Simpan Perubahan";
      }
    });
  }

  async function handleDeleteItem(item, closeModalFn) {
    if (!item) return;
    const itemName = item.title || "item ini";
    if (!confirm(`Yakin ingin menghapus "${itemName}"? Tindakan ini tidak dapat dibatalkan.`)) {
      return;
    }

    try {
      if (!item.isStatic && item.id && item.collection && FIREBASE_OK) {
        await db.collection(item.collection).doc(item.id).delete();
      } else if (item.isStatic && item.id) {
        addDeletedStatic(item.id);
      }

      // Animate removal from DOM
      if (item.cardEl) {
        item.cardEl.style.transition = "transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.35s ease";
        item.cardEl.style.transform = "scale(0.85)";
        item.cardEl.style.opacity = "0";
        setTimeout(() => {
          item.cardEl.remove();
        }, 350);
      }

      closeModalFn();
    } catch (err) {
      console.error("[AMMIIN] Gagal menghapus:", err);
      alert("Gagal menghapus item: " + err.message);
    }
  }

  /* ===================================================
     11. MEMBER MODAL
     =================================================== */
  const memberModal        = document.getElementById("memberModal");
  const memberModalImg     = document.getElementById("memberModalImg");
  const memberModalName    = document.getElementById("memberModalName");
  const memberModalRole    = document.getElementById("memberModalRole");
  const memberModalQuote   = document.getElementById("memberModalQuote");
  const memberModalDesc    = document.getElementById("memberModalDesc");
  const memberModalClose   = document.getElementById("memberModalClose");
  const memberModalBackdrop = document.getElementById("memberModalBackdrop");

  function openMemberModal(member) {
    memberModalImg.src           = member.image;
    memberModalImg.alt           = member.name;
    memberModalName.textContent  = member.name;
    memberModalRole.textContent  = member.role;
    memberModalQuote.textContent = `"${member.quote}"`;
    memberModalDesc.textContent  = member.desc;

    memberModal.classList.add("is-open");
    memberModal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeMemberModal() {
    memberModal.classList.remove("is-open");
    memberModal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  memberModalClose.addEventListener("click", closeMemberModal);
  memberModalBackdrop.addEventListener("click", closeMemberModal);

  /* Escape key tutup semua modal */
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeLightbox();
      closeMemberModal();
      closeVideoModal();
      closeSiteEditModal();
    }
  });

  /* ===================================================
     12. NAVBAR — scroll effect
     =================================================== */
  const siteNav = document.getElementById("siteNav");

  function handleNavScroll() {
    siteNav.classList.toggle("is-scrolled", window.scrollY > 40);
  }

  window.addEventListener("scroll", handleNavScroll, { passive: true });
  handleNavScroll();

  /* ===================================================
     13. MOBILE MENU
     =================================================== */
  const navToggle = document.getElementById("navToggle");
  const navLinks  = document.getElementById("navLinks");

  navToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });

  navLinks.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href");
      if (href && href.startsWith("#")) {
        e.preventDefault();
        const pageKey = href.slice(1);
        if (window.location.hash !== href) {
          window.location.hash = href;
        } else {
          showPage(pageKey);
        }
        window.scrollTo({ top: 0, behavior: "instant" });
      }
      navLinks.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });

  const heroCta = document.getElementById("heroCta");
  if (heroCta) {
    heroCta.addEventListener("click", (e) => {
      e.preventDefault();
      window.location.hash = "#memories";
      showPage("memories");
      window.scrollTo({ top: 0, behavior: "instant" });
    });
  }


  /* ===================================================
     14. FOOTER — tahun otomatis
     =================================================== */
  const footerYear = document.getElementById("footerYear");
  if (footerYear) footerYear.textContent = new Date().getFullYear();

});
