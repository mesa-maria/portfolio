import { ART } from "./art-dictionary.js";

document.addEventListener("DOMContentLoaded", init);

function init() {
  renderFinished();
  renderSketchbook();
  renderAnimations();
  renderCrafts();
  renderContact();
}

function renderFinished() {
  const container = document.querySelector(".finished-content");

  ART.finished.forEach((src) => {
    const img = createImage(src);
    container.appendChild(img);
  });
}

function createImage(src) {
  const img = document.createElement("img");

  img.src = src;
  img.className = "art-image";
  img.loading = "lazy";

  return img;
}
