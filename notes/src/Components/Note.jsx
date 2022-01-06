import React, {useEffect, useState} from "react";
import axios from "axios";
var qs = require('qs');




function Note(props){



    var notesarray=[]
    var userID=""

    



    function NoteCard(notesdata){

        return(
            
            <div className="writtenNote" key={notesdata._id}>
            <div className="writtenNoteTitle" style={{borderColor:notesdata.Priority}}>
            <p className="titleContent" style={{fontSize:"20px"}} >{notesdata.Title}</p>
            </div>
            <div className="writtenNoteContent" style={{borderColor:notesdata.Priority}}>
            <p className="content" style = {{fontSize:"16px"}}><pre>{notesdata.Content}</pre></p>
            </div>
            <div className="writtenNoteButton">
            <button type="button" class="btn btn-danger" onClick={handleDelete} value={notesdata._id}>Delete</button>
            </div>
            </div>
    

        )
    }




    function NoteCheckandReturn(){

    
    if(props.notesData===undefined){
        console.log("Logged Out State ")
        notesarray=[]
        console.log(notesarray)
        return(<div></div>)
    }else{
        notesarray=props.notesData[0]
        if (notesarray==undefined){
            console.log("Waiting is called "+notesarray)
            return(<div></div>)
        }else{
            if (notesarray.notes[0]==""){
                    console.log("Else is called" + notesarray.notes)
                    return(<div></div>)
            }else{
            notesarray=notesarray.notes
            userID= props.notesData[0]._id
            console.log(notesarray)
            if (typeof(notesarray[0])==undefined || notesarray==[]){
                return (<div></div>)
            }
            else{
            return(notesarray.map(NoteCard))
            }
            }
            
        }
    }

}


async function fetchData(id) {
    const result =  await axios.get("http://localhost:8000/uid="+id)
    return result
}


function getData(id){
var parsed = fetchData(id)
console.log("Parsed Data is " + parsed + " and ID is " + id)
return parsed}

    function handleDelete(event){
            


        var data = qs.stringify({
            'id': userID,
           'noteId': event.target.value
           });
           var config = {
             method: 'delete',
             url: 'http://localhost:8000',
             headers: { 
               'Content-Type': 'application/x-www-form-urlencoded'
             },
             data : data
           };
           
           axios(config)
           .then(function (response) {
             console.log(JSON.stringify(response.data));
           })
           .catch(function (error) {
             console.log(error);
           });
           

           props.deleteNote(getData(props.uID))
           

    }


const loggedInUserID = localStorage.getItem("userID");
 if (loggedInUserID){
    
        if(notesarray!=[]){
            return(
        <div class="d-flex justify-content-center flex-wrap" >
          {NoteCheckandReturn()}
           </div>)}}
           else{
               return(<div></div>)
           }

        }


export default React.memo(Note)