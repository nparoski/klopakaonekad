const menuControls = document.getElementById('menu-controls');
const output = document.getElementById('menu-output');
const menuCollection = document.querySelectorAll('.menu-item');

function menuFilter(mealCategory){
  menuCollection.forEach(function (meal) {
    if (meal.classList.contains(mealCategory) === true) {
      meal.classList.remove('d-none');
    }
    else if (meal.classList.contains(mealCategory) === false) {
      meal.classList.add('d-none');
    }
  });
}

menuControls.addEventListener('click', function (e) {
  switch (e.target.id) {
    case "menu-all":
      menuCollection.forEach(function(meal){
        if(meal.classList.contains("menu-item") === true){
          meal.classList.remove('d-none');
        }
      });
    break;
    case "menu-cooked":
      menuFilter('menu-cooked');
    break;
    case "menu-baked":
      menuFilter('menu-baked');
    break;
    case "menu-side-dish":
      menuFilter('menu-side-dish');
    break;
    case "menu-dessert":
      menuFilter('menu-dessert');
    break;
    default:
      
  }
});

// maps
function initMap() {
  var klopakaokodkuce = { lat: 45.2476600, lng: 19.8251806 };
  var map = new google.maps.Map(document.getElementById('map'),{ 
      center: klopakaokodkuce, 
      zoom: 17
  });
}

// gallery-lightbox
const gallery = document.getElementById('gallery-main');
const carouselInner = document.getElementById('carousel-inner');

gallery.addEventListener('click', function(e){
  let clickedImg;
  if (e.target.classList.contains('gallery-item--overlay')){
    clickedImg = e.target.nextElementSibling.src
  }
  else if(!e.target.classList.contains('gallery-item--overlay')){
    clickedImg = e.target.parentElement.nextElementSibling.src
  }

  Array.from(carouselInner.children).forEach(function (item) {
    if(item.classList.contains('active')){
      item.classList.remove('active')
    }
    if (clickedImg === item.firstElementChild.src){
      item.classList.add('active')
    }
  })
})
// smooth scrolling
$(document).ready(function () {
  $("#navbarSupportedContent a").on('click', function (e) {
    if (this.hash !== "") {
      e.preventDefault();
      let hash = this.hash;
      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 800, function () {
        window.location.hash = hash;
      });
    }
  });
});

// to top btn
const toTopBtn = document.getElementById('to-top-btn');
// scrolls to top
toTopBtn.addEventListener("click",function(){
  $('html, body').animate({
    scrollTop: 0
  }, 800, function () {
  });
})
// checks browser size and decides weather or not to display to top button
window.addEventListener("scroll",function(){
  if (window.pageYOffset >= 400) {
    toTopBtn.classList.add('d-block')
  }
  else
    toTopBtn.classList.remove('d-block')
})