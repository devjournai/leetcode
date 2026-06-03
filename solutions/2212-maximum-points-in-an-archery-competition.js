/**
 * Maximum Points In An Archery Competition
 * Intuition: This problem requires Bob to make strategic decisions for each scoring section (0-11) to maximize his total points with a limited number of arrows. For each section, Bob either spends arrows to win it (if he has enough) or forfeits it. This decision-making process, constrained by a total arrow count, is best solved using a recursive backtracking approach.
 * Approach: 1. Initialize `highestAchievedScore` to track the maximum points Bob can get and `finalArrowConfiguration` (an array of size 12) to store the arrow distribution corresponding to that maximum score.
 * 2. Define a recursive helper function `explorePossibilities(currentSectionIdentifier, arrowsRemainingForBob, currentAccumulatedScore, currentBobAllocation)`. This function explores all possible ways Bob can allocate arrows starting from a given section.
 * 3. Base Case: If `currentSectionIdentifier` reaches 12 (all sections from 1 to 11 considered) or `arrowsRemainingForBob` becomes 0 (no more arrows to shoot), evaluate the current path:
 *    a. If `currentAccumulatedScore` is greater than `highestAchievedScore`, update `highestAchievedScore` and copy `currentBobAllocation` to `finalArrowConfiguration`.
 *    b. Add any `arrowsRemainingForBob` to `finalArrowConfiguration[0]`. This ensures all `totalArrowsProvided` are accounted for in the best configuration, as section 0 yields no points and is a valid place to dump leftover arrows.
 * 4. Recursive Steps: For the `currentSectionIdentifier` (from 1 to 11):
 *    a. Option 1: Bob attempts to win this section. Calculate `arrowsRequiredToWin` for this section as `aliceScoreAllocation[currentSectionIdentifier] + 1`. If `arrowsRemainingForBob` is sufficient, set `currentBobAllocation[currentSectionIdentifier]` to `arrowsRequiredToWin`, then recursively call `explorePossibilities` for the next section, reduced arrows, and updated score. After the recursive call, reset `currentBobAllocation[currentSectionIdentifier]` to 0 (backtracking).
 *    b. Option 2: Bob forfeits this section. Set `currentBobAllocation[currentSectionIdentifier]` to 0, then recursively call `explorePossibilities` for the next section, same arrows, and same score.
 * 5. The initial call is `explorePossibilities(1, totalArrowsProvided, 0, new Array(12).fill(0))`.
 * 6. Finally, return `finalArrowConfiguration`.
 * Dry Run: numArrows = 3, aliceArrows = [0,0,0,0,0,0,0,0,0,0,0,0]
 * Initial: highestAchievedScore = 0, finalArrowConfiguration = [0,0,0,0,0,0,0,0,0,0,0,0]
 * Call explorePossibilities(1, 3, 0, [0,0,0,0,0,0,0,0,0,0,0,0])
 *   currentSectionIdentifier = 1, arrowsRequiredToWin = 1 (aliceArrows[1]+1)
 *   Path A (Win Section 1):
 *     currentBobAllocation = [0,1,0,0,0,0,0,0,0,0,0,0]
 *     explorePossibilities(2, 2, 1, [0,1,0,...])
 *       currentSectionIdentifier = 2, arrowsRequiredToWin = 1
 *       Path A.1 (Win Section 2):
 *         currentBobAllocation = [0,1,1,0,0,0,0,0,0,0,0,0]
 *         explorePossibilities(3, 1, 3, [0,1,1,...])
 *           currentSectionIdentifier = 3, arrowsRequiredToWin = 1
 *           Path A.1.1 (Win Section 3):
 *             currentBobAllocation = [0,1,1,1,0,0,0,0,0,0,0,0]
 *             explorePossibilities(4, 0, 6, [0,1,1,1,...])
 *             Base Case: arrowsRemainingForBob = 0.
 *             currentAccumulatedScore (6) > highestAchievedScore (0).
 *             highestAchievedScore = 6.
 *             finalArrowConfiguration = [0,1,1,1,0,0,0,0,0,0,0,0]. (No arrowsRemainingForBob to add to section 0).
 *             Return.
 *           (Backtrack: currentBobAllocation[3]=0)
 *           Path A.1.2 (Forfeit Section 3):
 *             currentBobAllocation = [0,1,1,0,0,0,0,0,0,0,0,0]
 *             explorePossibilities(4, 1, 3, [0,1,1,0,...])
 *               currentSectionIdentifier = 4, arrowsRequiredToWin = 1
 *               Path A.1.2.1 (Win Section 4):
 *                 currentBobAllocation = [0,1,1,0,1,0,...]
 *                 explorePossibilities(5, 0, 7, [0,1,1,0,1,...])
 *                 Base Case: arrowsRemainingForBob = 0.
 *                 currentAccumulatedScore (7) > highestAchievedScore (6).
 *                 highestAchievedScore = 7.
 *                 finalArrowConfiguration = [0,1,1,0,1,0,0,0,0,0,0,0].
 *                 Return.
 *               (Backtrack: currentBobAllocation[4]=0)
 *               Path A.1.2.2 (Forfeit Section 4):
 *                 explorePossibilities(5, 1, 3, [0,1,1,0,0,...]) -> ... This path continues but will not achieve a higher score. For example, when currentSectionIdentifier reaches 12, currentAccumulatedScore is 3. Since 3 is not > 7, finalArrowConfiguration is unchanged.
 *                 Return.
 *           Return.
 *         Return.
 *       (Backtrack: currentBobAllocation[2]=0)
 *       Path A.2 (Forfeit Section 2): ... (Explores other branches, eventually returning a score not higher than 7, or updating if it finds a new max.)
 *   Return.
 * Final Result: highestAchievedScore = 7, finalArrowConfiguration = [0,1,1,0,1,0,0,0,0,0,0,0]. (Bob uses 1 arrow for section 1, 1 for section 2, 1 for section 4, total 3 arrows for 7 points).
 * Time Complexity: O(N * 2^N)
 * Space Complexity: O(N)
 */
var maximumBobPoints = function (totalArrowsProvided, aliceScoreAllocation) {
  let highestAchievedScore = 0;
  let finalArrowConfiguration = new Array(12).fill(0);

  function explorePossibilities(
    currentSectionIdentifier,
    arrowsRemainingForBob,
    currentAccumulatedScore,
    currentBobAllocation,
  ) {
    if (currentSectionIdentifier === 12 || arrowsRemainingForBob === 0) {
      if (currentAccumulatedScore > highestAchievedScore) {
        highestAchievedScore = currentAccumulatedScore;
        finalArrowConfiguration = [...currentBobAllocation];
        finalArrowConfiguration[0] += arrowsRemainingForBob;
      }
      return;
    }

    const arrowsRequiredToWin =
      aliceScoreAllocation[currentSectionIdentifier] + 1;
    if (arrowsRemainingForBob >= arrowsRequiredToWin) {
      currentBobAllocation[currentSectionIdentifier] = arrowsRequiredToWin;
      explorePossibilities(
        currentSectionIdentifier + 1,
        arrowsRemainingForBob - arrowsRequiredToWin,
        currentAccumulatedScore + currentSectionIdentifier,
        currentBobAllocation,
      );
      currentBobAllocation[currentSectionIdentifier] = 0; // Backtrack
    }

    explorePossibilities(
      currentSectionIdentifier + 1,
      arrowsRemainingForBob,
      currentAccumulatedScore,
      currentBobAllocation,
    );
  }

  explorePossibilities(1, totalArrowsProvided, 0, new Array(12).fill(0));
  return finalArrowConfiguration;
};
