import React, {useState} from "react";
import axios from "axios";






function CreateNote(props){


    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    const [rows,changeRows]=useState("50px")

    const [buttonPressed,changeBorder]=useState("#4E9F3D")
    const [priority, setPriority]=useState("#4E9F3D")   



    async function fetchData(id) {
        const result =  await axios.get("http://localhost:8000/uid="+id)
        return result
    }
    
    
    function getData(id){
    var parsed = fetchData(id)
    return parsed
    }
    

    function handleSubmit(req){
        req.preventDefault();
        var urlencoded = new URLSearchParams();
        urlencoded.append('username',props.userName)
        urlencoded.append('uid',props.uID)
        urlencoded.append('title',req.target[0].value)
        urlencoded.append('content',req.target[1].value)
        urlencoded.append('priority',priority)

        var CreatedNote={
            Title: req.target[0].value,
            Content: req.target[1].value,
            Priority: priority
        }

fetch('http://localhost:8000/', {
  
  method: 'POST',
  headers: myHeaders,
  body: urlencoded,
  redirect: 'follow'
}).then(response => response.text())
.then(result => console.log(result))
.catch(error => console.log('error', error));;

props.addNote(getData(props.uID))

    }

    if (props.loginstate==false){
        return(<div style={{textAlign:"center"}}><h1>Login To Start Making Notes</h1></div>)
    }
    else{
    return(
        <div className="createNote">
        <form onSubmit={handleSubmit}>
        <input className="form-control NoteTitle" onClick={()=>changeRows("200px")} style={{fontSize:"20px",border: '2px solid', borderColor:buttonPressed }} type="text" placeHolder="Title"/>
        <textarea className="form-control NoteContent" onClick={()=>changeRows("200px")} style={{height:rows, fontSize:"16px", border: '2px solid', borderColor:buttonPressed}} type="text" placeHolder="Content"/>
        <div className="Notebutton">
        <button className="circle-button" style={{backgroundColor:"#FF5151"}} onClick={()=>{changeBorder("#FF5151");setPriority('#FF5151')}} type="button"></button>
        <button className="circle-button" style={{backgroundColor:"#FBF46D"}} onClick={()=>{changeBorder("#cb9d06"); setPriority('#cb9d06')}} type="button"></button>
        <button className="circle-button" style={{backgroundColor:"#4E9F3D"}} onClick={()=>{changeBorder("#4E9F3D");setPriority('#4E9F3D')}} type="button"></button>
        <button type="submit" className="btn btn-success">Add</button>
        </div>
        </form>
        </div>
    );
    }
}

export default CreateNote