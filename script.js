// Dark/light mode toggle with localStorage
const themeToggleBtn = document.getElementById('theme-toggle');

function applyTheme(theme) {
  if (theme === 'dark') {
    document.body.classList.add('dark-mode');
  } else {
    document.body.classList.remove('dark-mode');
  }
}

function loadTheme() {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    applyTheme(savedTheme);
  }
}
loadTheme();

themeToggleBtn.addEventListener('click', () => {
  const isDark = document.body.classList.toggle('dark-mode');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

// Accessibility menu toggle
const accessibilityToggle = document.getElementById('accessibility-toggle');
const accessibilityPanel = document.getElementById('accessibility-panel');

accessibilityToggle.addEventListener('click', () => {
  const expanded = accessibilityToggle.getAttribute('aria-expanded') === 'true';
  accessibilityToggle.setAttribute('aria-expanded', String(!expanded));
  if (expanded) {
    accessibilityPanel.hidden = true;
  } else {
    accessibilityPanel.hidden = false;
  }
});

// Accessibility toggles buttons
const contrastBtn = document.getElementById('toggle-contrast');
const largeTextBtn = document.getElementById('toggle-large-text');
const reduceMotionBtn = document.getElementById('toggle-reduce-motion');

function updateToggleButton(button, enabled) {
  button.setAttribute('aria-pressed', enabled ? 'true' : 'false');
}

function applyAccessibilitySettings(settings) {
  document.body.classList.toggle('high-contrast', settings.highContrast);
  document.body.classList.toggle('large-text', settings.largeText);
  document.body.classList.toggle('reduce-motion', settings.reduceMotion);

  updateToggleButton(contrastBtn, settings.highContrast);
  updateToggleButton(largeTextBtn, settings.largeText);
  updateToggleButton(reduceMotionBtn, settings.reduceMotion);
}

function loadAccessibilitySettings() {
  const savedSettings = localStorage.getItem('accessibilitySettings');
  if (savedSettings) {
    try {
      return JSON.parse(savedSettings);
    } catch {
      return {
        highContrast: false,
        largeText: false,
        reduceMotion: false,
      };
    }
  } else {
    return {
      highContrast: false,
      largeText: false,
      reduceMotion: false,
    };
  }
}

let accessibilitySettings = loadAccessibilitySettings();
applyAccessibilitySettings(accessibilitySettings);

function saveAccessibilitySettings() {
  localStorage.setItem('accessibilitySettings', JSON.stringify(accessibilitySettings));
}

// Toggle handlers
contrastBtn.addEventListener('click', () => {
  accessibilitySettings.highContrast = !accessibilitySettings.highContrast;
  applyAccessibilitySettings(accessibilitySettings);
  saveAccessibilitySettings();
});
largeTextBtn.addEventListener('click', () => {
  accessibilitySettings.largeText = !accessibilitySettings.largeText;
  applyAccessibilitySettings(accessibilitySettings);
  saveAccessibilitySettings();
});
reduceMotionBtn.addEventListener('click', () => {
  accessibilitySettings.reduceMotion = !accessibilitySettings.reduceMotion;
  applyAccessibilitySettings(accessibilitySettings);
  saveAccessibilitySettings();
});

// Smooth scrolling for nav links
document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    e.preventDefault();
    const targetId = anchor.getAttribute('href').substring(1);
    const target = document.getElementById(targetId);
    if (target) {
      target.focus({ preventScroll: true }); // for accessibility: move focus to section
      window.scrollTo({
        top: target.offsetTop,
        behavior: 'smooth'
      });
    }
  });
});

// Custom scroll reveal animation
function revealOnScroll() {
  const reveals = document.querySelectorAll('.reveal');
  const windowHeight = window.innerHeight;
  const revealPoint = 120;

  reveals.forEach(el => {
    const elementTop = el.getBoundingClientRect().top;

    if (elementTop < windowHeight - revealPoint) {
      el.classList.add('active');
    } else {
      el.classList.remove('active');
    }
  });
}

// Initial call and event listener
window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// Apply styles to allow scrolling but hide scrollbar visually
document.documentElement.style.overflow = 'auto';
document.documentElement.style.scrollbarWidth = 'none'; // Firefox

const style = document.createElement('style');
style.innerHTML = `
  html::-webkit-scrollbar {
    width: 0px !important;
    background: transparent !important;
  }
`;
document.head.appendChild(style);
