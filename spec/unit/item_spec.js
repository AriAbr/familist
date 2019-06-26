const sequelize = require("../../src/db/models/index").sequelize;
const Item = require("../../src/db/models").Item;

describe("Item", () => {
  beforeEach((done) => {
    sequelize.sync({force: true})
    .then(() => {
      done();
    })
    .catch((err) => {
      console.log(err);
      done();
    });
  });

  describe("#create()", () => {

    it("should create an Item object with a valid name and default it to not completed", (done) => {

      Item.create({
        name: "Example Item",
      })
      .then((item) => {
        expect(item.name).toBe("Example Item")
        expect(item.completed).toBe(false);
        expect(item.id).toBe(1);
        done()
      })
      .catch((err) => {
        console.log(err);
        done();
      });

    });

    it("should not create an item with invalid name", (done) => {

      Item.create({
        name: null,
      })
      .then((item) => {
        expect(item).toBeNull()
        done();
      })
      .catch((err) => {
        expect(err.message).toContain("name");
        done();
      });

    });

  });
});
