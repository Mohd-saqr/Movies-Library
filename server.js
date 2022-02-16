`use strict`
require(`dotenv`).config()
const pg =require(`pg`)
const path = require(`path`)
const client = new pg.Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});
const express = require(`express`)
const cors = require(`cors`)
const axios = require(`axios`)
const server = express()
server.use(cors())
server.use(express.json())
const port = process.env.PORT
const data = require(`./Movie Data/data.json`)

let URL =`https://api.themoviedb.org/3/trending/all/week?api_key=${process.env.APIKEY}`
let URL2 = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.APIKEY}&language=en-US&query=The&page=2`

client.connect().then(()=>{
    server.listen(port,()=>{
        console.log(`listining to port ${port}`)
    })
})

// const client = new pg.Client({
//     connectionString: process.env.DATABASE_URL,
//     ssl: { rejectUnauthorized: false }
// })

server.get('/g', function(req, res) {
    res.sendFile(path.join(__dirname, './index.html'));
  });
  server.get('/js', function(req, res) {
    res.sendFile(path.join(__dirname, './run.js'));
  });
// server.listen(5000,()=>{
// console.log("server is starting");
// })


server.get(`/search`,handelSearch)
server.get(`/`,handelget)
server.get(`/trending`,handelTranding)
server.get(`/favorite`,favoriteHandel)
server.get(`/TheFateoftheFurious`,TheFateoftheFuriousHandel)
server.get(`/TheDeepHouse`,TheDeepHouseHandel)
server.post(`/addMovie`,postHandel)
server.get(`/getMovies`,getMoviesHandel)
server.put(`/UPDATE/:id`,handelUpdate)
server.delete(`/DELETE/:id`,handelDelete)
server.get(`/getByIdMovie/:id`,handelGetidMovis)
server.get(handelServerErroe)
server.get(`*`, handelError)
function handelget(req,res){
    return res.status(200).json(data)
}

function favoriteHandel(req,res){
    res.status(200).send("Welcome to Favorite Page")
}
function handelUpdate (req,res){
const id = req.params.id
const data = req.body
console.log(data);
// const sql = `UPDATE favRecipes SET title =$1, readyInMinutes = $2, summary = $3 ,vegetarian=$4, instructions=$5, sourceUrl =$6 WHERE id=$7 RETURNING *;`; 
let sql =`UPDATE famovis SET title = $1 , overview =$2,poster_path=$3 , release_date=$4 , comment =$5 WHERE id=$6 RETURNING  *;`;
values =[data.title,data.overview,data.poster_path,data.release_date,data.comment,id]
client.query(sql,values).then(data =>{
    res.status(200).json(data.rows)
}).catch(err =>{
    handelError(err,req,res)

})
}
function handelDelete(req,res){
const id =req.params.id
let sql =`DELETE  FROM famovis WHERE id=${id}`
client.query(sql).then(()=>{
    res.status(200).send("the Movies was deleted successfully")
}).catch(err =>{
    handelError(err,req,res)
})
}
function handelGetidMovis(req,res){
const id =req.params.id
let sql = `SELECT * FROM famovis WHERE id=${id}`
client.query(sql).then(data=>{
    res.status(200).json(data.rows)
}).catch(err =>{
    handelError(err,req,res)

})
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
  res.status(200).json(y)
    }).catch(err =>{
        handelError(err,req,res)
    })
 }
 function handelSearch(req,res){
    axios.get(URL2).then(data =>{
        let dt =data.data.results
  res.status(200).json(dt)
    }).catch(err =>{
        handelError(err,req,res)
    })
 }
 function TheFateoftheFuriousHandel(req ,res){
    let y = []
    axios.get(URL2).then(data =>{
        let dt =data.data.results
       dt.filter(obj => {
            if(obj.id==337339){
                let obj1= new Movis(obj.id,obj.title,obj.release_date,obj.poster_path,obj.overview); 
               y.push (obj1)
            }
        });
  res.status(200).json(y)
    }).catch(err =>{
        handelError(err,req,res)

    })
 }
 function TheDeepHouseHandel (req ,res){
    let y = []
    axios.get(URL2).then(data =>{
        let dt =data.data.results
       dt.filter(obj => {
            if(obj.id==672582){
                let obj1= new Movis(obj.id,obj.title,obj.release_date,obj.poster_path,obj.overview); 
               y.push (obj1)
            }
        });
  res.status(200).json(y)
    }).catch(err =>{
        handelError(err,req,res)

    })
 }
 function postHandel(req,res){
const add =req.body
let comment = `New movies Added: `
 console.log(add);
 let sql1 =`INSERT INTO famovis(title,overview,poster_path,release_date,comment) VALUES($1,$2,$3,$4,$5) RETURNING *;`
 let values =[add.original_title,add.overview,add.poster_path,add.release_date,comment]
 client.query(sql1,values).then(data1 =>{
    res.status(200).json(data1.rows)
}).catch(err=>{
    handelError(err,req,res)
})
}

function getMoviesHandel (req,res){
    let sql =`SELECT * FROM famovis;`;
    client.query(sql).then(data2 =>{
        console.log(data2);
        res.status(200).json(data2.rows)
    }).catch(err =>{
        handelError(err,req,res)
    })
}
 

function Movis(id,title,release_date,poster_path,overview){
    this.id =id;
    this.title = title
    this.release_date=release_date
    this.poster_path =poster_path
    this.overview =overview
}
function handelError(error,req,res){
    const err = {
         status : 500,
         messgae : error
     }
     res.status(500).send(err);
}