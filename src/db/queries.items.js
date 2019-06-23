const User = require("./models").User;
const Item = require("./models").Item;

module.exports = {
  getAllItems(callback){
    return Item.all()
    .then((items) => {
      callback(null, items);
    })
    .catch((err) => {
      callback(err);
    })
  },

  addItem(newItem, callback){
    return Item.create({
      name: newItem.name,
    })
    .then((item) => {
      callback(null, item);
    })
    .catch((err) => {
      callback(err);
    })
  }

}
