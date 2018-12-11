// Created with love by Piyush Mehta <me@piyushmehta.com>
const express = require('express')
const path = require('path')
const { get } = require('request')

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))

// for front end views directory @define
const viewsDir = path.join(__dirname, 'Client')
app.use(express.static(viewsDir))
// Public directory addn
app.use(express.static(path.join(__dirname, './public')))

app.get('/', (req, res) => res.sendFile(path.join(viewsDir, 'videoFaceTracking.html')))

app.listen(3000, () => console.log('Listening on port 3000!'));
