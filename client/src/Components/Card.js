import React from 'react';

const Card = ({post}) => {
    console.log(post);
    return (
        <li className="card">
            <img 
            src={post.imageUrl} 
            alt={"image du post de" + post.nom}
            />
            <div className="contentCard">
            <p> {post.text}</p>
            <p> {post.date}</p>
            <p> {post.like}</p>
            <p> {post.comment}</p>
            </div>
        </li>
    );
};

export default Card;