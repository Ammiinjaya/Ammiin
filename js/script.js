/* =========================================================
   AMMIIN — script.js
   Semua interaksi & data disimpan di sini.
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* ===================================================
     1. DATA — MEMORIES
     Foto asli dari AMMIIN. Ganti "title", "year", dan "story"
     supaya sesuai dengan cerita aslinya masing-masing.
     =================================================== */
  const memories = [
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
     Nama diambil dari file foto asli. Silakan lengkapi
     "role", "quote", dan "desc" masing-masing anggota
     supaya lebih personal.
     =================================================== */
  const members = [
    { name: "Ageng",  role: "Member of AMMIIN", image: "images/member-01.jpg", quote: "Some memories are worth keeping forever.", desc: "Lengkapi deskripsi singkat tentang Ageng di sini." },
    { name: "April",  role: "Member of AMMIIN", image: "images/member-02.jpg", quote: "Together, always.",                        desc: "Lengkapi deskripsi singkat tentang April di sini." },
    { name: "Geri",   role: "Member of AMMIIN", image: "images/member-03.jpg", quote: "Every story needs its people.",             desc: "Lengkapi deskripsi singkat tentang Geri di sini." },
    { name: "Indra",  role: "Member of AMMIIN", image: "images/member-04.jpg", quote: "We're better when we're together.",         desc: "Lengkapi deskripsi singkat tentang Indra di sini." },
    { name: "Mek",    role: "Member of AMMIIN", image: "images/member-05.jpg", quote: "This is just the beginning.",               desc: "Lengkapi deskripsi singkat tentang Mek di sini." },
    { name: "Sikibb", role: "Member of AMMIIN", image: "images/member-06.jpg", quote: "Small moments, big memories.",              desc: "Lengkapi deskripsi singkat tentang Sikibb di sini." },
    { name: "Thariq", role: "Member of AMMIIN", image: "images/member-07.jpg", quote: "I'm always here.",                          desc: "Lengkapi deskripsi singkat tentang Thariq di sini." },
    { name: "Umar",   role: "Member of AMMIIN", image: "images/member-08.jpg", quote: "Let's just go, we'll figure it out.",       desc: "Lengkapi deskripsi singkat tentang Umar di sini." },
    { name: "Wendi",  role: "Member of AMMIIN", image: "images/member-09.jpg", quote: "One group, one story.",                     desc: "Lengkapi deskripsi singkat tentang Wendi di sini." }
  ];

  /* ===================================================
     3. DATA — GALLERY (More Memories)
     Untuk sementara memakai ulang 5 foto kenangan yang sama
     karena baru itu materi foto grup yang tersedia. Tambahkan
     path foto baru di sini kapan pun ada tambahan foto.
     =================================================== */
  const galleryPhotos = [
    "images/gallery-01.jpg",
    "images/gallery-02.jpg",
    "images/gallery-03.jpg",
    "images/gallery-04.jpg",
    "images/gallery-05.jpg"
  ];

  /* ===================================================
     3b. DATA — VIDEO KENANGAN
     Ganti "title" dan "synopsis" supaya sesuai cerita aslinya.
     =================================================== */
  const videos = [
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
     4. RENDER — MEMORY CARDS
     =================================================== */
  const memoryGrid = document.getElementById("memoryGrid");

  memories.forEach((memory, index) => {
    const card = document.createElement("article");
    card.className = "memory-card scroll-reveal";
    card.setAttribute("data-index", index);

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

    card.addEventListener("click", () => openLightbox(memory));
    memoryGrid.appendChild(card);
  });

  /* ===================================================
     5. RENDER — MEMBER CARDS
     =================================================== */
  const memberGrid = document.getElementById("memberGrid");

  members.forEach((member, index) => {
    const card = document.createElement("article");
    card.className = "member-card scroll-reveal";
    card.setAttribute("data-index", index);

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
     6. RENDER — GALLERY
     =================================================== */
  const galleryGrid = document.getElementById("galleryGrid");

  galleryPhotos.forEach((src) => {
    const item = document.createElement("div");
    item.className = "gallery-item scroll-reveal";
    item.innerHTML = `<img src="${src}" alt="Kenangan AMMIIN" loading="lazy" />`;
    item.addEventListener("click", () => openLightbox({ title: "", year: "", story: "", image: src }));
    galleryGrid.appendChild(item);
  });

  /* ===================================================
     6b. VIDEO KENANGAN — gate + render + player modal
     =================================================== */
  const videoGate = document.getElementById("videoGate");
  const videoGateBtn = document.getElementById("videoGateBtn");
  const videoGrid = document.getElementById("videoGrid");

  function renderVideoGrid() {
    videos.forEach((clip) => {
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

      card.addEventListener("click", () => openVideoModal(clip));
      videoGrid.appendChild(card);
    });
  }

  videoGateBtn.addEventListener("click", () => {
    if (videoGrid.childElementCount === 0) {
      renderVideoGrid();
    }
    videoGate.classList.add("is-hidden");
    videoGrid.classList.add("is-visible");
  });

  const videoModal = document.getElementById("videoModal");
  const videoModalPlayer = document.getElementById("videoModalPlayer");
  const videoModalSource = document.getElementById("videoModalSource");
  const videoModalTitle = document.getElementById("videoModalTitle");
  const videoModalDate = document.getElementById("videoModalDate");
  const videoModalStory = document.getElementById("videoModalStory");
  const videoModalClose = document.getElementById("videoModalClose");
  const videoModalBackdrop = document.getElementById("videoModalBackdrop");
  const videoModalFallback = document.getElementById("videoModalFallback");
  const videoModalFallbackLink = document.getElementById("videoModalFallbackLink");

  /* Kalau video benar-benar gagal diputar di dalam modal (jarang,
     biasanya karena membuka index.html langsung lewat file:// di HP),
     tampilkan link untuk membuka file video-nya langsung. */
  videoModalPlayer.addEventListener("error", () => {
    videoModalFallback.hidden = false;
  });

  function openVideoModal(clip) {
    videoModalFallback.hidden = true;
    videoModalFallbackLink.href = clip.src;
    videoModalSource.src = clip.src;
    videoModalPlayer.poster = clip.poster;
    videoModalPlayer.load();
    videoModalTitle.textContent = clip.title;
    videoModalDate.textContent = clip.year;
    videoModalStory.textContent = clip.synopsis;

    videoModal.classList.add("is-open");
    videoModal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";

    /* Sebagian browser mobile memblokir autoplay yang ada suaranya.
       Coba play() normal dulu; kalau ditolak, coba lagi dalam
       keadaan muted supaya video tetap tampil (user bisa unmute
       lewat tombol volume di kontrol video). */
    const playPromise = videoModalPlayer.play();
    if (playPromise && typeof playPromise.catch === "function") {
      playPromise.catch(() => {
        videoModalPlayer.muted = true;
        videoModalPlayer.play().catch(() => {
          /* Biarkan diam; user tetap bisa menekan tombol play manual. */
        });
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
  }

  videoModalClose.addEventListener("click", closeVideoModal);
  videoModalBackdrop.addEventListener("click", closeVideoModal);

  /* ===================================================
     7. LIGHTBOX (memory & gallery photos)
     =================================================== */
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightboxImg");
  const lightboxTitle = document.getElementById("lightboxTitle");
  const lightboxDate = document.getElementById("lightboxDate");
  const lightboxStory = document.getElementById("lightboxStory");
  const lightboxCaption = document.getElementById("lightboxCaption");
  const lightboxClose = document.getElementById("lightboxClose");
  const lightboxBackdrop = document.getElementById("lightboxBackdrop");

  function openLightbox(memory) {
    lightboxImg.src = memory.image;
    lightboxImg.alt = memory.title || "Kenangan AMMIIN";
    lightboxTitle.textContent = memory.title;
    lightboxDate.textContent = memory.year;
    lightboxStory.textContent = memory.story;
    lightboxCaption.style.display = memory.title ? "block" : "none";

    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  lightboxClose.addEventListener("click", closeLightbox);
  lightboxBackdrop.addEventListener("click", closeLightbox);

  /* ===================================================
     8. MEMBER MODAL
     =================================================== */
  const memberModal = document.getElementById("memberModal");
  const memberModalImg = document.getElementById("memberModalImg");
  const memberModalName = document.getElementById("memberModalName");
  const memberModalRole = document.getElementById("memberModalRole");
  const memberModalQuote = document.getElementById("memberModalQuote");
  const memberModalDesc = document.getElementById("memberModalDesc");
  const memberModalClose = document.getElementById("memberModalClose");
  const memberModalBackdrop = document.getElementById("memberModalBackdrop");

  function openMemberModal(member) {
    memberModalImg.src = member.image;
    memberModalImg.alt = member.name;
    memberModalName.textContent = member.name;
    memberModalRole.textContent = member.role;
    memberModalQuote.textContent = `“${member.quote}”`;
    memberModalDesc.textContent = member.desc;

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

  /* Tutup modal dengan tombol Escape */
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeLightbox();
      closeMemberModal();
      closeVideoModal();
    }
  });

  /* ===================================================
     9. NAVBAR — scroll effect
     =================================================== */
  const siteNav = document.getElementById("siteNav");

  function handleNavScroll() {
    if (window.scrollY > 40) {
      siteNav.classList.add("is-scrolled");
    } else {
      siteNav.classList.remove("is-scrolled");
    }
  }
  window.addEventListener("scroll", handleNavScroll, { passive: true });
  handleNavScroll();

  /* ===================================================
     10. MOBILE MENU
     =================================================== */
  const navToggle = document.getElementById("navToggle");
  const navLinks = document.getElementById("navLinks");

  navToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });

  /* Tutup mobile menu setelah salah satu link diklik */
  navLinks.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });

  /* ===================================================
     11. SCROLL REVEAL — IntersectionObserver
     =================================================== */
  const revealTargets = document.querySelectorAll(".scroll-reveal");

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
  );

  revealTargets.forEach((target) => revealObserver.observe(target));

  /* ===================================================
     12. FOOTER — tahun otomatis
     =================================================== */
  const footerYear = document.getElementById("footerYear");
  footerYear.textContent = new Date().getFullYear();

});
