/**
 * Frog Jump Ii
 * Intuition: To minimize the maximum jump length in a round trip while visiting intermediate stones at most once, the frog should try to make jumps as short as possible. This problem essentially requires constructing two parallel paths between the first and last stones, using disjoint sets of intermediate stones. The optimal strategy to achieve this minimal maximum jump is to have each path effectively "skip" only one stone at a time, meaning one path handles elements at even indices and the other handles elements at odd indices (relative to some starting point or overall sequence). The maximum length among these "skip-one" jumps and the initial direct jump will determine the minimum possible maximum jump for the entire journey.
 * Approach: 1. Handle edge cases where the array length is less than 2 (though problem constraints state n >= 2, good practice). 2. Initialize a variable, `maximumPermittedJump`, with the length of the first possible direct jump, `stones[1] - stones[0]`. This accounts for the shortest possible path between the first two stones and serves as an initial maximum. 3. Iterate through the `stones` array starting from the third stone (index 2) up to the last stone. 4. In each iteration, calculate the jump length that skips one intermediate stone: `stones[iterationIndex] - stones[iterationIndex - 2]`. This represents a jump where the `stones[iterationIndex - 1]` is used by the alternate path. 5. Update `maximumPermittedJump` to be the maximum of its current value and the newly calculated skip-one jump length. 6. After the loop completes, `maximumPermittedJump` will hold the minimum cost of a path.
 * Dry Run:
 * Input: stones = [0, 2, 5, 6, 7]
 * arrayLength = 5
 *
 * 1. Initialize maximumPermittedJump:
 *    maximumPermittedJump = stones[1] - stones[0] = 2 - 0 = 2.
 *
 * 2. Loop for iterationIndex from 2 to arrayLength - 1 (i.e., 2 to 4):
 *    a. iterationIndex = 2:
 *       currentJumpLength = stones[2] - stones[0] = 5 - 0 = 5.
 *       maximumPermittedJump = Math.max(2, 5) = 5.
 *
 *    b. iterationIndex = 3:
 *       currentJumpLength = stones[3] - stones[1] = 6 - 2 = 4.
 *       maximumPermittedJump = Math.max(5, 4) = 5.
 *
 *    c. iterationIndex = 4:
 *       currentJumpLength = stones[4] - stones[2] = 7 - 5 = 2.
 *       maximumPermittedJump = Math.max(5, 2) = 5.
 *
 * 3. Loop finishes.
 * 4. Return maximumPermittedJump, which is 5.
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var maxJump = function (stones) {
  const arrayLength = stones.length;

  if (arrayLength < 2) {
    return 0;
  }

  let maximumPermittedJump = stones[1] - stones[0];

  for (let iterationIndex = 2; iterationIndex < arrayLength; iterationIndex++) {
    const currentJumpLength =
      stones[iterationIndex] - stones[iterationIndex - 2];
    maximumPermittedJump = Math.max(maximumPermittedJump, currentJumpLength);
  }

  return maximumPermittedJump;
};
