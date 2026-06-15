/**
 * Query Kth Smallest Trimmed Number
 * Intuition: For each query, we need to find the Kth smallest number after trimming. A max-heap of size K can efficiently track the K smallest elements seen so far. The heap's top element will be the Kth smallest, based on custom comparison logic that considers both trimmed string value and original index for tie-breaking.
 * Approach: 1. Initialize an array to store query results. 2. Determine the common length of numbers (`initialStringLength`). 3. Declare a mutable variable `currentTrimStart` (the starting index for trimming) which will be updated for each query. 4. Create a single `MaxPriorityQueue` instance. Its comparator function will capture `nums` and `initialStringLength` and refer to `currentTrimStart`. The comparator returns positive if element `indexB` is "larger" than `indexA`, prioritizing by trimmed string value (lexicographically) and then by original index (larger index means larger value for Max-Heap tie-breaking). 5. Iterate through each query. For each query, update `currentTrimStart` based on the query's `trimValue` and `initialStringLength`, and then clear the `MaxPriorityQueue`. 6. Iterate through all numbers in `nums`, enqueueing each number's original index into the `MaxPriorityQueue`. If the heap's current size exceeds the query's `K` value, dequeue the largest element. 7. After processing all numbers for a query, the element remaining at the top of the heap is the Kth smallest according to the defined comparison; dequeue this original index and store it in the `queryResults` array. 8. Return the `queryResults` array.
 * Dry Run:
 * nums = ["102", "473", "251", "814"], queries = [[1,1],[2,3],[4,2]]
 * initialStringLength = 3
 * queryResults = [undefined, undefined, undefined]
 * currentTrimStart = undefined (variable to be updated per query)
 *
 * MaxPriorityQueue (`topKContainer`) with comparator:
 * (idxA, idxB) => {
 *   // Lexicographical comparison for trimmed strings:
 *   // Returns positive if `nums[idxB]`'s trimmed part is numerically larger than `nums[idxA]`'s trimmed part.
 *   for (let pos = currentTrimStart; pos < initialStringLength; pos++) {
 *     const charCodeA = nums[idxA].charCodeAt(pos);
 *     const charCodeB = nums[idxB].charCodeAt(pos);
 *     if (charCodeA !== charCodeB) {
 *       return charCodeB - charCodeA;
 *     }
 *   }
 *   // Tie-breaker by original index:
 *   // If trimmed strings are equal, returns positive if `idxB` is larger than `idxA`.
 *   // This ensures Max-Heap prioritizes larger indices for equivalent trimmed numbers,
 *   // effectively making lower indices "smaller" as per problem rule ("lower index is considered to be smaller").
 *   return idxB - idxA;
 * }
 *
 * Query 1: [1, 1] (requiredK = 1, trimAmount = 1)
 *   currentTrimStart = 3 - 1 = 2
 *   topKContainer.clear()
 *   Iterate `numEntryIndex` from 0 to 3:
 *     - numEntryIndex = 0 (nums[0]="102", trimmed = "2"): Enqueue 0. topKContainer: [0]
 *     - numEntryIndex = 1 (nums[1]="473", trimmed = "3"): Enqueue 1. topKContainer: [0,1]. Size=2 > requiredK=1. Dequeue (removes element with max priority, which is 1 as ("3",1) > ("2",0)). topKContainer: [0].
 *     - numEntryIndex = 2 (nums[2]="251", trimmed = "1"): Enqueue 2. topKContainer: [0,2]. Size=2 > requiredK=1. Dequeue (removes element with max priority, which is 0 as ("2",0) > ("1",2)). topKContainer: [2].
 *     - numEntryIndex = 3 (nums[3]="814", trimmed = "4"): Enqueue 3. topKContainer: [2,3]. Size=2 > requiredK=1. Dequeue (removes element with max priority, which is 3 as ("4",3) > ("1",2)). topKContainer: [2].
 *   queryResults[0] = topKContainer.dequeue() -> 2.
 *
 * Query 2: [2, 3] (requiredK = 2, trimAmount = 3)
 *   currentTrimStart = 3 - 3 = 0
 *   topKContainer.clear()
 *   Iterate `numEntryIndex` from 0 to 3:
 *     - numEntryIndex = 0 (nums[0]="102", trimmed="102"): Enqueue 0. topKContainer: [0]
 *     - numEntryIndex = 1 (nums[1]="473", trimmed="473"): Enqueue 1. topKContainer: [0,1]. Size=2 <= requiredK=2.
 *       (Internal state: Max-heap containing (0, "102") and (1, "473"). (1, "473") is 'larger', so 1 is at root).
 *     - numEntryIndex = 2 (nums[2]="251", trimmed="251"): Enqueue 2. topKContainer: [1,0,2]. Size=3 > requiredK=2. Dequeue (removes max priority element, which is 1 (val "473")). topKContainer: [0,2].
 *       (Internal state: Max-heap containing (0, "102") and (2, "251"). (2, "251") is 'larger', so 2 is at root).
 *     - numEntryIndex = 3 (nums[3]="814", trimmed="814"): Enqueue 3. topKContainer: [2,0,3]. Size=3 > requiredK=2. Dequeue (removes max priority element, which is 3 (val "814")). topKContainer: [2,0].
 *       (Internal state: Max-heap containing (0, "102") and (2, "251"). (2, "251") is 'larger', so 2 is at root).
 *   queryResults[1] = topKContainer.dequeue() -> 2. (The 2nd smallest numbers for trim=3 are ("102", 0) and ("251", 2). The 2nd smallest is ("251", 2), so index 2).
 *
 * Query 3: [4, 2] (requiredK = 4, trimAmount = 2)
 *   currentTrimStart = 3 - 2 = 1
 *   topKContainer.clear()
 *   Iterate `numEntryIndex` from 0 to 3:
 *     - numEntryIndex = 0 (nums[0]="102", trimmed="02"): Enqueue 0. topKContainer: [0]
 *     - numEntryIndex = 1 (nums[1]="473", trimmed="73"): Enqueue 1. topKContainer: [0,1].
 *     - numEntryIndex = 2 (nums[2]="251", trimmed="51"): Enqueue 2. topKContainer: [0,1,2].
 *     - numEntryIndex = 3 (nums[3]="814", trimmed="14"): Enqueue 3. topKContainer: [0,1,2,3]. Size=4 <= requiredK=4.
 *       (All elements (0,"02"), (1,"73"), (2,"51"), (3,"14") are in the heap. The largest of these is (1,"73")).
 *   queryResults[2] = topKContainer.dequeue() -> 1. (The 4th smallest is (1,"73"), so index 1).
 *
 * Final queryResults: [2, 2, 1]
 * Time Complexity: O(Q * N * M * log K)
 * Space Complexity: O(N + M + Q)
 */
