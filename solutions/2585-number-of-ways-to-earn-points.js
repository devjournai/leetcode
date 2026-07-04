/**
 * Number Of Ways To Earn Points
 * Intuition: This problem is a variation of the bounded knapsack problem. We aim to find the total number of distinct combinations of questions that sum up to an exact target score, given a limited count for each question type. Dynamic programming is well-suited to build up solutions for smaller targets and fewer question types into solutions for larger ones.
 * Approach: 1. Initialize a 2D dynamic programming array, `dpGrid`, with dimensions `(numberOfTypes + 1)` rows and `(target + 1)` columns. Each cell `dpGrid[i][j]` will store the number of ways to achieve exactly `j` points using the first `i` question types. 2. Set the base case: `dpGrid[0][0]` to 1, indicating one way (taking no questions) to earn 0 points with no question types considered. All other cells in the 0th row are 0. 3. Iterate through each question type, indexed from 0 to `numberOfTypes - 1`. Let's use `typeIndex` for this loop, mapping to `dpGrid` row `typeIndex + 1`. 4. For each `typeIndex`, iterate through every possible point value, `currentPoints`, from 0 up to `target`. 5. For `dpGrid[typeIndex + 1][currentPoints]`, first consider the ways to achieve `currentPoints` *without* using any questions of the current type. This value is simply `dpGrid[typeIndex][currentPoints]`. 6. Next, consider taking `numQuestions` from the current type. Iterate `numQuestions` from 1 up to the `count` limit for the current type. If `currentPoints` is greater than or equal to `numQuestions` multiplied by the `marks` of the current type, add the number of ways to achieve the `remainingPoints` (`currentPoints - numQuestions * currentTypeMarks`) using *previous* question types (`dpGrid[typeIndex][remainingPoints]`) to `dpGrid[typeIndex + 1][currentPoints]`. 7. Ensure all additions are performed modulo 1e9 + 7 to prevent overflow. 8. After processing all types and points, the result will be stored in `dpGrid[numberOfTypes][target]`.
 * Dry Run: target = 6, types = [[6,1]]
 *   numberOfTypes = 1. moduloValue = 1e9 + 7.
 *   dpGrid (2x7) initialized to 0. dpGrid[0][0] = 1.
 *
 *   typeIndex = 0 (corresponding to types[0] = [6,1]):
 *     currentTypeCount = 6, currentTypeMarks = 1.
 *
 *     currentPoints = 0:
 *       dpGrid[1][0] = dpGrid[0][0] = 1.
 *       numQuestions loop: 1*1 > 0, so loop breaks.
 *       (dpGrid[1][0] is 1)
 *
 *     currentPoints = 1:
 *       dpGrid[1][1] = dpGrid[0][1] = 0.
 *       numQuestions = 1: pointsNeeded = 1*1 = 1. 1 >= 1.
 *         remainingPointsValue = dpGrid[0][1-1] = dpGrid[0][0] = 1.
 *         dpGrid[1][1] = (0 + 1) % moduloValue = 1.
 *       numQuestions = 2: pointsNeeded = 2*1 = 2. 1 >= 2 is false, loop breaks.
 *       (dpGrid[1][1] is 1)
 *
 *     currentPoints = 2:
 *       dpGrid[1][2] = dpGrid[0][2] = 0.
 *       numQuestions = 1: pointsNeeded = 1. 2 >= 1. remainingPointsValue = dpGrid[0][1] = 0. dpGrid[1][2] = 0.
 *       numQuestions = 2: pointsNeeded = 2. 2 >= 2. remainingPointsValue = dpGrid[0][0] = 1. dpGrid[1][2] = (0 + 1) % moduloValue = 1.
 *       numQuestions = 3: pointsNeeded = 3. 2 >= 3 is false, loop breaks.
 *       (dpGrid[1][2] is 1)
 *
 *     ... (pattern continues) ...
 *
 *     currentPoints = 6:
 *       dpGrid[1][6] = dpGrid[0][6] = 0.
 *       numQuestions = 1: remaining = dpGrid[0][5] = 0. dpGrid[1][6] = 0.
 *       numQuestions = 2: remaining = dpGrid[0][4] = 0. dpGrid[1][6] = 0.
 *       numQuestions = 3: remaining = dpGrid[0][3] = 0. dpGrid[1][6] = 0.
 *       numQuestions = 4: remaining = dpGrid[0][2] = 0. dpGrid[1][6] = 0.
 *       numQuestions = 5: remaining = dpGrid[0][1] = 0. dpGrid[1][6] = 0.
 *       numQuestions = 6: pointsNeeded = 6. 6 >= 6. remaining = dpGrid[0][0] = 1. dpGrid[1][6] = (0 + 1) % moduloValue = 1.
 *       numQuestions = 7: pointsNeeded = 7. 6 >= 7 is false, loop breaks.
 *       (dpGrid[1][6] is 1)
 *
 *   All loops complete.
 *   Result: dpGrid[1][6] = 1.
 * Time Complexity: O(N * T * C_max)
 * Space Complexity: O(N * T)
 */
var waysToReachTarget = function (target, types) {
  const numberOfTypes = types.length;
  const moduloValue = 1e9 + 7;

  const dpGrid = Array(numberOfTypes + 1)
    .fill(null)
    .map(() => Array(target + 1).fill(0));
  dpGrid[0][0] = 1;

  let typeIndex = 0;
  while (typeIndex < numberOfTypes) {
    const currentTypeDetails = types[typeIndex];
    const currentTypeCount = currentTypeDetails[0];
    const currentTypeMarks = currentTypeDetails[1];

    let currentPoints = 0;
    while (currentPoints <= target) {
      // Option 1: Do not use any questions of the current type
      dpGrid[typeIndex + 1][currentPoints] = dpGrid[typeIndex][currentPoints];

      // Option 2: Use a certain number of questions of the current type
      let numQuestions = 1;
      while (numQuestions <= currentTypeCount) {
        const pointsRequired = numQuestions * currentTypeMarks;
        if (currentPoints >= pointsRequired) {
          const waysForRemainingPoints =
            dpGrid[typeIndex][currentPoints - pointsRequired];
          dpGrid[typeIndex + 1][currentPoints] =
            (dpGrid[typeIndex + 1][currentPoints] + waysForRemainingPoints) %
            moduloValue;
        } else {
          // If currentPoints is less than pointsRequired, no more questions of this type can be taken
          break;
        }
        numQuestions++;
      }
      currentPoints++;
    }
    typeIndex++;
  }

  return dpGrid[numberOfTypes][target];
};
