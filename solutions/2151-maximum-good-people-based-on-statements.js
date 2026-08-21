/**
 * Maximum Good People Based On Statements
 * Intuition: Since good people always tell the truth, we can iterate through all 2^N possible assignments of "good" or "bad" for each person. For each assignment, we verify its consistency by checking if any person designated as "good" makes a statement that contradicts the current assignment. The maximum count of good people from all consistent assignments is the answer.
 * Approach: 1. Initialize `maximumAchievedGood` to 0. 2. Determine `personTotal` from the length of `statements`. 3. Iterate `currentTruthAssignment` from `0` to `(1 << personTotal) - 1`. Each `currentTruthAssignment` represents a unique configuration: if the `k`-th bit is set, person `k` is considered good; otherwise, they are considered bad. 4. For each `currentTruthAssignment`, set `assignmentIsConsistent` to `true`. 5. Iterate `personIdentifierA` from `0` to `personTotal - 1`. 6. If `personIdentifierA` is designated as good in `currentTruthAssignment` (checked by `(currentTruthAssignment >> personIdentifierA) & 1`): a. Iterate `personIdentifierB` from `0` to `personTotal - 1`. b. Retrieve `statementMadeByA` = `statements[personIdentifierA][personIdentifierB]`. c. If `statementMadeByA` is `0` (person `A` says `B` is bad) but `personIdentifierB` is designated good (`(currentTruthAssignment >> personIdentifierB) & 1` is `1`), set `assignmentIsConsistent` to `false` and break from both inner and outer loops (for `personIdentifierA` and `personIdentifierB`). d. If `statementMadeByA` is `1` (person `A` says `B` is good) but `personIdentifierB` is designated bad (`(currentTruthAssignment >> personIdentifierB) & 1` is `0`), set `assignmentIsConsistent` to `false` and break from both loops. 7. If `assignmentIsConsistent` remains `true` after all checks for the `currentTruthAssignment`: a. Count the number of set bits in `currentTruthAssignment` using `bitCountForAssignment`. b. Update `maximumAchievedGood = Math.max(maximumAchievedGood, bitCountForAssignment)`. 8. Return `maximumAchievedGood`.
 * Dry Run: statements = [[2,1],[1,2]], n = 2 (Simpler example to illustrate logic)
 * maximumAchievedGood = 0, personTotal = 2
 *
 * currentTruthAssignment = 0 (00 in binary): (P1 bad, P0 bad)
 *   assignmentIsConsistent = true. No good people to check.
 *   bitCountForAssignment = 0.
 *   maximumAchievedGood = max(0, 0) = 0.
 *
 * currentTruthAssignment = 1 (01 in binary): (P1 bad, P0 good)
 *   assignmentIsConsistent = true.
 *   personIdentifierA = 0: P0 is good (bit 0 is 1).
 *     personIdentifierB = 0: statements[0][0] = 2. Skip.
 *     personIdentifierB = 1: statements[0][1] = 1 (P0 says P1 good).
 *       Check P1's status: (1 >> 1) & 1 is 0 (P1 is bad). Contradiction!
 *       assignmentIsConsistent = false. Break loops.
 *   Assignment is invalid. maximumAchievedGood remains 0.
 *
 * currentTruthAssignment = 2 (10 in binary): (P1 good, P0 bad)
 *   assignmentIsConsistent = true.
 *   personIdentifierA = 0: P0 is bad (bit 0 is 0). Skip.
 *   personIdentifierA = 1: P1 is good (bit 1 is 1).
 *     personIdentifierB = 0: statements[1][0] = 1 (P1 says P0 good).
 *       Check P0's status: (2 >> 0) & 1 is 0 (P0 is bad). Contradiction!
 *       assignmentIsConsistent = false. Break loops.
 *   Assignment is invalid. maximumAchievedGood remains 0.
 *
 * currentTruthAssignment = 3 (11 in binary): (P1 good, P0 good)
 *   assignmentIsConsistent = true.
 *   personIdentifierA = 0: P0 is good (bit 0 is 1).
 *     personIdentifierB = 0: statements[0][0] = 2. Skip.
 *     personIdentifierB = 1: statements[0][1] = 1 (P0 says P1 good).
 *       Check P1's status: (3 >> 1) & 1 is 1 (P1 is good). Consistent.
 *   personIdentifierA = 1: P1 is good (bit 1 is 1).
 *     personIdentifierB = 0: statements[1][0] = 1 (P1 says P0 good).
 *       Check P0's status: (3 >> 0) & 1 is 1 (P0 is good). Consistent.
 *     personIdentifierB = 1: statements[1][1] = 2. Skip.
 *   All checks pass. assignmentIsConsistent = true.
 *   bitCountForAssignment = 2.
 *   maximumAchievedGood = max(0, 2) = 2.
 *
 * Final Result: 2.
 * Time Complexity: O(2^N * N^2)
 * Space Complexity: O(1)
 */
var maximumGood = function (statements) {
  const personTotal = statements.length;
  let maximumAchievedGood = 0;

  for (
    let currentTruthAssignment = 0;
    currentTruthAssignment < 1 << personTotal;
    currentTruthAssignment++
  ) {
    let assignmentIsConsistent = true;

    for (
      let personIdentifierA = 0;
      personIdentifierA < personTotal;
      personIdentifierA++
    ) {
      if (!((currentTruthAssignment >> personIdentifierA) & 1)) {
        continue;
      }

      for (
        let personIdentifierB = 0;
        personIdentifierB < personTotal;
        personIdentifierB++
      ) {
        const statementMadeByA =
          statements[personIdentifierA][personIdentifierB];

        if (statementMadeByA === 2) {
          continue;
        }

        const personBIsGoodInAssignment =
          (currentTruthAssignment >> personIdentifierB) & 1;

        if (statementMadeByA === 0 && personBIsGoodInAssignment) {
          assignmentIsConsistent = false;
          break;
        }
        if (statementMadeByA === 1 && !personBIsGoodInAssignment) {
          assignmentIsConsistent = false;
          break;
        }
      }
      if (!assignmentIsConsistent) {
        break;
      }
    }

    if (assignmentIsConsistent) {
      let bitCountForAssignment = 0;
      for (let bitIndex = 0; bitIndex < personTotal; bitIndex++) {
        if ((currentTruthAssignment >> bitIndex) & 1) {
          bitCountForAssignment++;
        }
      }
      maximumAchievedGood = Math.max(
        maximumAchievedGood,
        bitCountForAssignment
      );
    }
  }

  return maximumAchievedGood;
};
