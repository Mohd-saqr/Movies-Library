`use strict`
require(`dotenv`).config()

const express = require(`express`)
const cors = require(`cors`)
const axios = require(`axios`)
const server = express()
server.use(cors())
const data = require(`./Movie Data/data.json`)
let URL =`https://api.themoviedb.org/3/trending/all/week?api_key=${process.env.APIKEY}`
let URL2 = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.APIKEY}&language=en-US&query=The&page=2`
server.listen(5000,()=>{
console.log("server is starting");
})

server.get(handelServerErroe)
server.get(`/search`,handelSearch)
server.get(`/`,handelget)
server.get(`/trending`,handelTranding)
server.get(`/favorite`,favoriteHandel)
server.get(`*`, handelError)

function handelget(req,res){

    return res.status(200).json(data)
}

function favoriteHandel(req,res){
    res.status(200).send("Welcome to Favorite Page")
}

function handelError(req,res){
    res.status(404).send("Sorry, something went wrong")

}
function handelServerErroe(req,res){
    res.status(500).send("Sorry, something went wrong in the server")
}
 function handelTranding (req,res){
    let y = {}
    axios.get(URL).then(data =>{
        let dt =data.data.results
       dt.filter(obj => {
            if(obj.id==634649){
                let obj1= new Movis(obj.id,obj.title,obj.release_date,obj.poster_path,obj.overview); 
                y=obj1
            }
            
        });
        // i use map method but i have this result if u show this code Ammar pleas comment the reson fo this result
        // {
        //     "id": 634649,
        //     "title": "Spider-Man: No Way Home",
        //     "release_date": "2021-12-15",
        //     "poster_path": "/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg",
        //     "overview": "Peter Parker is unmasked and no longer able to separate his normal life from the high-stakes of being a super-hero. When he asks for help from Doctor Strange the stakes become even more dangerous, forcing him to discover what it truly means to be Spider-Man."
        //   },
        //   null,
        //   null,
        //   ......nulll
    //     my code was :
    //     let dt =data.data.results
    //    let y= dt.mab(obj => {
    //          if(obj.id==634649){
    //              let obj1= new Movis(obj.id,obj.title,obj.release_date,obj.poster_path,obj.overview); 
    //             return obj1
    //          }
             
    //      });

  res.status(200).json(y)
    }).catch(err =>{

    })
 }
 function handelSearch(req,res){
    let y = []
    axios.get(URL2).then(data =>{
        let dt =data.data.results
       dt.filter(obj => {
            if(obj.id==122917 || obj.id==337339 ){
                let obj1= new Movis(obj.id,obj.title,obj.release_date,obj.poster_path,obj.overview); 
               y.push (obj1)
            }
        });
  res.status(200).json(y)
    }).catch(err =>{
    })
 }
 

function Movis(id,title,release_date,poster_path,overview){
    this.id =id;
    this.title = title
    this.release_date=release_date
    this.poster_path =poster_path
    this.overview =overview
}