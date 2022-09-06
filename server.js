const express = require('express');
const path = require('path');
const fs = require('fs').promises

let app = express();
let id = 0;

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'front', 'index.html'))
})

app.get('/clear', (req, res) => {
    fs.writeFile('database.txt', ' ')
    res.send('cleared')
})

app.post('/save/:name/:age', (req, res) => {
    let name = req.params.name;
    let age = req.params.age;
    fs.appendFile('database.txt', `${name} ${age} ${id++} \n`)
    res.send('done')
    
})

app.get('/view/:id', (req, res) => {
    fs.readFile('database.txt').then((data) => {
        let str = data.toString('utf-8');
        let splice = str.split('\n')
        if(req.params.id < 0) {
            res.send('Please enter a valid id');
            return;
        }
        if(splice.length < (parseInt(req.params.id)) + 1) {
            res.send('User does not exist');
            return;
        }
        let requestedUser = (splice[(parseInt(req.params.id))]).split(' ')
        res.json({
            name: requestedUser[0],
            age: requestedUser[1],
            id: requestedUser[2]
        })
    })
})

app.listen(8000, () => {
    console.log('server started on port: 8000');
})

