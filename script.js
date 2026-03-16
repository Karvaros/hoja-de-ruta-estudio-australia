/* ===================================
   YOUR VISA WORLD — HOJA DE RUTA
   Script: Video modal & navigation
   =================================== */

// ── Video Modal ──────────────────────────────────────────────

/**
 * Open the video modal and load the given URL.
 * @param {HTMLElement} el - The thumbnail element that was clicked.
 */
function openVideo(el) {
  var src = el.getAttribute('data-src');
  if (!src || src.startsWith('PLACEHOLDER')) {
    showPlaceholderAlert();
    return;
  }

  // Google Drive / Docs links can't be embedded — open in new tab
  if (src.includes('drive.google.com') || src.includes('docs.google.com')) {
    window.open(src, '_blank', 'noopener');
    return;
  }

  var frame = document.getElementById('videoFrame');
  frame.src = src;
  var modal = document.getElementById('videoModal');
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

/**
 * Close the modal and stop video playback.
 */
function closeModal() {
  var modal = document.getElementById('videoModal');
  modal.classList.remove('open');
  document.getElementById('videoFrame').src = '';
  document.body.style.overflow = '';
}

// Close modal with Escape key
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') closeModal();
});

// ── Placeholder alert ────────────────────────────────────────
function showPlaceholderAlert() {
  var existing = document.querySelector('.placeholder-toast');
  if (existing) existing.remove();

  var toast = document.createElement('div');
  toast.className = 'placeholder-toast';
  toast.innerHTML =
    '<span class="toast-icon">🎬</span>' +
    '<span>El video se habilitará próximamente cuando se cargue el archivo.</span>';
  document.body.appendChild(toast);

  // Trigger animation
  requestAnimationFrame(function () {
    requestAnimationFrame(function () { toast.classList.add('show'); });
  });

  setTimeout(function () {
    toast.classList.remove('show');
    setTimeout(function () { toast.remove(); }, 500);
  }, 3000);
}

// ── Download placeholder ──────────────────────────────────────
document.querySelectorAll('.download-btn').forEach(function (btn) {
  btn.addEventListener('click', function (e) {
    var href = btn.getAttribute('href');
    if (!href || href === '#') {
      e.preventDefault();
      showDownloadToast(btn);
    }
  });
});

function showDownloadToast(btn) {
  var existing = document.querySelector('.placeholder-toast');
  if (existing) existing.remove();

  var toast = document.createElement('div');
  toast.className = 'placeholder-toast';
  toast.innerHTML =
    '<span class="toast-icon">📥</span>' +
    '<span>El archivo de descarga se habilitará próximamente.</span>';
  document.body.appendChild(toast);

  requestAnimationFrame(function () {
    requestAnimationFrame(function () { toast.classList.add('show'); });
  });

  setTimeout(function () {
    toast.classList.remove('show');
    setTimeout(function () { toast.remove(); }, 500);
  }, 3000);
}

// ── Active nav step on scroll ─────────────────────────────────
var sections = document.querySelectorAll('.step-section');
var dots = document.querySelectorAll('.step-dot');

function onScroll() {
  var scrollY = window.scrollY + 220; // offset for sticky nav
  var current = 0;
  sections.forEach(function (section, i) {
    if (section.offsetTop <= scrollY) current = i;
  });
  dots.forEach(function (dot, i) {
    dot.classList.toggle('active', i === current);
  });
}

window.addEventListener('scroll', onScroll, { passive: true });
onScroll();
