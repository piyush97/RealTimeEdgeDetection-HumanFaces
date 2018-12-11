const express = require('express')
const path = require('path')
const { get } = require('request')

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))

const viewsDir = path.join(__dirname, 'Client')
app.use(express.static(viewsDir))
app.use(express.static(path.join(__dirname, './public')))


app.listen(3000, () => console.log('Listening on port 3000!'));
