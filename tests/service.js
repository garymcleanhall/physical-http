
const
  http = require('http')

let _server = null

module.exports = { 
  start: () => {
    return new Promise((resolve, reject) => {
      _server = http.createServer((request, response) => {
        response.statusCode = 200
        response.end('xxx')
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
    _server.close()
  }
}