var smallestTrimmedNumbers = function (nums, queries) {
  if (nums.length === 0) {
    return [];
  }

  const initialStringLength = nums[0].length;
  const queryResults = new Array(queries.length);
  let currentTrimStart = 0;

  const topKContainer = new PriorityQueue((indexA, indexB) => {
    for (
      let position = currentTrimStart;
      position < initialStringLength;
      position++
    ) {
      const charCodeA = nums[indexA].charCodeAt(position);
      const charCodeB = nums[indexB].charCodeAt(position);
      if (charCodeA !== charCodeB) {
        return charCodeB - charCodeA;
      }
    }
    return indexB - indexA;
  });

  for (
    let queryIteration = 0;
    queryIteration < queries.length;
    queryIteration++
  ) {
    const currentQueryInfo = queries[queryIteration];
    const requiredKValue = currentQueryInfo[0];
    const trimDigitAmount = currentQueryInfo[1];

    currentTrimStart = initialStringLength - trimDigitAmount;
    topKContainer.clear();

    for (
      let numEntryIteration = 0;
      numEntryIteration < nums.length;
      numEntryIteration++
    ) {
      topKContainer.enqueue(numEntryIteration);
      if (topKContainer.size() > requiredKValue) {
        topKContainer.dequeue();
      }
    }
    queryResults[queryIteration] = topKContainer.dequeue();
  }

  return queryResults;
};
