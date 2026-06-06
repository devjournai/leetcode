/**
 * Largest Number After Digit Swaps By Parity
 * Intuition: To construct the largest possible number, we should place the largest available digits in the most significant positions. Since swaps are restricted to digits of the same parity, the original positions occupied by odd digits will always be filled by odd digits, and similarly for even digits. This means we can independently sort the odd digits and even digits in descending order and then place them back into their original parity positions.
 * Approach: 1. Convert the input number `num` into an array of its individual digits. 2. Iterate through this digit array, separating digits into two distinct lists: one for even numbers and one for odd numbers. 3. Sort both the even number list and the odd number list in descending order to ensure the largest digits of each parity are at the front. 4. Reconstruct the final number by iterating through the original digit positions. For each position, check the parity of the original digit that was there. If it was even, take the next largest even digit from the sorted even list; if it was odd, take the next largest odd digit from the sorted odd list. 5. Concatenate the reconstructed digits and convert the resulting string back into an integer.
 * Dry Run: num = 12345
 * 1. num becomes string "12345", then numericDigits = [1, 2, 3, 4, 5]
 * 2. Separate by parity:
 *    evenCollection = [2, 4]
 *    oddCollection = [1, 3, 5]
 * 3. Sort collections in descending order:
 *    sortedEvenCollection = [4, 2]
 *    sortedOddCollection = [5, 3, 1]
 * 4. Reconstruct:
 *    Initialize currentEvenIndex = 0, currentOddIndex = 0, resultantDigits = []
 *    - For original digit 1 (odd): Add sortedOddCollection[0] (which is 5) to resultantDigits. Increment currentOddIndex. resultantDigits = [5]
 *    - For original digit 2 (even): Add sortedEvenCollection[0] (which is 4) to resultantDigits. Increment currentEvenIndex. resultantDigits = [5, 4]
 *    - For original digit 3 (odd): Add sortedOddCollection[1] (which is 3) to resultantDigits. Increment currentOddIndex. resultantDigits = [5, 4, 3]
 *    - For original digit 4 (even): Add sortedEvenCollection[1] (which is 2) to resultantDigits. Increment currentEvenIndex. resultantDigits = [5, 4, 3, 2]
 *    - For original digit 5 (odd): Add sortedOddCollection[2] (which is 1) to resultantDigits. Increment currentOddIndex. resultantDigits = [5, 4, 3, 2, 1]
 * 5. Join resultantDigits to "54321" and convert to integer: 54321.
 * Time Complexity: O(D log D)
 * Space Complexity: O(D)
 */
var largestInteger = function (num) {
  const numberAsString = String(num);
  const numericDigits = numberAsString.split("").map(Number);

  const evenCollection = [];
  const oddCollection = [];

  for (const currentDigit of numericDigits) {
    if (currentDigit % 2 === 0) {
      evenCollection.push(currentDigit);
    } else {
      oddCollection.push(currentDigit);
    }
  }

  evenCollection.sort((first, second) => second - first);
  oddCollection.sort((alpha, beta) => beta - alpha);

  let currentEvenIndex = 0;
  let currentOddIndex = 0;
  const resultantDigits = [];

  for (const originalDigit of numericDigits) {
    if (originalDigit % 2 === 0) {
      resultantDigits.push(evenCollection[currentEvenIndex]);
      currentEvenIndex++;
    } else {
      resultantDigits.push(oddCollection[currentOddIndex]);
      currentOddIndex++;
    }
  }

  return parseInt(resultantDigits.join(""), 10);
};
