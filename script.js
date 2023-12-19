document.addEventListener('DOMContentLoaded', (event) => {
    const nav = document.querySelector('.nav-background');
    const navTopOffset = nav.getBoundingClientRect().top;
  
    window.addEventListener('scroll', function() {
      if (window.scrollY >= navTopOffset) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    });
  });
  