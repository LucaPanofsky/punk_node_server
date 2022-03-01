const ipfs = require("ipfs");
const orbit = require("orbit-db");
const room = require('ipfs-pubsub-room')
const wrtc = require('wrtc')
const WStar = require('libp2p-webrtc-star')
const Websockets = require('libp2p-websockets')
const filters = require('libp2p-websockets/src/filters')
const transportKey = Websockets.prototype[Symbol.toStringTag]

async function createMockNode(ipfs, orbit) {
  this.node = await ipfs.create({
    repo: './ipfs_mock_node',
  })
  console.log('punk-node-server running ...')

  this.publicRoom = new room(this.node, 'publicRoom')
  this.publicRoom.on('peer joined', (peer) => {
    console.log('Peer joined the room', peer)
    this.publicRoom.broadcast('hello from MOCK SERVER ' + this.orbitdb.id)
  })
  this.publicRoom.on('message', (message) => {
    console.log('message:', message.data.toString())
  })

  this.publicRoom.on('peer left', (peer) => {
    console.log('Peer left...', peer)
  })

  // now started to listen to room
  this.publicRoom.on('subscribed', () => {
    console.log('Now connected!')
  })

  this.id = await this.node.id()

  this.publicRoom.broadcast('Hello from MOCK server with id ' + JSON.stringify(this.id))
}


function init() {
  createMockNode(ipfs, orbit)
}

init()
