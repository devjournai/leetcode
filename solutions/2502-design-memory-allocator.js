/**
 * Design Memory Allocator
 * Intuition: Manage a fixed-size memory array by tracking allocated blocks using their IDs. Allocation requires finding the first contiguous block of a specific size, while freeing involves iterating and resetting all units associated with a given ID.
 * Approach: 1. Initialize a memory array with all units marked as free (0). 2. For allocation, iterate through the memory, maintaining a count of consecutive free units and a potential start index. If a block of the required size is found, fill it with the allocation ID and return its starting index. If a non-free unit is encountered, reset the count and start index. 3. For freeing memory, iterate through the entire memory array, and for every unit matching the given ID, set it back to 0 (free) and increment a counter for freed units.
 * Dry Run:
 * Allocator(10) -> memoryUnits = [0,0,0,0,0,0,0,0,0,0]
 * allocate(3, 1):
 *   - currentMemoryIndex=0,1,2: finds 3 free units. blockStartCandidate=0, currentFreeBlockLength=3.
 *   - Fills memoryUnits[0,1,2] with 1.
 *   - Returns 0. memoryUnits = [1,1,1,0,0,0,0,0,0,0]
 * allocate(3, 2):
 *   - currentMemoryIndex=0,1,2: not free. Resets blockStartCandidate, currentFreeBlockLength.
 *   - currentMemoryIndex=3,4,5: finds 3 free units. blockStartCandidate=3, currentFreeBlockLength=3.
 *   - Fills memoryUnits[3,4,5] with 2.
 *   - Returns 3. memoryUnits = [1,1,1,2,2,2,0,0,0,0]
 * freeMemory(1):
 *   - unitIterator=0: memoryUnits[0]=1. Sets to 0. totalFreedCount=1.
 *   - unitIterator=1: memoryUnits[1]=1. Sets to 0. totalFreedCount=2.
 *   - unitIterator=2: memoryUnits[2]=1. Sets to 0. totalFreedCount=3.
 *   - unitIterator=3,4,5: not 1.
 *   - Returns 3. memoryUnits = [0,0,0,2,2,2,0,0,0,0]
 * Time Complexity: O(N) for all operations (constructor, allocate, freeMemory), where N is the total memory size.
 * Space Complexity: O(N) for storing the memory array.
 */
var Allocator = function (arraySize) {
  this.memoryUnits = Array(arraySize).fill(0);
};

Allocator.prototype.allocate = function (allocationSize, allocationId) {
  let blockStartCandidate = -1;
  let currentFreeBlockLength = 0;

  for (
    let currentMemoryIndex = 0;
    currentMemoryIndex < this.memoryUnits.length;
    currentMemoryIndex++
  ) {
    if (this.memoryUnits[currentMemoryIndex] === 0) {
      if (blockStartCandidate === -1) {
        blockStartCandidate = currentMemoryIndex;
      }
      currentFreeBlockLength++;
      if (currentFreeBlockLength === allocationSize) {
        for (
          let fillBlockIndex = blockStartCandidate;
          fillBlockIndex < blockStartCandidate + allocationSize;
          fillBlockIndex++
        ) {
          this.memoryUnits[fillBlockIndex] = allocationId;
        }
        return blockStartCandidate;
      }
    } else {
      blockStartCandidate = -1;
      currentFreeBlockLength = 0;
    }
  }
  return -1;
};

Allocator.prototype.freeMemory = function (releaseId) {
  let totalFreedCount = 0;
  for (
    let unitIterator = 0;
    unitIterator < this.memoryUnits.length;
    unitIterator++
  ) {
    if (this.memoryUnits[unitIterator] === releaseId) {
      this.memoryUnits[unitIterator] = 0;
      totalFreedCount++;
    }
  }
  return totalFreedCount;
};
