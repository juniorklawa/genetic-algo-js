const { MUTATION_RATE, CROSSOVER_RATE } = require("../config");
const shuffle = require("../utils/shuffle");
const individualFactory = require("./individualFactory");

function fillCrossoverBackpack(parentA, parentB) {
  const child = [];

  for (let i = 0; i < parentA.length; i++) {
    child.push(Math.round(Math.random()) ? parentA[i] : parentB[i]);
  }

  return child;
}

function mutate(backpack) {
  const index = Math.floor(Math.random() * backpack.length);

  backpack[index] = !backpack[index];

  return backpack;
}

function crossover(parents) {
  // generate the same number of children as the number of parents
  const children = [];

  const shuffledParents = shuffle(parents);

  for (let i = 0; i < parents.length; i++) {
    let firstBackpack = [];
    let secondBackpack = [];

    const currentParent = shuffledParents[i];

    // get a random element from shuffledParents that is not the current parent
    const secondParent = shuffledParents.find((p) => p.id !== currentParent.id);

    if (Math.random() < CROSSOVER_RATE) {
      firstBackpack = fillCrossoverBackpack(
        currentParent.backpack,
        secondParent.backpack
      );
      secondBackpack = fillCrossoverBackpack(
        secondParent.backpack,
        currentParent.backpack
      );
    } else {
      firstBackpack = currentParent.backpack;
      secondBackpack = secondParent.backpack;
    }

    if (Math.random() < MUTATION_RATE) {
      firstBackpack = mutate(firstBackpack);
    }

    if (Math.random() < MUTATION_RATE) {
      secondBackpack = mutate(secondBackpack);
    }

    const firstChild = individualFactory(firstBackpack);
    const secondChild = individualFactory(secondBackpack);

    children.push(firstChild);
    children.push(secondChild);
  }

  // remove the worst child and keep the best parent
  const bestParent = parents.sort((a, b) => b.fitness - a.fitness)[0];

  children.sort((a, b) => b.fitness - a.fitness);

  children.pop();

  children.push(bestParent);

  return shuffle(children);
}

module.exports = crossover;
