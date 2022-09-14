const { INITIAL_POPULATION, NUMBER_OF_GENERATIONS } = require("../config");
const individualFactory = require("./individualFactory");
const shuffle = require("../utils/shuffle");
const crossover = require("./crossover");

function evolute(population, generationLog) {
  let evolutedPopulation = population;

  for (let i = 0; i < NUMBER_OF_GENERATIONS; i++) {
    evolutedPopulation = nextGeneration(evolutedPopulation);

    if (generationLog) {
      const bestIndividual = evolutedPopulation.sort(
        (a, b) => b.fitness - a.fitness
      )[0];

      const averageFitness =
        evolutedPopulation.reduce((acc, curr) => acc + curr.fitness, 0) /
        evolutedPopulation.length;

      console.log(
        `Generation:${i}: Best fitness: ${bestIndividual.fitness}, Average fitness: ${averageFitness}`
      );
    }
  }

  return evolutedPopulation;
}

function createInitialGeneration() {
  const itemsList = require("../data/items.json");
  const population = [];

  for (let i = 0; i < INITIAL_POPULATION; i++) {
    const backpack = [];

    for (let j = 0; j < itemsList.length; j++) {
      backpack.push(Math.round(Math.random()));
    }

    const individual = individualFactory(backpack);

    population.push(individual);
  }

  return population;
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

module.exports = {
  createInitialGeneration,
  nextGeneration,
  evolute,
};
