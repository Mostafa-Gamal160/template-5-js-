// elements variables
let landingPage = document.querySelector(".landing");
let landingImg = document.querySelector(".landing .body .img img");
let arrowLeft = document.querySelector(".landing .body .arrowLeft");
let arrowRight = document.querySelector(".landing .body .arrowRight");
let nextSlideBtn = document.querySelector(".landing .body .arrowRight"),
  prevSlideBtn = document.querySelector(".landing .body .arrowLeft");
let gearBtn = document.querySelector(".settingBox .toggle-settings i");
let settingBox = document.querySelector(".settingBox");
let allLogos = document.querySelectorAll(".logo-img");
let allSections = document.querySelectorAll(".sec-img");
let bars = document.querySelectorAll(".skills .bar span");
let barSection = document.querySelector(".skills");
let barLabels = document.querySelectorAll(".skills .content  h3 span");
let specialBtn = document.querySelector(".special-button");

// variables
// let stateStarted = false;
let skillsStarted = false;
let currentSlide = 1;

// start sliding imgs
// make array of the img to control them
let slideImages = Array.from(document.querySelectorAll(".img-container img")),
  slideCount = slideImages.length;

// call the function when click the btn
nextSlideBtn.onclick = nextSlide;
prevSlideBtn.onclick = prevSlide;

theChecker();

// build the checker function
function theChecker() {
  // call the function of remove the active class
  removeAllActive();

  // add active to the current li and slide
  slideImages[currentSlide - 1].classList.add("active");

  // disabled and enabled  prev btn
  if (currentSlide === 1) {
    prevSlideBtn.classList.add("disabled");
  } else {
    prevSlideBtn.classList.remove("disabled");
  }

  // disabled and enabled  next btn
  if (currentSlide === slideCount) {
    nextSlideBtn.classList.add("disabled");
  } else {
    nextSlideBtn.classList.remove("disabled");
  }

  // change the color of the page
  // get the current img
  let currentActiveImg = slideImages[currentSlide - 1];

  // get the color from the current img
  let mainColor = currentActiveImg.getAttribute("data-main");
  let secColor = currentActiveImg.getAttribute("data-sec");
  let bgColor = currentActiveImg.getAttribute("data-bg");

  // apply the color to the page
  document.documentElement.style.setProperty("--main-color", mainColor);
  document.documentElement.style.setProperty("--sec-color", secColor);
  document.documentElement.style.setProperty("--background-color", bgColor);
  document.documentElement.style.setProperty("--blur-color", mainColor + "33");
  document.documentElement.style.setProperty(
    "--overlay-color",
    secColor + "33",
  );

  // change the color of the plant
  document.querySelector(".planet").style.filter =
    `drop-shadow(-10px 10px 20px ${secColor})`;

  // remove all active from logos
  allLogos.forEach((img) => img.classList.remove("active"));

  if (secColor === "#418485") {
    document.querySelector(".logo-img.green").classList.add("active");
  } else if (secColor === "#ff4101") {
    document.querySelector(".logo-img.red").classList.add("active");
  } else if (secColor === "#e67e22") {
    document.querySelector(".logo-img.orange").classList.add("active");
  } else {
    document.querySelector(".logo-img.blue").classList.add("active");
  }

  // remove all active from sections
  allSections.forEach((img) => img.classList.remove("active"));

  if (secColor === "#418485") {
    document.querySelector(".sec-img.green").classList.add("active");
  } else if (secColor === "#ff4101") {
    document.querySelector(".sec-img.red").classList.add("active");
  } else if (secColor === "#e67e22") {
    document.querySelector(".sec-img.orange").classList.add("active");
  } else {
    document.querySelector(".sec-img.blue").classList.add("active");
  }

  // change the color of the tree
  let treeImageUrl = "";

  if (secColor === "#0195ff") {
    treeImageUrl = "url('../imgs/blue tree.jpg')";
  } else if (secColor === "#ff4101") {
    treeImageUrl = "url('../imgs/red tree.jpg')";
  } else if (secColor === "#e67e22") {
    treeImageUrl = "url('../imgs/orange tree.jpg')";
  } else if (secColor === "#418485") {
    treeImageUrl = "url('../imgs/green tree.jpg')";
  }

  document.documentElement.style.setProperty("--tree-image", treeImageUrl);
}

// function for remove all active classes from the li and slide
function removeAllActive() {
  slideImages.forEach((img) => img.classList.remove("active"));
}

// build the function for the nextSlide
function nextSlide() {
  if (nextSlideBtn.classList.contains("disabled")) {
    return false;
  } else {
    currentSlide++;

    theChecker();
  }
}

// build the function for the prevSlide
function prevSlide() {
  if (prevSlideBtn.classList.contains("disabled")) {
    return false;
  } else {
    currentSlide--;

    theChecker();
  }
}
// end sliding imgs

// function of the counter
function setCount(el) {
  // get access to the goal number
  let goal = Number(el.dataset.goal);
  let unit = el.dataset.unit || "";
  let current = 0;
  // make a counter to increase the text content
  let count = setInterval(() => {
    current++;
    el.textContent = current + unit;
    // make the set interval stop when reach the goal
    if (current >= goal) {
      el.textContent = goal + unit;
      clearInterval(count);
    }
  }, 2000 / goal);
}

// handle the bars
window.addEventListener("scroll", function () {
  if (window.scrollY >= barSection.offsetTop - 280) {
    if (!skillsStarted) {
      bars.forEach((bar) => (bar.style.width = bar.dataset.width));
      // make every ele to reach the goal number
      barLabels.forEach((label) => setCount(label));
      skillsStarted = true;
    }
  }
});

// handle the special button
// make the button to appear by scrolling on page
window.onscroll = function () {
  if (this.scrollY >= 550) {
    specialBtn.classList.add("show");
  } else {
    specialBtn.classList.remove("show");
  }
};

// make it to return me to the first page
specialBtn.addEventListener("click", function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});
