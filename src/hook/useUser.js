import React, { useEffect, useState } from 'react'
import { Auth } from 'aws-amplify'
import { useHistory } from "react-router-dom";
const useUser = () => {
    const [thisUser, setThisUser] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)
    const[admin, setAdmin] = useState("");
    let history = useHistory();
    const userGet = async() => {
        const user = await Auth.currentAuthenticatedUser();
        
        const admins= user.signInUserSession.accessToken.payload["cognito:groups"];
        console.log("from hook isAdmin",admins)
        if(admins===undefined){
            setAdmin("normal");
        }else{
            setAdmin("admin"); 
        }
        if(admins && admins.indexOf("Admin") > -1){
            setIsAdmin(true)
        }else{
            setIsAdmin(false)
        }

        if(user.username.includes("google")){
            setThisUser(user.attributes.email)
        }else{
            setThisUser(user.username)
        }
    }   
useEffect(()=>{

    userGet()
    
},[thisUser, history, isAdmin,admin])
    return [thisUser, isAdmin,admin]
}
export default useUser