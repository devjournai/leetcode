/**
 * Number Of People Aware Of A Secret
 * Intuition: The core idea is to track the number of *new* people who learn the secret on each specific day. Once we know this, we can simulate their sharing behavior and then sum up those who haven't forgotten by the target day.
 * Approach:
 * 1. Initialize a dynamic programming array, `newlyAwareCounts`, where `newlyAwareCounts[d]` stores the number of people who learn the secret on day `d`. Set `newlyAwareCounts[1]` to 1, as one person discovers it on day 1.
 * 2. Iterate from `currentIterationDay = 1` up to `n`. For each `currentIterationDay`:
 *    a. If no one learned the secret on `currentIterationDay` (i.e., `newlyAwareCounts[currentIterationDay]` is 0), skip to the next day.
 *    b. Otherwise, calculate the range of days these `newlyAwareCounts[currentIterationDay]` people will start sharing. They start sharing `delay` days after `currentIterationDay`, so on `currentIterationDay + delay`. They forget `forget` days after `currentIterationDay`, so they stop sharing *before* `currentIterationDay + forget`.
 *    c. Iterate `dayForPropagation` from `currentIterationDay + delay` up to `n`, but stopping strictly before `currentIterationDay + forget`. For each `dayForPropagation` in this valid sharing window, add `newlyAwareCounts[currentIterationDay]` to `newlyAwareCounts[dayForPropagation]`, applying modulo arithmetic.
 * 3. After populating `newlyAwareCounts` for all days up to `n`, calculate the total number of people aware of the secret at the end of day `n`. A person who learned on `d` still knows it on day `n` if `d + forget > n`. This means `d > n - forget`.
 * 4. Sum `newlyAwareCounts[d]` for all `d` from `Math.max(1, n - forget + 1)` up to `n`, again applying modulo arithmetic.
 * 5. Return the final sum.
 * Dry Run: (Using n=6, delay=2, forget=4)
 * modulusConstant = 10^9 + 7
 * newlyAwareCounts = [0, 0, 0, 0, 0, 0, 0] (size n+1)
 * newlyAwareCounts[1] = 1
 *
 * Loop 1 (currentIterationDay = 1): newlyAwareCounts[1] is 1.
 *   sharingStartsDay = 1 + 2 = 3
 *   sharingEndsDay = 1 + 4 = 5
 *   dayForPropagation = 3: newlyAwareCounts[3] = (newlyAwareCounts[3] + newlyAwareCounts[1]) % modulusConstant = (0 + 1) % M = 1
 *   dayForPropagation = 4: newlyAwareCounts[4] = (newlyAwareCounts[4] + newlyAwareCounts[1]) % modulusConstant = (0 + 1) % M = 1
 *   (dayForPropagation = 5 is >= sharingEndsDay=5, so loop ends)
 *   newlyAwareCounts = [0, 1, 0, 1, 1, 0, 0]
 *
 * Loop 2 (currentIterationDay = 2): newlyAwareCounts[2] is 0. Skip.
 *   newlyAwareCounts = [0, 1, 0, 1, 1, 0, 0]
 *
 * Loop 3 (currentIterationDay = 3): newlyAwareCounts[3] is 1.
 *   sharingStartsDay = 3 + 2 = 5
 *   sharingEndsDay = 3 + 4 = 7
 *   dayForPropagation = 5: newlyAwareCounts[5] = (newlyAwareCounts[5] + newlyAwareCounts[3]) % modulusConstant = (0 + 1) % M = 1
 *   dayForPropagation = 6: newlyAwareCounts[6] = (newlyAwareCounts[6] + newlyAwareCounts[3]) % modulusConstant = (0 + 1) % M = 1
 *   (dayForPropagation = 7 is >= sharingEndsDay=7 or > n, so loop ends)
 *   newlyAwareCounts = [0, 1, 0, 1, 1, 1, 1]
 *
 * Loop 4 (currentIterationDay = 4): newlyAwareCounts[4] is 1.
 *   sharingStartsDay = 4 + 2 = 6
 *   sharingEndsDay = 4 + 4 = 8
 *   dayForPropagation = 6: newlyAwareCounts[6] = (newlyAwareCounts[6] + newlyAwareCounts[4]) % modulusConstant = (1 + 1) % M = 2
 *   (dayForPropagation = 7 is > n, so loop ends)
 *   newlyAwareCounts = [0, 1, 0, 1, 1, 1, 2]
 *
 * Loop 5 (currentIterationDay = 5): newlyAwareCounts[5] is 1.
 *   sharingStartsDay = 5 + 2 = 7
 *   sharingEndsDay = 5 + 4 = 9
 *   (dayForPropagation = 7 is > n, so loop doesn't even start)
 *   newlyAwareCounts = [0, 1, 0, 1, 1, 1, 2]
 *
 * Loop 6 (currentIterationDay = 6): newlyAwareCounts[6] is 2.
 *   sharingStartsDay = 6 + 2 = 8
 *   sharingEndsDay = 6 + 4 = 10
 *   (dayForPropagation = 8 is > n, so loop doesn't even start)
 *   newlyAwareCounts = [0, 1, 0, 1, 1, 1, 2]
 *
 * currentIterationDay becomes 7, outer loop ends.
 *
 * Final Summation:
 * firstRelevantDay = Math.max(1, 6 - 4 + 1) = Math.max(1, 3) = 3
 * finalAwareCount = 0
 *
 * summationIndex = 3: finalAwareCount = (0 + newlyAwareCounts[3]) % M = (0 + 1) % M = 1
 * summationIndex = 4: finalAwareCount = (1 + newlyAwareCounts[4]) % M = (1 + 1) % M = 2
 * summationIndex = 5: finalAwareCount = (2 + newlyAwareCounts[5]) % M = (2 + 1) % M = 3
 * summationIndex = 6: finalAwareCount = (3 + newlyAwareCounts[6]) % M = (3 + 2) % M = 5
 * (summationIndex becomes 7, loop ends)
 *
 * Return finalAwareCount = 5.
 *
 * Time Complexity: O(N * forget)
 * Space Complexity: O(N)
 */
var peopleAwareOfSecret = function (n, delay, forget) {
  const modulusConstant = 1000000007;
  const newlyAwareCounts = new Array(n + 1).fill(0);
  newlyAwareCounts[1] = 1;

  let currentIterationDay = 1;
  while (currentIterationDay <= n) {
    if (newlyAwareCounts[currentIterationDay] === 0) {
      currentIterationDay++;
      continue;
    }

    const sharingStartsDay = currentIterationDay + delay;
    const sharingEndsDay = currentIterationDay + forget; // Exclusive upper bound

    for (
      let dayForPropagation = sharingStartsDay;
      dayForPropagation < sharingEndsDay && dayForPropagation <= n;
      dayForPropagation++
    ) {
      newlyAwareCounts[dayForPropagation] =
        (newlyAwareCounts[dayForPropagation] +
          newlyAwareCounts[currentIterationDay]) %
        modulusConstant;
    }
    currentIterationDay++;
  }

  let finalAwareCount = 0;
  const firstRelevantDay = Math.max(1, n - forget + 1);
  let summationIndex = firstRelevantDay;
  while (summationIndex <= n) {
    finalAwareCount =
      (finalAwareCount + newlyAwareCounts[summationIndex]) % modulusConstant;
    summationIndex++;
  }

  return finalAwareCount;
};
