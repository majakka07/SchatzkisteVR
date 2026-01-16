
// path to videos array
const videos = ["../static/instructions/teleportation.mp4", "../static/instructions/cursor.mp4", "../static/instructions/drawing.mp4"];
// title array
const titles = [
    "Im Raum bewegen", 
    "Gegenstände anklicken", 
    "Auf die Leinwand zeichnen"
];

let currentVideoIndex = 0;

const videoElement = document.querySelector(".tutorialVideo");
const videoSource = document.querySelector(".videoSource");
const prevBtn = document.querySelector(".prevBtn");
const nextBtn = document.querySelector(".nextBtn");
const skipBtn = document.querySelector(".skipBtn");
const sliderContainer = document.querySelector(".slider-container");
const title = document.querySelector(".title")

// update buttons previous and next to change the current index
function updateButtons() {
    prevBtn.disabled = currentVideoIndex === 0;
    if (currentVideoIndex === videos.length - 1) {
        nextBtn.textContent = "Starten";
    } else {
        nextBtn.textContent = "Weiter";
    }
}
      
// change the video and title according to the current video index
function changeVideo(index) {
    if (index >= 0 && index < videos.length) {
        currentVideoIndex = index;
        videoSource.src = videos[currentVideoIndex];
        videoElement.load();
        videoElement.play();
        title.textContent = titles[currentVideoIndex];
        updateButtons();
    } else if (index >= videos.length) {
        sliderContainer.style.display = "none";
    }
}
    
// click on next button and change current video index
nextBtn.addEventListener("click", () => {
    if (currentVideoIndex < videos.length - 1) {
        changeVideo(currentVideoIndex + 1);
    } else {
        sliderContainer.style.display = "none";
    }
});
     
// click on previous button and change current video index
prevBtn.addEventListener("click", () => {
    changeVideo(currentVideoIndex - 1);
});

// click on skip button to change the display to none
skipBtn.addEventListener("click", () => {
    sliderContainer.style.animation
    sliderContainer.style.display = "none";
});
        
updateButtons();