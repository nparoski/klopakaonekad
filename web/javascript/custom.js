const menu = document.getElementById('menu-main');
const output = document.getElementById('menu-output');
const menuCollection = document.querySelectorAll('.menu-item');

function menuCheck(mealType){
  menuCollection.forEach(function (meal) {
    if (meal.classList.contains(mealType) === true) {
      meal.classList.remove('d-none');
    }
    else if (meal.classList.contains(mealType) === false) {
      meal.classList.add('d-none');
    }
  });
}

menu.addEventListener('click', function (e) {
  switch (e.target.id) {
    case "menu-all":
      menuCollection.forEach(function(meal){
        if(meal.classList.contains("menu-item") == true){
          meal.classList.remove('d-none');
        }
      });
    break;
    case "menu-cooked":
      menuCheck('menu-cooked');
    break;
    case "menu-baked":
      menuCheck('menu-baked');
    break;
    case "menu-side-dish":
      menuCheck('menu-side-dish');
    break;
    case "menu-dessert":
      menuCheck('menu-dessert');
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