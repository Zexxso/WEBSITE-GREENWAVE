// script.js - small interactivity
document.addEventListener('DOMContentLoaded', function () {
  // donate modal behavior
  const donateBtns = document.querySelectorAll('.donate-btn');
  const donationResult = document.getElementById('donationResult');
  let selectedAmount = null;

  donateBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      donateBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      selectedAmount = btn.textContent.trim();
      donationResult.textContent = `Anda memilih: ${selectedAmount}`;
    });
  });

  const confirmDonate = document.getElementById('confirmDonate');
  if (confirmDonate) {
    confirmDonate.addEventListener('click', () => {
      if (!selectedAmount) {
        donationResult.textContent = 'Pilih nominal donasi terlebih dahulu.';
        return;
      }
      const modalEl = document.getElementById('donateModal');
      const modal = bootstrap.Modal.getInstance(modalEl);
      modal.hide();
      alert(`Terima kasih! Anda memilih donasi ${selectedAmount}. (Demo)`);
    });
  }

  // simple subscribe demo
  const subscribeForm = document.getElementById('subscribeForm');
  if (subscribeForm) {
    subscribeForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = subscribeForm.querySelector('input[type=email]').value;
      alert(`Terima kasih, ${email} telah terdaftar (demo).`);
      subscribeForm.reset();
    });
  }

// === Navbar Scroll Behavior ===
  const navbar = document.querySelector('.navbar');
  // Cek apakah halaman ini punya hero section
  const heroSection = document.querySelector('.hero'); 

  // HANYA jalankan logika scroll transparan JIKA ADA hero section
  if (navbar && heroSection) { 
    const handleNavbar = () => {
      // hanya aktif di desktop
      if (window.innerWidth > 991) {
        if (window.scrollY > 50) {
          navbar.classList.add('scrolled');
        } else {
          navbar.classList.remove('scrolled');
        }
      } else {
        // pastikan mobile tetap putih
        navbar.classList.remove('scrolled');
}
    };

    // jalankan saat scroll & resize
    window.addEventListener('scroll', handleNavbar);
    window.addEventListener('resize', handleNavbar);
    handleNavbar(); // jalankan awal
  }
});

