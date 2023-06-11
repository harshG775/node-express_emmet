const express = require("express");
const path = require("path");
const {v4:getId}=require("uuid")
const methodOverride=require("method-override")

const app=express();

app.use(express.urlencoded({extended:true}));
app.use(express.json())
app.use(methodOverride("_method"))


app.set("views", path.join(__dirname,"public"))
app.set("view engine","ejs")



let comments=[
    {
        id: getId(),
        username:"tod",
        comment:"I like my dog"
    },
    {
        id: getId(),
        username:"Skyler",
        comment:"I like to go birdwatching With my dog"
    },
    {
        id: getId(),
        username:"tod",
        comment:"my dog"
    }
]

// main page
app.get("/comments",(req,res)=>{
    res.render("comments/index",{comments})
})

// create page
app.get("/comments/new",(req,res)=>{
    res.render("comments/new")
})
// create //receve and create data
app.post("/comments",(req,res)=>{
    const {username,comment}=req.body;
    comments.push({id:getId(),username,comment});
    res.redirect("comments")
})
// read/show perticular comment
app.get("/comments/id/:id",(req,res)=>{
    const {id}=req.params
    const foundComment =comments.find(c=> c.id === id)
    res.render("comments/show" ,{foundComment})
})

// patch //edit the data
app.patch("/comments/id/:id",(req,res)=>{
    const {id}=req.params
    const patchComment=req.body.comment

    const foundComment =comments.find(c=> c.id === id)
    foundComment.comment=patchComment
    // console.log(comments)
    res.send('<h1>saved</h1><a href="http://localhost:3000/comments/">go to comments</a>')
})

app.get("/comments/id/:id/edit",(req,res)=>{
    const {id}=req.params
    const comment = comments.find(c=>c.id===id);
    res.render("comments/edit",{comment})
})



// delete
app.delete("/comments/id/:id",(req,res)=>{
    const {id}=req.params
    comments = comments.filter(c=> c.id!==id)
    res.redirect("/comments")
})





// server
const port=3000;
app.listen(port,()=>{
    console.log(`server is runing on http://localhost:${port}`)
})

