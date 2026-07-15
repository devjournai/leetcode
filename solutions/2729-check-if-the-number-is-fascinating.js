/**
 * Check If The Number Is Fascinating
 * Intuition: Convert the given number and its first two multiples into a single string. Then, verify that this combined string has exactly 9 digits, contains no zeros, and has no duplicate digits from 1 to 9. If all these conditions are met, the number is fascinating.
 * Approach: 1. Calculate the first multiple (n itself), the second multiple (2 * n), and the third multiple (3 * n). 2. Concatenate these three numerical values into a single string. 3. Perform an initial check: if the length of this concatenated string is not exactly 9, the number cannot be fascinating, so return false. 4. Initialize a boolean array of size 10 (indexed 0-9) to keep track of which digits have been encountered, initially all set to false. 5. Iterate through each character of the concatenated string: a. Convert the current character to its integer (numeric) value. b. Check if this numeric value is 0. If it is, the string contains a 0, so return false. c. Check if this numeric value has already been marked as seen in the boolean array. If it has, it means a digit is duplicated, so return false. d. Mark the current numeric value as seen in the boolean array by setting its corresponding index to true. 6. If the loop completes without any of the above conditions causing an early return (i.e., no zeros, no duplicates, and the length was 9), then the number is fascinating, so return true.
 * Dry Run: For n = 192:
 * multipleOne = 192
 * multipleTwo = 2 * 192 = 384
 * multipleThree = 3 * 192 = 576
 * aggregateString = "192" + "384" + "576" = "192384576"
 * aggregateString.length is 9. (Condition met)
 * digitPresenceArray = [false, false, false, false, false, false, false, false, false, false]
 * Iterate aggregateString:
 * '1': numericValue = 1. Is not 0. digitPresenceArray[1] is false. Set digitPresenceArray[1] = true.
 * '9': numericValue = 9. Is not 0. digitPresenceArray[9] is false. Set digitPresenceArray[9] = true.
 * '2': numericValue = 2. Is not 0. digitPresenceArray[2] is false. Set digitPresenceArray[2] = true.
 * '3': numericValue = 3. Is not 0. digitPresenceArray[3] is false. Set digitPresenceArray[3] = true.
 * '8': numericValue = 8. Is not 0. digitPresenceArray[8] is false. Set digitPresenceArray[8] = true.
 * '4': numericValue = 4. Is not 0. digitPresenceArray[4] is false. Set digitPresenceArray[4] = true.
 * '5': numericValue = 5. Is not 0. digitPresenceArray[5] is false. Set digitPresenceArray[5] = true.
 * '7': numericValue = 7. Is not 0. digitPresenceArray[7] is false. Set digitPresenceArray[7] = true.
 * '6': numericValue = 6. Is not 0. digitPresenceArray[6] is false. Set digitPresenceArray[6] = true.
 * The loop completes. All checks passed. Return true.
 * Time Complexity: O(1)
 * Space Complexity: O(1)
 */
var isFascinating = function (n) {
  const multipleOne = n;
  const multipleTwo = 2 * n;
  const multipleThree = 3 * n;

  const aggregateString = `${multipleOne}${multipleTwo}${multipleThree}`;

  if (aggregateString.length !== 9) {
    return false;
  }

  const digitPresenceArray = new Array(10).fill(false);

  for (let charRepresentation of aggregateString) {
    const numericValue = parseInt(charRepresentation, 10);

    if (numericValue === 0) {
      return false;
    }
    if (digitPresenceArray[numericValue]) {
      return false;
    }
    digitPresenceArray[numericValue] = true;
  }

  return true;
};
