import React from 'react';

function CreatePostForm({ createPost }) {
    return (
        <form className="FormElement" onSubmit={(e) => createPost(e)}>
            <label htmlFor="imageToUpload">Choose an Image!</label>
            <input
                type="file"
                name="imageToUpload"
                accept="image/png, image/jpeg, image/jpg, image/gif"
            />
            <label htmlFor="caption">Caption</label>
            <input type="text" name="caption"/>
            <label htmlFor="imageAlt">Image Alt</label>
            <input type="text" name="imageAlt"/>
            
            <button type="submit">Submit</button>
        </form>
    );
}

export default CreatePostForm;