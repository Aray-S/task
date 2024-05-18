import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

import { addDoc, collection } from 'firebase/firestore';
import { db, auth } from '../firebase';

function Form(props) {
    const [isAuth] = useState(localStorage.getItem("isAuth"));
    const [value, setValue] = useState(0);
    const location = useLocation();
    const singer = location.state.singer;
    const [review, setReview] = useState("");
    const [album, setAlbum] = useState("");
    const reviewCollection = collection(db, "Reviews");
    const albums = location.state.album;
    const albumlist = Object.keys(albums);

    const handleChange = event => {
        setAlbum(event.target.value);
    };

    const leaveReview = async () =>  {
        await addDoc(reviewCollection, {
            singer: singer,
            rating: value,
            album: album,
            review: review,
            user: auth.currentUser.displayName
        });
        props.handleSubmissions();
    };

    return (
        <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '8px', maxWidth: '600px', margin: '20px auto', backgroundColor: '#f9f9f9' }}>
            <h2>Submit a Review</h2>
            <div style={{ marginBottom: '15px' }}>
                <label htmlFor="singer" style={{ display: 'block', marginBottom: '5px' }}>Singer</label>
                <input
                    type="text"
                    id="singer"
                    value={singer}
                    disabled
                    style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
                />
            </div>
            <div style={{ marginBottom: '15px' }}>
                <label htmlFor="album" style={{ display: 'block', marginBottom: '5px' }}>Album</label>
                <select
                    id="album"
                    value={album}
                    onChange={handleChange}
                    style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
                >
                    {albumlist.map((albumName, index) => (
                        <option key={index} value={albumName}>{albumName}</option>
                    ))}
                </select>
            </div>
            <div style={{ marginBottom: '15px' }}>
                <label htmlFor="rating" style={{ display: 'block', marginBottom: '5px' }}>Rating</label>
                <input
                    type="number"
                    id="rating"
                    value={value}
                    onChange={(event) => setValue(event.target.value)}
                    min="0" max="5" step="1"
                    style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
                />
            </div>
            <div style={{ marginBottom: '15px' }}>
                <label htmlFor="review" style={{ display: 'block', marginBottom: '5px' }}>Your Review</label>
                <textarea
                    id="review"
                    value={review}
                    onChange={(event) => setReview(event.target.value)}
                    rows="4"
                    maxLength="140"
                    required
                    style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
                />
            </div>
            {isAuth ?
                <button onClick={leaveReview} style={{ padding: '10px 20px', borderRadius: '4px', border: 'none', backgroundColor: '#007bff', color: '#fff', cursor: 'pointer' }}>Submit</button>
                :
                <button style={{ padding: '10px 20px', borderRadius: '4px', border: 'none', backgroundColor: '#007bff', color: '#fff', cursor: 'not-allowed' }}>Log In!</button>
            }
        </div>
    );
}

export default Form;
