const itemFactory = require("../services/itemFactory");

const MAX_VALUE = 15;
const MAX_WEIGHT = 20;
const ITEMS_COUNT = 15;

function generateItems() {
  const itemList = [];

  // create unique 50 items
  for (let i = 0; i < ITEMS_COUNT; i++) {
    // before creating a new item we need to be sure that he is unique
    let item = itemFactory(
      Math.floor(Math.random() * MAX_VALUE),
      Math.floor(Math.random() * MAX_WEIGHT) + 1
    );
    while (
      itemList.find(
        (i) =>
          i.value === item.value && i.weight === item.weight && i.id === item.id
      )
    ) {
      item = itemFactory(
        Math.floor(Math.random() * MAX_VALUE),
        Math.floor(Math.random() * MAX_WEIGHT) + 1
      );
    }

    itemList.push(item);
  }

  return itemList;
}

// write to a json file
const fs = require("fs");
const items = generateItems();
fs.writeFileSync("./data/items.json", JSON.stringify(items));
