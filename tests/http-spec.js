'use strict';

const
  physical = require('../index'),
  sample = require('./service')

function testAsync(runAsync) {
  return (done) => {
    runAsync().then(done, error => { 
      fail(error)
      done() 
    })
  }
}

describe('Physical HTTP', () => {
  it('returns 200 when downstream returns <400', testAsync(async () => {
    // start a service
      await sample.start()
      let httpCheck = await physical.http.check('http://localhost:9090')
      expect(httpCheck.isOk).toEqual(true)
      await sample.end()
  }))
})