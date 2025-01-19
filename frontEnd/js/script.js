// login elements

const login = document.querySelector(".login")
const loginForm = login.querySelector(".login__form")
const loginInput = login.querySelector(".login__input")

// chat elements

const chat = document.querySelector(".chat")
const chatForm = chat.querySelector(".chat__form")
const chatInput = chat.querySelector(".chat__input")
const chatMessages = chat.querySelector(".chat__messages")

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

const handleLogin = (event) => {
    event.preventDefault()

    user.id = crypto.randomUUID()
    user.name = loginInput.value
    user.color = getRandomColor()

    login.style.display = "none"
    chat.style.display = "flex"

    websocket = new WebSocket("ws://localhost:8000")
    // websocket.onopen = () =>  websocket.send(`usuario: ${user.name} logado`)
    websocket.onmessage = processMessage
}


const createMessageSelfElement = (content) => {
    const div = document.createElement("div")
    div.classList.add("message__self")
    div.innerHTML = content

    return div
}

const createMessageOtherElement = (content, sendername, sendercolor) => {
    const div = document.createElement("div")
    const span = document.createElement("span")
    div.classList.add("message__other")
    div.classList.add("message__self")
    span.classList.add("message__sender")
    span.style.color = sendercolor
    div.appendChild(span)
    span.innerHTML = sendername
    div.innerHTML += content

    return div
}

const getRandomColor = () => {
    const randomIndex = Math.floor(Math.random() * colors.length)
    return colors[randomIndex]
} 

const scrollScreen = () => {
    window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth"
    })
}

const processMessage = ({data}) => {
    const { userId, username, usercolor, content } = JSON.parse(data)
    
    const message = userId == user.id ? createMessageSelfElement(content) : createMessageOtherElement(content, username, usercolor)
    
    chatMessages.appendChild(message)

    scrollScreen()
}

const sendMessage = (event) => {
    event.preventDefault()

    const message = {
        userId: user.id,
        username: user.name,
        usercolor: user.color,
        content: chatInput.value
    }

    websocket.send(JSON.stringify(message))
    chatInput.value = ""
}

loginForm.addEventListener("submit", handleLogin)
chatForm.addEventListener("submit",sendMessage)