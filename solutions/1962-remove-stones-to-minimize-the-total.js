/**
 * Remove Stones To Minimize The Total
 * Intuition: To minimize the total stones, we should always remove stones from the pile that offers the largest reduction. The reduction from a pile 'p' is `ceil(p / 2)`, which is generally greater for larger 'p'. Therefore, a greedy approach using a Max-Heap to repeatedly target the largest pile is optimal.
 * Approach: 1. Initialize a Max-Heap and calculate the initial total sum of all stones. 2. Add each pile's stone count to the Max-Heap. 3. Perform `k` operations: In each operation, extract the largest pile from the Max-Heap, calculate the number of stones to remove (`ceil(largest_pile / 2)`), subtract this amount from the total sum, and insert the remaining stones (`largest_pile - ceil(largest_pile / 2)`) back into the Max-Heap. 4. After `k` operations, return the final total sum.
 * Dry Run: piles = [5, 4, 9], k = 2
 *   1. Initialize maxHeapInstance, totalStonesSum = 0.
 *   2. Populate maxHeapInstance and totalStonesSum:
 *      - initialPile = 5: maxHeapInstance.enqueue(5), totalStonesSum = 5.
 *      - initialPile = 4: maxHeapInstance.enqueue(4), totalStonesSum = 9.
 *      - initialPile = 9: maxHeapInstance.enqueue(9), totalStonesSum = 18.
 *      (maxHeapInstance logically: [9, 5, 4], totalStonesSum = 18)
 *   3. Operations (k = 2):
 *      - operationCounter = 2:
 *          - extractedPile = maxHeapInstance.dequeue() // 9. maxHeapInstance: [5, 4]
 *          - stonesToReduce = Math.ceil(9 / 2) // 5
 *          - totalStonesSum = 18 - 5 // 13
 *          - updatedPile = 9 - 5 // 4
 *          - maxHeapInstance.enqueue(4) // maxHeapInstance: [5, 4, 4]
 *      - operationCounter = 1:
 *          - extractedPile = maxHeapInstance.dequeue() // 5. maxHeapInstance: [4, 4]
 *          - stonesToReduce = Math.ceil(5 / 2) // 3
 *          - totalStonesSum = 13 - 3 // 10
 *          - updatedPile = 5 - 3 // 2
 *          - maxHeapInstance.enqueue(2) // maxHeapInstance: [4, 4, 2]
 *   4. Loop ends as operationCounter becomes 0.
 *   5. Return totalStonesSum = 10.
 * Time Complexity: O(N log N + K log N)
 * Space Complexity: O(N)
 */
var minStoneSum = function (piles, k) {
  const maxHeapInstance = new PriorityQueue(
    (elementA, elementB) => elementB - elementA,
  );
  let totalStonesSum = 0;

  for (const initialPile of piles) {
    maxHeapInstance.enqueue(initialPile);
    totalStonesSum += initialPile;
  }

  let operationCounter = k;
  while (operationCounter > 0) {
    const extractedPile = maxHeapInstance.dequeue();
    const stonesToReduce = Math.ceil(extractedPile / 2);
    totalStonesSum -= stonesToReduce;
    const updatedPile = extractedPile - stonesToReduce;
    maxHeapInstance.enqueue(updatedPile);
    operationCounter--;
  }

  return totalStonesSum;
};
