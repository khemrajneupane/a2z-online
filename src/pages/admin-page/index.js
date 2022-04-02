import React, {  useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { API, Auth,graphqlOperation, Storage } from "aws-amplify";
import { AmplifyAuthenticator, AmplifySignOut, withAuthenticator } from '@aws-amplify/ui-react';
import {  createDish } from '../../graphql/mutations';
import useUser from '../../hook/useUser';
import config from '../../aws-exports'

import './admin-page.css';

const {
    aws_user_files_s3_bucket_region: region,
    aws_user_files_s3_bucket: bucket
} = config 

const Admin = () => {
    //const [image, setImage] = useState(null);
    //const [dishDetails, setDishDetails] = useState({ name: "", description: "", image: "", price: "", special_today:false  });
    const [msg,setMsg] = useState('')
    const [colors, setColors] = useState(false)
    const [thisUser, isAdmin] = useUser()

    const [name, setName] = useState("");
    const [image, setImage] = useState(null);
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState("");
    const [special_today, setSpecialToday] = useState(true);

    const handleNameChange = (e) => setName(e.target.value);
    const handleImageChange = (e) => setImage(e.target.value);
    const handlePriceChange = (e) => setPrice(e.target.value);
    const handleDescriptionChange = (e) => setDescription(e.target.value);
    const handleSpecialTodayChange = (e) => setSpecialToday(e.target.checked)
  
    

    const handleSubmit = async (e) => {
        e.preventDefault();
            const dishDetails = ({ name: name, description: description, image: image, price: price, special_today:special_today  });
        try {
            if (!name || !price) return           
            await API.graphql(graphqlOperation(createDish, { input: dishDetails }))
            //setDishDetails({name: "", image: "", price: "",description:"" })
            setColors(true)
            setMsg("Menu created successfully!")
            setTimeout(() => {
                setMsg('')
            }, 5000)
        } catch (err) {
            console.log('error creating Dishes:', err)
            //console.log('error creating Dishes:', err.errors[0].message)
            setColors(false)
            setMsg("sth. went wrong") //err.errors[0].message
            setTimeout(() => {
                setMsg('')
            }, 5000)
        }
    
    }
    const handleUpload = async (e) => {
        e.preventDefault();
        const file = e.target.files[0];
        const extension = file.name.split(".")[1];
        const name = file.name.split(".")[0];
        const key = `images/${uuidv4()}${name}.${extension}`;
        const url = `https://${bucket}.s3.${region}.amazonaws.com/public/${key}`
        try {
            // Put to s3 with public access level. 
            await Storage.put(key, file, {
                level: 'public',
                contentType: file.type
            });
            // Retrieve the uploaded file to display
            const image = await Storage.get(key, { level: 'public' })
            setImage(image);
            //setDishDetails({ ...dishDetails, image: url });
        } catch (err) {
            console.log(err);
        }
    }
    return (
        <div className="main-wrapper">
            <AmplifyAuthenticator>
            <aside style={{fontSize: '2.5rem', backgroundColor:colors ? 'yellow': 'red'}}>{msg}</aside>
                <div>
                    <div className="form-header">
                        <h3>Add New Dish</h3>
                    </div>
                    <form onSubmit={handleSubmit}>
                    <div>
                            {image ? <img className="preview" src={image} alt="" /> : <input
                                type="file"
                                accept="image/jpg"
                                onChange={(e) => handleUpload(e)}
                                className="header-login"
                                 />}

                        </div>
                       <div className="input-group">
                            <div className="input-field">
                                <p><label htmlFor="title">Name</label></p>
                                <p><input
                                    name="text"
                                    type="name"
                                    value={name}
                                    placeholder="Type the category"
                                    onChange={(e) => handleNameChange(e)}
                                    required
                                    className="header-login"
                                /></p>
                            </div>                            
                            <div className="input-field">
                                <p><label htmlFor="description">Description</label></p>
                                <p><textarea
                                    name="description"
                                    type="text"
                                    value={description}
                                    rows="8"
                                    placeholder="Type the description of the product"
                                    onChange={(e) => handleDescriptionChange(e)}
                                    required
                                    className="header-login"
                                /></p>
                            </div>
                          
                            <div className="input-field">
                                <p><label htmlFor="price">Price ($)</label>
                                    <input
                                        name="price"
                                        type="text"
                                        value={price}
                                        placeholder="What is the Price of the product (USD)"
                                        onChange={(e) => handlePriceChange(e)}
                                        required
                                        className="header-login"
                                    /></p>
                            </div>
                            <div className="input-field bottom">
                                <div className="checkbox">
                                <label>Today's special?</label>
                                    <input type="checkbox"
                                        name="special_today"
                                        checked={special_today}
                                        value={special_today}
                                        onChange={(e) => handleSpecialTodayChange(e)}
                                        className="header-login"
                                    />
                                    </div>
                                <button className="create-btn" type="submit">CreateDish</button>
                            </div>
                        </div>
                    </form>
                </div>
            </AmplifyAuthenticator>
        </div>
    )
}
export default (Admin)