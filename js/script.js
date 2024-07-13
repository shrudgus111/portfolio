const plane = document.querySelector("#plane");
const socialMediaIcons = document.querySelectorAll(".social-media");
const portfolioImg = document.querySelector("#portfolio");
const dolphin = document.querySelector("#dolphin");
const banner = document.querySelector(".banner");
const bannerText = document.querySelector("#banner-text");
const title = document.querySelector(".title");
const subtitle = document.querySelector(".subtitle");
const sns = document.querySelector(".sns");
const leftDolphin = document.querySelector("#dolphin2");

anime.set(leftDolphin, {
  scaleX: -1,
  opacity: 0 });


function splitChars(el) {
  const text = el.innerText;
  el.innerHTML = "";
  const chars = text.split("");
  chars.map(character => {
    const span = document.createElement("span");
    if (character == " ") {
      span.classList.add("space");
    }
    span.innerText = character;
    el.appendChild(span);
  });
}

splitChars(title);
splitChars(subtitle);


anime({
  targets: [plane],
  translateX: ["100vw", "-10"],
  easing: "easeInCubic",
  duration: 8 * 1000 });


const tl = anime.timeline();

tl.
add({
  targets: dolphin,
  translateY: "-7rem",
  translateX: "8rem",
  opacity: 1,
  delay: 200,
  duration: 600,
  easing: "easeOutSine",
  begin: () => {
    bannerText.innerText = "모두!";
  },
  complete: () => {
    bannerText.innerText = "준비됐으면!";
  } }).

add({
  targets: dolphin,
  translateY: 0,
  translateX: "+=20rem",
  rotate: 60,
  opacity: 0,
  duration: 1000,
  easing: "easeInSine",
  begin: () => {
    bannerText.innerText = "내 신호에 따라!";
  } },
'-=300').
add({
  targets: socialMediaIcons,
  translateY: "82vh",
  translateX: ["75vw", "65vw"],
  opacity: 1,
  delay: anime.stagger(300, {
    start: 2.5 * 1000,
    from: "last" }),

  duration: 600,
  easing: "spring(1, 100, 9, 0)",
  begin: () => {
    setTimeout(() => {
      bannerText.innerText = "점프!!";
    }, 2000);
  } }).

add({
  targets: bannerText,
  "font-size": "5rem",
  easing: "linear",
  duration: 100,
  easing: "easeOutQuart" }).

add(
{
  targets: portfolioImg,
  translateX: ["-15vw", "-40vw"],
  translateY: ["-10vh", "60vh"],
  opacity: 1,
  duration: 800,
  easing: "spring(1, 100, 50, 10)",
  complete: () => {
    banner.remove();
  } },

6.5 * 1000).

add({
  targets: leftDolphin,
  translateY: "-=7vh",
  translateX: "22rem",
  opacity: 1,
  delay: 200,
  duration: 600,
  easing: "easeOutSine" }).

add({
  targets: leftDolphin,
  translateY: "10vh",
  translateX: "+=20rem",
  opacity: 0,
  rotate: 30,
  duration: 300,
  easing: "easeOutSine" },
'-=200').
add(
{
  targets: portfolioImg,
  translateX: 0,
  translateY: 0,
  duration: 1000,
  easing: "easeOutElastic" },

"-=200").

add({
  targets: title.querySelectorAll("span"),
  translateY: [100, 0],
  translateZ: 0,
  opacity: [0, 1],
  easing: "easeOutExpo",
  duration: 1400,
  delay: anime.stagger(30) }).

add(
{
  targets: subtitle.querySelectorAll("span"),
  opacity: 1,
  easing: "easeOutExpo",
  duration: 700,
  delay: anime.stagger(20, {
    from: "center" }) },


"-=100").

add({
  targets: portfolioImg,
  rotate: "1turn",
  scale: 1.3,
  duration: 600 });