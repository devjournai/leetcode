/**
 * Minimum Number Of Operations To Make String Sorted
 * Time Complexity: O(N * log(MOD))
 * Space Complexity: O(N)
 */
var makeStringSorted = function (s) {
  const modulus = 1000000007;
  const stringLength = s.length;

  const factStorage = new Array(stringLength + 1).fill(1n);
  const invStorage = new Array(stringLength + 1).fill(1n);

  function getModInverse(valueA, modValueM) {
    const originalModulus = modValueM;
    let xValZero = 0n;
    let xValOne = 1n;
    let aVal = valueA;
    let bVal = modValueM;

    while (aVal > 1n) {
      let intermediateQ = aVal / bVal;
      [aVal, bVal] = [bVal, aVal % bVal];
      [xValZero, xValOne] = [xValOne - intermediateQ * xValZero, xValZero];
    }
    return xValOne < 0n ? xValOne + originalModulus : xValOne;
  }

  for (
    let loopCounterOne = 2;
    loopCounterOne <= stringLength;
    loopCounterOne++
  ) {
    factStorage[loopCounterOne] =
      (factStorage[loopCounterOne - 1] * BigInt(loopCounterOne)) %
      BigInt(modulus);
  }

  for (
    let loopCounterTwo = 1;
    loopCounterTwo <= stringLength;
    loopCounterTwo++
  ) {
    invStorage[loopCounterTwo] = getModInverse(
      factStorage[loopCounterTwo],
      BigInt(modulus),
    );
  }

  let finalResult = 0n;
  const characterFrequencies = new Array(26).fill(0);

  for (
    let mainLoopIndex = stringLength - 1;
    mainLoopIndex >= 0;
    mainLoopIndex--
  ) {
    const currentCharCode = s.charCodeAt(mainLoopIndex) - 97;

    characterFrequencies[currentCharCode]++;

    let charCountSum = 0;
    for (
      let innerLoopIndex = 0;
      innerLoopIndex < currentCharCode;
      innerLoopIndex++
    ) {
      charCountSum += characterFrequencies[innerLoopIndex];
    }

    let currentPermutations = factStorage[stringLength - mainLoopIndex - 1];

    for (let frequencyValue of characterFrequencies) {
      currentPermutations =
        (currentPermutations * invStorage[frequencyValue]) % BigInt(modulus);
    }

    finalResult =
      (finalResult + BigInt(charCountSum) * currentPermutations) %
      BigInt(modulus);
  }

  return Number(finalResult);
};
