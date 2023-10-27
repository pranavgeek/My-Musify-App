import MusifyApp from "./musify-db.js";

MusifyApp.open()
  .then(() => {
    return MusifyApp.getA11();
  })
  .then((songsData) => {
    // Handle the data retrieved from Firebase
    console.log("Songs data:", songsData);

    const titleInput = document.getElementById("title");
    const artistInput = document.getElementById("artist");
    const btn = document.getElementById("btn");
    const error = document.getElementById("error");
    const error2 = document.getElementById("error2");

    error.style.display = "none";
    error2.style.display = "none";

    let songId;

    function addSong() {
      const titleV = titleInput.value;
      const artistV = artistInput.value;

      if (!titleV && !artistV) {
        titleInput.style.border = "red 3px solid";
        artistInput.style.border = "red 3px solid";
        error.style.display = "";
        error2.style.display = "";
      } else if (!titleV && artistV) {
        titleInput.style.border = "red 3px solid";
        artistInput.style.border = "";
        error.style.display = "";
      } else if (titleV && !artistV) {
        artistInput.style.border = "red 3px solid";
        titleInput.style.border = "";
        error2.style.display = "";
      } else if (titleV && artistV) {
        titleInput.style.border = "";
        artistInput.style.border = "";
        error.style.display = "none";
        error2.style.display = "none";

        const songBox = document.createElement("div");
        const songtitle = document.createElement("h2");
        const songartist = document.createElement("p");
        const deleteBtn = document.createElement("button");
        const likeBtn = document.createElement("button");
        const likeCounter = document.createElement("h1");

        let counter = 0;
        likeCounter.innerText = "Likes: " + counter;

        function addLikes() {
          counter++;
          likeCounter.innerText = "Likes: " + counter;

          console.log(counter);
          MusifyApp.updateLikes(titleV, counter);
        }

        function deleteSong() {
          MusifyApp.deleteByTitle(titleV)
            .then(() => {
              songBox.remove();
            })
            .catch((error) => {
              console.error("Error deleting song: " + error);
            });
        }

        songBox.className = "songBox";
        songtitle.className = "songT";
        songartist.className = "songA";
        likeCounter.className = "likeCounter";
        deleteBtn.className = "removeBtn";
        likeBtn.className = "likeBtn";

        deleteBtn.innerText = "Remove";
        likeBtn.innerText = "+1 Like";

        songBox.appendChild(songtitle);
        songBox.appendChild(songartist);
        songBox.appendChild(deleteBtn);
        songBox.appendChild(likeBtn);
        songBox.appendChild(likeCounter);

        songtitle.textContent = titleV;
        songartist.textContent = artistV;

        document.body.appendChild(songBox);

        MusifyApp.add(titleV, artistV, 0)
          .then((docId) => {
            songId = docId;
            likeBtn.disabled = false;
          })
          .catch((error) => {
            console.error("Error adding song: " + error);
          });

        likeBtn.addEventListener("click", addLikes);
        deleteBtn.addEventListener("click", deleteSong);
      }

      titleInput.value = "";
      artistInput.value = "";
    }

    btn.addEventListener("click", addSong);
  })
  .catch((error) => {
    console.error("Error opening the database: " + error);
  });
