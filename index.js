'use strict';

const
  request = require('request-promise')

async function _checkHttp(uri, opts) {
  try {
    let response = await request(uri, Object.assign({ resolveWithFullResponse: true }, opts))
    return { isOk: response.statusCode < 400 }
  } catch(error) {
    return { isOk: false, error }
  }
}

module.exports = {
  check: _checkHttp
}