import React from 'react';
import { Link } from 'react-router-dom';

function Post({ caption, imageAlt, imageSrc, userName, userId }) {
    return (
        <div className="PostWrapper">
            <img src="" alt="" />
            <p className="Caption">Text</p>
            <p>Posted by: <Link to={`user/${userId}`}>{userName}</Link></p>
        </div>
    )
}

export default Post;