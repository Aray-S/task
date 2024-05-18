import { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";

import { db } from "../firebase.js";

import { collection, getDocs, query, where} from "firebase/firestore";

function ReviewPost(props) {
    return (
        <div className="review">
            <p><strong>Written by:</strong> {props.user}</p>
            <h3>Album: {props.album}</h3>
            <div className="rating">Rating: {props.rating} / 5</div>
            <p>{props.review}</p>
        </div>
    )
}

function Reviews(props) {
    const location = useLocation();
    const singer = location.state.singer;

    const [postList, setPostList] = useState([]);
    const postsCollectionRef = query(collection(db, "Reviews"), where("singer", "==", singer));

    useEffect(() => {
        const getPosts = async () => {
            const data = await getDocs(postsCollectionRef);
            setPostList(data.docs.map((doc) => ({...doc.data(), id: doc.id })));
        };
        getPosts();
    }, [props.submissions]);

    return (
        <div className="reviews-container">
            <h2>Read Reviews for {singer}</h2>
            <div className="reviews-grid">
                {postList.map((value) => (
                    <div key={value.id} className="review-item">
                        <ReviewPost
                            album={value.album}
                            rating={value.rating}
                            review={value.review}
                            user={value.user}
                            id={value.id}
                            handleSubmissions={props.handleSubmissions}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Reviews;
