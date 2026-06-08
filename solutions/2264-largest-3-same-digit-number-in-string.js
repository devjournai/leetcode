/**
 * Largest 3 Same Digit Number In String
 * Intuition: A "good" integer is a 3-digit substring with identical digits. To find the largest, we can iterate through all possible 3-digit substrings, check if they are "good", and keep track of the largest one encountered using lexicographical string comparison which correctly orders "999" > "888" etc.
 * Approach: 1. Initialize a `largestGoodSubstring` variable to an empty string. 2. Iterate `currentScanIndex` from the beginning of the input string `num` up to `num.length - 3` to cover all possible starting positions for 3-digit substrings. 3. For each `currentScanIndex`, extract `charOne`, `charTwo`, and `charThree` at `currentScanIndex`, `currentScanIndex + 1`, and `currentScanIndex + 2` respectively. 4. Check if `charOne`, `charTwo`, and `charThree` are all equal. 5. If they are equal, construct `currentValidSubstring` from these three characters. 6. Compare `currentValidSubstring` with `largestGoodSubstring`; if `currentValidSubstring` is lexicographically greater, update `largestGoodSubstring`. 7. After the loop completes, return the final `largestGoodSubstring`.
 * Dry Run: num = "6777133339"
 * 1. `largestGoodSubstring` = ""
 * 2. `currentScanIndex` loop (from 0 to 7):
 *    - `currentScanIndex` = 0: `charOne`=6, `charTwo`=7, `charThree`=7. Not equal.
 *    - `currentScanIndex` = 1: `charOne`=7, `charTwo`=7, `charThree`=7. Equal! `currentValidSubstring`="777". `largestGoodSubstring` ("") < "777", so `largestGoodSubstring` becomes "777".
 *    - `currentScanIndex` = 2: `charOne`=7, `charTwo`=7, `charThree`=1. Not equal.
 *    - `currentScanIndex` = 3: `charOne`=7, `charTwo`=1, `charThree`=3. Not equal.
 *    - `currentScanIndex` = 4: `charOne`=1, `charTwo`=3, `charThree`=3. Not equal.
 *    - `currentScanIndex` = 5: `charOne`=3, `charTwo`=3, `charThree`=3. Equal! `currentValidSubstring`="333". `largestGoodSubstring` ("777") > "333", so `largestGoodSubstring` remains "777".
 *    - `currentScanIndex` = 6: `charOne`=3, `charTwo`=3, `charThree`=3. Equal! `currentValidSubstring`="333". `largestGoodSubstring` ("777") > "333", so `largestGoodSubstring` remains "777".
 *    - `currentScanIndex` = 7: `charOne`=3, `charTwo`=3, `charThree`=9. Not equal.
 * 3. Loop finishes.
 * 4. Return `largestGoodSubstring` ("777").
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var largestGoodInteger = function (num) {
  let largestGoodSubstring = "";
  const totalLength = num.length;

  for (
    let currentScanIndex = 0;
    currentScanIndex <= totalLength - 3;
    currentScanIndex++
  ) {
    const charOne = num[currentScanIndex];
    const charTwo = num[currentScanIndex + 1];
    const charThree = num[currentScanIndex + 2];

    if (charOne === charTwo && charTwo === charThree) {
      const currentValidSubstring = charOne + charTwo + charThree;
      if (currentValidSubstring > largestGoodSubstring) {
        largestGoodSubstring = currentValidSubstring;
      }
    }
  }

  return largestGoodSubstring;
};