// Skrip untuk mengubah Opsi Donasi
document.addEventListener("DOMContentLoaded", function() {

  // 1. Definisikan semua elemen yang kita butuhkan
  const bulananBtn = document.getElementById('freq-bulanan');
  const sekaliBtn = document.getElementById('freq-sekali');
  const amountContainer = document.getElementById('amount-options-container');
  const noteText = document.getElementById('donation-note-text');
  const submitBtn = document.getElementById('cta-submit-button');

  // 2. Definisikan HTML dan Teks untuk setiap state
  
  // [MODIFIKASI] Menggunakan <div class="input-group">
  const bulananHTML = `
    <div class="d-grid gap-2">
      <button class="btn btn-amount-option active">Rp 50.000</button>
      <button class="btn btn-amount-option">Rp 100.000</button>
      <button class="btn btn-amount-option">Rp 150.000</button>
      <button class="btn btn-amount-option" id="btn-jumlah-lain">Jumlah Lain</button>
    </div>
    <div class="input-group mt-2 d-none" id="custom-amount-wrapper">
      <span class="input-group-text" id="custom-amount-prefix">Rp</span>
      <input type="text" inputmode="numeric" id="custom-amount-input" class="form-control" placeholder="Masukkan nominal">
    </div>
  `;
  const bulananNote = "Donasi bulanan dari kamu akan membantu Greenwave mendorong solusi dan berkampanye secara global untuk menjaga Bumi kita. Terima kasih!";
  
  // [MODIFIKASI] Menggunakan <div class="input-group">
  const satuKaliHTML = `
    <div class="amount-options-row">
      <button class="btn btn-amount-option active">Rp 300.000</button>
      <button class="btn btn-amount-option">Rp 400.000</button>
      <button class="btn btn-amount-option">Rp 500.000</button>
    </div>
    <div class="d-grid amount-options-other">
      <button class="btn btn-amount-option" id="btn-jumlah-lain">Jumlah Lain</button>
    </div>
    <div class="input-group mt-2 d-none" id="custom-amount-wrapper">
      <span class="input-group-text" id="custom-amount-prefix">Rp</span>
      <input type="text" inputmode="numeric" id="custom-amount-input" class="form-control" placeholder="Masukkan nominal">
    </div>
  `;
  const satuKaliNote = "Donasi satu-kali dari kamu akan membantu Greenwave mendorong solusi dan berkampanye secara global untuk menjaga Bumi kita. Terima kasih!";

  
  // 3. Pasang Event Listeners (untuk Bulanan / Satu Kali)
  bulananBtn.addEventListener('click', function() {
    if (this.checked) {
      amountContainer.innerHTML = bulananHTML;
      noteText.innerText = bulananNote;
      submitBtn.classList.remove('style-orange'); 
    }
  });
  
  sekaliBtn.addEventListener('click', function() {
    if (this.checked) {
      amountContainer.innerHTML = satuKaliHTML;
      noteText.innerText = satuKaliNote;
      submitBtn.classList.add('style-orange'); 
    }
  });

  // 4. [MODIFIKASI] Event listener untuk tombol nominal
  //    (Sekarang menargetkan wrapper input kustom)
  amountContainer.addEventListener('click', function(event) {
    const clickedButton = event.target.closest('.btn-amount-option');
    if (!clickedButton) return; // Keluar jika yang diklik bukan tombol

    // [MODIFIKASI] Ambil wrapper input kustom
    const customInputWrapper = amountContainer.querySelector('#custom-amount-wrapper');

    // Nonaktifkan semua tombol dulu
    const allAmountButtons = amountContainer.querySelectorAll('.btn-amount-option');
    allAmountButtons.forEach(button => button.classList.remove('active'));

    // Aktifkan tombol yang diklik
    clickedButton.classList.add('active');

    // Tampilkan atau sembunyikan input kustom
    if (clickedButton.id === 'btn-jumlah-lain') {
      // Jika "Jumlah Lain" diklik, tampilkan wrapper
      customInputWrapper.classList.remove('d-none');
      // Fokus ke input di dalamnya
      amountContainer.querySelector('#custom-amount-input').focus();
    } else {
      // Jika tombol nominal lain diklik, sembunyikan wrapper
      customInputWrapper.classList.add('d-none');
      // Kosongkan nilainya
      amountContainer.querySelector('#custom-amount-input').value = ''; 
    }
  });

  // 5. Event listener untuk FORMATTING RUPIAH OTOMATIS (Tetap sama)
  amountContainer.addEventListener('input', function(event) {
    if (event.target.id === 'custom-amount-input') {
      const input = event.target;
      let value = input.value.replace(/[^\d]/g, '');
      
      if (value) {
        const formattedValue = new Intl.NumberFormat('id-ID').format(value);
        input.value = formattedValue;
      } else {
        input.value = '';
      }
    }
  });

  // 6. Inisialisasi state default saat halaman dimuat
  amountContainer.innerHTML = bulananHTML;
  noteText.innerText = bulananNote;
  submitBtn.classList.remove('style-orange');

});

/* === FUNGSI UNTUK ANIMASI ANGKA (COUNT-UP) === */

document.addEventListener("DOMContentLoaded", function() {

  // Fungsi untuk menjalankan animasi hitungan
  const animateCountUp = (el) => {
    const target = parseFloat(el.getAttribute('data-target'));
    const duration = 2000; // Durasi animasi (2 detik)
    const hasDecimal = target % 1 !== 0; // Cek apakah angka desimal
    let start = 0;
    let startTime = null;

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      let currentValue = progress * target;
      
      // Format angka (tambahkan 1 angka desimal jika perlu)
      if (hasDecimal) {
        el.textContent = currentValue.toFixed(1) + '%';
      } else {
        el.textContent = Math.floor(currentValue) + '%';
      }

      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    }
    window.requestAnimationFrame(step);
  };

  // --- Gunakan Intersection Observer untuk memicu animasi saat terlihat ---
  
  const statsSection = document.getElementById('stats-section');
  
  if (statsSection) {
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        // Jika section masuk ke viewport
        if (entry.isIntersecting) {
          
          // Ambil semua elemen angka dan jalankan animasi
          const statNumbers = entry.target.querySelectorAll('.stat-number');
          statNumbers.forEach(num => {
            animateCountUp(num);
          });
          
          // Berhenti mengamati setelah animasi berjalan
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1 // Picu saat 10% section terlihat
    });

    // Mulai mengamati section
    observer.observe(statsSection);
  }

});

