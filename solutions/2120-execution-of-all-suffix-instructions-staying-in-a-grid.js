/**
 * Execution Of All Suffix Instructions Staying In A Grid
 * Intuition: For each possible starting instruction in the given string 's', simulate the robot's movement step-by-step from its initial position until it either moves off the grid boundaries or all instructions for that suffix have been executed.
 * Approach: 1. Initialize an array `resultsList` of size `m` (length of `s`) to store the count of executed instructions for each starting point. 2. Iterate `instructionStartIndex` from `0` to `m-1`, representing the index in `s` from which the robot begins executing instructions. 3. For each `instructionStartIndex`, set the robot's `currentX` and `currentY` coordinates to `startPos[0]` and `startPos[1]` respectively, and initialize `movesPerformed` to `0`. 4. Begin a nested iteration `currentExecutionIndex` from `instructionStartIndex` to `m-1`. 5. Inside the nested loop, identify the `currentDirectionChar` (`'L'`, `'R'`, `'U'`, `'D'`) from `s[currentExecutionIndex]`. 6. Update `currentX` or `currentY` based on `currentDirectionChar`. 7. After updating coordinates, check if `currentX` or `currentY` falls outside the grid boundaries (`< 0` or `>= n`). 8. If the robot is out of bounds, terminate the inner simulation loop using `break`. 9. If the robot remains within bounds, increment `movesPerformed`. 10. After the inner loop completes (either by breaking or exhausting instructions), store `movesPerformed` into `resultsList[instructionStartIndex]`. 11. Return `resultsList`.
 * Dry Run: n = 3, startPos = [0, 1], s = "RRDDLU"
 * totalInstructionCount = 6
 * resultsList = [0, 0, 0, 0, 0, 0]
 *
 * instructionStartIndex = 0: (Start from s[0]='R')
 *   currentX = 0, currentY = 1, movesPerformed = 0
 *   currentExecutionIndex = 0: currentDirectionChar = 'R'. currentY = 2. In bounds. movesPerformed = 1.
 *   currentExecutionIndex = 1: currentDirectionChar = 'R'. currentY = 3. Out of bounds (3 >= 3). Break.
 *   resultsList[0] = 1. resultsList = [1, 0, 0, 0, 0, 0]
 *
 * instructionStartIndex = 1: (Start from s[1]='R')
 *   currentX = 0, currentY = 1, movesPerformed = 0
 *   currentExecutionIndex = 1: currentDirectionChar = 'R'. currentY = 2. In bounds. movesPerformed = 1.
 *   currentExecutionIndex = 2: currentDirectionChar = 'D'. currentX = 1. In bounds. movesPerformed = 2.
 *   currentExecutionIndex = 3: currentDirectionChar = 'D'. currentX = 2. In bounds. movesPerformed = 3.
 *   currentExecutionIndex = 4: currentDirectionChar = 'L'. currentY = 1. In bounds. movesPerformed = 4.
 *   currentExecutionIndex = 5: currentDirectionChar = 'U'. currentX = 1. In bounds. movesPerformed = 5.
 *   (End of inner loop)
 *   resultsList[1] = 5. resultsList = [1, 5, 0, 0, 0, 0]
 *
 * instructionStartIndex = 2: (Start from s[2]='D')
 *   currentX = 0, currentY = 1, movesPerformed = 0
 *   currentExecutionIndex = 2: currentDirectionChar = 'D'. currentX = 1. In bounds. movesPerformed = 1.
 *   currentExecutionIndex = 3: currentDirectionChar = 'D'. currentX = 2. In bounds. movesPerformed = 2.
 *   currentExecutionIndex = 4: currentDirectionChar = 'L'. currentY = 0. In bounds. movesPerformed = 3.
 *   currentExecutionIndex = 5: currentDirectionChar = 'U'. currentX = 1. In bounds. movesPerformed = 4.
 *   (End of inner loop)
 *   resultsList[2] = 4. resultsList = [1, 5, 4, 0, 0, 0]
 *
 * instructionStartIndex = 3: (Start from s[3]='D')
 *   currentX = 0, currentY = 1, movesPerformed = 0
 *   currentExecutionIndex = 3: currentDirectionChar = 'D'. currentX = 1. In bounds. movesPerformed = 1.
 *   currentExecutionIndex = 4: currentDirectionChar = 'L'. currentY = 0. In bounds. movesPerformed = 2.
 *   currentExecutionIndex = 5: currentDirectionChar = 'U'. currentX = 0. In bounds. movesPerformed = 3.
 *   (End of inner loop)
 *   resultsList[3] = 3. resultsList = [1, 5, 4, 3, 0, 0]
 *
 * instructionStartIndex = 4: (Start from s[4]='L')
 *   currentX = 0, currentY = 1, movesPerformed = 0
 *   currentExecutionIndex = 4: currentDirectionChar = 'L'. currentY = 0. In bounds. movesPerformed = 1.
 *   currentExecutionIndex = 5: currentDirectionChar = 'U'. currentX = -1. Out of bounds (-1 < 0). Break.
 *   resultsList[4] = 1. resultsList = [1, 5, 4, 3, 1, 0]
 *
 * instructionStartIndex = 5: (Start from s[5]='U')
 *   currentX = 0, currentY = 1, movesPerformed = 0
 *   currentExecutionIndex = 5: currentDirectionChar = 'U'. currentX = -1. Out of bounds (-1 < 0). Break.
 *   resultsList[5] = 0. resultsList = [1, 5, 4, 3, 1, 0]
 *
 * Final resultsList = [1, 5, 4, 3, 1, 0]
 * Time Complexity: O(m^2)
 * Space Complexity: O(m)
 */
var executeInstructions = function (n, startPos, s) {
  const totalInstructionCount = s.length;
  const resultsList = new Array(totalInstructionCount).fill(0);

  for (
    let instructionStartIndex = 0;
    instructionStartIndex < totalInstructionCount;
    instructionStartIndex++
  ) {
    let currentX = startPos[0];
    let currentY = startPos[1];
    let movesPerformed = 0;

    for (
      let currentExecutionIndex = instructionStartIndex;
      currentExecutionIndex < totalInstructionCount;
      currentExecutionIndex++
    ) {
      const currentDirectionChar = s[currentExecutionIndex];

      if (currentDirectionChar === "L") {
        currentY--;
      } else if (currentDirectionChar === "R") {
        currentY++;
      } else if (currentDirectionChar === "U") {
        currentX--;
      } else {
        currentX++;
      }

      if (currentX < 0 || currentX >= n || currentY < 0 || currentY >= n) {
        break;
      }
      movesPerformed++;
    }
    resultsList[instructionStartIndex] = movesPerformed;
  }

  return resultsList;
};
