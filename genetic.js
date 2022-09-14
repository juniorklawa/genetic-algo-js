const { createInitialGeneration, evolute } = require("./services/generation");
const { SORTED_POPULATION } = require("./config/index");

(() => {
  let population = createInitialGeneration();

  const auxPop = population;

  const highestFitnessItem = auxPop.sort((a, b) => b.fitness - a.fitness)[0];

  if (SORTED_POPULATION) {
    population.sort((a, b) => b.fitness - a.fitness);
  }

  population = evolute(population, true);
  console.log("----------------------------------");

  console.log("Best INITAL fitness: ", highestFitnessItem.fitness);

  // sort the population by fitness high to low
  population.sort((a, b) => {
    return b.fitness - a.fitness;
  });
  // show the best individual in population
  console.log("Beam FINAL fitness: ", population[0].fitness);
})();
