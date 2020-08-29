const { Poll } = require('./src/poll')
const poll = new Poll()
poll.run.bind(poll)
poll.run()
