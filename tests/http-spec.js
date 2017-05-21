'use strict';

const
  sample = require('./service')

const physical = {
  http: require('../index')
}

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
    expect(httpCheck.error).not.toBeDefined()
    expect(httpCheck.isOk).toEqual(true)
    await sample.end()
  }))

  it('returns not ok when downstream returns >=400', testAsync(async () => {
    await sample.start()
    let httpCheck = await physical.http.check('http://localhost:9090/400')
    expect(httpCheck.isOk).toEqual(false)
    await sample.end()
  }))

  it('includes error when downstream fails', testAsync(async () => {
    await sample.start()
    let httpCheck = await physical.http.check('http://localhost:9090/400')
    expect(httpCheck.error).toBeDefined()
    await sample.end()
  }))

  it('includes full response in result if embed option specific', testAsync(async () => {
    await sample.start()
    let httpCheck = await physical.http.check('http://localhost:9090/200', { embed: true })
    expect(httpCheck.dependencies).toEqual(jasmine.any(Object))
    await sample.end()
  }))
})