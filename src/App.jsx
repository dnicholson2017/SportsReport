import React, { useState, useEffect } from "react";
import './App.css'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import Navbar from './components/navbar';
import Carousel from "./components/carousel";
import RightRail from "./components/right-rail";
import LeftRail from "./components/left-rail";
import Card from "./components/card";

function App() {
  const [playlistId, setPlaylistId] = useState(null);
  const [list2, setList2] = useState(null);
  const [nbaList, setNbaList] = useState(null);


  
  useEffect(() => {
    const callYTAPI = async () => {
      try {
        // const response = await fetch("https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&forHandle=%40NBA&key=AIzaSyC4TailqItlEi4rCx_51CBNubMmw-tQ0-4");
        const data = await response.json();
        const playlist = data.items[0].contentDetails.relatedPlaylists.uploads;
        console.log(data);
        console.log(playlist);
        setPlaylistId(playlist);
      }
      catch (error) {
        console.error("Error fetching data", error);
        throw error
      }
    }

    callYTAPI().catch(console.error);
  }, [])

  useEffect(() => {
    const callYTAPI2 = async () => {
      try {
        if (playlistId) {
          // const response = await fetch(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet%2CcontentDetails&maxResults=10&playlistId=${playlistId}&key=AIzaSyC4TailqItlEi4rCx_51CBNubMmw-tQ0-4`);
          const data = await response.json();
          console.log(data);
          console.log(playlistId);
          setList2(data);
        }
      }
      catch (error) {
        console.error("Error fetching data", error);
        throw error;
      }
    }

    callYTAPI2().catch(console.error);
  }, [playlistId])

  useEffect(() => {
    const callNbaApi = async () => {
      try {
        const headers= new Headers({
          'X-RapidAPI-Key': '04a539da4fmshbeb70d75fafb072p1e6fd8jsn0f8c67fcb8eb',
          'X-RapidAPI-Host': 'api-basketball.p.rapidapi.com'
        });

        // const call = await fetch("https://api-basketball.p.rapidapi.com/games?date=2019-11-26", {
        //   method:"GET",
        //   headers:headers
        // });
        const response = await call.json();
        console.log(response);
        setNbaList(response);
      }
      catch (error) {
        console.error("Error fetching data", error);
        throw error;
      }
    }

    callNbaApi().catch(console.error);
  }, [])



  return (
    <div>
      <Navbar/>
      <div className="container">
        <LeftRail
          nbaList={nbaList}
        />
        <Card
          list2={list2}
        />
        <RightRail/>
      </div>
    </div>
  );
}

export default App;

