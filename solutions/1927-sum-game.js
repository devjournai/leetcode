/**
 * Sum Game
 * Intuition: Alice and Bob fill `?` digits (Alice first) to make left-half vs right-half sums unequal (Alice) or equal (Bob). With optimal play the expected contribution of a `?` is 4.5, so Alice wins unless the leftover sum plus `4.5 * (left? - right?)` is exactly 0 and the `?` count difference is even.
 * Approach: 1. Split the string at `n/2`. 2. Accumulate known digit sums and `?` counts on each half. 3. `finalSumDifference = leftSum - rightSum`, `finalQueryDifference = left? - right?`. 4. Return true if that query difference is odd or `sumDiff + queryDiff * 4.5 !== 0`.
 * Dry Run: num = "5023" → no `?`, left=5+0=5, right=2+3=5, queryDiff=0 → 5-5+0=0, even → Alice loses (false).
 * Dry Run: num = "?3295???" → Alice can force imbalance → true.
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
var sumGame = function (num) {
  const numberLength = num.length;
  const midPoint = numberLength / 2;

  let currentLeftSum = 0;
  let currentRightSum = 0;
  let leftUnknownCount = 0;
  let rightUnknownCount = 0;

  for (
    let currentPosition = 0;
    currentPosition < numberLength;
    currentPosition++
  ) {
    if (currentPosition < midPoint) {
      if (num[currentPosition] === "?") {
        leftUnknownCount++;
      } else {
        currentLeftSum += parseInt(num[currentPosition]);
      }
    } else {
      if (num[currentPosition] === "?") {
        rightUnknownCount++;
      } else {
        currentRightSum += parseInt(num[currentPosition]);
      }
    }
  }

  const finalSumDifference = currentLeftSum - currentRightSum;
  const finalQueryDifference = leftUnknownCount - rightUnknownCount;

  return (
    finalQueryDifference % 2 !== 0 ||
    finalSumDifference + finalQueryDifference * 4.5 !== 0
  );
};
