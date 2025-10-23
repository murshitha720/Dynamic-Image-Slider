const images = [
 "https://play-lh.googleusercontent.com/v1KolmfvYB33ui5BT4gGuGTNsDorNOTAKNLdFqoDMNdpDBV1bOcIktfwx65ntJqrmg=w526-h296-rw",
  "https://static.vecteezy.com/system/resources/thumbnails/023/817/597/small/beautiful-islamic-mosque-landscape-crescent-moon-background-illustration-photo.jpg",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnxzAgO-SIeJzKPkcEUnF27pLz_qythjfAkZ1oZQr4DjPRxe2IF5lJ2_H_d3OUDCGVj-8&usqp=CAU",
  "https://static.vecteezy.com/system/resources/thumbnails/060/060/403/small_2x/mosque-illuminating-hillside-under-night-sky-with-stars-and-crescent-moon-photo.jpg",
  "https://static.vecteezy.com/system/resources/thumbnails/022/717/619/small_2x/3d-illustration-of-amazing-architecture-design-of-muslim-mosque-ramadan-concept-illustration-of-amazing-architecture-design-of-muslim-mosque-ramadan-concept-generate-ai-free-photo.jpg" 
// Image URLs
];

const slider = document.getElementById("slider");
const dotsContainer = document.getElementById("dots");

// Add images dynamically + clone first & last for seamless looping
images.forEach((url) => {
  const img = document.createElement("img");
  img.src = url;
  slider.appendChild(img);
});
const firstClone = slider.children[0].cloneNode(true);
const lastClone = slider.children[images.length - 1].cloneNode(true);
slider.insertBefore(lastClone, slider.children[0]);
slider.appendChild(firstClone);

// Initialize index
let index = 1;
let isTransitioning = false;
slider.style.transform = `translateX(-${index * 100}%)`;

// Add dots
images.forEach((_, i) => {
  const dot = document.createElement("span");
  dot.classList.add("dot");
  if (i === 0) dot.classList.add("active");
  dot.addEventListener("click", () => goToSlide(i + 1));
  dotsContainer.appendChild(dot);
});
const dots = document.querySelectorAll(".dot");

// Function to move slides
function goToSlide(newIndex) {
  if (isTransitioning) return;
  isTransitioning = true;

  slider.style.transition = "transform 0.8s ease-in-out";
  index = newIndex;
  slider.style.transform = `translateX(-${index * 100}%)`;

  // Update dots
  updateDots();

  setTimeout(() => {
    if (index === 0) {
      slider.style.transition = "none";
      index = images.length;
      slider.style.transform = `translateX(-${index * 100}%)`;
    }
    if (index === images.length + 1) {
      slider.style.transition = "none";
      index = 1;
      slider.style.transform = `translateX(-${index * 100}%)`;
    }
    isTransitioning = false;
  }, 900);
}

function updateDots() {
  dots.forEach((dot) => dot.classList.remove("active"));
  let activeIndex = index - 1;
  if (activeIndex === images.length) activeIndex = 0;
  if (activeIndex < 0) activeIndex = images.length - 1;
  dots[activeIndex].classList.add("active");
}

// Buttons
document.getElementById("next").addEventListener("click", () => goToSlide(index + 1));
document.getElementById("prev").addEventListener("click", () => goToSlide(index - 1));

// Auto Slide
let autoSlide = setInterval(() => goToSlide(index + 1), 4000);

// Pause on hover
const container = document.querySelector(".slider-container");
container.addEventListener("mouseenter", () => clearInterval(autoSlide));
container.addEventListener("mouseleave", () => {
  autoSlide = setInterval(() => goToSlide(index + 1), 4000);
});
