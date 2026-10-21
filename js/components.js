const headerHTML = `
<header class="site-header">
  <a class="brand" href="index.html">
    <span class="logo"><img src="images/EBG LTD Global Tech Control Logo.jpg" alt="EBG LTD"></span>
    <span>
      <strong>EBG LTD</strong>
      <small>Digital Solutions for Business Growth</small>
    </span>
  </a>

  <button class="menu-toggle" aria-label="Toggle navigation" aria-expanded="false">
    <span></span><span></span><span></span>
  </button>

  <nav class="nav-links">
    <a href="index.html">Home</a>
    <a href="about.html">About</a>
    <a href="services.html">Services</a>
    <a href="training.html">Training</a>
    <a href="certificate.html">Certificate</a>
    <a href="team.html">Team</a>
    <a href="gallery.html">Gallery</a>
    <a href="contact.html">Contact</a>
  </nav>
</header>
`;

const footerHTML = `
<footer class="site-footer">
  <div>
    <a class="brand footer-brand" href="index.html">
      <span class="logo"><img src="images/EBG LTD Global Tech Control Logo.jpg" alt=""></span>
      <span>
        <strong>EBG LTD</strong>
        <small>Empowering businesses through digital innovation</small>
      </span>
    </a>
    <p>© <span id="year"></span> EBG LTD. Digital solutions for business growth.</p>
  </div>
  <div class="footer-links">
    <a href="about.html">About</a>
    <a href="services.html">Services</a>
    <a href="contact.html">Contact</a>
    <a href="privacy.html">Privacy Policy</a>
    <a href="terms.html">Terms of Service</a>
  </div>
  <div class="footer-projects">
    <p class="projects-label">Projects by EBG LTD</p>
    <div class="projects-list">
      <a href="index.html" target="_blank" rel="noopener noreferrer">EBG LTD</a>
      <a href="https://safelife.rw" target="_blank" rel="noopener noreferrer">Safelife</a>
      <a href="https://ebgltd.com" target="_blank" rel="noopener noreferrer">EBG LTD Official Website</a>
    </div>
  </div>
</footer>
<button class="back-to-top" aria-label="Scroll to top">↑</button>
`;

function getCurrentPage() {
  const path = window.location.pathname;
  const page = path.split('/').pop() || 'index.html';
  return page.replace('.html', '');
}

function setActiveNavLink() {
  const currentPage = getCurrentPage();
  const navLinks = document.querySelectorAll('.nav-links a');
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href) {
      const linkPage = href.replace('.html', '');
      if (linkPage === currentPage || (currentPage === '' && linkPage === 'index')) {
        link.classList.add('active');
      }
    }
  });
}

function initializeYear() {
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}

function injectComponents() {
  const headerPlaceholder = document.getElementById('header-placeholder');
  const footerPlaceholder = document.getElementById('footer-placeholder');

  if (headerPlaceholder) {
    headerPlaceholder.innerHTML = headerHTML;
  }
  if (footerPlaceholder) {
    footerPlaceholder.innerHTML = footerHTML;
  }

  setActiveNavLink();
  initializeYear();

  document.dispatchEvent(new CustomEvent('componentsReady'));
}

document.addEventListener('DOMContentLoaded', injectComponents);