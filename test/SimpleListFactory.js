const SimpleListFactory = artifacts.require("SimpleListFactory")
const truffleAssert = require('truffle-assertions')

contract("SimpleListFactory", accounts => {

  describe('createSimpleList', () => {
    let admin = accounts[0]

    before(async () => {
      factory = await SimpleListFactory.new()
    })

    it('should create simple list', async () => {
      const tokenAddress = '0x14456a52832891c3dcf4f7529949817cb3048cc0'
      let listAddress
      const result = await factory.createSimpleList(tokenAddress)
      truffleAssert.eventEmitted(result, 'SimpleListCreated', (ev) => {
        listAddress = ev.list
        return ev.admin === admin
      })
      assert.equal(await factory.tokenToListMap(tokenAddress), listAddress)
    })
  })
})
