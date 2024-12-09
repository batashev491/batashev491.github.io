document.addEventListener("DOMContentLoaded", () => {
  const gallery = document.getElementById("image-gallery");
  const addImageBtn = document.getElementById("add-image-btn");

  const imagePaths = [
    "./images/img1.jpeg",
    "./images/img2.jpeg",
    "./images/img3.jpeg",
    "./images/img4.jpeg",
    "./images/img5.jpeg",
    "./images/img6.jpeg",
    "./images/img7.jpeg",
    "./images/img8.jpeg"
  ];


  function addImage() {
  const randomIndex = Math.floor(Math.random() * imagePaths.length);
  const imageUrl = imagePaths[randomIndex];

  const imageItem = document.createElement("div");
  imageItem.className = "image-item";

  const img = document.createElement("img");
  img.src = imageUrl;
  img.alt = `Image ${randomIndex + 1}`;

  const removeBtn = document.createElement("button");
  removeBtn.className = "remove-btn";
  removeBtn.innerText = "X";

  imageItem.appendChild(img);
  imageItem.appendChild(removeBtn);
  gallery.appendChild(imageItem);

  removeBtn.addEventListener("click", () => {
    gallery.removeChild(imageItem);
  });
  }

  addImageBtn.addEventListener("click", addImage);

  for (let i = 0; i < 2; i++) {
  addImage();
  }
});
  