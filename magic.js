const titleInput = document.getElementById("title");
const artistInput = document.getElementById("artist");
const songsLi = document.querySelector(".SongsList");
const btn = document.getElementById("btn");
const error = document.getElementById("error");
const error2 = document.getElementById("error2");

error.style.display = "none";
error2.style.display = "none";

function addSong() {
  if (!titleInput.value && !artistInput.value) {
    titleInput.style.border = "red 3px solid";
    artistInput.style.border = "red 3px solid";

    error.style.display = "";
    error2.style.display = "";
  } else if (!titleInput.value && artistInput.value !== "") {
    titleInput.style.border = "red 3px solid";
    artistInput.style.border = "";
    error.style.display = "";
  } else if (!artistInput.value && titleInput.value !== "") {
    artistInput.style.border = "red 3px solid";
    titleInput.style.border = "";
    error2.style.display = "";
  } else if (titleInput.value !== "" && artistInput.value !== "") {
    titleInput.style.border = "";
    artistInput.style.border = "";

    error.style.display = "none";
    error2.style.display = "none";

    const songBox = document.createElement("div");
    const songtitle = document.createElement("h2");
    const songartist = document.createElement("p");

    songBox.className = "songBox";
    songtitle.className = "songT";
    songartist.className = "songA";

    songBox.appendChild(songtitle);
    songBox.appendChild(songartist);

    songtitle.textContent = titleInput.value;
    songartist.textContent = artistInput.value;

    document.body.appendChild(songBox);
  }
}

btn.addEventListener("click", addSong);
