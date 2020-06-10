const Staff = require('../models/staff');



exports.index = async (req, res, next) => {
  const staff = await Staff.find();
    res.status(200).json({
      data:staff
    });
}
exports.show = async (req, res, next) => {
  try{
  const staff = await Staff.findOne({ _id: req.params.id });
    if(!staff){
      throw new Error('ไม่พบข้อมูลพนักงาน');
    }
    else
    {
      res.status(200).json({
        data:staff
      });
    }
  }
  catch{
    res.status(400).json({
      error: {
        message: 'รหัสไม่ถูกต้อง ' + error.message
      }
    });
  }
}

exports.destroy = async (req, res, next) => {
  try{
    const staff = await Staff.deleteOne({ _id: req.params.id });
    if(!staff){
      throw new Error('ไม่พบข้อมูลพนักงาน');
    }
    else
    {
      res.status(200).json({
        message: 'ลบข้อมูลเรียบร้อย'
      });
    }
  }
  catch{
    res.status(400).json({
      error: {
        message: 'รหัสไม่ถูกต้อง ' + error.message
      }
    });
  }
}

exports.insert = async (req, res, next) => {
  const {name,salary} = req.body;
  let staff = new Staff({
    name: name,
    salary:salary
  });
  await staff.save();
  res.status(200).json({
    message: 'add sussuss'
  });
}


exports.update = async (req, res, next) => {
  try{
    const staff = await Staff.findOne({ _id: req.params.id });
    staff.name=req.body.name;
    staff.salary=req.body.salary;
    await staff.save();

    //const {id} =req.params;
    //const {name,salary} = req.body;
    //const staff = await Staff.findByIdAndUpdate(id,{
    //  name:name,
    //  salary:salary
    //});
    res.status(200).json({
      message: 'แก้ไขข้อมูลเรียบร้อย'
    });
  }
  catch{
    res.status(400).json({
      error: {
        message: 'รหัสไม่ถูกต้อง ' + error.message
      }
    });
  }
}


