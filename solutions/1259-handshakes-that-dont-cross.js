/**
 * Handshakes That Dont Cross
 * Time Complexity: O((numPeople / 2)^2)
 * Space Complexity: O(numPeople / 2)
 */
var numberOfWays = function (numPeople) {
  const moduloValue = 1e9 + 7;
  const halfCount = numPeople / 2;
  const dynamicProgrammingTable = new Array(halfCount + 1).fill(0n);

  dynamicProgrammingTable[0] = 1n;

  for (let currentStep = 1; currentStep <= halfCount; currentStep++) {
    for (
      let partitionPoint = 0;
      partitionPoint < currentStep;
      partitionPoint++
    ) {
      const remainingSegment = currentStep - 1 - partitionPoint;
      const waysFromLeft = dynamicProgrammingTable[partitionPoint];
      const waysFromRight = dynamicProgrammingTable[remainingSegment];
      const productOfSubproblems = waysFromLeft * waysFromRight;

      const accumulatedValue = dynamicProgrammingTable[currentStep];
      const nextAccumulatedValue =
        (accumulatedValue + productOfSubproblems) % BigInt(moduloValue);

      dynamicProgrammingTable[currentStep] = nextAccumulatedValue;
    }
  }

  return Number(dynamicProgrammingTable[halfCount]);
};
