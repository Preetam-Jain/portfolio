document.addEventListener('DOMContentLoaded', (event) => {
  const nav = document.querySelector('.nav-background');

  function getNavOffset() {
      return nav.getBoundingClientRect().top + window.scrollY;
  }

  window.addEventListener('scroll', function() {
    let navTopOffset = getNavOffset();
    if (window.scrollY >= navTopOffset) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  });
});
  
  function toggleContent(contentId) {
    let contentElement = document.getElementById(contentId);
    contentElement.style.display = (contentElement.style.display === 'none' ? 'block' : 'none');
  }