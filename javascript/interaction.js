// d for dark mode, l for light mode.
//var colorScheme = getComputedStyle(document.body,':after').content;

//detect if user dark mode
const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;

/*function isDarkModeEnabled() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return true;
    } else {
      return false;
    }
  } */


  const images = document.querySelectorAll('.cast-member');

  images.forEach(function(image) {
    image.addEventListener('mouseover', function() {
      this.style.transform = 'scale(1.1)';
    });
    image.addEventListener('mouseout', function() {
      this.style.transform = 'scale(1)';
    });
  });