/**
 * Strobogrammatic Number II
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