/* =================================
   LOGIKA PLAY/PAUSE HERO CAROUSEL
   ================================= */
document.addEventListener("DOMContentLoaded", function() {
    
    // Ambil elemen-elemen yang diperlukan
    var heroCarouselElement = document.getElementById('heroCarousel');
    
    // Pastikan elemennya ada sebelum lanjut
    if (heroCarouselElement) {
        var heroCarousel = new bootstrap.Carousel(heroCarouselElement);
        var playPauseBtnDesktop = document.getElementById('carouselPlayPauseDesktop');
        var playPauseBtnMobile = document.getElementById('carouselPlayPauseMobile');
        
        // Cek juga tombolnya
        if (playPauseBtnDesktop && playPauseBtnMobile) {
            
            // Atur status awal
            var isPlaying = true;

            // Buat satu fungsi untuk mengontrol keduanya
            function togglePlayPause() {
              if (isPlaying) {
                // Jika sedang main, PAUSE
                heroCarousel.pause();
                playPauseBtnDesktop.innerHTML = '<i class="fas fa-play"></i>';
                playPauseBtnDesktop.setAttribute('aria-label', 'Play carousel');
                playPauseBtnMobile.innerHTML = '<i class="fas fa-play"></i>';
                playPauseBtnMobile.setAttribute('aria-label', 'Play carousel');
              } else {
                // Jika sedang pause, PLAY
                heroCarousel.cycle();
                playPauseBtnDesktop.innerHTML = '<i class="fas fa-pause"></i>';
                playPauseBtnDesktop.setAttribute('aria-label', 'Pause carousel');
                playPauseBtnMobile.innerHTML = '<i class="fas fa-pause"></i>';
                playPauseBtnMobile.setAttribute('aria-label', 'Pause carousel');
              }
              // Balik statusnya
              isPlaying = !isPlaying;
            }

            // Pasang listener di kedua tombol
            playPauseBtnDesktop.addEventListener('click', togglePlayPause);
            playPauseBtnMobile.addEventListener('click', togglePlayPause);
        }
    }
});

/* =================================
   LOGIKA HIDE/SHOW NAVBAR MOBILE
   ================================= */
document.addEventListener("DOMContentLoaded", function() {
  
  let lastScrollTop = 0;
  const subNav = document.querySelector('.mobile-sub-nav');
  const mainNav = document.querySelector('.navbar');

  // Pastikan elemennya ada
  if (subNav && mainNav) {
    
    // Fungsi untuk meng-update posisi top sub-nav
    const updateSubNavPosition = () => {
      // Hanya jalankan di mobile
      if (window.innerWidth < 992) {
        const mainNavHeight = mainNav.offsetHeight;
        subNav.style.top = mainNavHeight + 'px';
      } else {
        // Reset di desktop
        subNav.style.top = 'auto';
        subNav.classList.remove('sub-nav-hidden');
      }
    };
    
    // Jalankan saat halaman dimuat
    updateSubNavPosition();
    
    // Jalankan lagi jika ukuran window berubah (misal rotasi HP)
    window.addEventListener('resize', updateSubNavPosition);
    
    // Listener untuk deteksi arah scroll
    window.addEventListener("scroll", function() {
      // Hanya jalankan di mobile
      if (window.innerWidth < 992) {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop) {
          // Scroll ke Bawah
          subNav.classList.add('sub-nav-hidden');
        } else {
          // Scroll ke Atas
          subNav.classList.remove('sub-nav-hidden');
        }
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // Untuk handle scroll di paling atas
      }
    }, false);
  }
});