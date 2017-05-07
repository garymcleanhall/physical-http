
const
  http = require('http'),
  url = require('url')

let _server = null

module.exports = { 
  start: () => {
    return new Promise((resolve, reject) => {
      _server = http.createServer((request, response) => {
        response.statusCode = Number.parseInt(url.parse(request.url).pathname.substr(1))
        response.end('')
      })
      _server.listen(9090, (error) => {
        if(error) {
          reject(error)
        } else {
          resolve()
        }
      })
    })
  },
  end: () => {
    return new Promise((resolve, reject) => {
      _server.close(resolve)
    })
  }
}