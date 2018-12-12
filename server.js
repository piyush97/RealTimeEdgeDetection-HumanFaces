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

app.get('/', (req, res) => res.sendFile(path.join(viewsDir, 'index.html')))

app.listen(3000, () => console.log('Listening on port 3000!'));

function request(url, returnBuffer = true, timeout = 10000) {
  return new Promise(function (resolve, reject) {
    const options = Object.assign({}, {
        url,
        isBuffer: true,
        timeout,
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36'
        }
      },
      returnBuffer ? {
        encoding: null
      } : {}
    )

    get(options, function (err, res) {
      if (err) return reject(err)
      return resolve(res)
    })
  })
}
