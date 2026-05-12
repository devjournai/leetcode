/**
 * Find The Kth Largest Integer In The Array
 * Intuition: To find the Kth largest element efficiently, a min-priority queue (min-heap) of size K can be used. This heap will always store the K largest elements encountered so far, with the smallest among them (which is the Kth largest overall) at its root.
 * Approach:
 * 1. Initialize an empty array, `heapStorage`, to serve as the underlying data structure for our min-heap.
 * 2. Define three helper functions to manage the min-heap: `bubbleElementUp` (to maintain heap property after insertion), `sinkElementDown` (to maintain heap property after extraction), `addElementToHeap` (to insert a value), and `removeMinElement` (to extract the minimum value).
 * 3. Iterate through each number string in the input array `nums`.
 * 4. For each `currentNumberString`, convert it to a `BigInt` (named `bigIntegerValue`) to correctly handle potentially very large integer values as specified by the problem constraints.
 * 5. Call `addElementToHeap` with `bigIntegerValue` to insert it into `heapStorage`. This operation ensures the min-heap property is maintained.
 * 6. After insertion, check if the current size of `heapStorage` exceeds `k`. If it does, call `removeMinElement` to remove the smallest element from the heap (its root). This step is crucial to keep the heap's size at most `k` and ensure it always contains the `k` largest numbers seen so far.
 * 7. Once all number strings in `nums` have been processed, the element at the root of `heapStorage` (i.e., `heapStorage[0]`) will be the Kth largest integer.
 * 8. Convert this `BigInt` back to a string and return it.
 * Dry Run:
 * nums = ["1", "2", "2", "3", "4"], k = 2
 * heapStorage = []
 *
 * 1. Process "1":
 *    bigIntegerValue = 1n.
 *    addElementToHeap(1n) -> heapStorage = [1n].
 *    heapStorage.length (1) <= k (2).
 *
 * 2. Process "2":
 *    bigIntegerValue = 2n.
 *    addElementToHeap(2n) -> heapStorage = [1n, 2n].
 *    heapStorage.length (2) <= k (2).
 *
 * 3. Process "2":
 *    bigIntegerValue = 2n.
 *    addElementToHeap(2n) -> heapStorage = [1n, 2n, 2n]. (Heap structure: 1n at root, children 2n, 2n)
 *    heapStorage.length (3) > k (2).
 *    removeMinElement():
 *      minimumValue = 1n.
 *      heapStorage[0] becomes heapStorage.pop() (which is 2n). heapStorage = [2n, 2n].
 *      sinkElementDown(0): 2n (at index 0) compared to its child 2n (at index 1). No swap needed.
 *      Resulting heapStorage = [2n, 2n].
 *
 * 4. Process "3":
 *    bigIntegerValue = 3n.
 *    addElementToHeap(3n) -> heapStorage = [2n, 2n, 3n]. (Heap structure: 2n at root, children 2n, 3n)
 *    heapStorage.length (3) > k (2).
 *    removeMinElement():
 *      minimumValue = 2n (from root).
 *      heapStorage[0] becomes heapStorage.pop() (which is 3n). heapStorage = [3n, 2n].
 *      sinkElementDown(0): 3n (at index 0) compared to its child 2n (at index 1). Swap.
 *      heapStorage becomes [2n, 3n].
 *      Resulting heapStorage = [2n, 3n].
 *
 * 5. Process "4":
 *    bigIntegerValue = 4n.
 *    addElementToHeap(4n) -> heapStorage = [2n, 3n, 4n]. (Heap structure: 2n at root, children 3n, 4n)
 *    heapStorage.length (3) > k (2).
 *    removeMinElement():
 *      minimumValue = 2n (from root).
 *      heapStorage[0] becomes heapStorage.pop() (which is 4n). heapStorage = [4n, 3n].
 *      sinkElementDown(0): 4n (at index 0) compared to its child 3n (at index 1). Swap.
 *      heapStorage becomes [3n, 4n].
 *      Resulting heapStorage = [3n, 4n].
 *
 * End of iteration.
 * finalKthLargest = heapStorage[0] which is 3n.
 * Return String(3n) which is "3".
 * Time Complexity: O(N log K)
 * Space Complexity: O(K)
 */
var kthLargestNumber = function (nums, k) {
  let heapStorage = [];

  const bubbleElementUp = (currentElementIndex) => {
    while (currentElementIndex > 0) {
      let parentIndexValue = Math.floor((currentElementIndex - 1) / 2);
      if (heapStorage[parentIndexValue] > heapStorage[currentElementIndex]) {
        [heapStorage[parentIndexValue], heapStorage[currentElementIndex]] = [
          heapStorage[currentElementIndex],
          heapStorage[parentIndexValue],
        ];
        currentElementIndex = parentIndexValue;
      } else {
        break;
      }
    }
  };

  const sinkElementDown = (currentPosition) => {
    let leftChildPosition, rightChildPosition, smallestPosition;
    while (true) {
      leftChildPosition = 2 * currentPosition + 1;
      rightChildPosition = 2 * currentPosition + 2;
      smallestPosition = currentPosition;

      if (
        leftChildPosition < heapStorage.length &&
        heapStorage[leftChildPosition] < heapStorage[smallestPosition]
      ) {
        smallestPosition = leftChildPosition;
      }

      if (
        rightChildPosition < heapStorage.length &&
        heapStorage[rightChildPosition] < heapStorage[smallestPosition]
      ) {
        smallestPosition = rightChildPosition;
      }

      if (smallestPosition !== currentPosition) {
        [heapStorage[currentPosition], heapStorage[smallestPosition]] = [
          heapStorage[smallestPosition],
          heapStorage[currentPosition],
        ];
        currentPosition = smallestPosition;
      } else {
        break;
      }
    }
  };

  const addElementToHeap = (newValue) => {
    heapStorage.push(newValue);
    bubbleElementUp(heapStorage.length - 1);
  };

  const removeMinElement = () => {
    if (heapStorage.length === 0) return null;
    if (heapStorage.length === 1) return heapStorage.pop();

    const minimumValue = heapStorage[0];
    heapStorage[0] = heapStorage.pop();
    sinkElementDown(0);
    return minimumValue;
  };

  for (let currentNumberString of nums) {
    const bigIntegerValue = BigInt(currentNumberString);
    addElementToHeap(bigIntegerValue);

    if (heapStorage.length > k) {
      removeMinElement();
    }
  }

  const finalKthLargest = heapStorage[0];
  return String(finalKthLargest);
};
