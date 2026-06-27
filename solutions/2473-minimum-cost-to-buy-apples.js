/**
* Minimum Cost To Buy Apples
* Intuition: The problem requires finding the minimum total cost to start at city 'i', travel to any city 'j' to buy an apple, and then return to city 'i'. The return journey road costs are multiplied by 'k'. This means the effective round-trip cost for any road segment is `roadCost * (1 + k)`. The total cost for starting at city 'i' and buying an apple at city 'j' becomes `(shortest_path_i_to_j) * (1 + k) + appleCost[j]`. This problem can be solved using a modified Dijkstra's algorithm. Instead of finding the shortest path from a single source, we are looking for the "cheapest apple cost" when starting from each city. We can initiate the Dijkstra process from all cities simultaneously, where the initial 'distance' for each city 'i' is its own `appleCost[i]`.
* Approach: 1. Build an adjacency list `graphStructure` for `numCities` where each entry `graphStructure[u]` stores pairs `[v, cost]` for all roads connecting `u` and `v`. Roads are bidirectional, so add entries for both directions. 2. Initialize an array `minimumOverallCosts` of size `numCities`. Set `minimumOverallCosts[i]` to `applePrices[i]` for each city `i`, representing the cost if an apple is bought in the starting city itself. 3. Create a min-priority queue `cityCostHeap`. For each city `i`, add `[applePrices[i], i]` to `cityCostHeap`. These are the initial potential costs for starting at each city and buying an apple at that same city. 4. Process the `cityCostHeap` in a Dijkstra-like manner: While `cityCostHeap` is not empty, extract the entry `[currentPathCost, currentCityIdentifier]` with the smallest `currentPathCost`. If `currentPathCost` is greater than `minimumOverallCosts[currentCityIdentifier]`, skip, as a cheaper path has already been found for this city. Otherwise, for each `[neighborCityIdentifier, roadSegmentCost]` connected to `currentCityIdentifier`: Calculate a `potentialNewCost = currentPathCost + roadSegmentCost * (factorK + 1)`. If `potentialNewCost` is less than `minimumOverallCosts[neighborCityIdentifier]`, update `minimumOverallCosts[neighborCityIdentifier]` with `potentialNewCost` and add `[potentialNewCost, neighborCityIdentifier]` to `cityCostHeap`. 5. Return the `minimumOverallCosts` array, where `minimumOverallCosts[i]` will hold the minimum cost to buy an apple starting from city `i`.
* Dry Run: n = 3, roads = [[1, 2, 10], [2, 3, 20]], appleCost = [100, 50, 200], k = 1
    1. GraphStructure: adjList[0]=[[1,10]], adjList[1]=[[0,10],[2,20]], adjList[2]=[[1,20]]
    2. MinimumOverallCosts: [100, 50, 200]
    3. FactorKPlusOne: 1 + 1 = 2
    4. CityCostHeap initialized: [[50, 1], [100, 0], [200, 2]] (ordered by cost)
    5. Dijkstra Traversal:
       - Extract [50, 1] (city 1). currentPathCost=50. minimumOverallCosts[1]=50.
       - Neighbor 0 (cost 10): potentialNewCost = 50 + 10*2 = 70. minimumOverallCosts[0]=100. Update minimumOverallCosts[0]=70. Add [70, 0] to heap.
       - Neighbor 2 (cost 20): potentialNewCost = 50 + 20*2 = 90. minimumOverallCosts[2]=200. Update minimumOverallCosts[2]=90. Add [90, 2] to heap.
        CityCostHeap (conceptual): [[70, 0], [90, 2], [100, 0], [200, 2]]
       - Extract [70, 0] (city 0). currentPathCost=70. minimumOverallCosts[0]=70.
       - Neighbor 1 (cost 10): potentialNewCost = 70 + 10*2 = 90. minimumOverallCosts[1]=50. 90 is not < 50. Do nothing.
       - Extract [90, 2] (city 2). currentPathCost=90. minimumOverallCosts[2]=90.
       - Neighbor 1 (cost 20): potentialNewCost = 90 + 20*2 = 130. minimumOverallCosts[1]=50. 130 is not < 50. Do nothing.
       - Extract [100, 0] (city 0). currentPathCost=100. minimumOverallCosts[0]=70. 100 > 70. Skip.
       - Extract [200, 2] (city 2). currentPathCost=200. minimumOverallCosts[2]=90. 200 > 90. Skip.
       - Heap is empty.
    6. Result: minimumOverallCosts = [70, 50, 90]
* Time Complexity: O((N + M) log N)
* Space Complexity: O(N + M)
*/
class MinPriorityQueue {
  constructor() {
    this.dataStructure = [];
  }

