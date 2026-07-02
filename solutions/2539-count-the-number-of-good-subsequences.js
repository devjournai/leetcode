/**
 * Count The Number Of Good Subsequences
 * Intuition: A "good subsequence" has all its characters appearing with the same frequency 'k'. We can count these by iterating over all possible 'k' values, from 1 up to the maximum character frequency present in the original string. For a fixed 'k', we consider each distinct character type present in the string. For a character that appears 'F' times in the original string, we have two choices: either we do not include it in our current good subsequence (with frequency 'k'), or we include it exactly 'k' times. The number of ways to pick 'k' instances of a character that appears 'F' times is given by the binomial coefficient C(F, k). Therefore, for each character, we have (1 + C(F, k)) options. The total number of ways to form character sets for a fixed 'k' is the product of these options across all distinct character types. Since good subsequences must be non-empty, we subtract 1 from this product for each 'k' to exclude the case where no characters are chosen. The final answer is the sum of these non-empty counts for all valid 'k'.
 * Approach: 1. Initialize constants for modulo operation and string length. 2. Create an array `charCounts` to store the frequency of each character ('a' through 'z') in the input string `s`. 3. Find `highestFrequency`, the maximum frequency among all characters. 4. Precompute all factorials modulo `moduloConstant` up to `stringLength` using a memoized recursive helper function `calculateFactorial`. 5. Implement a modular exponentiation helper function `powerFunc` for `a^b % m`. 6. Implement a modular inverse helper function `modularInverse` using `powerFunc` and Fermat's Little Theorem. 7. Implement a combinations helper function `combinationsNck(n, k)` using the precomputed factorials and modular inverse. 8. Initialize `totalGoodSubsequences` to 0. 9. Iterate `targetFrequencyK` from 1 up to `highestFrequency`. 10. Inside this loop, initialize `productAccumulator` to 1. 11. Iterate through `charCounts` (for each character type). If a character's frequency (`currentCharacterFrequency`) is greater than or equal to `targetFrequencyK`, calculate `combinationsForChar = combinationsNck(currentCharacterFrequency, targetFrequencyK)`. Update `productAccumulator = (productAccumulator * (1 + combinationsForChar)) % moduloConstant`. 12. After the inner loop, add `(productAccumulator - 1 + moduloConstant) % moduloConstant` to `totalGoodSubsequences` (subtracting 1 to exclude the empty subsequence). 13. Return `totalGoodSubsequences` as a Number.
 * Dry Run: s = "aaabb"
 * stringLength = 5, moduloConstant = 1000000007
 * charCounts: ['a': 3, 'b': 2, 'c'-'z': 0]
 * highestFrequency = 3
 * factorialValues array initialized for memoization.
 * totalGoodSubsequences = 0n
 *
 * targetFrequencyK = 1:
 *   productAccumulator = 1n
 *   - charTypeIndex 0 ('a'): charCounts[0]=3. 3 >= 1. combinationsNck(3,1)=3n. term=(1n+3n)=4n. productAccumulator=(1n*4n)%MOD=4n.
 *   - charTypeIndex 1 ('b'): charCounts[1]=2. 2 >= 1. combinationsNck(2,1)=2n. term=(1n+2n)=3n. productAccumulator=(4n*3n)%MOD=12n.
 *   - Other charTypeIndexes: charCounts are 0, skip.
 *   totalGoodSubsequences = (0n + 12n - 1n + MOD) % MOD = 11n. (Corresponds to: 3 'a's, 2 'b's, 6 'ab's).
 *
 * targetFrequencyK = 2:
 *   productAccumulator = 1n
 *   - charTypeIndex 0 ('a'): charCounts[0]=3. 3 >= 2. combinationsNck(3,2)=3n. term=(1n+3n)=4n. productAccumulator=(1n*4n)%MOD=4n.
 *   - charTypeIndex 1 ('b'): charCounts[1]=2. 2 >= 2. combinationsNck(2,2)=1n. term=(1n+1n)=2n. productAccumulator=(4n*2n)%MOD=8n.
 *   - Other charTypeIndexes: charCounts are 0, skip.
 *   totalGoodSubsequences = (11n + 8n - 1n + MOD) % MOD = 18n. (Corresponds to: 3 'aa's, 1 'bb', 3 'aabb's -> total 7. 11+7=18).
 *
 * targetFrequencyK = 3:
 *   productAccumulator = 1n
 *   - charTypeIndex 0 ('a'): charCounts[0]=3. 3 >= 3. combinationsNck(3,3)=1n. term=(1n+1n)=2n. productAccumulator=(1n*2n)%MOD=2n.
 *   - charTypeIndex 1 ('b'): charCounts[1]=2. 2 < 3, skip.
 *   - Other charTypeIndexes: charCounts are 0, skip.
 *   totalGoodSubsequences = (18n + 2n - 1n + MOD) % MOD = 19n. (Corresponds to: 1 'aaa'. 18+1=19).
 *
 * Final Result: 19.
 * Time Complexity: O(N + maxFreq * ALPHABET_SIZE * log(MOD))
 * Space Complexity: O(N)
 */
