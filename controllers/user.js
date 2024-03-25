const User = require('../models/user');
const {v4:uuidv4} = require('uuid');
const {setUser} = require('../service/auth');
async function handleCreateUser(req,res){
    const {name,email,password} = req.body;
    if(!name || !email || !password){
        return res.status(400).json({error:"Please provide all details"});
    }
    await User.create({
        name,
        email,
        password
    });
    return res.status(201).render('home');
}

async function handleLogin(req,res){
    const {email,password} = req.body;
    if(!email || !password){
        return res.status(400).json({error:"Please provide all details"});
    }
    const user = await User.findOne({email,password});
    // console.log(user);
    if(!user){
        return res.status(400).json({error:"Invalid credentials"});
    }
    const sessionId = uuidv4();
    setUser(sessionId,user);
    res.cookie('uid',sessionId);

    return res.status(200).redirect('/');
}

module.exports = {
    handleCreateUser,
    handleLogin
}