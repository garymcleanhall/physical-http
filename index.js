'use strict';

const
  request = require('request-promise')

async function _checkHttp(uri) {
  try {
    let response = await request(uri, { resolveWithFullResponse: true })
    return { isOk: response.statusCode < 400 }
  } catch(error) {
    return { isOk: false }
  }
}

module.exports = {
  http: {
    check: _checkHttp
  }
}