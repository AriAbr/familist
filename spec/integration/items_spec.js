const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/items/";
const Item = require("../../src/db/models").Item;
const User = require("../../src/db/models").User;
const sequelize = require("../../src/db/models/index").sequelize;

describe("routes : items", () => {

  beforeEach((done) => {
    this.item;
    this.user;

    sequelize.sync({force: true}).then((res) => {
      User.create({
        name: "Example User",
        email: "user@example.com",
        password: "1234567890"
      })
      .then((user) => {
        this.user = user;

        Item.create({
          name: "celery"
        })
        .then((item) => {
          this.item = item;

          request.get({
            url: "http://localhost:3000/auth/fake",
            form: {
              userId: this.user.id,
              email: this.user.email
            }
          },
            (err, res, body) => {
              done();
            }
          )
        })
        .catch((err) => {
          console.log(err);
          done();
        });
      });
    });
  });

  describe("GET /items", () => {

    it("should render a status code of 200 and list all items", (done) => {
      request.get(base, (err, res, body) => {
        expect(res.statusCode).toBe(200);
        expect(body).toContain("celery");
        done();
      });
    });

  });

  describe("POST /items/create", () => {

    it("should create a new item and rerender", (done) => {
      const options = {
        url: `${base}create`,
        form: {
          name: "milk",
        }
      };
      request.post(options, (err, res, body) => {
        Item.findOne({where: {name: "milk"}})
        .then((item) => {
          expect(res.statusCode).toBe(303);
          expect(item.name).toBe("milk");
          done();
        })
        .catch((err) => {
          console.log(err);
          done();
        });
      });
    });

    it("should not create a new item that fails validation", (done) => {
      const options = {
        url: `${base}create`,
        form: {
          name: "",
        }
      };
      request.post(options, (err, res, body) => {
        Item.findOne({where: {name: ""}})
        .then((item) => {
          expect(item).toBeNull();
          done();
        })
        .catch((err) => {
          console.log(err);
          done();
        });
      });
    });

  });

  describe("POST items/:id/destroy", () => {

    it("should delete the item with the associated ID", (done) => {
      Item.all()
      .then((items) => {
        const itemCountBeforeDelete = items.length;
        expect(itemCountBeforeDelete).toBe(1);
        // console.log(this.item.id)
        request.post(`${base}${this.item.id}/destroy`, (err, res, body) => {
          Item.all()
          .then((items) => {
            expect(err).toBeNull();
            expect(items.length).toBe(itemCountBeforeDelete - 1);
            done();
          });
        });
      });
    });

  });

  describe("POST /items/:id/update", () => {

    it("should update the item with the given name", (done) => {
      const options = {
        url: `${base}${this.item.id}/update`,
        form: {
          name: "carrots"
        }
      };
      request.post(options, (err, res, body) => {
        expect(err).toBeNull();
        Item.findOne({where: {id: this.item.id}})
        .then((item) => {
          expect(item.name).toBe("carrots");
          done();
        })
        .catch((err) => {
          console.log(err);
          done();
        });
      });
    });

  });

});
