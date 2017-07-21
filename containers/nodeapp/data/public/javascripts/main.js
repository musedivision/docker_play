$(document).ready(function () {


  // loading animation
  // check everything loaded then untrigger loading
  var isHome = $('#index-swiper')
  if(isHome.length === 0){
    load()
  }
  load();
  // checks right amount images preloaded before loading
  function allLazyLoaded(){
    if(!isNaN(this.count)) {
      this.count++
    } else {
      this.count = 1
    }
    console.log(this.count)
    if(this.count > 4){
      load()
    }
  }


  // is there sortable stuff
  var isSort = $( ".sortable" )
  if(isSort.length > 0) {
    $( ".sortable" ).sortable();
    checkOrder()
    removeImage()
    showNewProject()
    editProject()
  }



  // hiding scroll bar - scrollable divs FIX
  scrollHide()

  //initialize swiper sliders for
  // INDEX
  var indexSwiper = new Swiper ('#index-swiper', {
    // Optional parameters
    direction: 'horizontal',
    autoplay: 4000,
    autoplayDisableOnInteraction: false,
    speed: 1400,
    loop: true,
    effect: "fade",
    // lazyLoading
    lazyLoadingInPrevNext: true,
    lazyLoadingInPrevNextAmount: 2,
    onLazyImageReady: function(){
      allLazyLoaded()
    },
    preloadImages: false,
    lazyLoading: true,
    // buttons
    nextButton: '.swiper-button-next',
    prevButton: '.swiper-button-prev',
  })

  // PROJECT PAGES
  var projectSwiper = new Swiper ('#project-swiper', {
    // Optional parameters
    direction: 'vertical',
    mousewheelControl: true,
    loop: false,
    effect: "slide",
    speed: 500,
    // lazyLoading
    lazyLoadingInPrevNext: true,
    preloadImages: false,
    lazyLoading: true,
    // buttons
    nextButton: '.swiper-button-next',
    prevButton: '.swiper-button-prev',
  })
});
