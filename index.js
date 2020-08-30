const { app } = require('./app')
const { Poll } = require('./src/poll')
const poll = new Poll()

app.listen(process.env.PORT, () => {
  console.log(`Listening on ${process.env.PORT}`)
})

poll.run.bind(poll)
poll.run()
