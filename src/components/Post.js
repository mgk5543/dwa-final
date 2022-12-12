import React from 'react';

function Post({ caption, imageAlt, imageUrl, userName, userId }) {
    return (
        <div className="PostWrapper">
            <img 
            src={imageUrl} 
            alt={imageAlt}
             />
            <p className="Caption">{caption}</p>
            <p>Posted by: <a href={`user/${userId}`}>{userName}</a></p>
        </div>
    )
}

export default Post;