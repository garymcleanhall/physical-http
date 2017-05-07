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
  it('returns ok when downstream returns <400', testAsync(async () => {
    await sample.start()
    let httpCheck = await physical.http.check('http://localhost:9090/200')
    expect(httpCheck.isOk).toEqual(true)
    await sample.end()
  }))

  it('returns not ok when downstream returns >=400', testAsync(async () => {
    await sample.start()
    let httpCheck = await physical.http.check('http://localhost:9090/400')
    expect(httpCheck.isOk).toEqual(false)
    await sample.end()
  }))
})