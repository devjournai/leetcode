/**
 * Two-Letter Card Game
 * Intuition: Only cards that contain x matter. Compatible pairs differ in exactly one position, so x* cards pair among themselves (first letter x, second varies) and *x cards pair among themselves. xx can be given to either side.
 * Approach: 1. Count xx, counts of x? (not xx), and counts of ?x (not xx). 2. On one side, max pairs from frequencies plus some xx copies is min(total / 2, total - maxBucket) because one letter cannot pair with itself. 3. Try every split of the xx cards between the two sides and take the maximum.
 * Dry Run: cards = ["aa", "ab", "ba", "ac"], x = "a". xx=1, x? is b:1,c:1, ?x is b:1. Split xx to the ?x side: x? pairs 1 (ab with ac), ?x pairs 1 (ba with aa). Score 2.
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var score = function (cards, x) {
  const firstXCounts = new Array(10).fill(0);
  const secondXCounts = new Array(10).fill(0);
  let bothX = 0;

  for (const card of cards) {
    const firstLetter = card[0];
    const secondLetter = card[1];
    if (firstLetter === x && secondLetter === x) {
      bothX++;
    } else if (firstLetter === x) {
      firstXCounts[secondLetter.charCodeAt(0) - 97]++;
    } else if (secondLetter === x) {
      secondXCounts[firstLetter.charCodeAt(0) - 97]++;
    }
  }

  function maxPairs(bucketCounts, extraCards) {
    let total = extraCards;
    let maxBucket = extraCards;
    for (const count of bucketCounts) {
      total += count;
      maxBucket = Math.max(maxBucket, count);
    }
    return Math.min(Math.floor(total / 2), total - maxBucket);
  }

  let bestScore = 0;
  for (let giveToFirst = 0; giveToFirst <= bothX; giveToFirst++) {
    bestScore = Math.max(
      bestScore,
      maxPairs(firstXCounts, giveToFirst) +
        maxPairs(secondXCounts, bothX - giveToFirst)
    );
  }

  return bestScore;
};
