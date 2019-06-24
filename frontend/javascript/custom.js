const menuControls = document.getElementById("menu-controls");
const output = document.getElementById("menu-output");
const menuCollection = document.querySelectorAll(".menu-item");

// Filters menu dishes to parameter and swaps menu control button classes with 'swapMenuBtnClasses()'
function menuFilter(mealCategory) {
  swapMenuBtnClasses(mealCategory);

  menuCollection.forEach(function(meal) {
    if (meal.classList.contains(mealCategory) === true) {
      meal.classList.remove("d-none");
    } else if (meal.classList.contains(mealCategory) === false) {
      meal.classList.add("d-none");
    }
  });
}

// Swaps btn-primary and btn-outline-primary classes on menu control buttons
function swapMenuBtnClasses(buttonId) {
  let button = document.getElementById(buttonId);

  if (button.classList.contains("btn-outline-primary")) {
    button.classList.add("btn-primary");
    button.classList.remove("btn-outline-primary");
  }
}

menuControls.addEventListener("click", function(e) {
  // Resets classes on menu control buttons whenever u click on menu control button
  if (e.target.id !== "menu-controls") {
    Array.from(menuControls.children).forEach(function(button) {
      button.classList.remove("btn-primary");
      button.classList.add("btn-outline-primary");
    });
  }

  switch (e.target.id) {
    case "menu-all":
      swapMenuBtnClasses("menu-all");
      menuCollection.forEach(function(meal) {
        if (meal.classList.contains("menu-item") === true) {
          meal.classList.remove("d-none");
        }
      });
      break;
    case "menu-cooked":
      menuFilter("menu-cooked");
      break;
    case "menu-baked":
      menuFilter("menu-baked");
      break;
    case "menu-side-dish":
      menuFilter("menu-side-dish");
      break;
    case "menu-dessert":
      menuFilter("menu-dessert");
      break;
    default:
  }
});

// maps
// function initMap() {
//   var koddzona = { lat: 45.2499033, lng: 19.8334929 };
//   var map = new google.maps.Map(document.getElementById("map"), {
//     center: koddzona,
//     zoom: 17
//   });
//   var marker = new google.maps.Marker({
//     position: koddzona,
//     map: map,
//     title: "Kod Dzona"
//   });
// }

// gallery-lightbox
const gallery = document.getElementById("gallery-main");
const modalCarouselInner = document.getElementById("modal-carousel-inner");

gallery.addEventListener("click", function(e) {
  let clickedImg;
  if (e.target.classList.contains("gallery-item--overlay")) {
    clickedImg = e.target.nextElementSibling.src;
  } else if (!e.target.classList.contains("gallery-item--overlay")) {
    clickedImg = e.target.parentElement.nextElementSibling.src;
  }

  Array.from(modalCarouselInner.children).forEach(function(item) {
    if (item.classList.contains("active")) {
      item.classList.remove("active");
    }
    if (clickedImg === item.firstElementChild.src) {
      item.classList.add("active");
    }
  });
});
// smooth scrolling
$(document).ready(function() {
  $(".smooth-scroll").on("click", function(e) {
    if (this.hash !== "") {
      e.preventDefault();
      let hash = this.hash;
      $("html, body").animate(
        {
          scrollTop: $(hash).offset().top
        },
        800,
        function() {
          window.location.hash = hash;
        }
      );
    }
  });
});

// to top btn
const toTopBtn = document.getElementById("to-top-btn");
// scrolls to top
toTopBtn.addEventListener("click", function() {
  $("html, body").animate(
    {
      scrollTop: 0
    },
    800,
    function() {}
  );
});
// checks browser size and decides weather or not to display to top button
window.addEventListener("scroll", function() {
  if (window.pageYOffset >= 400) {
    toTopBtn.classList.add("d-block");
  } else toTopBtn.classList.remove("d-block");
});

function createGalleryItem(imageTitle, imageSrc, imageAlt) {
  const galleryMain = document.getElementById("gallery-main");

  let galleryItem = document.createElement("div");
  galleryItem.classList.add(
    "gallery-item",
    "font-primary",
    "col-6",
    "col-md-3"
  );

  let galleryItemOverlay = document.createElement("div");
  galleryItemOverlay.classList.add(
    "gallery-item--overlay",
    "d-flex",
    "justify-content-center",
    "align-items-center"
  );
  galleryItemOverlay.setAttribute("data-toggle", "modal");
  galleryItemOverlay.setAttribute("data-target", ".gallery-modal");
  galleryItem.appendChild(galleryItemOverlay);

  let galleryItemOverlayText = document.createElement("h1");
  galleryItemOverlayText.textContent = `${imageTitle}`;
  galleryItemOverlayText.classList.add("h3");
  galleryItemOverlay.appendChild(galleryItemOverlayText);

  let galleryItemImage = document.createElement("img");
  galleryItemImage.classList.add("d-block", "w-100");
  galleryItemImage.setAttribute("src", `${imageSrc}`);
  galleryItemImage.setAttribute("alt", `${imageAlt}`);
  galleryItem.appendChild(galleryItemImage);

  galleryMain.appendChild(galleryItem);
}

function createModalItem(imageCaption, imageSrc, imageAlt) {
  let carouselItem = document.createElement("div");
  carouselItem.classList.add("carousel-item");

  let carouselItemImage = document.createElement("img");
  carouselItemImage.setAttribute("src", `${imageSrc}`);
  carouselItemImage.setAttribute("alt", `${imageAlt}`);
  carouselItemImage.classList.add("d-block", "w-100");
  carouselItem.appendChild(carouselItemImage);

  let carouselItemCaption = document.createElement("div");
  carouselItemCaption.classList.add("carousel-caption");
  carouselItem.appendChild(carouselItemCaption);

  let carouselItemCaptionText = document.createElement("p");
  carouselItemCaptionText.classList.add("m-2");
  carouselItemCaptionText.textContent = `${imageCaption}`;
  carouselItemCaption.appendChild(carouselItemCaptionText);

  modalCarouselInner.appendChild(carouselItem);
}

// const galleryShowHideBtn = document.getElementById("gallery-show-hide-btn");
// let galleryBtnState = false;
// galleryShowHideBtn.addEventListener("click", function() {
//   if (galleryBtnState === false) {
//     fetch("../images.json")
//       .then(response => {
//         return response.json();
//       })
//       .then(data => {
//         // Work with JSON data here
//         data.images.forEach(function(image) {
//           createGalleryItem(image.title, image.src, image.alt);
//           createModalItem(image.caption, image.src, image.alt);
//         });
//       })
//       .catch(err => {
//         console.log(
//           "There was an error loading .json file, please try again..<br>"
//         );
//       });
//     galleryShowHideBtn.textContent = "Prikaži manje";
//     galleryBtnState = true;
//   } else {
//     let reverseModal = Array.from(modalCarouselInner.children).reverse();
//     let reverseGallery = Array.from(gallery.children).reverse();

//     fetch("../images.json")
//       .then(response => {
//         return response.json();
//       })
//       .then(data => {
//         // Work with JSON data here
//         data.images.forEach(function(image, index, arr) {
//           gallery.removeChild(reverseGallery[index]);
//           modalCarouselInner.removeChild(reverseModal[index]);
//         });
//       })
//       .catch(err => {
//         console.log(err);
//       });
//     gallery.scrollIntoView();
//     galleryShowHideBtn.textContent = "Prikaži više";
//     galleryBtnState = false;
//   }
// });
