const mongoose = require('mongoose');


const schema = new mongoose.Schema({
    name:  {type:String,required:true,trim:true},
    price: {type:Number},
    shop:{ type: mongoose.Schema.Types.ObjectId, ref: 'Shop' }
  },{
    toJSON: {virtuals:true},
    timestamps: true,
    collection: 'menus'
  });

schema.virtual('price_vat').get(function(){
  return (this.price*0.07)+this.price;
});

const menu = mongoose.model('Menu',schema);
module.exports = menu;