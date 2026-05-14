/**
 * Final Value Of Variable After Performing Operations
 * Intuition: The problem describes a single variable `X` initialized to 0. Each operation either increments `X` by 1 or decrements `X` by 1. The specific form of the operation (prefix or postfix) doesn't matter, only whether it's an increment or decrement. Thus, we simply need to keep a running total of these changes.
 * Approach: 1. Initialize a numerical variable, let's call it `finalAccumulatedValue`, to 0. This variable will store the current value of X. 2. Iterate through each string in the input `operations` array. 3. For each operation string, check if it contains the substring "++". If it does, it signifies an increment operation, so add 1 to `finalAccumulatedValue`. 4. Otherwise (if it does not contain "++"), it must be a decrement operation, so subtract 1 from `finalAccumulatedValue`. 5. After processing all operations, `finalAccumulatedValue` will hold the final value of X, which is then returned.
 * Dry Run: operations = ["--X", "X++", "++X"]
 *   1. Initialize `finalAccumulatedValue` = 0.
 *   2. First operation: `singleAction` = "--X"
 *      Does `singleAction` contain "++"? No.
 *      `finalAccumulatedValue` becomes 0 - 1 = -1.
 *   3. Second operation: `singleAction` = "X++"
 *      Does `singleAction` contain "++"? Yes.
 *      `finalAccumulatedValue` becomes -1 + 1 = 0.
 *   4. Third operation: `singleAction` = "++X"
 *      Does `singleAction` contain "++"? Yes.
 *      `finalAccumulatedValue` becomes 0 + 1 = 1.
 *   5. All operations processed. Return `finalAccumulatedValue`, which is 1.
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var finalValueAfterOperations = function (operations) {
  let finalAccumulatedValue = 0;

  for (const singleAction of operations) {
    if (singleAction.includes("++")) {
      finalAccumulatedValue += 1;
    } else {
      finalAccumulatedValue -= 1;
    }
  }

  return finalAccumulatedValue;
};
