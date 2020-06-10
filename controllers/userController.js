const User = require('../models/user')
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const config=require('../config/index')

exports.index = (req, res, next) => {
    res.status(200).json({
      data:[
          {id:1 , name:'Mo'},
          {id:2 , name:'Neung'}
        ]
    })
}


exports.me = (req, res, next) => {
  const {_id,name,email,role}=req.user
  return res.status(200).json({
    user: {
      id: _id,
      name: name
    }
  });
}

exports.login = async (req, res, next) => {
  try
  {
    const {email,password} = req.body;

    const user  = await User.findOne({email:email});
    if(!user)
    {
      const error = new Error('ไม่พบผู้ใช้งานในระบบ');
      error.StatusCode = 404;
      throw(error);
    }
    //ตรวจสอบรหัสผ่านว่าถูกต้องหรือไม่
    const isValid = await user.checkPassword(password);
    if(!isValid)
    {
      const error = new Error('รหัสผ่านไม่ถูกต้อง');
      error.StatusCode = 401;
      throw(error);
    }

    //
    var token = await jwt.sign({ 
      id: user._id,
      role: user.role
    }, config.JWT_SECRET,{expiresIn:'5 days'});

    //decode วันหมดอายุ
    const expires_in = jwt.decode(token);
    res.status(200).json({
      access_token: token,
      expires_in: expires_in.exp,
      token_type: 'Bearer'
    });
  }
  catch(error){
    next(error)
  }
}



exports.register = async (req, res, next) => {
  try
  {
    const {name,email,password} = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error('ข้อมูลที่รับมาไม่ถูกต้อง');
      error.status_code = 422;
      error.validation = errors.array();
      throw(error);
    }
  
    const emailCheck  = await User.findOne({email:email});
    if(emailCheck)
    {
      const error = new Error('อีเมล์ซ้ำไม่สามารถลงทะเบียนได้');
      error.status_code = 400;
      throw(error);
    }

    let user = new User();
    user.name = name;
    user.email = email;
    user.password = await user.encryptPassword(password);
    await user.save();
    res.status(201).json({message:'ลงทะเบียนเรียบร้อย' })
  }
  catch(error){
    next(error)
  }
}