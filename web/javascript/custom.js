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