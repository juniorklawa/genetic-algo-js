const generateItems = require("./generateItems");
const idGenerator = require("./idGenerator");
const INITIAL_POPULATION = 10;
const MAX_BACKPACK_WEIGHT = 100;
const NUMBER_OF_GENERATIONS = 3;

function getWeight(individual, items) {
  // let weight = 0;

  // for (let i = 0; i < individual.length; i++) {
  //   if (individual[i]) {
  //     weight += items[i].weight;
  //   }
  // }

  // return weight;
}

function getValue(individual, items) {
  // let value = 0;

  // for (let i = 0; i < individual.length; i++) {
  //   if (individual[i]) {
  //     value += items[i].value;
  //   }
  // }

  // return value;
}

function generateInitialIndividual(items, population) {
  // const id = idGenerator();
  // const individual = [];

  // while (
  //   population.find((i) => i.backpack.toString() === individual.toString())
  // ) {
  //   for (let i = 0; i < items.length; i++) {
  //     individual.push(Math.round(Math.random()));
  //   }
  // }

  // // get the weight of the individual and the value
  // const weight = getWeight(individual, items);
  // const value = getValue(individual, items);

  // return {
  //   id,
  //   backpack: individual,
  //   totalWeight: weight,
  //   totalValue: value,
  //   fitness: weight > MAX_BACKPACK_WEIGHT ? 0 : value,
  // };
}

function generateInitialPopulation(itemsList) {
  // const population = [];

  // for (let i = 0; i < INITIAL_POPULATION; i++) {
  //   population.push(generateInitialIndividual(itemsList, population));
  // }

  // return population;
}

function shuffle(list) {
  return list.sort(() => Math.random() - 0.5);
}

function crossover(parents, itemsList) {
  // console.log(parents.length);
  // const shuffledParents = shuffle(parents);
  // const children = [];

  // const firstHalf = shuffledParents.slice(0, shuffledParents.length / 2);
  // const secondHalf = shuffledParents.slice(shuffledParents.length / 2);

  // // crossover, get half of the first parent and half of the second parent
  // for (let i = 0; i < firstHalf.length; i++) {
  //   const firstParentBackpack = firstHalf[i].backpack;
  //   const secondParentBackpack = secondHalf[i].backpack;
  //   const firstHalfOfFirstParent = firstParentBackpack.slice(
  //     0,
  //     firstParentBackpack.length / 2
  //   );
  //   const secondHalfOfSecondParent = secondParentBackpack.slice(
  //     secondParentBackpack.length / 2
  //   );

  //   const firstChildBackpack = firstHalfOfFirstParent.concat(
  //     secondHalfOfSecondParent
  //   );
  //   const secondChildBackpack = secondHalfOfSecondParent.concat(
  //     firstHalfOfFirstParent
  //   );

  //   const firstChild = {
  //     id: idGenerator(),
  //     backpack: firstChildBackpack,
  //     totalWeight: getWeight(firstChildBackpack, itemsList),
  //     totalValue: getValue(firstChildBackpack, itemsList),
  //     fitness:
  //       getWeight(firstChildBackpack, itemsList) > MAX_BACKPACK_WEIGHT
  //         ? 0
  //         : getValue(firstChildBackpack, itemsList),
  //   };

  //   const secondChild = {
  //     id: idGenerator(),
  //     backpack: secondChildBackpack,
  //     totalWeight: getWeight(secondChildBackpack, itemsList),
  //     totalValue: getValue(secondChildBackpack, itemsList),
  //     fitness:
  //       getWeight(firstChildBackpack, itemsList) > MAX_BACKPACK_WEIGHT
  //         ? 0
  //         : getValue(secondChildBackpack, itemsList),
  //   };

  //   children.push(firstChild);
  //   children.push(secondChild);
  // }

  // return children;
}

function tournament(population) {
  // const shuffledPopulation = shuffle(population);

  // const parents = [];

  // const firstHalf = shuffledPopulation.slice(0, shuffledPopulation.length / 2);
  // const secondHalf = shuffledPopulation.slice(shuffledPopulation.length / 2);

  // for (let i = 0; i < firstHalf.length; i++) {
  //   if (firstHalf[i].fitness > secondHalf[i].fitness) {
  //     parents.push(firstHalf[i]);
  //   } else {
  //     parents.push(secondHalf[i]);
  //   }
  // }

  // return parents;
}

function main() {
  const itemsList = generateItems();
  let population = generateInitialPopulation(itemsList);

  for (let i = 0; i < NUMBER_OF_GENERATIONS; i++) {
    const parents = tournament(population);
    const children = crossover(parents, itemsList);
    console.log("children", children.length);
    population = children;
  }
}

main();
