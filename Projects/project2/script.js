document.addEventListener('DOMContentLoaded', () => {
  const albums = document.querySelectorAll('.gallery');
  const navButtons = document.querySelectorAll('nav button');
  let currentSlide = 0;
  let interval;

  const changeSlide = (direction) => {
    const activeAlbum = document.querySelector('.gallery:not(.hidden)');
    const slides = activeAlbum.querySelectorAll('.slide');
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + direction + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
  };

  const startSlideshow = () => {
    stopSlideshow();
    interval = setInterval(() => changeSlide(1), 3000);
  };

  const stopSlideshow = () => clearInterval(interval);

  navButtons.forEach((button) => {
    button.addEventListener('click', () => {

      albums.forEach((album) => album.classList.add('hidden'));
      
      const selectedAlbum = document.getElementById(button.dataset.album);
      selectedAlbum.classList.remove('hidden');

      currentSlide = 0;
      startSlideshow();
    });
  });

  albums.forEach((album) => {
    const leftArrow = album.querySelector('.arrow.left');
    const rightArrow = album.querySelector('.arrow.right');

    leftArrow.addEventListener('click', () => {
      stopSlideshow();
      changeSlide(-1);
    });

    rightArrow.addEventListener('click', () => {
      stopSlideshow();
      changeSlide(1);
    });

    album.addEventListener('mouseenter', stopSlideshow);
    album.addEventListener('mouseleave', startSlideshow);
  });

  albums[0].classList.remove('hidden');
  startSlideshow();
});
