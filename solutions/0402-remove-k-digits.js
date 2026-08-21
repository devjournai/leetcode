/**
 * Remove K Digits
 * Intuition: A smaller number is built by keeping digits in nondecreasing stack order: whenever the top of `numberDigits` is larger than the next digit and removals remain, pop it.
 * Approach: 1. Scan `num`; while `removalBudget>0` and the stack top is greater than `currentCharacter`, pop. Push the digit. 2. If budget remains, pop from the end. 3. Join, strip leading zeros, return `"0"` if empty.
 * Dry Run: num = "1432219", k = 3.
 *   - 1,4 → pop 4 for 3; 3→2 pop 3; 2→2; 2→1 pop 2; leftover budget pops last extra if any → "1219".
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var removeKdigits = function (num, k) {
  const numberDigits = [];
  let removalBudget = k;

  for (let digitIndex = 0; digitIndex < num.length; digitIndex++) {
    const currentCharacter = num[digitIndex];

    while (
      removalBudget > 0 &&
      numberDigits.length > 0 &&
      numberDigits[numberDigits.length - 1] > currentCharacter
    ) {
      numberDigits.pop();
      removalBudget--;
    }
    numberDigits.push(currentCharacter);
  }

  while (removalBudget > 0 && numberDigits.length > 0) {
    numberDigits.pop();
    removalBudget--;
  }

  const rawNumberString = numberDigits.join("");
  const cleanedNumberString = rawNumberString.replace(/^0+/, "");

  const resultToReturn =
    cleanedNumberString.length > 0 ? cleanedNumberString : "0";

  return resultToReturn;
};
