const express = require('express')
const path = require('path')
const { get } = require('request')

const app = express()

app.listen(3000, () => console.log('Listening on port 3000!'));
