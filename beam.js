const { createInitialGeneration } = require("./services/generation");
const { NUMBER_OF_GENERATIONS, SORTED_POPULATION } = require("./config/index");

(() => {
  let population = createInitialGeneration();

  const auxPop = population;

  const highestFitnessItem = auxPop.sort((a, b) => b.fitness - a.fitness)[0];

  if (SORTED_POPULATION) {
    population.sort((a, b) => b.fitness - a.fitness);
  }

  function localBeamSearch(numberOfSolutions) {
    let currentSolutions = [];

    const generationFitnessList = [];

    for (let i = 0; i < numberOfSolutions; i++) {
      const randomIndex = Math.floor(Math.random() * population.length);
      currentSolutions.push(randomIndex);
    }

    for (let i = 0; i < NUMBER_OF_GENERATIONS; i++) {
      const candidates = [];

      // push all the current solutions neighbours to the candidates array
      for (let j = 0; j < currentSolutions.length; j++) {
        if (currentSolutions[j] - 1 >= 0) {
          candidates.push(currentSolutions[j] - 1);
        }

        if (currentSolutions[j] + 1 < population.length) {
          candidates.push(currentSolutions[j] + 1);
        }
      }

      // sort the candidates by fitness high to low
      candidates.sort((a, b) => {
        return population[b].fitness - population[a].fitness;
      });

      // update the current solutions with the best candidates
      for (let j = 0; j < currentSolutions.length; j++) {
        currentSolutions[j] = candidates[j];
      }

      const averageFitness =
        candidates.reduce((acc, curr) => acc + population[curr].fitness, 0) /
        candidates.length;

      generationFitnessList.push(averageFitness);
    }

    const totalAverageFitness =
      generationFitnessList.reduce((acc, curr) => acc + curr, 0) /
      NUMBER_OF_GENERATIONS;

    console.log("AVERAGE TOTAL FITNESS: ", totalAverageFitness);

    return currentSolutions;
  }

  const solution = localBeamSearch(4);

  console.log("Best INITAL fitness: ", highestFitnessItem.fitness);

  // show the best individual in solution
  const bestIndividual = population[solution[0]];

  console.log("Beam FINAL fitness: ", bestIndividual.fitness);
})();
