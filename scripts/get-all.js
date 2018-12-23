const contract = require('truffle-contract')
const HDWalletProvider = require('truffle-hdwallet-provider')

let network = process.env.NETWORK || 'development'

const provider = require('../truffle').networks[network].provider()
const SimpleListBuild = require('../build/contracts/SimpleList')
const SimpleListABI = SimpleListBuild.abi
let networkId

switch(network) {
  case 'development':
    break;
  case 'ropsten':
    networkId = '3'
    break;
  case 'fuse':
    networkId = '121'
    break;
  case 'mainnet':
    networkId = '1'
    break;
}

if (!networkId) throw new Error(`Unknown network: ${network}`)

const SimpleListAddress = SimpleListBuild.networks[networkId].address

const SimpleList = contract({abi: SimpleListABI})
SimpleList.setProvider(provider)

const run = async () => {
  let simplelist = await SimpleList.at(SimpleListAddress)
  simplelist.contract.count((err, count) => {
    if (err) {
      throw err
    }
    console.log(`count: ${count}`)
    if (count <= 0) {
      console.log(`no entities exist`)
      process.exit(0)
    }
    for (let i = 0; i < count; i++) {
      simplelist.contract.getEntity(i, (err, hash) => {
        if (err) {
          throw err
        }
        console.log(`(${i}) hash: ${hash}`)
      })
    }
  })
}

run()