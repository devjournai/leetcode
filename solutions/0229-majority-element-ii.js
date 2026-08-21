/**
 * Majority Element II
 * Intuition: At most two values can appear more than n/3 times. Boyer–Moore voting tracks two candidates; a second pass verifies counts against n/3.
 * Approach: 1. First pass: increment a matching candidate, else fill an empty slot, else decrement both counts. 2. Recount both candidates. 3. Push those whose count > n/3 (skip a duplicate second candidate). 4. Return the list.
 * Dry Run: nums = [3,2,3].
 *   - 3 → first=3 c1=1; 2 → second=2 c2=1; 3 → c1=2.
 *   - Verify: 3 appears 2 > 1, 2 appears 1 not > 1. Return [3].
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
var majorityElement = function (nums) {
  if (nums.length === 0) {
    return [];
  }

  let firstCandidate = 0;
  let secondCandidate = 0;
  let firstCount = 0;
  let secondCount = 0;

  for (const currentNumber of nums) {
    if (currentNumber === firstCandidate) {
      firstCount++;
    } else if (currentNumber === secondCandidate) {
      secondCount++;
    } else if (firstCount === 0) {
      firstCandidate = currentNumber;
      firstCount = 1;
    } else if (secondCount === 0) {
      secondCandidate = currentNumber;
      secondCount = 1;
    } else {
      firstCount--;
      secondCount--;
    }
  }

  let verifiedCountOne = 0;
  let verifiedCountTwo = 0;

  for (const elementValue of nums) {
    if (elementValue === firstCandidate) {
      verifiedCountOne++;
    } else if (elementValue === secondCandidate) {
      verifiedCountTwo++;
    }
  }

  const thresholdFrequency = nums.length / 3;
  const resultList = [];

  if (verifiedCountOne > thresholdFrequency) {
    resultList.push(firstCandidate);
  }

  if (
    verifiedCountTwo > thresholdFrequency &&
    firstCandidate !== secondCandidate
  ) {
    resultList.push(secondCandidate);
  }

  return resultList;
};
