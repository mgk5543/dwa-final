import React, { useEffect,useState } from 'react';
import { getStorage, ref, getDownloadURL } from "firebase/storage";


function Post({ caption, imageAlt, imageUrl, userName, userId }) {
    const [image, setImage] = useState();
    useEffect(() => {
        const storage = getStorage();
        getDownloadURL(ref(storage,'images/' + imageUrl))
        .then((url) => {
            setImage(url);
        });
        
    },[imageUrl]);
    if (image == null){

    }
    else{
    return (
        <div className="PostComponentWrapper">
            <img 
            className="PostComponent--image"
            src={image} 
            alt={imageAlt}
             />
            <p className="Caption">{caption}</p>
            <p>Posted by: <a href={`user/${userId}`}>{userName}</a></p>
        </div>
    )
    }
}

export default Post;