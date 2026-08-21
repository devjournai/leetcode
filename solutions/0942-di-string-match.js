/**
 * Di String Match
 * Intuition: `I` wants a smaller next value, so emit the current low; `D` wants a larger next, so emit the current high. The leftover low/high (equal) fills the last slot.
 * Approach: 1. low=0, high=n. 2. For each char, push low++ on I else high--. 3. Push remaining `currentLow`. Return the permutation.
 * Dry Run: "ID". I→0 (low=1), D→2 (high=1), leftover 1 → [0,2,1].
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var diStringMatch = function (inputString) {
  const permutationArray = [];
  let currentLow = 0;
  let currentHigh = inputString.length;

  for (let stringIndex = 0; stringIndex < inputString.length; stringIndex++) {
    const currentCharacter = inputString[stringIndex];

    if (currentCharacter === "I") {
      permutationArray.push(currentLow);
      currentLow++;
    } else {
      permutationArray.push(currentHigh);
      currentHigh--;
    }
  }

  permutationArray.push(currentLow);

  return permutationArray;
};
