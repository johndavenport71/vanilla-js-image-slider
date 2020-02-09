const controller = {
  slides: [],
  currentSlide: 0,
  translateAmt: 0,
  maxTranslateAmt: 0,
  getNextSlide: function() {
    let nextSlide = controller.currentSlide + 1;
    if(nextSlide >= controller.slides.length) {
      nextSlide = 0;
    }
    controller.currentSlide = nextSlide;
    
    const wrapper = document.getElementById('slide-wrapper');

    if(nextSlide === 0) {
      controller.translateAmt = 0;
    } else {
      controller.translateAmt += -document.querySelector('.slide').clientWidth;
    }
    wrapper.style.transform = `translateX(${controller.translateAmt}px)`;
  },
  getPrevSlide: function() {
    let prevSlide = controller.currentSlide - 1;
    const wrapper = document.getElementById('slide-wrapper');

    if(prevSlide < 0) {
      wrapper.style.transform = `translateX(-${controller.maxTranslateAmt}px)`;
      prevSlide = controller.slides.length - 1;
    } else if (controller.currentSlide === controller.slides.length - 1) {
      controller.translateAmt = (document.querySelector('.slide').clientWidth - controller.maxTranslateAmt);
      wrapper.style.transform = `translateX(${controller.translateAmt}px)`;
    } else {
      controller.translateAmt += document.querySelector('.slide').clientWidth;
      wrapper.style.transform = `translateX(${controller.translateAmt}px)`;
    }

    controller.currentSlide = prevSlide;
  },
  setMaxTranslate: function() {
    controller.maxTranslateAmt = document.querySelector('.slide').clientWidth * (controller.slides.length - 1);
  }
};

function sliderInit(el, images) {
  const slideContainer = document.createElement('div');
  slideContainer.setAttribute('id', 'slider');
  document.querySelector(el).after(slideContainer);
  const slideWrapper = document.createElement('div');
  slideWrapper.setAttribute('id', 'slide-wrapper');
  slideContainer.append(slideWrapper);
  images.map((img, i) => {
    new Image().src = img.src;
    controller.slides.push(document.createElement('div'));
    controller.slides[i].setAttribute('class', 'slide');
    controller.slides[i].style.backgroundImage = `url(${img.src})`;
    slideWrapper.append(controller.slides[i]);
  });

  const prevButton = document.createElement('img');
  setAttributes(prevButton, {"id": "prev-button", "src": "assets/prev.png", "alt": "previous image"});
  const nextButton = document.createElement('img');
  setAttributes(nextButton, {"id": "next-button", "src": "assets/next.png", "alt": "next image"});
  slideContainer.append(prevButton);
  slideContainer.append(nextButton);

  controller.setMaxTranslate();

  nextButton.onclick = controller.getNextSlide;
  prevButton.onclick = controller.getPrevSlide;

  window.addEventListener('resize', controller.setMaxTranslate);

}

function setAttributes(elem, attr) {
  for(let key in attr) {
    elem.setAttribute(key, attr[key]);
  }
}