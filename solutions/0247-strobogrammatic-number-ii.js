/**
 * Strobogrammatic Number II
 * Intuition: Build length-n strobo numbers from the inside out: wrap every valid inner string with a pair (0,0)/(1,1)/(6,9)/(8,8)/(9,6). Skip a leading 0 on the outermost wrap.
 * Approach: 1. Recurse on `currentLength`. 2. Base: length 0 → `[""]`; length 1 → `["0","1","8"]`. 3. Recurse for length-2, then wrap each inner string with each pair. 4. If wrapping the original `n`, skip pair `["0","0"]`. 5. Return the helper’s list.
 * Dry Run: n = 2.
 *   - Inner length 0 is [""]. Outer wraps: skip 00; emit 11, 69, 88, 96. Return those four.
 * Time Complexity: O(5^(n/2) * n)
 * Space Complexity: O(5^(n/2) * n)
 */
var findStrobogrammatic = function (n) {
  const strobogrammaticPairs = [
    ["0", "0"],
    ["1", "1"],
    ["6", "9"],
    ["8", "8"],
    ["9", "6"],
  ];

  function recursiveHelper(currentLength, initialLength) {
    if (currentLength === 0) {
      return [""];
    } else if (currentLength === 1) {
      return ["0", "1", "8"];
    } else {
      const outcomeCollection = [];
      const innerStrobos = recursiveHelper(currentLength - 2, initialLength);

      for (
        let pairIndex = 0;
        pairIndex < strobogrammaticPairs.length;
        pairIndex++
      ) {
        const currentPair = strobogrammaticPairs[pairIndex];
        const firstDigit = currentPair[0];
        const secondDigit = currentPair[1];

        if (currentLength === initialLength && firstDigit === "0") {
          continue;
        }

        for (
          let subNumberIndex = 0;
          subNumberIndex < innerStrobos.length;
          subNumberIndex++
        ) {
          const currentSubNumber = innerStrobos[subNumberIndex];
          const assembledNumber = firstDigit + currentSubNumber + secondDigit;
          outcomeCollection.push(assembledNumber);
        }
      }
      return outcomeCollection;
    }
  }

  const resultFromHelper = recursiveHelper(n, n);
  return resultFromHelper;
};
