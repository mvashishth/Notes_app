import React, { useState, useEffect} from "react"
import Header from "./Components/Header.jsx"
import Footer from "./Components/Footer.jsx"
import CreateNote from "./Components/CreateNote.jsx"
import Note from "./Components/Note.jsx"
import axios from "axios"


function App() {
  const loggedInUserID = localStorage.getItem("userID");
  const loggedInUserName = localStorage.getItem("userName");
  var userData=""




  const [NotesData, setNotesData]=useState(()=>{

  if (loggedInUserID){
    getData(loggedInUserID).then(response=>{
      setNotesData(response.data)
      console.log(response.data)
    })
    console.log(userData)
    return(userData)
    
   
  }else{
    return(
    [
      {
          "_id": "",
          "username": "",
          "UID": "",
          "notes": [{
            Title:"",
            Content:"",
            Priority:"",
            _id:""
          }],
          "__v": 0
      }
  ])
}}
  )
  const [userName, setUserName]=useState("")
  const [uid, setuid]= useState("")
  const [loggedIn, setLoginState]=useState(false)
  
  function handleInfo(name, uid, loginState, Notes){
    if (Notes!==undefined){
      Notes.then(data=>{setNotesData(data.data)
      })
      
    }else{
      console.log("Empty promise")
    }
    
    setNotesData(Notes)
    setUserName(name)
    setuid(uid)
    setLoginState(loginState)
    
  }

  function NoteAdded(Notes){

    if (Notes!==undefined){
      Notes.then(data=>{setNotesData(data.data)})
      
    }else{
      console.log("Empty promise")
    }
    setNotesData(Notes)

  }

function deleteNote(Notes){

  if (Notes!==undefined){
    Notes.then(data=>{setNotesData(data.data)})
    
  }else{
    console.log("Empty promise")
  }
  setNotesData(Notes)
}

async function fetchData(id) {
  const result =  await axios.get("http://localhost:8000/uid="+id)
  return result
}


async function getData(id){
var parsed =  await fetchData(id)
return Promise.resolve(parsed)
}



useEffect(()=>{

  if (loggedInUserID){
    setuid(loggedInUserID)
    setUserName(loggedInUserName)
    setLoginState(true)

  }else{
    localStorage.clear()
  }
})


  return (
    <div>
    <Header InfoProvider = {handleInfo} />
    <CreateNote userName={userName} uID={uid} loginstate={loggedIn} addNote={NoteAdded} />
    <Note uID={uid} notesData={NotesData} loginstate={loggedIn} deleteNote={deleteNote} />
    <Footer />
    </div>
  );
}

export default App;
