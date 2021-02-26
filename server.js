// Step 1: set up all the required packages 
const express = require('express')
const fs = require('fs') // need to install fs because we will be using a file system
const app= express()

const PORT = 8000


// Step 2: get the apps ready
// Have to use this to share the static files with the browser 
app.use(express.static('public'))

// Now, we need to be able to accept incoming POST requests from the user

// this is used to tell computer the information from user is parsed 
app.use(express.urlencoded({extended: true})) 
app.use(express.json())


//Step 3: Now, we will be collecting the data from users and parsing the data in a JSON format 
const getNotes =JSON.parse(fs.readFileSync('notetaker.json'))


//Step 4: we need the get, post and delete methods for the notes
//1.) getting information shown on front page
app.get('/api/public/notes', function(req,res){
    console.log('getting files ')

    //always define where the date will be retrived 
    const notesData = getNotes
   
    if (notesData) {
        res.send({notesData})
    }
})

//2.) for users posting notes on page
let counter = 1 
app.post('/api/notes', function(req,res){
    console.log('posting notes on page', req.body)

    let notesData= getNotes

    if (notesData.length>0){
        counter= (parseInt(notesData[notesData.length-1].id)+1)
    }
    else {
        counter=1
    }
    notesData.push({id:`${counter}`, title: `${req.body.title}`, text: `${req.body.text}`})
    fs.writeFileSync('notesData', JSON.stringify(notesData))    

    counter++
    req.location.reload()
})



app.delete('api/notes/:id', function(req,res){
    console.log('deleting entries')
    let notesData = getNotess
notesData = notesData.filter(entry => !(entry.id== req.params.id));
fs.writeFileSync('notetaker.json', JSON.stringify(notesData));
res.end();


})

app.listen(PORT, function(){

        console.log('connecting to' + PORT)
})
