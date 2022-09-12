class Item {
  constructor(value, weight) {
    this.value = value;
    this.weight = weight;
    this.id = require("./idGenerator")();
  }
}

// export
module.exports = Item;
