const express = require("express");
const connectToMongoDB = require("./connection");
const cookieParser = require("cookie-parser");
const userRouter = require("./routes/user");
const userAuthRouter = require("./routes/userauth");
const staticRouter = require("./routes/staticrouter");
const Url = require("./models/url");
const { restrictToLoggedinUserOnly,checkAuth } = require("./middleware/auth");

const path = require("path");
const app = express();
const port = 3000;

connectToMongoDB();
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.json());
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.use("/url", restrictToLoggedinUserOnly, userRouter);
app.use("/user", userAuthRouter);
app.use("/",checkAuth, staticRouter);

// app.get('/',staticRouter);

app.get("/:shorturl", async (req, res) => {
  const url = await Url.findOne({ shortUrl: req.params.shorturl });
  console.log(url);
  if (url == null) {
    return res.sendStatus(404);
  }
  url.visitedHistory.push({ timestamp: Date.now() });
  await url.save();
  // console.log(url.originalUrl);
  // res.redirect(url.originalUrl);
  res.redirect(
    url.originalUrl.startsWith("http")
      ? url.originalUrl
      : "http://" + url.originalUrl
  );
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
