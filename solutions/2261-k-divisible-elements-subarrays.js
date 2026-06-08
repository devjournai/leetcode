/**
 * K Divisible Elements Subarrays
 * Intuition: Iterate through all possible subarrays, keeping track of the count of elements divisible by 'p'. Store valid subarrays as strings in a Set to ensure distinctness.
 * Approach: 1. Initialize 'totalElements' as the length of the input array 'nums'. 2. Create an empty Set named 'distinctSubarraysContainer' to store unique string representations of valid subarrays. 3. Iterate with an outer loop using 'startIndex' from 0 up to 'totalElements - 1' to mark the beginning of a subarray. 4. Inside the outer loop, initialize an empty array 'currentSubarray' and a counter 'currentDivisibleItemsCount' to zero. 5. Start an inner loop with 'endIndex' from 'startIndex' up to 'totalElements - 1' to extend the subarray. 6. In each step of the inner loop, add 'nums[endIndex]' to 'currentSubarray'. 7. Check if 'nums[endIndex]' is divisible by 'divisorValue' (p). If it is, increment 'currentDivisibleItemsCount'. 8. If 'currentDivisibleItemsCount' is less than or equal to 'maxDivisibleAllowed' (k), convert 'currentSubarray' to a comma-separated string using `join(',')` and add this string to 'distinctSubarraysContainer'. 9. After both loops complete, return the size of 'distinctSubarraysContainer'.
 * Dry Run: nums = [2,3,3,2,2], k = 2, p = 2
 *   totalElements = 5
 *   distinctSubarraysContainer = Set()
 *
 *   startIndex = 0: (nums[0] = 2)
 *     currentSubarray = []
 *     currentDivisibleItemsCount = 0
 *     endIndex = 0: currentNumber = 2. currentSubarray = [2]. 2 % 2 === 0, currentDivisibleItemsCount = 1. (1 <= 2). Add "2". distinctSubarraysContainer = {"2"}
 *     endIndex = 1: currentNumber = 3. currentSubarray = [2,3]. 3 % 2 !== 0. currentDivisibleItemsCount = 1. (1 <= 2). Add "2,3". distinctSubarraysContainer = {"2", "2,3"}
 *     endIndex = 2: currentNumber = 3. currentSubarray = [2,3,3]. 3 % 2 !== 0. currentDivisibleItemsCount = 1. (1 <= 2). Add "2,3,3". distinctSubarraysContainer = {"2", "2,3", "2,3,3"}
 *     endIndex = 3: currentNumber = 2. currentSubarray = [2,3,3,2]. 2 % 2 === 0, currentDivisibleItemsCount = 2. (2 <= 2). Add "2,3,3,2". distinctSubarraysContainer = {"2", "2,3", "2,3,3", "2,3,3,2"}
 *     endIndex = 4: currentNumber = 2. currentSubarray = [2,3,3,2,2]. 2 % 2 === 0, currentDivisibleItemsCount = 3. (3 > 2). Skip.
 *
 *   startIndex = 1: (nums[1] = 3)
 *     currentSubarray = []
 *     currentDivisibleItemsCount = 0
 *     endIndex = 1: currentNumber = 3. currentSubarray = [3]. 3 % 2 !== 0. currentDivisibleItemsCount = 0. (0 <= 2). Add "3". distinctSubarraysContainer = {"2", "2,3", "2,3,3", "2,3,3,2", "3"}
 *     endIndex = 2: currentNumber = 3. currentSubarray = [3,3]. 3 % 2 !== 0. currentDivisibleItemsCount = 0. (0 <= 2). Add "3,3". distinctSubarraysContainer = {"2", "2,3", "2,3,3", "2,3,3,2", "3", "3,3"}
 *     endIndex = 3: currentNumber = 2. currentSubarray = [3,3,2]. 2 % 2 === 0, currentDivisibleItemsCount = 1. (1 <= 2). Add "3,3,2". distinctSubarraysContainer = {"2", "2,3", "2,3,3", "2,3,3,2", "3", "3,3", "3,3,2"}
 *     endIndex = 4: currentNumber = 2. currentSubarray = [3,3,2,2]. 2 % 2 === 0, currentDivisibleItemsCount = 2. (2 <= 2). Add "3,3,2,2". distinctSubarraysContainer = {"2", "2,3", "2,3,3", "2,3,3,2", "3", "3,3", "3,3,2", "3,3,2,2"}
 *
 *   startIndex = 2: (nums[2] = 3)
 *     currentSubarray = []
 *     currentDivisibleItemsCount = 0
 *     endIndex = 2: currentNumber = 3. currentSubarray = [3]. 3 % 2 !== 0. currentDivisibleItemsCount = 0. (0 <= 2). Add "3". (already exists)
 *     endIndex = 3: currentNumber = 2. currentSubarray = [3,2]. 2 % 2 === 0, currentDivisibleItemsCount = 1. (1 <= 2). Add "3,2". distinctSubarraysContainer = {"2", "2,3", "2,3,3", "2,3,3,2", "3", "3,3", "3,3,2", "3,3,2,2", "3,2"}
 *     endIndex = 4: currentNumber = 2. currentSubarray = [3,2,2]. 2 % 2 === 0, currentDivisibleItemsCount = 2. (2 <= 2). Add "3,2,2". distinctSubarraysContainer = {"2", "2,3", "2,3,3", "2,3,3,2", "3", "3,3", "3,3,2", "3,3,2,2", "3,2", "3,2,2"}
 *
 *   startIndex = 3: (nums[3] = 2)
 *     currentSubarray = []
 *     currentDivisibleItemsCount = 0
 *     endIndex = 3: currentNumber = 2. currentSubarray = [2]. 2 % 2 === 0, currentDivisibleItemsCount = 1. (1 <= 2). Add "2". (already exists)
 *     endIndex = 4: currentNumber = 2. currentSubarray = [2,2]. 2 % 2 === 0, currentDivisibleItemsCount = 2. (2 <= 2). Add "2,2". distinctSubarraysContainer = {"2", "2,3", "2,3,3", "2,3,3,2", "3", "3,3", "3,3,2", "3,3,2,2", "3,2", "3,2,2", "2,2"}
 *
 *   startIndex = 4: (nums[4] = 2)
 *     currentSubarray = []
 *     currentDivisibleItemsCount = 0
 *     endIndex = 4: currentNumber = 2. currentSubarray = [2]. 2 % 2 === 0, currentDivisibleItemsCount = 1. (1 <= 2). Add "2". (already exists)
 *
 *   Final distinctSubarraysContainer size = 11.
 *
 * Time Complexity: O(N^3)
 * Space Complexity: O(N^3)
 */
var countDistinct = function (inputNumbers, maxDivisibleAllowed, divisorValue) {
  const totalElements = inputNumbers.length;
  const distinctSubarraysContainer = new Set();

  for (let startIndex = 0; startIndex < totalElements; startIndex++) {
    const currentSubarray = [];
    let currentDivisibleItemsCount = 0;

    for (let endIndex = startIndex; endIndex < totalElements; endIndex++) {
      const currentNumber = inputNumbers[endIndex];
      currentSubarray.push(currentNumber);

      if (currentNumber % divisorValue === 0) {
        currentDivisibleItemsCount++;
      }

      if (currentDivisibleItemsCount <= maxDivisibleAllowed) {
        distinctSubarraysContainer.add(currentSubarray.join(","));
      }
    }
  }

  return distinctSubarraysContainer.size;
};
