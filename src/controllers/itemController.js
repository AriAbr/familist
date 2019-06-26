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
    console.log("itemController create() called");
    const authorized = new Authorizer(req.user).create();

    if(authorized){

      let newItem = {
        name: req.body.name,
        completed: false
      };
      itemQueries.addItem(newItem, (err, item) => {
        if (err) {
          res.redirect (500, "/items");
        } else {
          global.io.emit('new item', item);
          res.status(204).send();
        }
      });

    } else {
      req.flash("notice", "You are not authorized to do that.");
      res.redirect("/items");
    }
  },

  destroy(req, res, next){
    console.log("itemController destroy() called");
    itemId = parseInt(req.params.itemId);
    itemQueries.getItem(itemId, (err, item) => {
      const authorized = new Authorizer(req.user, item).destroy();
      if (authorized) {
        itemQueries.deleteItem(req, (err, item) => {
          console.log("destroying item");

          if(err) {
            res.redirect(err, "/items");

          } else {
            global.io.emit('delete item', item);
            res.status(204).send();
          }
        });
      } else {
        req.flash("notice", "You are not authorized to do that.");
        res.redirect("/items");
      }
    })

  },

  update(req, res, next){
    itemQueries.getItem(req.params.itemId, (err, item) => {
      console.log("itemController update() called");
      const authorized = new Authorizer(req.user, item).update();

      if (authorized) {
        itemQueries.updateItem(req, req.body, (err, item) => {
          if (err || item == null) {
            res.redirect(401, `/items`);
          } else {
            global.io.emit('update item', item);
            res.status(204).send();
            // res.redirect(`/items`);
          }
        });
      } else {
        req.flash("notice", "You are not authorized to do that.");
        res.redirect(`/items`);
      }
    })
  }

}
