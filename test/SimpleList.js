const SimpleList = artifacts.require("SimpleList")
const truffleAssert = require('truffle-assertions')

contract("SimpleList", accounts => {
  const admin = accounts[0]

  describe('construction', () => {
    it('should create simple list', async () => {
      let list = await SimpleList.new(admin)
      assert.equal(await list.admins(admin), 1)
    })
  })


  describe('list functionality', () => {
    let list
    before(async () => {
      list = await SimpleList.new(admin)
    })

    it('should add entity to list', async () => {
      const hash = 'hash'
      const result = await list.addEntity(hash)
      truffleAssert.eventEmitted(result, 'EntityAdded', (ev) => {
        return ev.hash === hash
      })

      assert.equal(await list.getEntity(0), hash)
      assert.equal(await list.count(), 1)
    })

    it('should remove entity from list', async () => {
      assert.equal(await list.count(), 1)
      const hash = 'hash'
      const result = await list.deleteEntity(hash)
      truffleAssert.eventEmitted(result, 'EntityDeleted', (ev) => {
        return ev.hash === hash
      })

      assert.equal(await list.count(), 0)
    })

    it('should replace entity', async () => {
      const oldHash = 'oldHash'
      await list.addEntity(oldHash)
      const newHash = 'hash2'
      const result = await list.replaceEntity(oldHash, newHash)

      truffleAssert.eventEmitted(result, 'EntityReplaced', (ev) => {
        return ev.oldHash === oldHash && ev.newHash === ev.newHash
      })

      assert.equal(await list.getEntity(0), newHash)
      assert.equal(await list.count(), 1)
    })
  })

})
