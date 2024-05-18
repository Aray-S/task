import React from "react";
import "../App.css"
import { useState } from "react"
import Form from "./form";
import Reviews from "./reviews";
import {useLocation} from "react-router-dom";

const SingerProfile = () => {
    const location = useLocation();
    const singer = location.state.singer;
    const albums = location.state.album;
    const albumlist = Object.keys(albums);
    const AlbumGrid = albumlist.map(album => (
        <div className="album-card" key={album}>
            <a href={albums[album].albumURL} target="_blank" rel="noopener noreferrer">
                <img
                    className="album-image"
                    src={albums[album].albumImage}
                    alt={album}
                />
            </a>
            <div className="album-title">
                {album}
            </div>
        </div>
    ));

    return (
        <div className="singer-profile">
            <h3 className="singer-name">{singer}</h3>
            <div className="album-grid">
                {AlbumGrid}
            </div>
        </div>
    );
};

function SingerPage(props){
    const [submissions, updateSubmissions] = useState(0);
    const handleSubmissions = () => {
        updateSubmissions(submissions + 1);
    }
    return (
        <div>
            <SingerProfile singerName={props.singerName}/>
            <Form singerName={props.singerName} handleSubmissions={handleSubmissions}/>
            <Reviews singerName={props.singerName} submissions={submissions} handleSubmissions={handleSubmissions}/>
        </div>
    );
}

export default SingerPage;