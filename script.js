const containerTag = document.getElementsByClassName("container")[0];
const audioTag = document.getElementsByClassName("audio")[0];
const songDurationTag = document.getElementById("duration");
const currentProgressTag = document.getElementById("current-progress");
const playTag = document.getElementById("play");
const pauseTag = document.getElementById("pause");
const forwardTag = document.getElementById("forward");
const backwardTag = document.getElementById("backward");

const songsList = [
  {
    trackId: "music/track1.mp3",
    title: "Eminem-Godzilla",
  },
  {
    trackId: "music/track2.mp3",
    title: "Bulan Sutena - I Love Mama Mantu Remix Jedag Jedug",
  },
  {
    trackId: "music/track3.mp3",
    title: "Måneskin - Beggin'",
  },
  {
    trackId: "music/track4.mp3",
    title: "XXXTENTACION - Everybody Dies In Their Nightmares",
  },
];
for (let i = 0; i < songsList.length; i++) {
  const songsDiv = document.createElement("div");
  songsDiv.classList.add("songsDiv");
  const title = i + 1 + ". " + songsList[i].title;
  songsDiv.textContent = title;

  songsDiv.addEventListener("click", () => {
    playId = i;
    playSongFunction();
  });
  containerTag.append(songsDiv);
}

let minuteAndSecondText = (totalTime) => {
  const minute = Math.floor(totalTime / 60);
  const second = totalTime % 60;
  const minuteText = minute < 10 ? "0" + minute.toString() : minute;
  const secondText = second < 10 ? "0" + second.toString() : second;
  return minuteText + ":" + secondText;
};

const progressBarCalculation = (currentTime) => {
  const progressBarWidth = (100 / duration) * currentTime;
  currentProgressTag.style.width = progressBarWidth.toString() + "%";
};

let durationText="00:00";
audioTag.addEventListener("loadeddata", () => {
  const duration = Math.floor(audioTag.duration);
  durationText=minuteAndSecondText(duration);
});
let currentTime = 0;
audioTag.addEventListener("timeupdate", () => {
  //const duration = Math.floor(audioTag.duration);    <NaN show first and show time>
  currentTime = Math.floor(audioTag.currentTime);
  songDurationTag.textContent =
    minuteAndSecondText(currentTime) + " / " + durationText;
  progressBarCalculation(currentTime);
});
let playId = 0;
playTag.addEventListener("click", () => {
  isPlaying = true;
  playAndPause();
  if (currentTime === 0) {
    playSongFunction();
  } else {
    audioTag.play();
  }
});
pauseTag.addEventListener("click", () => {
  isPlaying = false;
  playAndPause();
  audioTag.pause();
});
let isPlaying = false;
const playAndPause = () => {
  if (isPlaying) {
    playTag.style.display = "none";
    pauseTag.style.display = "inline";
  } else {
    playTag.style.display = "inline";
    pauseTag.style.display = "none";
  }
};
forwardTag.addEventListener("click", () => {
  if (playId === songsList.length - 1) {
    return;
  }
  playId += 1;
  playSongFunction();
});
backwardTag.addEventListener("click", () => {
  if (playId === 0) {
    return;
  }
  playId -= 1;
  playSongFunction();
});
const playSongFunction = () => {
  audioTag.src = songsList[playId].trackId;
  audioTag.play();
  isPlaying = true;
  playAndPause();
};
