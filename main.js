// header--------------------------------------------------

let burger = document.querySelector(".burger");
let menu = document.querySelector(".menu");
let a = menu.querySelectorAll("ul > li > a");

burger.addEventListener("click", () => {
  burger.classList.toggle("burger-active");
  menu.classList.toggle("menu-active");
  document.body.classList.toggle("_lock");
});

a.forEach((el) =>
  el.addEventListener("click", (event) => {
    let id = event.currentTarget.dataset.scroll;
    let toScrollElem = document.querySelector("#" + id);
    toScrollElem.scrollIntoView({ block: "start", behavior: "smooth" });
    burger.classList.remove("burger-active");
    menu.classList.remove("menu-active");
    document.body.classList.remove("_lock");
  })
);

// slider---------------------------------------------------------

let position = 0;
const leftArrow = document.querySelector(".left-arrow");
const rightArrow = document.querySelector(".right-arrow");
const slider = document.querySelector(".slider");
const items = document.querySelectorAll(".item");
let sliderIndicator = document.querySelector(".slider-indicator");
let sliderIndicatorElementsArray = [];

items.forEach(() => {
  let li = document.createElement("li");
  li.classList.add("slider-indicator-element");
  sliderIndicator.append(li);
  sliderIndicatorElementsArray.push(li);
});

let sliderIndicatorElements = document.querySelectorAll(
  ".slider-indicator-element"
);
sliderIndicatorElements[position].classList.add("active");

rightArrow.addEventListener("click", () => {
  sliderIndicatorElements[Math.abs(position)].classList.remove("active");
  position = position >= items.length - 1 ? 0 : position + 1;
  sliderIndicatorElements[Math.abs(position)].classList.add("active");
  slider.style.transform = `translateX(${-position * slider.offsetWidth}px)`;
});

leftArrow.addEventListener("click", () => {
  sliderIndicatorElements[Math.abs(position)].classList.remove("active");
  position = position === 0 ? items.length - 1 : position - 1;
  sliderIndicatorElements[Math.abs(position)].classList.add("active");
  slider.style.transform = `translateX(${-position * slider.offsetWidth}px)`;
});

sliderIndicator.addEventListener("click", (event) => {
  if (event.target.tagName != "LI") return;
  sliderIndicatorElements[Math.abs(position)].classList.remove("active");
  position = sliderIndicatorElementsArray.indexOf(event.target);
  sliderIndicatorElements[Math.abs(position)].classList.add("active");
  slider.style.transform = `translateX(${-position * slider.offsetWidth}px)`;
});

function autoSlider() {
  sliderIndicatorElements[Math.abs(position)].classList.remove("active");
  position = position >= items.length - 1 ? 0 : position + 1;
  sliderIndicatorElements[Math.abs(position)].classList.add("active");
  slider.style.transform = `translateX(${-position * slider.offsetWidth}px)`;
}

setInterval(autoSlider, 3000);

// tabs functions------------------------------------

function tabs(event) {
  let objects = getObjects(event);

  if (window.matchMedia("(min-width: 767px)").matches) {
    mainTabsTogglePc(objects);
  } else {
    if (objects.eventCurrentTarget.classList.contains("tab-active")) {
      closeTab(objects);
      if (objects.tabPosition == "main-tab") {
        mainRemoveIcons(objects);
      }
      if (
        objects.eventCurrentTarget.classList.contains("testimoanials-title")
      ) {
        footerSliderArrowsRemove(objects);
      }
    } else {
      openTab(objects);
      if (objects.tabPosition == "main-tab") {
        mainAddIcons(objects);
      }
      if (
        objects.eventCurrentTarget.classList.contains("testimoanials-title")
      ) {
        footerSliderArrowsAdd(objects);
      }
    }
  }
}

function getObjects(event) {
  let eventCurrentTarget = event.currentTarget;
  let id = eventCurrentTarget.dataset.tabid;
  let tabPosition = id.replace(`${id[id.length - 1]}`, "");
  let order = id[id.length - 1];

  let tabsItems = document.querySelectorAll(`.${tabPosition}-item`);
  let tabsContent = document.querySelectorAll(`.${tabPosition}-content`);
  let closeArrows = document.querySelectorAll(".close-arrow");
  let icons = document.querySelectorAll(".icon");
  let activeIcon = document.querySelector("#icon-" + id);
  let activeCloseArrow = document.querySelector("#arrow-" + id);
  let activeContetnItem = document.querySelector("#" + id);
  let footerSliderArrows = document.querySelector(".slider-arrows-counteiner");

  return {
    eventCurrentTarget,
    id,
    tabPosition,
    order,
    tabsItems,
    tabsContent,
    closeArrows,
    icons,
    activeIcon,
    activeCloseArrow,
    activeContetnItem,
    footerSliderArrows,
  };
}

