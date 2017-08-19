var calculateScore = rank => {
  let score = 0;
  if (!isNaN(rank)) {
    score = parseInt(rank) * 10;
  }
  return score;
}

module.exports =  calculateScore;
