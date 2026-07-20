// Basic HTML5 navigation script
(function() {
  const navSelector = '[data-nav]';
  const contentSelector = '#content';

  function supportsHtml5History() {
    return typeof window.history !== 'undefined' && typeof window.history.pushState === 'function';
  }

  function loadPage(url, addToHistory = true) {
    const contentArea = document.querySelector(contentSelector);
    if (!contentArea) {
      return;
    }

    fetch(url, {
      method: 'GET',
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to load page');
        }
        return response.text();
      })
      .then(html => {
        contentArea.innerHTML = html;
        if (addToHistory && supportsHtml5History()) {
          window.history.pushState({ url }, '', url);
        }
        setActiveNav(url);
      })
      .catch(() => {
        contentArea.innerHTML = '<p>Unable to load content.</p>';
      });
  }

  function setActiveNav(url) {
    const links = document.querySelectorAll(navSelector);
    links.forEach(link => {
      if (link.getAttribute('href') === url) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  function handleNavClick(event) {
    const link = event.target.closest(navSelector);
    if (!link) {
      return;
    }

    const url = link.getAttribute('href');
    if (!url || url.startsWith('#')) {
      return;
    }

    if (supportsHtml5History()) {
      event.preventDefault();
      loadPage(url, true);
    }
  }

  function handlePopState(event) {
    const state = event.state;
    if (state && state.url) {
      loadPage(state.url, false);
    } else {
      loadPage(window.location.pathname, false);
    }
  }

  function initNavigation() {
    document.body.addEventListener('click', handleNavClick);
    window.addEventListener('popstate', handlePopState);
    if (supportsHtml5History()) {
      window.history.replaceState({ url: window.location.pathname }, '', window.location.pathname);
    }
  }

  document.addEventListener('DOMContentLoaded', initNavigation);
})();
