import express from 'express'

const server = express()
const PORT = 3000 || process.env.PORT

server.listen(PORT, () => {
	console.log(`✨ Server listening on port ${PORT}`)
})