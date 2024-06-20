import React, { useState } from 'react'
import '../css/createpost.css'
import { Cloudinary } from '@cloudinary/url-gen';
import { auto } from '@cloudinary/url-gen/actions/resize';
import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity';
import { AdvancedImage } from '@cloudinary/react';

function CreatePost() {

    const [img, setImg] = useState('');
    const [caption, setCaption] = useState('');

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

    const postOnCloud = (imga) => {
        const cld = new Cloudinary({ cloud: { cloudName: 'dk2ryokro' } });
  
        // Use this sample image or upload your own via the Media Explorer
        const img = cld
                .image(imga)
                .format('auto') // Optimize delivery by resizing and applying auto-format and auto-quality
                .quality('auto')
                .resize(auto().gravity(autoGravity()).width(500).height(500)); // Transform the image: auto-crop to square aspect_ratio
        
                console.log(<AdvancedImage cldImg={img}/>)
        }

    const shareMyPost = () => {
        console.log(caption, img);
        //yaha meri api hut karuga
        //user ki id lagegi
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

         <button className='btn btn-primary'>Post</button>

     </div>
  )
}

export default CreatePost
