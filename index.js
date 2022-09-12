const idGenerator = require("./idGenerator");
const INITIAL_POPULATION = 500;
const MAX_BACKPACK_WEIGHT = 500;
const NUMBER_OF_GENERATIONS = 50;

const REPRODUCTION_RATE = 0.15;
const CROSSOVER_RATE = 0.53;
const MUTATION_RATE = 0.05;

function getWeight(backpack, items) {
  let weight = 0;

  for (let i = 0; i < backpack.length; i++) {
    if (backpack[i]) {
      weight += items[i].weight;
    }
  }

  return weight;
}

function getValue(backpack, items) {
  let value = 0;

  for (let i = 0; i < backpack.length; i++) {
    if (backpack[i]) {
      value += items[i].value;
    }
  }

  return value;
}

function generateIndividual(itemsList, population) {
  const id = idGenerator();
  const backpack = [];

  while (
    population.find((i) => i.backpack.toString() === backpack.toString())
  ) {
    for (let i = 0; i < itemsList.length; i++) {
      backpack.push(Math.round(Math.random()));
    }
  }

  // get the weight of the individual and the value
  const weight = getWeight(backpack, itemsList);
  const value = getValue(backpack, itemsList);

  return {
    id,
    backpack,
    totalWeight: weight,
    totalValue: value,
    fitness: weight > MAX_BACKPACK_WEIGHT ? 0 : value,
  };
}

function generateInitialPopulation(itemsList) {
  const population = [];

  for (let i = 0; i < INITIAL_POPULATION; i++) {
    population.push(generateIndividual(itemsList, population));
  }

  return population;
}

function shuffle(list) {
  return list.sort(() => Math.random() - 0.5);
}

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

function crossover(parents, itemsList) {
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

    const firstChild = {
      id: idGenerator(),
      backpack: firstBackpack,
      totalWeight: getWeight(firstBackpack, itemsList),
      totalValue: getValue(firstBackpack, itemsList),
      fitness:
        getWeight(firstBackpack, itemsList) > MAX_BACKPACK_WEIGHT
          ? 0
          : getValue(firstBackpack, itemsList),
    };

    const secondChild = {
      id: idGenerator(),
      backpack: secondBackpack,
      totalWeight: getWeight(secondBackpack, itemsList),
      totalValue: getValue(secondBackpack, itemsList),
      fitness:
        getWeight(secondBackpack, itemsList) > MAX_BACKPACK_WEIGHT
          ? 0
          : getValue(secondBackpack, itemsList),
    };

    children.push(firstChild);
    children.push(secondChild);
  }

  return children;
}

function tournament(population) {
  const shuffledPopulation = shuffle(population);

  const parents = [];

  const firstHalf = shuffledPopulation.slice(0, shuffledPopulation.length / 2);
  const secondHalf = shuffledPopulation.slice(shuffledPopulation.length / 2);

  for (let i = 0; i < firstHalf.length; i++) {
    if (firstHalf[i].fitness > secondHalf[i].fitness) {
      parents.push(firstHalf[i]);
    } else {
      parents.push(secondHalf[i]);
    }
  }
  return parents;
}

function nextGeneration(population, itemsList) {
  const children = [];

  while (children.length < population.length) {
    const parents = tournament(population);
    const newChildren = crossover(parents, itemsList);

    children.push(...newChildren);
  }

  return children;
}

(() => {
  // read from items.json
  const itemsList = require("./items.json");

  let population = generateInitialPopulation(itemsList);
  for (let i = 0; i < NUMBER_OF_GENERATIONS; i++) {
    population = nextGeneration(population, itemsList);

    // the best individual
    const bestIndividual = population.sort((a, b) => b.fitness - a.fitness)[0];

    // get the average fitness of the population
    const averageFitness =
      population.reduce((acc, curr) => acc + curr.fitness, 0) /
      population.length;

    console.log(
      `Generation:${i}: Best fitness: ${bestIndividual.fitness}, Average fitness: ${averageFitness}`
    );
  }
})();
