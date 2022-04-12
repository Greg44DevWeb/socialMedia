import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '../Components/Card';
const Posts = () => {
    const [data, setData] = useState([]);
    
    useEffect(() => {
       
        axios
        .get("http://localhost:8080/api/post/getAll")
        .then ((res) => setData(res.data));
    }, [])

    return (
        <div className="postContainer">
            <ul>
                {
                data.map((post, key) => 
                <Card key={post.postId} post={post}/>)
                }
            </ul>
        </div>
    );
};

export default Posts;