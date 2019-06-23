const itemQueries = require("../db/queries.items.js");
const Authorizer = require("../policies/item.js");

module.exports = {
  index(req, res, next){

    const authorized = new Authorizer(req.user).show();

    if(authorized){
      itemQueries.getAllItems((err, items) => {
        if (err){
          console.log(err);
          res.redirect(500, "/");
        } else {
          res.render("items/index", {items});
        }
      });
    } else {
      req.flash("notice", "You are not authorized to do that.");
      res.redirect("/");
    }
  },

  create(req, res, next){
    const authorized = new Authorizer(req.user).create();

    if(authorized){

      let newItem = {
        name: req.body.name,
      };
      itemQueries.addItem(newItem, (err, item) => {
        if (err) {
          res.redirect (500, "/items");
        } else {
          res.redirect (303, "/items");
        }
      });

    } else {
      req.flash("notice", "You are not authorized to do that.");
      res.redirect("/items");
    }
  }

}
