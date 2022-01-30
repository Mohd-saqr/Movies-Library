`use strict`

const express = require(`express`)
const cors = require(`cors`)
const server = express()
server.use(cors())
const data = require(`./Movie Data/data.json`)

server.listen(5000,()=>{
console.log("server is sterting");
})
server.get(`/`,handelget)

function handelget(req,res){

    return res.status(200).json(data)
}
server.get(`/favorite`,favoriteHandel)
function favoriteHandel(req,res){
    res.status(200).send("Welcome to Favorite Page")
}
server.get(`*`, handelError)
server.get(`/error`,handelServerErroe)
function handelError(req,res){
    res.status(404).send("Sorry, something went wrong")

}
function handelServerErroe(req,res){
    res.status(500).send("Sorry, something went wrong")
}

