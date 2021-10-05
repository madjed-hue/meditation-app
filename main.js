const app = () => {
  const song = document.querySelector(".song");
  const play = document.querySelector(".play");
  const outline = document.querySelector(".moving-outline circle");
  const video = document.querySelector(".vid-container video");
  //select all sounds
  const sounds = document.querySelectorAll(".sound-picker button");
  //time display
  const timeDisplay = document.querySelector(".time-display");
  //get the length of the circle play btn
  const outlineLength = outline.getTotalLength();
  //specify the duration
  let theDuration = 600;
  outline.style.strokeDasharray = outlineLength;
  outline.style.strokeDashoffset = outlineLength;

  play.addEventListener("click", function () {
    checkPlay(song);
  });

  //change the sound
  sounds.forEach((sound) => {
    sound.addEventListener("click", function () {
      song.src = this.getAttribute("data-sound");
      video.src = this.getAttribute("data-video");
      checkPlay(song);
    });
  });

  //select sounds
  const timeSelect = document.querySelectorAll(".time-select button");
  timeSelect.forEach((btn) => {
    btn.addEventListener("click", function () {
      theDuration = this.getAttribute("data-time");
      timeDisplay.textContent = `${Math.floor(theDuration / 60)} : ${Math.floor(
        theDuration % 60
      )}`;
    });
  });

  const checkPlay = (song) => {
    if (song.paused) {
      song.play();
      video.play();
      play.src = "./svg/pause.svg";
    } else {
      song.pause();
      play.src = "/svg/play.svg";
      video.pause();
    }
  };

  //animate the circle
  song.ontimeupdate = () => {
    let currentTime = song.currentTime;
    let elapsed = theDuration - currentTime;
    let seconds = Math.floor(elapsed % 60);
    let minutes = Math.floor(elapsed / 60);

    //animate the circle
    let progress = outlineLength - (currentTime / theDuration) * outlineLength;
    outline.style.strokeDashoffset = progress;

    timeDisplay.textContent = `${minutes < 10 ? "0" + minutes : minutes}:${
      seconds < 10 ? "0" + seconds : seconds
    }`;
    if (currentTime >= theDuration) {
      song.pause();
      song.currentTime = 0;
      play.src = "/svg/play.svg";
      video.pause();
    }
  };
};

app();
