const titleInput = document.getElementById("title");
const artistInput = document.getElementById("artist");
const songsLi = document.querySelector(".SongsList");
const btn = document.getElementById("btn");


function addSong() {
if(!titleInput.value && !artistInput.value) {
    titleInput.style.border = "red 3px solid"
    artistInput.style.border = "red 3px solid"
}
else if(titleInput.value !== '' && artistInput.value !== '') {
    titleInput.style.border = ""
    artistInput.style.border = ""
    
    const songBox = document.createElement("div");
    const songtitle = document.createElement('h2');
    const songartist = document.createElement('p');    

    songBox.className = "songBox";
    songtitle.className = "songT";
    songartist.className = "songA";

    songBox.appendChild(songtitle);
    songBox.appendChild(songartist)

    songtitle.textContent = titleInput.value;
    songartist.textContent = artistInput.value;
    
    document.body.appendChild(songBox);

}
}

btn.addEventListener("click", addSong);
