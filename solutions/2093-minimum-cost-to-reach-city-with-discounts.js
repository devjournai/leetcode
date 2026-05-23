/**
* Minimum Cost To Reach City With Discounts
* Intuition: This problem is a shortest path problem on a graph where the "state" of a node is defined not just by the city, but also by the number of discounts already used to reach that city. This suggests a modification of Dijkstra's algorithm.
* Approach: 1. Represent the cities and highways as an adjacency list, where each entry contains neighbors and their respective tolls. Since highways are bidirectional, add edges in both directions. 2. Initialize a 2D array, `minCostStates`, to store the minimum cost to reach a particular city using a specific number of discounts. Dimensions will be `n` (cities) by `discounts + 1` (number of discounts used). All entries are initialized to `Infinity`, except `minCostStates[0][0]` which is 0. 3. Use a min-priority queue to manage states `[cost, city, discountsUsed]`, ordered by `cost`. Initially, add the starting state `[0, 0, 0]` to the priority queue. 4. While the priority queue is not empty, dequeue the state with the minimum `currentPathCost`. If this state's cost is higher than an already found minimum cost in `minCostStates`, skip it. If the `presentCity` is the target city (`n - 1`), then `currentPathCost` is the minimum cost and can be returned. 5. For each neighbor of the `presentCity`, consider two possibilities:  a. Traveling without a discount: Calculate the `costWithoutDiscount`. If this cost is less than `minCostStates[neighborNode][discountsMade]`, update `minCostStates` and enqueue the new state `[costWithoutDiscount, neighborNode, discountsMade]`. b. Traveling with a discount: If `discountsMade` is less than `availableDiscounts`, calculate the `costWithDiscount` (toll / 2). If this cost is less than `minCostStates[neighborNode][discountsMade + 1]`, update `minCostStates` and enqueue the new state `[costWithDiscount, neighborNode, discountsMade + 1]`. 6. If the priority queue becomes empty and the target city `n - 1` was never reached, return -1, indicating no path exists.
* Dry Run: n = 3, highways = [[0,1,10],[1,2,10],[0,2,100]], discounts = 1
  1. Initialize `adjacencyList` for 3 cities. `minCostStates[3][2]` all `Infinity`, `minCostStates[0][0]=0`.
  2. `priorityQ.enqueue([0, 0, 0])`.
  3. Dequeue `[0, 0, 0]`. Current city is 0. Neighbors: `[1,10]`, `[2,100]`.
    - To city 1 (toll 10):
    - No discount: `cost = 0+10=10`. `minCostStates[1][0]=10`. Enqueue `[10, 1, 0]`.
    - With discount (0<1): `cost = 0 + floor(10/2)=5`. `minCostStates[1][1]=5`. Enqueue `[5, 1, 1]`.
    - To city 2 (toll 100):
    - No discount: `cost = 0+100=100`. `minCostStates[2][0]=100`. Enqueue `[100, 2, 0]`.
    - With discount (0<1): `cost = 0 + floor(100/2)=50`. `minCostStates[2][1]=50`. Enqueue `[50, 2, 1]`.
      `priorityQ` has `[5, 1, 1]`, `[10, 1, 0]`, `[50, 2, 1]`, `[100, 2, 0]` (order depends on PQ implementation, `[5,1,1]` is min).
  4. Dequeue `[5, 1, 1]`. Current city is 1. Neighbors: `[0,10]`, `[2,10]`.
    - To city 0 (toll 10):
    - No discount: `cost = 5+10=15`. `minCostStates[0][1]=15`. Enqueue `[15, 0, 1]`.
    - With discount (1 not < 1): Not possible.
    - To city 2 (toll 10):
    - No discount: `cost = 5+10=15`. `minCostStates[2][1]` (50) > 15. Update `minCostStates[2][1]=15`. Enqueue `[15, 2, 1]`.
    - With discount (1 not < 1): Not possible.
    `priorityQ` has `[10, 1, 0]`, `[15, 0, 1]`, `[15, 2, 1]`, `[50, 2, 1]`, `[100, 2, 0]` (min is `[10,1,0]`).
  5. Dequeue `[10, 1, 0]`. Current city is 1. Neighbors: `[0,10]`, `[2,10]`. (Cost 10 is not > current `minCostStates[1][0]=10`).
    - To city 0 (toll 10):
    - No discount: `cost = 10+10=20`. `minCostStates[0][0]` (0) < 20. No update.
    - With discount (0<1): `cost = 10 + floor(10/2)=15`. `minCostStates[0][1]` (15) not < 15. No update.
    - To city 2 (toll 10):
    - No discount: `cost = 10+10=20`. `minCostStates[2][0]` (100) > 20. Update `minCostStates[2][0]=20`. Enqueue `[20, 2, 0]`.
    - With discount (0<1): `cost = 10 + floor(10/2)=15`. `minCostStates[2][1]` (15) not < 15. No update.
    `priorityQ` has `[15, 0, 1]`, `[15, 2, 1]`, `[20, 2, 0]`, `[50, 2, 1]`, `[100, 2, 0]` (min is `[15,0,1]` or `[15,2,1]`).
  6. Dequeue `[15, 0, 1]`. Current city 0. (Cost 15 is not > current `minCostStates[0][1]=15`). No target reached.
  7. Dequeue `[15, 2, 1]`. Current city is 2. This is `n - 1`. Return `15`.
* Time Complexity: O(E * D * log(N * D))
* Space Complexity: O(N * D + E)
*/
class PriorityQueue {
  constructor(comparatorValue = (a, b) => a - b) {
    this.heapContent = [];
    this.compareElements = comparatorValue;
  }

