import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  doc,
  getDocs,
  updateDoc,
  deleteDoc,
} from "https://www.gstatic.com/firebasejs/10.5.0/firebase-firestore.js";

class MusifyApp {
  constructor() {
    this.db = null;
    this.isAvailable = false;
  }

  open() {
    return new Promise((resolve, reject) => {
      try {
        const firebaseConfig = {
          apiKey: "AIzaSyDLazqT1u1ZFk8a_z81_CYSNa49g1oARB4",
          authDomain: "musify-app-d4367.firebaseapp.com",
          projectId: "musify-app-d4367",
          storageBucket: "musify-app-d4367.appspot.com",
          messagingSenderId: "275282564251",
          appId: "1:275282564251:web:4cc28e8c69d9bee482223e",
        };

        // Initialize Firebase
        const app = initializeApp(firebaseConfig);

        const db = getFirestore(app);
        if (db) {
          this.db = db;
          this.isAvailable = true;
          resolve();
          //   console.log("Success");
        } else {
          reject("Not Connected!");
        }
      } catch (error) {
        console.log(error.message);
      }
    });
  }

  add(title, artist, likes) {
    return new Promise((resolve, reject) => {
      if (!this.isAvailable) {
        reject("Database is not connected.");
      }

      const songs = {
        title: title,
        artist: artist,
        likes: likes,
      };

      const dbcollection = collection(this.db, "SongsList");

      addDoc(dbcollection, songs)
        .then((docRef) => {
          console.log("Success: ", docRef.id);
        })
        .catch((error) => {
          reject(error.message);
        });
    });
  }

  getA11() {
    return new Promise((resolve, reject) => {
      if (!this.isAvailable) {
        reject("Database not opened!");
      }
      const dbCollection = collection(this.db, "SongsList");
      // Gets the data form the collection.
      getDocs(dbCollection)
        .then((querySnapshot) => {
          const songsData = []
          querySnapshot.forEach((doc) => {
            const data = doc.data();
            data.id = doc.id 
            songsData.push(data)
          });
          resolve(songsData)
          console.log(songsData)
        })
        .catch((error) => {
          reject(error.message);
        });
    });
  }

  async updateLikes(title, newLikes) {
    if (!this.isAvailable) {
      throw new Error("Database is not connected.");
    }
  
    const dbCollection = collection(this.db, "SongsList");
  
    const querySnapshot = await getDocs(dbCollection);
  
    let found = false;
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      if (data.title === title) {
        found = true;
        updateDoc(doc.ref, { likes: newLikes });
      }
    });
  
    if (!found) {
      throw new Error(`Song with title "${title}" not found.`);
    }
  }
  
  
  
  async deleteByTitle(title) {
    if (!this.isAvailable) {
      throw new Error("Database is not connected.");
    }

    const dbCollection = collection(this.db, "SongsList");
    const querySnapshot = await getDocs(dbCollection);

    querySnapshot.forEach(async (doc) => {
      const data = doc.data();
      if (data.title === title) {
        try {
          await deleteDoc(doc.ref);
          console.log(`Song with title "${title}" deleted`);
        } catch (error) {
          throw error;
        }
      }
    });
  }
  
  
}
export default new MusifyApp();
