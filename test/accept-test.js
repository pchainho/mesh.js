var mesh = require("../");
var expect  = require("expect.js");
var _       = require("highland");

describe(__filename + "#", function() {

  it("can accept operations", function(next) {

    var db = function(operation) {
      return _([operation]);
    };

    db = mesh.clean(mesh.accept("a", "b", db));
    db("a").pipe(_.pipeline(_.collect)).on("data", function(items) {
      expect(items.length).to.be(1);
      db("b").pipe(_.pipeline(_.collect)).on("data", function(items) {
        expect(items.length).to.be(1);
        next();
      });
    });
  });

  it("can reject operations", function(next) {
    var db = function() {
      return _([operation]);
    };

    db = mesh.clean(mesh.accept("a", "b", db));
    db("c").pipe(_.pipeline(_.collect)).on("data", function(items) {
      expect(items.length).to.be(0);
      next();
    });
  });
});
