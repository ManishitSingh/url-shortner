const express = require('express');
const connectToMongoDB = require('./connection');
const userRouter = require('./routes/user');
const Url = require("./models/url");
const app = express();
const port = 3000;

connectToMongoDB();
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); 
app.use("/url",userRouter);

app.get('/:shorturl',async (req,res)=>{
    const url = await Url.findOne({shortUrl:req.params.shorturl});
    if(url==null){
        return res.sendStatus(404);
    }
    url.visitedHistory.push({timestamp:Date.now()});
    await url.save();
    res.redirect(url.originalUrl);
})

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})