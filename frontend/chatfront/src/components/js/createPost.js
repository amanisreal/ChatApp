import React, { useState, useContext } from 'react'
import '../css/createpost.css'
import { Cloudinary } from '@cloudinary/url-gen';
import { auto } from '@cloudinary/url-gen/actions/resize';
import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity';
import { AdvancedImage } from '@cloudinary/react';
import axios from "axios"
import chatContext from '../../context/chatContext';

function CreatePost() {

    const [img, setImg] = useState('');
    const [caption, setCaption] = useState('');
    const [ugl, setIMURL] = useState('');    
    const context = useContext(chatContext)
    const {currUser, getCurrUser} = context

    const onImageChange = (event) => {
        load(event);
        setImg(event.target.files[0]);
        postOnCloud(img)
    }

    const onCaptionChange = (event) => {
        setCaption(event.target.values)
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

    const postOnCloud = async (imga) => {
        // cloudinary.config({ 
        //     cloud_name: 'dk2ryokro', 
        //     api_key: '385199864772986', 
        //     api_secret: 'w5sO-53oImPC_Al-hDJhDjPzoUE' // Click 'View Credentials' below to copy your API secret
        // });
        
        // // Upload an image
        //  const uploadResult = await cloudinary.uploader
        //    .upload(
        //        'http://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg', {
        //            public_id: 'shoes',
        //        }
        //    )
        //    .catch((error) => {
        //        console.log(error);
        //    });

        //    setIMURL(uploadResult)
        
        // console.log(uploadResult);
       
    }


    const shareMyPost = () => {
        console.log(caption, img);
        getCurrUser();
        axios.post('http://localhost:3001/post', {
            imageFile: ugl,
            caption: caption,
            from: currUser._id
        }).then(function(response){
            console.log(response)
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

     </div>
  )
}

export default CreatePost
