import React, { useState, useEffect, useContext } from 'react';
import axios from '../../API/axios';

//*** CONTEXT ***//
import { UserContext } from '../../Context/userContext';

//*** COMPONENTS IMPORTS ***//
import CommentCard from './CommentCard';


const Comments = ({post}) => {
    const { userToken } = useContext(UserContext);
    console.log(userToken.firstname)

    let getCommentsByPostId = `comment/${post.postId}`;//Request Endpoint
    const[comments, setComments]=useState([])
    //console.log(post)
   

    useEffect(() => {
        axios.get(getCommentsByPostId,
            {
           headers: {
               'Content-Type': 'application/json',
               Authorization: `Bearer ${localStorage.getItem('token')}`
         }})
         .then((res) => setComments(res.data));
         
         
      }, [post, getCommentsByPostId]);
    return (
        <div>
            {comments.map((comment, index) => (
        <CommentCard key={index} comment={comment} />
      ))}
        </div>
    );
};

export default Comments;