/**
 * Chunk Array
 * Intuition: Iterate through the original array, taking segments of the specified 'size' at a time. Each segment forms a chunk, and these chunks are collected into a new array.
 * Approach: 1. Initialize an empty array to store the resulting chunks. 2. Use a pointer to keep track of the current starting index for chunking. 3. Loop while the pointer is within the bounds of the original array. 4. In each iteration, extract a subarray from the current pointer up to 'pointer + size'. 5. Add this extracted subarray to the results array. 6. Advance the pointer by 'size'. 7. Return the accumulated chunks.
 * Dry Run: arr = [1, 2, 3, 4, 5], size = 2
 *   1. `compiledChunks = []`, `startPointer = 0`
 *   2. `startPointer` (0) < `arr.length` (5): true
 *      `arr.slice(0, 0 + 2)` -> `[1, 2]`
 *      `compiledChunks.push([1, 2])` -> `compiledChunks = [[1, 2]]`
 *      `startPointer = 0 + 2` -> `startPointer = 2`
 *   3. `startPointer` (2) < `arr.length` (5): true
 *      `arr.slice(2, 2 + 2)` -> `[3, 4]`
 *      `compiledChunks.push([3, 4])` -> `compiledChunks = [[1, 2], [3, 4]]`
 *      `startPointer = 2 + 2` -> `startPointer = 4`
 *   4. `startPointer` (4) < `arr.length` (5): true
 *      `arr.slice(4, 4 + 2)` -> `[5]` (slice handles out-of-bounds end gracefully)
 *      `compiledChunks.push([5])` -> `compiledChunks = [[1, 2], [3, 4], [5]]`
 *      `startPointer = 4 + 2` -> `startPointer = 6`
 *   5. `startPointer` (6) < `arr.length` (5): false. Loop terminates.
 *   Returns `[[1, 2], [3, 4], [5]]`
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var chunk = function (arr, size) {
  let compiledChunks = [];
  let startPointer = 0;

  while (startPointer < arr.length) {
    let currentChunk = arr.slice(startPointer, startPointer + size);
    compiledChunks.push(currentChunk);
    startPointer += size;
  }

  return compiledChunks;
};
