const mongoose = require('mongoose');


const schema = new mongoose.Schema({
    name:  String, 
    address: {
        province:String
    },
  },{
      collection:'companies'
  });

const company = mongoose.model('Company',schema);
module.exports = company;