document.addEventListener("DOMContentLoaded", () => {
    const mousePositionDiv = document.getElementById("mouse-position");
    const clickableBox = document.getElementById("clickable-box");
    const animatedCircle = document.getElementById("animated-circle");
    const colorChangeButton = document.getElementById("color-change-button");
  
    document.addEventListener("mousemove", (event) => {
      const { clientX, clientY } = event;
      mousePositionDiv.textContent = `Mouse Position: X: ${clientX}, Y: ${clientY}`;
    });
  
    clickableBox.addEventListener("click", (event) => {
      const { clientX, clientY } = event;
  
      animatedCircle.style.top = `${clientY - 25}px`;
      animatedCircle.style.left = `${clientX - 25}px`;
  
      clickableBox.style.transform = "scale(1.1)";
      setTimeout(() => {
        clickableBox.style.transform = "scale(1)";
      }, 300);
  
      console.log(event);
    });
  
    colorChangeButton.addEventListener("mouseenter", () => {
      colorChangeButton.style.backgroundColor = "#ff6347";
    });
  
    colorChangeButton.addEventListener("mouseleave", () => {
      colorChangeButton.style.backgroundColor = "#20b2aa";
    });
  });
  