const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const cors = require('cors')

const app = express();
mongoose.connect("mongodb://localhost:27017/NotesDB", {useNewUrlParser: true});


app.use(cors({ credentials: true }))
app.use(express.urlencoded({ extended: true}));
app.use(express.static("public"));
app.use(cors({origin: '*'}))



const noteSchema = new mongoose.Schema({
    Title: {type:String, required:true},
    Content: String,
    Priority: String
})
const databaseSchema= new mongoose.Schema({
    username: String,
    UID: {type:String, required:true},
    notes:[noteSchema]

})

const dbEntry=mongoose.model('dbEntry', databaseSchema)




app.route("/uid=:UID").get(function(req,res){
    dbEntry.find({UID:req.params.UID}, function(err,docs){
        if(err){
            res.send(err)
        }else{
            res.send(docs)
        }
    })
  
})


app.route("/").post(function(req,res){
    const uID = req.body.uid;
    const emailExists = dbEntry.findOne({UID: uID}, function(err,docs){
        if(err){
            console.log(req.body)
            console.log(err)
        }else{
            if(docs == null){
                const newEntry = new dbEntry({
                    username : req.body.username,
                    UID : req.body.uid,
                    notes:[{
                        Title: req.body.title,
                        Content: req.body.content,
                        Priority: req.body.priority
                    }]
                })
                newEntry.save(function(err){
                    if(err){
                        res.send(err)
                    }else{
                        console.log(req.body)
                        res.send("Successfully updated")
                    }
                })
            } else{
                const newNote = {
                    Title : req.body.title,
                    Content : req.body.content,
                    Priority : req.body.priority
                }
                dbEntry.findOneAndUpdate({UID:req.body.uid}, {$push:{notes:newNote}}, function(err){
                    if(err){
                        res.send(err)
                    }else{
                        console.log(req.body)
                        res.send("Successfully updated existing")
                    }
                })





            }
        }
    });
    

});
            

app.route("/").delete(function(req,res){
    const ExistingUserId = req.body.id
    const noteId = req.body.noteId
    dbEntry.updateOne({_id :ExistingUserId},{$pull:{notes:{_id:noteId}}}, function(err,docs){
        if(err){
            res.send(err)
        }else{
            res.send("Succesfully Deleted")
        }
    })
})

app.listen(8000, function() {
    console.log("Server started on port 8000");
  });