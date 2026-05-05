/**
 * Merge Triplets To Form Target Triplet
 * Time Complexity: O(N) where N is the number of triplets.
 * Space Complexity: O(1)
 */
var mergeTriplets = function (triplets, target) {
  let isXAttainable = false;
  let isYAttainable = false;
  let isZAttainable = false;

  const targetComponentOne = target[0];
  const targetComponentTwo = target[1];
  const targetComponentThree = target[2];

  const tripletCollectionLength = triplets.length;

  for (
    let loopCounter = 0;
    loopCounter < tripletCollectionLength;
    loopCounter++
  ) {
    const currentTripletDatum = triplets[loopCounter];
    const firstDatum = currentTripletDatum[0];
    const secondDatum = currentTripletDatum[1];
    const thirdDatum = currentTripletDatum[2];

    if (firstDatum > targetComponentOne) {
      continue;
    }
    if (secondDatum > targetComponentTwo) {
      continue;
    }
    if (thirdDatum > targetComponentThree) {
      continue;
    }

    if (firstDatum === targetComponentOne) {
      isXAttainable = true;
    }
    if (secondDatum === targetComponentTwo) {
      isYAttainable = true;
    }
    if (thirdDatum === targetComponentThree) {
      isZAttainable = true;
    }
  }

  return isXAttainable && isYAttainable && isZAttainable;
};
