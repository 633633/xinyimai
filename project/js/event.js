window.addEventListener('scroll', function() {
    var header = document.querySelector('header');
    var scrollPosition = window.scrollY || document.documentElement.scrollTop;

    if (scrollPosition > 0) {
        header.style.opacity = 0.5; 
    } else {
        header.style.opacity = 1; 
    }
});
