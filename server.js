// Step 1: set up all the required packages 
const express = require('express')
const fs = require('fs') // need to install fs because we will be using a file system
const app= express()

const PORT = 8080
const saveFile= '/.notetaker.json'

// Step 2: get the apps ready
// Have to use this to share the static files with the browser 
app.use(express.static('public'))

// Now, we need to be able to accept incoming POST requests from the user

// this is used to tell computer the information from user is parsed 
app.use(express.urlencoded({extended: true})) 
app.use(express.json())


//Step 3: Now, we will be collecting the data from users and parsing the data in a JSON format 
let getNotes = fs.existsSync(saveFile)? 
JSON.parse(fs.readFileSync(saveFile)) : []


//Step 4: we need the get, post and delete methods for the notes
//1.) getting information shown on front page
app.get('/api/public/notes', function(req,res){
    console.log('getting files ')

    //always define where the date will be retrived 
    let notesData = JSON.parse(fs.readFileSync('/.notetaker.json'))
   
    if (notesData) {
        res.send({notesData})
    }
})
s
//2.) for users posting notes on page
app.post('/api/notes', function(req,res){
    console.log('posting notes on page', req.body)

    let notesData= JSON.parse(fs.readFileSync('/.notetaker.json'))

    //req.body means what i put in the body
    const newNoteData= req.body
    console.log(`[notes] notetaker(${getNotes.length} entries), adding newNotes: \n`, newNoteData)
    getNotes.push(newNoteData)


    // Now we need to save the file as a string 
    fs.writeFileSync(saveFile, JSON.stringify(saveNote))

    res.send({message: `Reserved for *${newNoteData.name}*`})
}); 


app.delete('api/notes/:id', function(req,res){
    console.log('deleting entries')
    let notesData = JSON.parse(fs.readFileSync('/.notetaker.json'))


})

app.listen(PORT, function(){

        console.log('connecting to' + PORT)
})
