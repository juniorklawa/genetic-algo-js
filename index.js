const {
  nextGeneration,
  createInitialGeneration,
  evolute,
} = require("./services/generation");

const { NUMBER_OF_GENERATIONS } = require("./config");

(() => {
  let population = createInitialGeneration();

  population = evolute(population, true);
})();
