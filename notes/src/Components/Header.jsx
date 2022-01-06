import React, {useEffect, useState} from "react"
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import {getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import Note from "./Note";
import axios from "axios";
import Cookies from "universal-cookie";
require('dotenv').config()



const app = firebase.initializeApp({
  apiKey: process.env.REACT_APP_API_KEY,

  authDomain: process.env.REACT_APP_AUTH_DOMAIN,

  projectId: process.env.REACT_APP_PROJECT_ID,

  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,

  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,

  appId: process.env.REACT_APP_APP_ID,

  measurementId: process.env.REACT_APP_MEASUREMENT_ID
})

const auth=firebase.auth()
const cookies = new Cookies();


function Header(props){  

const loggedInUserID = localStorage.getItem("userID");
const loggedInUserName = localStorage.getItem("userName");


const [loggedIn, setloggedIn]=useState(()=>{
  if (loggedInUserID){
    return true
  }else{
    return false

  }
});
const [loginButton, setloginButton]=useState(()=>{
  if (loggedInUserID){
    return "Logout"
  }else{
    return "Login"
  }
});
const [userName, setUserName]=useState(()=>{
  if (loggedInUserID){
    return loggedInUserName
  }else{
    return ""
  }
});
const [Uid, setuid]=useState(()=>{
  if (loggedInUserID){
    return loggedInUserID
  }else{
    return ""
  }
});



 async function fetchData(id) {
      const result =  await axios.get("http://localhost:8000/uid="+id)
      return result
  }


function getData(id){
  var parsed = fetchData(id)
  return parsed
}



function handleLogin(){

if (loggedIn===false){
const provider = new firebase.auth.GoogleAuthProvider();
signInWithPopup(auth, provider)
.then((res)=>{
  props.InfoProvider(res.user.displayName, res.user.uid, true, getData(res.user.uid))
  setUserName(res.user.displayName)
  setuid(res.user.uid)
  setloginButton("Logout")
  setloggedIn(true)
  localStorage.setItem('userID', res.user.uid)
  localStorage.setItem('userName', res.user.displayName)

  
  
  
})
.catch((err)=>{
  console.log(err)
});
}else{
  cookies.remove('NotesData')
  setloggedIn(false)
  setloginButton("Login")
  setUserName("")
  setuid("")
  props.InfoProvider("", "", false)
  localStorage.clear();
  

  }
}

    return(
        <header>
<nav className="navbar navbar-light bg-dark justify-content-between">
  <a className="navbar-brand"><h2 style={{color:"white"}}>Simple Notes</h2></a>

  <p className="login-text">{userName}</p> <button className="btn btn btn-success my-2 my-sm-0 login-button" type="submit" onClick={handleLogin}>{loginButton}</button>

</nav>
</header>)
}
export default Header