  size() {
    return this.heapContent.length;
  }

  isEmpty() {
    return this.heapContent.length === 0;
  }

  enqueue(newValue) {
    this.heapContent.push(newValue);
    this.siftUp();
  }

  dequeue() {
    if (this.isEmpty()) return undefined;
    if (this.size() === 1) return this.heapContent.pop();

    const rootElement = this.heapContent[0];
    this.heapContent[0] = this.heapContent.pop();
    this.siftDown();
    return rootElement;
  }

  siftUp() {
    let currentIdx = this.heapContent.length - 1;
    while (currentIdx > 0) {
      let parentIdx = Math.floor((currentIdx - 1) / 2);
      if (
        this.compareElements(
          this.heapContent[currentIdx],
          this.heapContent[parentIdx],
        ) < 0
      ) {
        [this.heapContent[currentIdx], this.heapContent[parentIdx]] = [
          this.heapContent[parentIdx],
          this.heapContent[currentIdx],
        ];
        currentIdx = parentIdx;
      } else {
        break;
      }
    }
  }

  siftDown() {
    let currentIdx = 0;
    const lastIdx = this.heapContent.length - 1;
    while (true) {
      let leftChildIdx = 2 * currentIdx + 1;
      let rightChildIdx = 2 * currentIdx + 2;
      let smallestIdx = currentIdx;

      if (
        leftChildIdx <= lastIdx &&
        this.compareElements(
          this.heapContent[leftChildIdx],
          this.heapContent[smallestIdx],
        ) < 0
      ) {
        smallestIdx = leftChildIdx;
      }

      if (
        rightChildIdx <= lastIdx &&
        this.compareElements(
          this.heapContent[rightChildIdx],
          this.heapContent[smallestIdx],
        ) < 0
      ) {
        smallestIdx = rightChildIdx;
      }

      if (smallestIdx !== currentIdx) {
        [this.heapContent[currentIdx], this.heapContent[smallestIdx]] = [
          this.heapContent[smallestIdx],
          this.heapContent[currentIdx],
        ];
        currentIdx = smallestIdx;
      } else {
        break;
      }
    }
  }
}

var minimumCost = function (nCities, allHighways, availableDiscounts) {
  const adjacencyList = Array.from({ length: nCities }, () => []);

  for (const highwayConnection of allHighways) {
    const [cityOne, cityTwo, tollValue] = highwayConnection;
    adjacencyList[cityOne].push([cityTwo, tollValue]);
    adjacencyList[cityTwo].push([cityOne, tollValue]);
  }

  const priorityQ = new PriorityQueue(
    (entryA, entryB) => entryA[0] - entryB[0],
  );
  priorityQ.enqueue([0, 0, 0]); // [cost, city, discountsUsed]

  const minCostStates = Array.from({ length: nCities }, () =>
    new Array(availableDiscounts + 1).fill(Infinity),
  );
  minCostStates[0][0] = 0;

  while (!priorityQ.isEmpty()) {
    const [currentPathCost, presentCity, discountsMade] = priorityQ.dequeue();

    if (currentPathCost > minCostStates[presentCity][discountsMade]) {
      continue;
    }

    if (presentCity === nCities - 1) {
      return currentPathCost;
    }

    for (const neighborData of adjacencyList[presentCity]) {
      const [neighborNode, edgeWeightValue] = neighborData;

      const costWithoutDiscount = currentPathCost + edgeWeightValue;
      if (costWithoutDiscount < minCostStates[neighborNode][discountsMade]) {
        minCostStates[neighborNode][discountsMade] = costWithoutDiscount;
        priorityQ.enqueue([costWithoutDiscount, neighborNode, discountsMade]);
      }

      if (discountsMade < availableDiscounts) {
        const newDiscountCount = discountsMade + 1;
        const costWithDiscount =
          currentPathCost + Math.floor(edgeWeightValue / 2);
        if (costWithDiscount < minCostStates[neighborNode][newDiscountCount]) {
          minCostStates[neighborNode][newDiscountCount] = costWithDiscount;
          priorityQ.enqueue([costWithDiscount, neighborNode, newDiscountCount]);
        }
      }
    }
  }

  return -1;
};
