const backgrounds = [
  'url("876774.jpg")',
  'url("titanic.jpg")',
  'url("veer zaaraa.jpg")'
];

let index = 0;
const body = document.body;

body.style.backgroundImage = backgrounds[index];

setInterval(() => {
  index = (index + 1) % backgrounds.length;
  body.style.backgroundImage = backgrounds[index];
}, 5000);
