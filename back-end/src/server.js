const { WebSocketServer } = require("ws")
const dotenv = require("dotenv")

dotenv.config()

const wss = new WebSocketServer({ port: 8000 })

wss.on("connection", (ws) => {
    console.log(ws)
    ws.on("error", console.error)
    ws.on("message", (data) => {
        console.log(data.toString())
        wss.clients.forEach((client) => client.send(data.toString()))
    })

    console.log("client connected")

    ws.on("close", () => {
        console.log("client disconnected")
    })
})


