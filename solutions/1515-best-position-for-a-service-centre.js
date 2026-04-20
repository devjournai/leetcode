/**
 * Best Position For A Service Centre
 * Time Complexity: O(I * N)
 * Space Complexity: O(1)
 */
var getMinDistSum = function (positionsInput) {
  const customerCount = positionsInput.length;

  let coordinateXSumInitial = 0;
  let coordinateYSumInitial = 0;

  for (let idxA = 0; idxA < customerCount; idxA++) {
    const currentCustomerCoord = positionsInput[idxA];
    const currentXValA = currentCustomerCoord[0];
    const currentYValA = currentCustomerCoord[1];
    coordinateXSumInitial += currentXValA;
    coordinateYSumInitial += currentYValA;
  }

  let finalServiceCentreX = coordinateXSumInitial / customerCount;
  let finalServiceCentreY = coordinateYSumInitial / customerCount;

  const acceptanceThreshold = 1e-7;
  const maximumAlgorithmIterations = 1000;

  for (
    let iterationIndex = 0;
    iterationIndex < maximumAlgorithmIterations;
    iterationIndex++
  ) {
    let numeratorForX = 0;
    let numeratorForY = 0;
    let denominatorTotalWeight = 0;

    for (let idxB = 0; idxB < customerCount; idxB++) {
      const customerPointB = positionsInput[idxB];
      const customerPointBX = customerPointB[0];
      const customerPointBY = customerPointB[1];

      const diffFromCurrentX = finalServiceCentreX - customerPointBX;
      const diffFromCurrentY = finalServiceCentreY - customerPointBY;
      const currentEuclideanDistance = Math.sqrt(
        diffFromCurrentX * diffFromCurrentX +
          diffFromCurrentY * diffFromCurrentY,
      );

      if (currentEuclideanDistance < acceptanceThreshold) {
        continue;
      }

      const inverseDistanceFactor = 1 / currentEuclideanDistance;
      numeratorForX += customerPointBX * inverseDistanceFactor;
      numeratorForY += customerPointBY * inverseDistanceFactor;
      denominatorTotalWeight += inverseDistanceFactor;
    }

    if (denominatorTotalWeight < acceptanceThreshold) {
      break;
    }

    const proposedNextX = numeratorForX / denominatorTotalWeight;
    const proposedNextY = numeratorForY / denominatorTotalWeight;

    const deltaChangeX = Math.abs(proposedNextX - finalServiceCentreX);
    const deltaChangeY = Math.abs(proposedNextY - finalServiceCentreY);

    if (
      deltaChangeX < acceptanceThreshold &&
      deltaChangeY < acceptanceThreshold
    ) {
      break;
    }

    finalServiceCentreX = proposedNextX;
    finalServiceCentreY = proposedNextY;
  }

  let overallMinimumDistanceSum = 0;

  for (let idxC = 0; idxC < customerCount; idxC++) {
    const finalCustomerLocation = positionsInput[idxC];
    const finalCustomerX = finalCustomerLocation[0];
    const finalCustomerY = finalCustomerLocation[1];

    const finalDiffX = finalServiceCentreX - finalCustomerX;
    const finalDiffY = finalServiceCentreY - finalCustomerY;
    overallMinimumDistanceSum += Math.sqrt(
      finalDiffX * finalDiffX + finalDiffY * finalDiffY,
    );
  }

  return overallMinimumDistanceSum;
};
