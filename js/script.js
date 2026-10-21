function initializeYear() {
  const year = document.getElementById('year');
  if (year) {
    year.textContent = new Date().getFullYear();
  }
}

function initializeMenuToggle() {
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      const expanded = navLinks.classList.contains('open');
      menuToggle.setAttribute('aria-expanded', String(expanded));
    });

    document.querySelectorAll('.nav-links a').forEach((link) => {
      link.addEventListener('click', () => navLinks.classList.remove('open'));
    });
  }
}

function initializeRevealObserver() {
  const revealItems = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        if (entry.target.querySelector('.counter')) {
          animateCounters();
        }
      }
    });
  }, { threshold: 0.2 });

  revealItems.forEach((item) => observer.observe(item));
}

function animateCounters() {
  const counters = document.querySelectorAll('.counter');
  counters.forEach((counter) => {
    if (counter.dataset.animated) return;
    counter.dataset.animated = 'true';
    const target = Number(counter.dataset.count || 0);
    let current = 0;
    const duration = 1200;
    const stepTime = 20;
    const steps = duration / stepTime;
    const increment = target / steps;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      counter.textContent = Math.round(current);
    }, stepTime);
  });
}

function initializeTypingText() {
  const words = ['learn', 'create', 'innovate', 'grow'];
  const typingTarget = document.querySelector('.typing-text');

  if (typingTarget) {
    let wordIndex = 0;
    let charIndex = 0;
    let deleting = false;

    const type = () => {
      const currentWord = words[wordIndex];
      typingTarget.textContent = currentWord.slice(0, charIndex);

      if (!deleting && charIndex < currentWord.length) {
        charIndex += 1;
      } else if (deleting && charIndex > 0) {
        charIndex -= 1;
      } else {
        deleting = !deleting;
        if (!deleting) {
          wordIndex = (wordIndex + 1) % words.length;
        }
      }

      const speed = deleting ? 70 : 120;
      setTimeout(type, speed);
    };

    type();
  }
}

function initializeSlider() {
  const slides = Array.from(document.querySelectorAll('.hero-slide'));
  let slideIndex = 0;

  function showSlide(index) {
    slides.forEach((slide, i) => slide.classList.toggle('active', i === index));
  }

  if (slides.length) {
    setInterval(() => {
      slideIndex = (slideIndex + 1) % slides.length;
      showSlide(slideIndex);
    }, 5000);

    document.querySelectorAll('.slider-btn').forEach((button) => {
      button.addEventListener('click', () => {
        const direction = button.dataset.dir === 'next' ? 1 : -1;
        slideIndex = (slideIndex + direction + slides.length) % slides.length;
        showSlide(slideIndex);
      });
    });
  }
}

function initializeFAQ() {
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach((item) => {
    const button = item.querySelector('.faq-question');
    button?.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      faqItems.forEach((entry) => entry.classList.remove('active'));
      if (!isActive) item.classList.add('active');
    });
  });
}

function initializeLightbox() {
  const lightbox = document.getElementById('lightbox');
  const lightboxImage = document.getElementById('lightboxImage');

  document.querySelectorAll('.gallery-card img').forEach((img) => {
    img.addEventListener('click', () => {
      lightboxImage.src = img.src;
      lightbox.classList.add('active');
    });
  });

  lightbox?.addEventListener('click', () => lightbox.classList.remove('active'));
}

function initializeContactForm() {
  const contactForm = document.querySelector('.contact-form');
  const formMessage = document.querySelector('.form-message');
  contactForm?.addEventListener('submit', (event) => {
    event.preventDefault();
    if (formMessage) {
      formMessage.textContent = 'Thanks! Your message has been received and we will get back to you soon.';
    }
    contactForm.reset();
  });
}

function initializeScrollEffects() {
  const header = document.querySelector('.site-header');
  const backToTop = document.querySelector('.back-to-top');

  window.addEventListener('scroll', () => {
    if (header) header.classList.toggle('sticky', window.scrollY > 10);
    if (backToTop) backToTop.classList.toggle('visible', window.scrollY > 300);
  });

  backToTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

function initializeCertificateVerification() {
  const form = document.querySelector('.certificate-verify-form');
  const result = document.querySelector('.certificate-result');
  if (!form || !result) return;

  const storageData = JSON.parse(localStorage.getItem('ebgDemoData') || 'null') || demoData;

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const input = form.querySelector('input');
    const value = input.value.trim();
    const certificate = storageData.certificates.find((item) =>
      item.certificateId === value || item.verificationCode === value
    );

    if (certificate) {
      const student = storageData.users.find((u) => u.id === certificate.studentId);
      const course = storageData.courses.find((c) => c.id === certificate.courseId);
      result.innerHTML = `
        <article class="certificate-card verification-card">
          <div class="verification-header">
            <span class="logo">E</span>
            <div>
              <strong>EBG LTD</strong>
              <p>Certificate Verification</p>
            </div>
          </div>
          <div class="status-badge valid">✓ ${certificate.status}</div>
          <div class="verification-details">
            <p><strong>Name:</strong> ${student.fullName}</p>
            <p><strong>Course:</strong> ${course.title}</p>
            <p><strong>Score:</strong> ${certificate.score}%</p>
            <p><strong>Issued:</strong> ${certificate.issuedDate}</p>
            <p><strong>Certificate ID:</strong> ${certificate.certificateId}</p>
            <p><strong>Verification code:</strong> ${certificate.verificationCode}</p>
          </div>
          <div class="qr-wrapper" id="verificationQrCode"></div>
          <button class="btn btn-secondary qr-download-btn" id="downloadVerificationQr">Download QR Code</button>
        </article>
      `;

      if (window.QRCode) {
        const container = document.getElementById('verificationQrCode');
        if (container) {
          const qrText = JSON.stringify({
            certificate_id: certificate.certificateId,
            verification_code: certificate.verificationCode,
            student: student.fullName,
            course: course.title,
            issuedDate: certificate.issuedDate,
            status: certificate.status
          });
          new QRCode(container, {
            text: qrText,
            width: 220,
            height: 220,
            colorDark: '#000000',
            colorLight: '#ffffff',
            correctLevel: QRCode.CorrectLevel.H
          });
        }
      }

      document.getElementById('downloadVerificationQr')?.addEventListener('click', () => {
        const container = document.getElementById('verificationQrCode');
        const canvas = container?.querySelector('canvas');
        if (canvas) {
          const link = document.createElement('a');
          link.href = canvas.toDataURL('image/png');
          link.download = `${certificate.certificateId}-verification-QR.png`;
          link.click();
        }
      });
    } else {
      result.innerHTML = '<p>No matching certificate found.</p>';
    }
  });
}

function handleCertificateQueryParam() {
  const params = new URLSearchParams(window.location.search);
  const code = params.get('certificate') || params.get('code');
  if (!code) return;
  const input = document.querySelector('.certificate-verify-form input');
  const form = document.querySelector('.certificate-verify-form');
  if (input) input.value = code;
  if (form) form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
}

function initializeAll() {
  initializeYear();
  initializeMenuToggle();
  initializeRevealObserver();
  initializeTypingText();
  initializeSlider();
  initializeFAQ();
  initializeLightbox();
  initializeContactForm();
  initializeScrollEffects();
  initializeCertificateVerification();
  handleCertificateQueryParam();
}

document.addEventListener('componentsReady', initializeAll);

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    setTimeout(initializeAll, 0);
  });
} else {
  initializeAll();
}