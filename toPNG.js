const fs = require('fs')

const toPNG = (canvas, name) => {
  const path = `${__dirname}/pictures/${name}.png`
  const out = fs.createWriteStream(path)
  const stream = canvas.pngStream()

  stream.on('data', chunk => {
    out.write(chunk)
  })

  stream.on('end', () => {
    console.log(`saved png at ${path}`)
  })
}

module.exports = { toPNG }
