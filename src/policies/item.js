const ApplicationPolicy = require("./application");

module.exports = class ItemsPolicy extends ApplicationPolicy {
  show() {
    return this.user != null;
  }
}