var countGoodSubsequences = function (s) {
  const moduloConstant = 1e9 + 7;
  const stringLength = s.length;

  const charCounts = new Array(26).fill(0);
  let highestFrequency = 0;

  for (let charIndex = 0; charIndex < stringLength; charIndex++) {
    charCounts[s.charCodeAt(charIndex) - 97]++;
  }

  for (let currentCode = 0; currentCode < 26; currentCode++) {
    if (charCounts[currentCode] > highestFrequency) {
      highestFrequency = charCounts[currentCode];
    }
  }

  const factorialValues = new Array(stringLength + 1);

  function powerFunc(baseVal, exponentVal) {
    let outcomeResult = 1n;
    let currentBase = BigInt(baseVal) % BigInt(moduloConstant);
    let currentExponent = BigInt(exponentVal);

    while (currentExponent > 0n) {
      if (currentExponent & 1n) {
        outcomeResult = (outcomeResult * currentBase) % BigInt(moduloConstant);
      }
      currentBase = (currentBase * currentBase) % BigInt(moduloConstant);
      currentExponent >>= 1n;
    }
    return outcomeResult;
  }

  function modularInverse(numberToInverse) {
    return powerFunc(numberToInverse, moduloConstant - 2);
  }

  function calculateFactorial(valueInput) {
    if (factorialValues[valueInput] !== undefined) {
      return factorialValues[valueInput];
    }
    if (valueInput === 0) {
      factorialValues[valueInput] = 1n;
    } else {
      factorialValues[valueInput] =
        (calculateFactorial(valueInput - 1) * BigInt(valueInput)) %
        BigInt(moduloConstant);
    }
    return factorialValues[valueInput];
  }

  function combinationsNck(setN, chooseK) {
    if (setN < chooseK) return 0n;
    if (setN === chooseK || chooseK === 0) return 1n;

    let numeratorValue = calculateFactorial(setN);
    let denominatorTerm1 = modularInverse(calculateFactorial(chooseK));
    let denominatorTerm2 = modularInverse(calculateFactorial(setN - chooseK));

    let finalCombinationResult =
      (numeratorValue * denominatorTerm1) % BigInt(moduloConstant);
    finalCombinationResult =
      (finalCombinationResult * denominatorTerm2) % BigInt(moduloConstant);
    return finalCombinationResult;
  }

  let totalGoodSubsequences = 0n;

  for (
    let targetFrequencyK = 1;
    targetFrequencyK <= highestFrequency;
    targetFrequencyK++
  ) {
    let productAccumulator = 1n;

    for (let charTypeIndex = 0; charTypeIndex < 26; charTypeIndex++) {
      let currentCharacterFrequency = charCounts[charTypeIndex];

      if (currentCharacterFrequency >= targetFrequencyK) {
        let combinationsForChar = combinationsNck(
          currentCharacterFrequency,
          targetFrequencyK,
        );
        let termForProduct =
          (1n + combinationsForChar) % BigInt(moduloConstant);
        productAccumulator =
          (productAccumulator * termForProduct) % BigInt(moduloConstant);
      }
    }
    totalGoodSubsequences =
      (totalGoodSubsequences +
        productAccumulator -
        1n +
        BigInt(moduloConstant)) %
      BigInt(moduloConstant);
  }

  return Number(totalGoodSubsequences);
};
