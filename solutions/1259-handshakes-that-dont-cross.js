/**
 * Handshakes That Dont Cross
 * Intuition: Non-crossing handshakes on 2n people are Catalan: person 0 pairs with an even-offset partner, splitting the circle into two independent subproblems. DP multiplies those ways mod 1e9+7.
 * Approach: 1. halfCount = numPeople/2. 2. dp[0]=1. 3. For currentStep 1..halfCount, sum dp[partition]*dp[currentStep-1-partition] over partitionPoint. 4. Return dp[halfCount] as Number.
 * Dry Run: numPeople = 2 -> halfCount=1. dp[1]=dp[0]*dp[0]=1. Return 1.
 *   numPeople = 4 -> dp[2]=dp[0]*dp[1]+dp[1]*dp[0]=2. Return 2.
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
