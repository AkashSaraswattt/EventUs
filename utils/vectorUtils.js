const vocab = require("../data/vocab.json");


function toVector(words) {
  const vec = new Array(vocab.length).fill(0);

  words.forEach(w => {
    const index = vocab.indexOf(w.toLowerCase());
    if (index !== -1) vec[index] = 1;
  });

  return vec;
}

function dot(a, b) {
  return a.reduce((sum, val, i) => sum + val * b[i], 0);
}


function magnitude(vec) {
  return Math.sqrt(vec.reduce((s, v) => s + v * v, 0));
}


function cosine(v1, v2) {
  const mag = magnitude(v1) * magnitude(v2);
  if (mag === 0) return 0;
  return dot(v1, v2) / mag;
}

module.exports = { toVector, cosine };
