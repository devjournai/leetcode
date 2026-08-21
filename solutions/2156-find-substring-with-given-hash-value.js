/**
 * Find Substring With Given Hash Value
 * Intuition: The problem requires finding a substring whose hash value matches a target. The hash function involves multiplying character values by increasing powers of `power` (p^0, p^1, p^2, ...), modulo `modulo`. A direct rolling hash (O(N)) for this specific hash definition, when sliding the window from left to right, would typically require a modular multiplicative inverse of `power`. However, the problem constraints do not guarantee that `power` and `modulo` are coprime, making modular inverse potentially unavailable. Therefore, a straightforward approach of calculating the hash for each `k`-length substring and comparing it with the target hash value is used.
 * Approach:
 * 1. Initialize `basePower`, `modulusValue`, and `targetHash` as `BigInt` to handle large numbers and ensure correct modular arithmetic.
 * 2. Precompute the powers of `basePower` up to `basePower^(substringLength-1)` modulo `modulusValue` and store them in an array (e.g., `powerCoefficients[j]` stores `basePower^j % modulusValue`). This allows for efficient hash calculation within each window.
 * 3. Iterate through all possible starting positions (`windowBeginIndex`) for substrings of length `substringLength`, from `0` to `inputString.length - substringLength`.
 * 4. For each `windowBeginIndex`, calculate the hash of the corresponding substring `inputString.substring(windowBeginIndex, windowBeginIndex + substringLength)`:
 *    a. Initialize `currentWindowHash` to `0n`.
 *    b. Iterate from `charPositionInWindow` `0` to `substringLength - 1`.
 *    c. Get the character value `charNumericValue` for `inputString[windowBeginIndex + charPositionInWindow]` (1 for 'a', 2 for 'b', etc.).
 *    d. Add `charNumericValue * powerCoefficients[charPositionInWindow]` to `currentWindowHash`, taking modulo `modulusValue`.
 * 5. After calculating `currentWindowHash` for the current substring, compare it with `targetHash`.
 * 6. If they match, return the substring `inputString.substring(windowBeginIndex, windowBeginIndex + substringLength)`.
 * 7. The problem guarantees that an answer always exists, so this process will always find and return a string.
 * Dry Run: s="fbxzaad", power=31, modulo=100, k=3, hashValue=32
 * String length N=7, Substring length K=3
 * `inputString = "fbxzaad"`, `basePower = 31n`, `modulusValue = 100n`, `substringLength = 3`, `targetHash = 32n`
 * `charAOffset = 'a'.charCodeAt(0)`
 *
 * 1. Precompute `powerCoefficients` array:
 *    `powerCoefficients = new Array(3)`
 *    `powerCoefficients[0] = 1n` (31^0 % 100)
 *    `powerCoefficientIndex = 1`:
 *      `powerCoefficients[1] = (powerCoefficients[0] * basePower) % modulusValue = (1n * 31n) % 100n = 31n` (31^1 % 100)
 *    `powerCoefficientIndex = 2`:
 *      `powerCoefficients[2] = (powerCoefficients[1] * basePower) % modulusValue = (31n * 31n) % 100n = 961n % 100n = 61n` (31^2 % 100)
 *    `powerCoefficients` is now `[1n, 31n, 61n]`
 *
 * 2. Iterate `windowBeginIndex` from `0` to `inputString.length - substringLength` (0 to 7-3 = 4):
 *
 *    `windowBeginIndex = 0`: Substring `inputString[0..2]` is "fbx"
 *      `currentWindowHash = 0n`
 *      `charPositionInWindow = 0`: Character `inputString[0]` is 'f'. `charNumericValue = 'f'.charCodeAt(0) - charAOffset + 1 = 6`.
 *        `currentWindowHash = (0n + 6n * powerCoefficients[0]) % 100n = (0n + 6n * 1n) % 100n = 6n`
 *      `charPositionInWindow = 1`: Character `inputString[1]` is 'b'. `charNumericValue = 'b'.charCodeAt(0) - charAOffset + 1 = 2`.
 *        `currentWindowHash = (6n + 2n * powerCoefficients[1]) % 100n = (6n + 2n * 31n) % 100n = (6n + 62n) % 100n = 68n`
 *      `charPositionInWindow = 2`: Character `inputString[2]` is 'x'. `charNumericValue = 'x'.charCodeAt(0) - charAOffset + 1 = 24`.
 *        `currentWindowHash = (68n + 24n * powerCoefficients[2]) % 100n = (68n + 24n * 61n) % 100n = (68n + 1464n) % 100n = (68n + 64n) % 100n = 132n % 100n = 32n`
 *      Compare `currentWindowHash (32n)` with `targetHash (32n)`. They match!
 *      Return `inputString.substring(0, 3)` which is "fbx".
 *
 * Time Complexity: O(N*K)
 * Space Complexity: O(K)
 */
var subStrHash = function (s, power, modulo, k, hashValue) {
  const charAOffset = "a".charCodeAt(0);

  const basePower = BigInt(power);
  const modulusValue = BigInt(modulo);
  const substringLength = k;
  const targetHash = BigInt(hashValue);
  const stringLength = s.length;

  const powerCoefficients = new Array(substringLength);
  powerCoefficients[0] = 1n;
  for (
    let powerCoefficientIndex = 1;
    powerCoefficientIndex < substringLength;
    powerCoefficientIndex++
  ) {
    powerCoefficients[powerCoefficientIndex] =
      (powerCoefficients[powerCoefficientIndex - 1] * basePower) % modulusValue;
  }

  for (
    let windowBeginIndex = 0;
    windowBeginIndex <= stringLength - substringLength;
    windowBeginIndex++
  ) {
    let currentWindowHash = 0n;
    for (
      let charPositionInWindow = 0;
      charPositionInWindow < substringLength;
      charPositionInWindow++
    ) {
      const charNumericValue = BigInt(
        s.charCodeAt(windowBeginIndex + charPositionInWindow) - charAOffset + 1
      );
      currentWindowHash =
        (currentWindowHash +
          charNumericValue * powerCoefficients[charPositionInWindow]) %
        modulusValue;
    }

    if (currentWindowHash === targetHash) {
      return s.substring(windowBeginIndex, windowBeginIndex + substringLength);
    }
  }

  // This line should technically not be reached as problem guarantees an answer always exists.
  return "";
};
