function dot(a, b) {
  return a.reduce((sum, val, i) => sum + val * b[i], 0);
}

function magnitude(vec) {
  return Math.sqrt(vec.reduce((sum, v) => sum + v * v, 0));
}

function cosine(vecA, vecB) {
  const m = magnitude(vecA) * magnitude(vecB);
  if (m === 0) return 0;
  return dot(vecA, vecB) / m;
}

function weightedScore({ skillScore, tfidfScore, embedScore }) {
  return (
    0.40 * skillScore +
    0.35 * tfidfScore +
    0.25 * embedScore
  );
}

module.exports = { cosine, weightedScore };
