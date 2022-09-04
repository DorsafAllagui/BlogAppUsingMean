const path = require("path");
const express = require("express")
const mongoose = require("mongoose")
const db = require("./db/db")
const header_middleware = require("./middlewares/header")

const postRouter = require("./Routes/post");


var cors = require('cors');


const app = express()
app.use(cors({origin: '*'}));
const PORT = process.env.PORT || 3000


app.use(express.json())
app.use(header_middleware)
// app.use("/", express.static(path.join(__dirname, 'angular')));

app.use("/api/posts", postRouter)



app.get('/test', (req, res) => {
    res.send('Hello World!')
  })

// app.use((req,res,next)=>{
//     res.sendFile(path.join(__dirname,"angular","index.html"))
// });
app.listen(PORT, (req,res) => {
    
    console.log(`app is listening to PORT ${PORT}`)
})
