function shuffle(list) {
  return list.sort(() => Math.random() - 0.5);
}

module.exports = shuffle;
