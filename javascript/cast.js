const images = document.querySelectorAll('.cast-member');

images.forEach(function(image) {
    image.addEventListener('mouseover', function() {
        this.style.transform = 'scale(1.1)';
    });
    image.addEventListener('mouseout', function() {
        this.style.transform = 'scale(1)';
    });
});