function mainTabsTogglePc({
  tabsItems,
  tabsContent,
  icons,
  eventCurrentTarget,
  activeIcon,
  order,
  activeContetnItem,
}) {
  tabsItems.forEach((el) => el.classList.remove("tab-active"));
  tabsContent.forEach((el) => el.classList.remove("content-active"));
  for (i = 0; i < icons.length; i++) {
    icons[i].classList.remove("icon-active" + [i + 1]);
  }
  eventCurrentTarget.classList.add("tab-active");
  activeIcon.classList.add("icon-active" + [order]);
  activeContetnItem.classList.add("content-active");
}

function closeTab({ eventCurrentTarget, activeCloseArrow, activeContetnItem }) {
  eventCurrentTarget.classList.remove("tab-active");
  activeCloseArrow.classList.remove("close-arrow-active");
  activeContetnItem.style.height = "";
}

function mainRemoveIcons({ activeIcon, order }) {
  activeIcon.classList.remove("icon-active" + [order]);
}

function openTab({
  tabsItems,
  tabsContent,
  closeArrows,
  eventCurrentTarget,
  activeCloseArrow,
  activeContetnItem,
}) {
  tabsItems.forEach((el) => el.classList.remove("tab-active"));
  tabsContent.forEach((el) => (el.style.height = ""));
  closeArrows.forEach((el) => el.classList.remove("close-arrow-active"));
  eventCurrentTarget.classList.add("tab-active");
  activeCloseArrow.classList.add("close-arrow-active");
  activeContetnItem.style.height = activeContetnItem.scrollHeight + "px";
}

function mainAddIcons({ icons, activeIcon, order }) {
  for (i = 0; i < icons.length; i++) {
    icons[i].classList.remove("icon-active" + [i + 1]);
  }
  activeIcon.classList.add("icon-active" + [order]);
}

function footerSliderArrowsAdd({ footerSliderArrows }) {
  setTimeout(() => {
    footerSliderArrows.classList.add("slider-arrow-active");
  }, 290);
}

function footerSliderArrowsRemove({ footerSliderArrows }) {
  footerSliderArrows.classList.toggle("slider-arrow-active");
}
// function mainTabsOptions(eventCurrentTarget, id) {
//     eventCurrentTarget.classList.add(id+'-active')
//     eventCurrentTarget.scrollIntoView({block: "start", behavior: "smooth"})
// }

// main Tabs============================================

let mainTabsItems = document.querySelectorAll(".main-tab-item");
let tabsContent = document.querySelectorAll(".main-tab-content");

if (window.matchMedia("(min-width: 767px)").matches) {
  mainTabsItems[0].classList.add("tab-active");
  tabsContent[0].classList.add("content-active");
}

mainTabsItems.forEach((el) => el.addEventListener("click", tabs));

// footer-slider==================================================

let footerLeftArrow = document.querySelector(".footer-left-arrow");
let footerRightArrow = document.querySelector(".footer-right-arrow");
let footerSlider = document.querySelector(".footer-slider");
let footerSliderItems = document.querySelectorAll(".footer-slider-item");
let footerPosition = 0;

footerRightArrow.addEventListener("click", () => {
  if (Math.abs(footerPosition) >= footerSliderItems.length - 1) {
    footerPosition = 0;
  } else {
    footerPosition -= 1;
  }
  footerSlider.style.transform = `translateX(${
    footerPosition * footerSlider.offsetWidth
  }px)`;
});

footerLeftArrow.addEventListener("click", () => {
  if (footerPosition == 0) {
    footerPosition = -3;
  } else {
    footerPosition += 1;
  }
  footerSlider.style.transform = `translateX(${
    footerPosition * footerSlider.offsetWidth
  }px)`;
});

// footer adaptive========================================

let footerTitle = document.querySelectorAll(".title-counteiner");

if (window.matchMedia("(max-width: 767px)").matches) {
  footerTitle.forEach((item) => item.addEventListener("click", tabs));
}
