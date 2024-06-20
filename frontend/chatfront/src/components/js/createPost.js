import React, { useState, useContext, useEffect } from 'react'
import '../css/createpost.css'
import { Cloudinary } from '@cloudinary/url-gen';
import { auto } from '@cloudinary/url-gen/actions/resize';
import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity';
import { AdvancedImage } from '@cloudinary/react';
import axios from "axios"
import chatContext from '../../context/chatContext';
import { Link, useNavigate } from 'react-router-dom';

function CreatePost() {

    const navigate = useNavigate();
    const [img, setImg] = useState('');
    const [caption, setCaption] = useState('');  
    const [binaryData, setBinaryData] = useState(''); 
    const context = useContext(chatContext)
    const {currUser, getCurrUser} = context

    useEffect(() => {
        getCurrUser();
    }, [])

    const onImageChange = (event) => {
        load(event);
        setImg(event.target.files[0]);
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = (upload) => {
        setImg(upload.target.result); // Set image preview
        const binaryString = upload.target.result;
        setBinaryData(btoa(binaryString)); // Convert to Base64
        };

        if (file) {
        reader.readAsBinaryString(file); // Read file as binary string
        }
        // setBinaryData(btoa(img));
    }

    const onCaptionChange = (event) => {
        setCaption(event.target.value);
    }

    const load = (e) => {
        let output = document.querySelector('#output');
        console.log( URL.createObjectURL(e.target.files[0]))
        console.log(output.src)
        output.src = URL.createObjectURL(e.target.files[0]);
        output.onload = function () {
            URL.revokeObjectURL(output.src);
        }
    }

    const shareMyPost = () => {
        
        console.log(btoa(binaryData))
        console.log(currUser._id)
        console.log(caption);
        getCurrUser();
        axios.post('http://localhost:3001/post', {
            imageFile: binaryData,
            caption: caption,
            from: currUser._id
        }).then(function(response){
            alert('Post uploaded');
            navigate('/')
        }).catch((error) => {
            alert('Something went worng')
        })  
    }

  return (
    <div className="ceatePostContainer">

         <div className="createpostHeader">
             <h1>Create your Post</h1>
         </div>

         <div className="imageContainer">
             <img className='createPostImg' id="output" src="sdf.jpg"/>
             <input type="file" accept="image/*" onChange={onImageChange}/>
         </div>

         <div className='captionConatiner'>
            Caption in the box<br/>
            <textarea value={caption} placeholder="Caption" onChange={onCaptionChange} type="text" ></textarea>
         </div>

         <button className='btn btn-primary' onClick={shareMyPost}>Post</button>
         <Link to='/'>back</Link>

     </div>
  )
}

export default CreatePost
