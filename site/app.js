import { ART } from "./art-dictionary.js";

document.addEventListener("DOMContentLoaded", init);

function init() {
  renderFinished();
}

function renderFinished() {
  const container = document.querySelector(".finished-content");

  const pcContainer = document.createElement("div");
  pcContainer.className = "pc-container";

  const pcImage = document.createElement("img");
  pcImage.src = "./assets/pc.png";
  pcImage.className = "pc-image";

  const pcScreen = document.createElement("div");
  pcScreen.className = "pc-screen";

  ART.finished.forEach((src, index) => {
    const img = document.createElement("img");
    img.src = src;
    img.className = `art-image art-image-${index + 1}`;
    img.loading = "lazy";
    pcScreen.appendChild(img);
  });

  pcContainer.appendChild(pcImage);
  pcContainer.appendChild(pcScreen);
  container.appendChild(pcContainer);
}
