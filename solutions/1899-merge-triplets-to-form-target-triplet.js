/**
 * Merge Triplets To Form Target Triplet
 * Intuition: Merge takes component-wise max. Any triplet with a coordinate larger than target is unusable. You can form target iff each target coordinate appears in some remaining triplet.
 * Approach: 1. Skip triplets that exceed any target component. 2. Set isX/Y/ZAttainable when a remaining triplet matches that component. 3. Return all three flags.
 * Dry Run: triplets=[[2,5,3],[1,8,4],[1,7,5]], target=[2,7,5]. Valid ones give x=2, y=7, z=5. Return true.
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