  findParentIndex(childIndexValue) {
    return Math.floor((childIndexValue - 1) / 2);
  }

  findLeftChildIndex(parentIndexValue) {
    return 2 * parentIndexValue + 1;
  }

  findRightChildIndex(parentIndexValue) {
    return 2 * parentIndexValue + 2;
  }

  checkHasParent(indexToCheck) {
    return this.findParentIndex(indexToCheck) >= 0;
  }

  checkHasLeftChild(indexToCheck) {
    return this.findLeftChildIndex(indexToCheck) < this.dataStructure.length;
  }

  checkHasRightChild(indexToCheck) {
    return this.findRightChildIndex(indexToCheck) < this.dataStructure.length;
  }

  retrieveParent(indexToCheck) {
    return this.dataStructure[this.findParentIndex(indexToCheck)];
  }

  retrieveLeftChild(indexToCheck) {
    return this.dataStructure[this.findLeftChildIndex(indexToCheck)];
  }

  retrieveRightChild(indexToCheck) {
    return this.dataStructure[this.findRightChildIndex(indexToCheck)];
  }

  exchangeElements(firstIndex, secondIndex) {
    const temporaryElement = this.dataStructure[firstIndex];
    this.dataStructure[firstIndex] = this.dataStructure[secondIndex];
    this.dataStructure[secondIndex] = temporaryElement;
  }

  enqueueItem(payloadItem) {
    this.dataStructure.push(payloadItem);
    this.heapifyUp();
  }

  dequeueMinimumItem() {
    if (this.dataStructure.length === 0) return null;
    if (this.dataStructure.length === 1) return this.dataStructure.pop();

    const minimumValue = this.dataStructure[0];
    this.dataStructure[0] = this.dataStructure.pop();
    this.heapifyDown();
    return minimumValue;
  }

  isQueueEmpty() {
    return this.dataStructure.length === 0;
  }

  heapifyUp() {
    let currentIndex = this.dataStructure.length - 1;
    while (
      this.checkHasParent(currentIndex) &&
      this.retrieveParent(currentIndex)[0] > this.dataStructure[currentIndex][0]
    ) {
      this.exchangeElements(this.findParentIndex(currentIndex), currentIndex);
      currentIndex = this.findParentIndex(currentIndex);
    }
  }

  heapifyDown() {
    let currentIndex = 0;
    while (this.checkHasLeftChild(currentIndex)) {
      let smallerChildIndex = this.findLeftChildIndex(currentIndex);
      if (
        this.checkHasRightChild(currentIndex) &&
        this.retrieveRightChild(currentIndex)[0] <
          this.retrieveLeftChild(currentIndex)[0]
      ) {
        smallerChildIndex = this.findRightChildIndex(currentIndex);
      }

      if (
        this.dataStructure[currentIndex][0] <
        this.dataStructure[smallerChildIndex][0]
      ) {
        break;
      } else {
        this.exchangeElements(currentIndex, smallerChildIndex);
      }
      currentIndex = smallerChildIndex;
    }
  }
}

var minCost = function (numCities, roadData, applePrices, factorK) {
  const graphStructure = new Array(numCities).fill().map(() => []);
  for (const [nodeOne, nodeTwo, edgeCost] of roadData) {
    graphStructure[nodeOne - 1].push([nodeTwo - 1, edgeCost]);
    graphStructure[nodeTwo - 1].push([nodeOne - 1, edgeCost]);
  }

  const minimumOverallCosts = new Array(numCities);
  const factorKPlusOne = factorK + 1;

  const cityCostHeap = new MinPriorityQueue();

  for (let cityIterator = 0; cityIterator < numCities; cityIterator++) {
    minimumOverallCosts[cityIterator] = applePrices[cityIterator];
    cityCostHeap.enqueueItem([applePrices[cityIterator], cityIterator]);
  }

  while (!cityCostHeap.isQueueEmpty()) {
    const [currentPathCost, currentCityIdentifier] =
      cityCostHeap.dequeueMinimumItem();

    if (currentPathCost > minimumOverallCosts[currentCityIdentifier]) {
      continue;
    }

    for (const [neighborCityIdentifier, roadSegmentCost] of graphStructure[
      currentCityIdentifier
    ]) {
      const potentialNewCost =
        currentPathCost + roadSegmentCost * factorKPlusOne;
      if (minimumOverallCosts[neighborCityIdentifier] > potentialNewCost) {
        minimumOverallCosts[neighborCityIdentifier] = potentialNewCost;
        cityCostHeap.enqueueItem([potentialNewCost, neighborCityIdentifier]);
      }
    }
  }

  return minimumOverallCosts;
};
