/**
 * Majority Element II
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
