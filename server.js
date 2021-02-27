// Step 1: set up all the required packages 
const { prototype } = require('events')
const express = require('express')
const fs = require('fs') // need to install fs because we will be using a file system
const app = express()

const PORT = 200


// Step 2: get the apps ready
// Have to use this to share the static files with the browser 
app.use(express.static('public'))

// Now, we need to be able to accept incoming POST requests from the user

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

//Step 3: we need the get, post and delete methods for the notes
//1.) getting information from the server db.json to be shown to mainpage
app.get('/api/notes', function (req, res) {
    let notesData = JSON.parse(fs.readFileSync('db/db.json'))
    console.log('getting files ')

    //always define where the date will be retrived 
    if (notesData) {
        res.send(notesData)
    }
})

//2.) for users posting notes on page
let counter = 1
app.post('/api/notes', function (req, res) {
    console.log('posting notes on page', req.body)

    let notesData = JSON.parse(fs.readFileSync('db/db.json'))

    if (notesData.length > 0) {
        counter = (parseInt(notesData[notesData.length - 1].id) + 1)
    }
    else {
        counter = 1
    }

    notesData.push({ id: `${counter}`, title: `${req.body.title}`, text: `${req.body.text}` })


    fs.writeFileSync('db/db.json', JSON.stringify(notesData))

    counter++
})



app.delete('/api/notes/:id', (req, res) => {
    console.log('deleting from page', `id:${req.params.id}`)
    let data = JSON.parse(fs.readFileSync('db/db.json'));
    data = data.filter(entry => !(entry.id == req.params.id));
    fs.writeFileSync('db/db.json', JSON.stringify(data));
    res.end();
});

app.listen(PORT, function () {

    console.log(`connecting to + ${PORT}`)
})
