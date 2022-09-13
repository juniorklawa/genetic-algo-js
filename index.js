const { createInitialGeneration, evolute } = require("./services/generation");

(() => {
  let population = createInitialGeneration();

  population = evolute(population, true);
})();
