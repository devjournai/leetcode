/**
 * Number Of Ways To Divide A Long Corridor
 * Intuition: The problem requires dividing the corridor into sections, each with exactly two seats. This implies that the total number of seats must be a positive, even number. Dividers can be placed between sections. Once two seats form a section, the next section must begin with the next available seat. The number of ways to place a divider between two consecutive two-seat sections is determined by the number of plants between the second seat of the preceding section and the first seat of the succeeding section. If there are `k` plants, there are `k+1` possible positions for a divider.
 * Approach: 1. Iterate through the corridor once to count the total number of seats. If this count is zero or odd, no valid division is possible, so return 0. 2. Initialize a variable `waysCount` to 1 and `lastSectionEndSeatIndex` to -1. Also, initialize `currentSectionSeatCounter` to 0. 3. Iterate through the corridor again. When a seat ('S') is encountered: a. Increment `currentSectionSeatCounter`. b. If `currentSectionSeatCounter` becomes an even number, it means we've completed a two-seat section. Update `lastSectionEndSeatIndex` to the current seat's index. c. If `currentSectionSeatCounter` becomes an odd number AND `currentSectionSeatCounter` is greater than 1 (meaning we are starting a new two-seat section after having completed at least one previous section), calculate the number of plants `midSectionPlants` between `lastSectionEndSeatIndex` and the current seat's index. Multiply `waysCount` by `(midSectionPlants + 1)` modulo `10^9 + 7`. 4. After the second iteration, `waysCount` will hold the total number of ways to divide the corridor.
 * Dry Run: corridor = "S P P S P P S S"
 *  1. Initial Pass: `totalSeatsFound = 0`.
 *     - 'S': `totalSeatsFound = 1`
 *     - 'P'
 *     - 'P'
 *     - 'S': `totalSeatsFound = 2`
 *     - 'P'
 *     - 'P'
 *     - 'S': `totalSeatsFound = 3`
 *     - 'S': `totalSeatsFound = 4`
 *     Total seats (4) is even and positive. Proceed.
 *
 *  2. Second Pass: `waysCount = 1`, `modValue = 1000000007`, `seatsInCurrentSegment = 0`, `lastSectionEndSeatIndex = -1`.
 *     - `corridorPosition = 0`, 'S':
 *       - `seatsInCurrentSegment = 1`.
 *       - Odd, not > 1. No action.
 *     - `corridorPosition = 1`, 'P': No action.
 *     - `corridorPosition = 2`, 'P': No action.
 *     - `corridorPosition = 3`, 'S':
 *       - `seatsInCurrentSegment = 2`.
 *       - Even. `lastSectionEndSeatIndex = 3`. (Section 1: S[0] P P S[3])
 *     - `corridorPosition = 4`, 'P': No action.
 *     - `corridorPosition = 5`, 'P': No action.
 *     - `corridorPosition = 6`, 'S':
 *       - `seatsInCurrentSegment = 3`.
 *       - Odd. `seatsInCurrentSegment > 1` (3 > 1) is true.
 *         - `plantsBetweenSegments = corridorPosition (6) - lastSectionEndSeatIndex (3) - 1 = 2`. (Plants: P[4], P[5])
 *         - `waysCount = (waysCount (1) * (plantsBetweenSegments (2) + 1)) % modValue = (1 * 3) % modValue = 3`.
 *     - `corridorPosition = 7`, 'S':
 *       - `seatsInCurrentSegment = 4`.
 *       - Even. `lastSectionEndSeatIndex = 7`. (Section 2: S[6] S[7])
 *
 *  End loop. Return `waysCount = 3`.
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var numberOfWays = function (corridor) {
  const modConstant = 1000000007;
  let initialSeatCount = 0;

  for (let charIndex = 0; charIndex < corridor.length; charIndex++) {
    if (corridor[charIndex] === "S") {
      initialSeatCount++;
    }
  }

  if (initialSeatCount === 0 || initialSeatCount % 2 !== 0) {
    return 0;
  }

  let divisionWays = 1;
  let currentSegmentSeatTally = 0;
  let previousPairEndIndex = -1;

  for (
    let currentElementIndex = 0;
    currentElementIndex < corridor.length;
    currentElementIndex++
  ) {
    if (corridor[currentElementIndex] === "S") {
      currentSegmentSeatTally++;

      if (currentSegmentSeatTally % 2 === 0) {
        previousPairEndIndex = currentElementIndex;
      } else {
        if (currentSegmentSeatTally > 1) {
          const plantsPresent = currentElementIndex - previousPairEndIndex - 1;
          divisionWays = (divisionWays * (plantsPresent + 1)) % modConstant;
        }
      }
    }
  }

  return divisionWays;
};
