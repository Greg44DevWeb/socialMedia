import React from 'react';
import NavbarTop from '../Components/Navbar/NavbarTop';
import AddPost from '../Components/PostArea/AddPost';


import '../App.css';

const Home = () => {
    return (
        <div>
            <NavbarTop />
            <AddPost />
        </div>
    );
};

export default Home;