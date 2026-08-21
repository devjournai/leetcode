/**
 * Calculate Score After Performing Instructions
 * Intuition: Simulate the program: add increases the score and steps forward; jump adds the offset. Stop at bounds or a revisited index (a cycle).
 * Approach: 1. Walk index i while it is in range and unseen. 2. Mark seen. 3. On "add", add values[i] and i++. 4. On "jump", i += values[i]. 5. Return the accumulated score.
 * Dry Run: instructions = ["jump","add","add"], values = [1,2,3]. Start 0 jump to 1, add 2, add 3 → score 5 then exit.
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var calculateScore = function (instructions, values) {
  const instructionCount = instructions.length;
  let score = 0;
  let index = 0;
  const seen = new Array(instructionCount).fill(false);

  while (index >= 0 && index < instructionCount && !seen[index]) {
    seen[index] = true;
    if (instructions[index] === "add") {
      score += values[index];
      index += 1;
    } else if (instructions[index] === "jump") {
      index += values[index];
    }
  }

  return score;
};
