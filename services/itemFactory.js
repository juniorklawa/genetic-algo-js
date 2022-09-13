function itemFactory(value, weight) {
  return {
    value,
    weight,
    id: require("../utils/idGenerator")(),
  };
}

module.exports = itemFactory;
