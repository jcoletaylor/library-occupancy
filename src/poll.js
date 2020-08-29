const { settings } = require('./config/settings')
const POLL_SECONDS = settings.poll.seconds

const { Loader } = require('./loader')

class Poll {
  async run () {
    if (!this.runInterval) {
      this.runInterval = setInterval(this.process.bind(this), POLL_SECONDS * 1000)
      console.log(`Polling every ${POLL_SECONDS} seconds`)
    }
  }

  async process () {
    if (this.running) { return }
    this.running = true
    const loader = new Loader()
    const enabled = settings.poll.enabled()
    // making it configurable for polling enabled
    if (enabled) {
      console.log('Running loader')
      await loader.load()
    } else {
      console.log('Skipping run of loader, not enabled')
    }
    this.running = false
  }
}

module.exports = { Poll }
