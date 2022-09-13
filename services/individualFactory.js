const { MAX_BACKPACK_WEIGHT } = require("../config");

function getWeight(backpack, items) {
  let weight = 0;

  for (let i = 0; i < backpack.length; i++) {
    if (backpack[i]) {
      weight += items[i]?.weight;
    }
  }

  return weight;
}

function getValue(backpack, items) {
  let value = 0;

  for (let i = 0; i < backpack.length; i++) {
    if (backpack[i]) {
      value += items[i]?.value;
    }
  }

  return value;
}

function individualFactory(backpack) {
  const idGenerator = require("../utils/idGenerator");
  const itemsList = require("../data/items.json");

  return {
    id: idGenerator(),
    backpack,
    totalWeight: getWeight(backpack, itemsList),
    totalValue: getValue(backpack, itemsList),
    fitness:
      getWeight(backpack, itemsList) > MAX_BACKPACK_WEIGHT
        ? 0
        : getValue(backpack, itemsList),
  };
}

module.exports = individualFactory;
