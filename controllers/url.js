const Url = require("../models/url");
const { nanoid } = require("nanoid");
async function handleCreateShortUrl(req, res) {
  const shortID = nanoid(8);
  if (!req.body.originalUrl) {
    return res.status(400).json({ error: "Original URL is required" });
  }
  await Url.create({
    shortUrl: shortID,
    originalUrl: req.body.originalUrl,
    visitedHistory: [{ timestamp:{type:Number}}],
    createdBy: req.user._id,
  });
  res.status(201).render('home',{shortUrl:shortID});
  // res.status(201).json({ shortUrl: shortID }); 
}

async function handleGetAnalytics(req,res){
    const url = await Url.findOne({shortUrl:req.params.shorturl});
    if(url==null){
        return res.sendStatus(404);
    }
    res.json({visitedHistory:url.visitedHistory});
}


module.exports = { handleCreateShortUrl,handleGetAnalytics };