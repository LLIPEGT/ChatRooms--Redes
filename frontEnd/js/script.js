// login elements

const login = document.querySelector(".login")
const loginForm = login.querySelector(".login__form")
const loginInput = login.querySelector(".login__input")

// chat elements

const chat = document.querySelector(".chat")
const chatForm = chat.querySelector(".chat__form")
const chatInput = chat.querySelector(".chat__input")

const colors = [
    "blue",
    "red",
    "green",
    "yellow",
    "purple",
    "pink",
    "white",
    "gold"
]

const user = { id: "", name: "", color: "" }

let websocket

const getRandomColor = () => {
    const randomIndex = Math.floor(Math.random() * colors.length)
    return colors[randomIndex]
} 

const processMessage = ({data}) => {
    alert(data)
}


const handleLogin = (event) => {
    event.preventDefault()

    user.id = crypto.randomUUID()
    user.name = loginInput.value
    user.color = getRandomColor()

    login.style.display = "none"
    chat.style.display = "flex"

    websocket = new WebSocket("ws://localhost:8080")
    // websocket.onopen = () =>  websocket.send(`usuario: ${user.name} logado`)
    websocket.onmessage = processMessage

    console.log(user)
}

loginForm.addEventListener("submit",handleLogin)