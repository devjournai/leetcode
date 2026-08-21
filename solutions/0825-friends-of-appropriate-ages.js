/**
 * Friends Of Appropriate Ages
 * Intuition: Requests depend only on ages. Count people per age 1..120, then for every (x,y) pair of ages apply the three LeetCode inequalities, multiplying counts (minus self when x=y).
 * Approach: 1. Histogram `ageGroupCounts`. 2. Nested ages; require y > 0.5x+7, y ≤ x, and not (y>100 && x<100). 3. Same age: count*(count-1); else product.
 * Dry Run: ages = [16,16]. 16 > 0.5*16+7 = 15, same age so 2*(2-1) = 2 requests.
 * Time Complexity: O(N + MAX_AGE^2)
 * Space Complexity: O(MAX_AGE)
 */
var numFriendRequests = function (ages) {
  const maximumPermittedAge = 120;
  const ageGroupCounts = new Array(maximumPermittedAge + 1).fill(0);

  for (const individualAge of ages) {
    ageGroupCounts[individualAge]++;
  }

  let cumulativeRequestsCount = 0;

  for (let primaryAge = 1; primaryAge <= maximumPermittedAge; primaryAge++) {
    if (ageGroupCounts[primaryAge] === 0) {
      continue;
    }

    for (
      let secondaryAge = 1;
      secondaryAge <= maximumPermittedAge;
      secondaryAge++
    ) {
      if (ageGroupCounts[secondaryAge] === 0) {
        continue;
      }

      // Condition 1: age[y] <= 0.5 * age[x] + 7 must be FALSE
      // So, secondaryAge > 0.5 * primaryAge + 7 must be TRUE
      const isAboveHalfPlusSeven = secondaryAge > 0.5 * primaryAge + 7;

      // Condition 2: age[y] > age[x] must be FALSE
      // So, secondaryAge <= primaryAge must be TRUE
      const isNotOlderThanPrimary = secondaryAge <= primaryAge;

      // Condition 3: age[y] > 100 && age[x] < 100 must be FALSE
      // So, !(secondaryAge > 100 && primaryAge < 100) must be TRUE
      // This means (secondaryAge <= 100 || primaryAge >= 100)
      const isNotMatureMismatch = !(secondaryAge > 100 && primaryAge < 100);

      if (
        isAboveHalfPlusSeven &&
        isNotOlderThanPrimary &&
        isNotMatureMismatch
      ) {
        const countPrimary = ageGroupCounts[primaryAge];
        const countSecondary = ageGroupCounts[secondaryAge];

        if (primaryAge === secondaryAge) {
          // If ages are identical, a person won't friend themselves.
          // Thus, total combinations are countPrimary * (countSecondary - 1).
          cumulativeRequestsCount += countPrimary * (countSecondary - 1);
        } else {
          cumulativeRequestsCount += countPrimary * countSecondary;
        }
      }
    }
  }

  return cumulativeRequestsCount;
};
