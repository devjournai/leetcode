/**
* Split The Array
* Intuition: To split the array into two distinct sub-arrays of equal length, each number in the original array can appear at most once in each sub-array. This implies that any given number can appear at most two times in the total array. If a number appears three or more times, it's impossible to satisfy the distinctness requirement for both sub-arrays simultaneously.
* Approach: 1. Initialize a hash map to store the frequency of each number. 2. Iterate through each number in the input array. 3. For each number, increment its count in the hash map. 4. Immediately after incrementing, check if the count for that number exceeds two. 5. If the count exceeds two, return `false` as it's impossible to split. 6. If the loop completes without any count exceeding two, return `true`.
* Dry Run: nums = [1,1,2,2]
1. Initialize `numberCounts = new Map()`.
2. First element `currentNumber = 1`:
- `numberCounts.get(1)` is undefined, so `numberCounts.set(1, 1)`.
- `numberCounts.get(1)` is `1`. `1 > 2` is `false`.
3. Second element `currentNumber = 1`:
- `numberCounts.get(1)` is `1`, so `numberCounts.set(1, 1 + 1)` -> `numberCounts.set(1, 2)`.
- `numberCounts.get(1)` is `2`. `2 > 2` is `false`.
4. Third element `currentNumber = 2`:
- `numberCounts.get(2)` is undefined, so `numberCounts.set(2, 1)`.
- `numberCounts.get(2)` is `1`. `1 > 2` is `false`.
5. Fourth element `currentNumber = 2`:
- `numberCounts.get(2)` is `1`, so `numberCounts.set(2, 1 + 1)` -> `numberCounts.set(2, 2)`.
- `numberCounts.get(2)` is `2`. `2 > 2` is `false`.
6. Loop finishes. Return `true`.

Dry Run: nums = [1,1,1,2]
1. Initialize `numberCounts = new Map()`.
2. First element `currentNumber = 1`:
- `numberCounts.set(1, 1)`.
- `numberCounts.get(1)` is `1`. `1 > 2` is `false`.
3. Second element `currentNumber = 1`:
- `numberCounts.set(1, 2)`.
- `numberCounts.get(1)` is `2`. `2 > 2` is `false`.
4. Third element `currentNumber = 1`:
- `numberCounts.set(1, 3)`.
- `numberCounts.get(1)` is `3`. `3 > 2` is `true`. Immediately return `false`.
* Time Complexity: O(N)
* Space Complexity: O(K)
*/
var isPossibleToSplit = function (inputNumbers) {
  const numberCounts = new Map();

  for (const currentNumber of inputNumbers) {
    const currentCount = (numberCounts.get(currentNumber) || 0) + 1;
    numberCounts.set(currentNumber, currentCount);

    if (currentCount > 2) {
      return false;
    }
  }

  return true;
};
