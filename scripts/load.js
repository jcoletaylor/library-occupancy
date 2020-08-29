const { Loader } = require('../src/loader')

async function load () {
  const loader = new Loader()
  const result = await loader.loadLocation('apst0000')
  return result
}

load().then((out) => {
  console.log(out)
  process.exit(0)
}).catch((err) => {
  console.error(err)
  process.exit(1)
}).finally(() => {
  process.exit(1)
})
