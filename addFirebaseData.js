import { useState, useEffect } from "react";
import { setDoc, doc, collection, getDocs } from "firebase/firestore";
import { db } from "./../firebaseConfig";

export default function addFirebaseData() {
  const [track, setTracks] = useState(); //temp use for renew firebase field name
  const [allAlbumName, setAllAlbumName] = useState();
  const [allAlbumImg, setAllAlbumImg] = useState();
  const [allAlbumUrl, setAllAlbumUrl] = useState();

  const getTrack = async () => {
    try {
      const response = await axios({
        method: "GET",
        url: "https://spotify23.p.rapidapi.com/playlist_tracks/",
        params: {
          id: "2siMQsSv15yXBDdjmUSfJX",
          offset: "0",
          limit: "50",
        },
        headers: {
          "X-RapidAPI-Key": process.env.EXPO_PUBLIC_API_KEY,
          "X-RapidAPI-Host": "spotify23.p.rapidapi.com",
        },
      });
      const items = response.data.items;
      console.log("items: ", items);

      setTracks(items);
      setAllAlbumName(items.map((item) => item.track.name));
      setAllAlbumImg(items.map((item) => item.track.album.images[0].url));
      setAllAlbumUrl(items.map((item) => item.track.preview_url));
      setRandomId(Math.floor(Math.random() * items.length));
    } catch (err) {
      console.log(err.message);
    }
    addData();
  };

  //Save API data to firebase
  const addData = async () => {
    try {
      console.log("allAlbumName", allAlbumName);
      for (let i = 0; i < allAlbumName.length; i++) {
        await setDoc(doc(db, "songs", `${i}`), {
          albumName: allAlbumName[i],
          albumImg: allAlbumImg[i],
          albumUrl: allAlbumUrl[i],
        });
      }
      console.log("add data success");
    } catch (err) {
      console.log("fail add data", err);
    }
  };
  console.log("allAlbumName", allAlbumName);

  //If spotify playlist changes, uncomment out the code(so I don't have to be limited by the 100 free requests)
  useEffect(() => {
    getTrack();
  }, []);
}
