/**
 * Find Good Days To Rob The Bank
 * Intuition: To identify a "good day" at index `i`, we need to check two sequence properties: non-increasing guards for `time` days before `i` and non-decreasing guards for `time` days after `i`. Pre-computing the lengths of these consecutive sequences for every possible day allows for efficient lookup during the final check.
 * Approach: 1. Calculate `leftCounts`: Create an array `leftCounts` where `leftCounts[j]` stores the number of consecutive days (including `j`) ending at `j` where the guard count was non-increasing. This is done by iterating from left to right. If `security[j] <= security[j - 1]`, `leftCounts[j] = leftCounts[j - 1] + 1`; otherwise, `leftCounts[j] = 0`. 2. Calculate `rightCounts`: Create an array `rightCounts` where `rightCounts[k]` stores the number of consecutive days (including `k`) starting at `k` where the guard count was non-decreasing. This is done by iterating from right to left. If `security[k] <= security[k + 1]`, `rightCounts[k] = rightCounts[k + 1] + 1`; otherwise, `rightCounts[k] = 0`. 3. Identify Good Days: Iterate through the possible days `l` (from `time` to `security.length - 1 - time`). For each day `l`, if `leftCounts[l]` is greater than or equal to `time` AND `rightCounts[l]` is greater than or equal to `time`, then `l` is a good day to rob the bank, and it's added to the result list. 4. Return the list of good days.
 * Dry Run: security = [5, 3, 3, 3, 5, 6, 2], time = 2
 * currentLength = 7
 * leftCounts = [0, 0, 0, 0, 0, 0, 0] (initialized)
 * rightCounts = [0, 0, 0, 0, 0, 0, 0] (initialized)
 * finalDays = [] (initialized)
 *
 * 1. First loop (idxForward for leftCounts):
 * idxForward = 1: security[1]=3 <= security[0]=5. leftCounts[1] = leftCounts[0]+1 = 1. leftCounts becomes [0, 1, 0, 0, 0, 0, 0]
 * idxForward = 2: security[2]=3 <= security[1]=3. leftCounts[2] = leftCounts[1]+1 = 2. leftCounts becomes [0, 1, 2, 0, 0, 0, 0]
 * idxForward = 3: security[3]=3 <= security[2]=3. leftCounts[3] = leftCounts[2]+1 = 3. leftCounts becomes [0, 1, 2, 3, 0, 0, 0]
 * idxForward = 4: security[4]=5 > security[3]=3. leftCounts[4] = 0. leftCounts remains [0, 1, 2, 3, 0, 0, 0]
 * idxForward = 5: security[5]=6 > security[4]=5. leftCounts[5] = 0. leftCounts remains [0, 1, 2, 3, 0, 0, 0]
 * idxForward = 6: security[6]=2 <= security[5]=6. leftCounts[6] = leftCounts[5]+1 = 1. leftCounts becomes [0, 1, 2, 3, 0, 0, 1]
 *
 * 2. Second loop (idxBackward for rightCounts):
 * (Initialize rightCounts[currentLength-1] = 0. For `security = [..., 2]`, `rightCounts[6]=0`)
 * idxBackward = 5: security[5]=6 > security[6]=2. rightCounts[5] = 0. rightCounts becomes [0, 0, 0, 0, 0, 0, 0] (considering previous value of rightCounts[6] was 0)
 * idxBackward = 4: security[4]=5 <= security[5]=6. rightCounts[4] = rightCounts[5]+1 = 1. rightCounts becomes [0, 0, 0, 0, 1, 0, 0]
 * idxBackward = 3: security[3]=3 <= security[4]=5. rightCounts[3] = rightCounts[4]+1 = 2. rightCounts becomes [0, 0, 0, 2, 1, 0, 0]
 * idxBackward = 2: security[2]=3 <= security[3]=3. rightCounts[2] = rightCounts[3]+1 = 3. rightCounts becomes [0, 0, 3, 2, 1, 0, 0]
 * idxBackward = 1: security[1]=3 <= security[2]=3. rightCounts[1] = rightCounts[2]+1 = 4. rightCounts becomes [0, 4, 3, 2, 1, 0, 0]
 * idxBackward = 0: security[0]=5 > security[1]=3. rightCounts[0] = 0. rightCounts remains [0, 4, 3, 2, 1, 0, 0]
 *
 * 3. Third loop (idxCheck for finalDays):
 * Loop from idxCheck = time (2) to currentLength - time (7 - 2 = 5). So, idxCheck = 2, 3, 4.
 * idxCheck = 2: leftCounts[2]=2 >= time=2 (True), rightCounts[2]=3 >= time=2 (True). Both True. finalDays.push(2). finalDays = [2]
 * idxCheck = 3: leftCounts[3]=3 >= time=2 (True), rightCounts[3]=2 >= time=2 (True). Both True. finalDays.push(3). finalDays = [2, 3]
 * idxCheck = 4: leftCounts[4]=0 >= time=2 (False). Skip.
 *
 * Return [2, 3].
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
var goodDaysToRobBank = function (security, time) {
  const currentLength = security.length;
  const leftCounts = new Array(currentLength).fill(0);
  const rightCounts = new Array(currentLength).fill(0);
  const finalDays = [];

  if (currentLength < 2 * time + 1) {
    return finalDays;
  }

  for (let idxForward = 1; idxForward < currentLength; idxForward++) {
    if (security[idxForward] <= security[idxForward - 1]) {
      leftCounts[idxForward] = leftCounts[idxForward - 1] + 1;
    } else {
      leftCounts[idxForward] = 0;
    }
  }

  for (let idxBackward = currentLength - 2; idxBackward >= 0; idxBackward--) {
    if (security[idxBackward] <= security[idxBackward + 1]) {
      rightCounts[idxBackward] = rightCounts[idxBackward + 1] + 1;
    } else {
      rightCounts[idxBackward] = 0;
    }
  }

  for (let idxCheck = time; idxCheck < currentLength - time; idxCheck++) {
    if (leftCounts[idxCheck] >= time && rightCounts[idxCheck] >= time) {
      finalDays.push(idxCheck);
    }
  }

  return finalDays;
};
