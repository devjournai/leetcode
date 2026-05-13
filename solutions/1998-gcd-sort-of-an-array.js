/**
 * Gcd Sort Of An Array
 * Intuition: The problem asks if we can sort an array using a specific swap operation: swapping nums[i] and nums[j] if their greatest common divisor (GCD) is greater than 1. This defines an equivalence relation: if A can swap with B, and B can swap with C, then A can effectively swap with C (by using B as an intermediate). This implies that all numbers within a "connected component" (where connectivity is defined by GCD > 1) can be rearranged arbitrarily amongst themselves. Therefore, the array can be sorted if and only if for every position `i`, the original number `nums[i]` and the number `sortedNums[i]` (the number that should ideally be at position `i` after sorting) belong to the same connected component. We can model these connected components using a Disjoint Set Union (DSU) data structure. To establish connections, we observe that if two numbers share a common prime factor, their GCD will be at least that prime factor (which is > 1). Thus, numbers sharing any prime factor can be swapped. By connecting each number to all its prime factors in the DSU, we ensure that any two numbers sharing a prime factor will end up in the same set.
 * Approach: 1. Find the maximum value in the input array `nums`. This determines the upper bound for our Sieve and DSU structure. 2. Precompute the smallest prime factor for all numbers up to the maximum value using a Sieve of Eratosthenes. This allows efficient prime factorization later. 3. Initialize a Disjoint Set Union (DSU) data structure. Each number from 1 up to the maximum value initially forms its own set. For convenience, we can also consider prime numbers as nodes in our DSU. 4. Iterate through each number in the original `nums` array. For each number, find all its unique prime factors using the precomputed smallest prime factor array. For every unique prime factor found, unite the current number with that prime factor in the DSU. This implicitly connects all numbers that share a common prime factor. 5. Create a sorted copy of the original `nums` array. 6. Iterate from the first element to the last element. For each index `k`, compare the root of the DSU set containing `nums[k]` with the root of the DSU set containing `sortedNums[k]`. If at any point these roots are different, it means `nums[k]` and `sortedNums[k]` cannot be swapped into each other's positions, and thus the array cannot be sorted. Return `false`. 7. If all comparisons pass, it means every number can reach its sorted position, so return `true`.
 * Dry Run: nums = [10, 5, 3, 15, 20]
 *   1. maxElementValue = 20.
 *   2. smallestPrimeFactor array up to 20 computed by Sieve:
 *      smallestPrimeFactor[2]=2, [3]=3, [4]=2, [5]=5, [6]=2, [7]=7, [8]=2, [9]=3, [10]=2, [11]=11, [12]=2, [13]=13, [14]=2, [15]=3, [16]=2, [17]=17, [18]=2, [19]=19, [20]=2. (Others are 0 or 1).
 *   3. parentSet initialized: parentSet[i] = i for i from 0 to 20.
 *   4. Union operations:
 *      - For 10: Factors 2, 5. unionComponents(10, 2, parentSet), unionComponents(10, 5, parentSet).
 *        After these, findRootNode(10)=2, findRootNode(5)=2. (Assuming smaller number becomes root).
 *      - For 5: Factors 5. unionComponents(5, 5, parentSet). (No change, 5 already connected to 2).
 *      - For 3: Factors 3. unionComponents(3, 3, parentSet).
 *        After this, findRootNode(3)=3.
 *      - For 15: Factors 3, 5. unionComponents(15, 3, parentSet), unionComponents(15, 5, parentSet).
 *        findRootNode(15)=15, findRootNode(3)=3 -> parentSet[15]=3.
 *        findRootNode(15)=3, findRootNode(5)=2 -> parentSet[3]=2.
 *        Now, findRootNode(15)=2, findRootNode(3)=2, findRootNode(5)=2. All 3, 5, 10, 15 are connected.
 *      - For 20: Factors 2, 5. unionComponents(20, 2, parentSet), unionComponents(20, 5, parentSet).
 *        findRootNode(20)=20, findRootNode(2)=2 -> parentSet[20]=2.
 *        findRootNode(20)=2, findRootNode(5)=2 -> No change.
 *      Final state of components (represented by roots): All numbers (2,3,5,10,15,20) are in the same component with root 2.
 *   5. sortedArray = [3, 5, 10, 15, 20].
 *   6. Comparison:
 *      - k=0: nums[0]=10, sortedArray[0]=3. findRootNode(10)=2, findRootNode(3)=2. Roots match.
 *      - k=1: nums[1]=5, sortedArray[1]=5. findRootNode(5)=2, findRootNode(5)=2. Roots match.
 *      - k=2: nums[2]=3, sortedArray[2]=10. findRootNode(3)=2, findRootNode(10)=2. Roots match.
 *      - k=3: nums[3]=15, sortedArray[3]=15. findRootNode(15)=2, findRootNode(15)=2. Roots match.
 *      - k=4: nums[4]=20, sortedArray[4]=20. findRootNode(20)=2, findRootNode(20)=2. Roots match.
 *   7. All comparisons passed. Return true.
 * Time Complexity: O(N log N + M log log M + N log M)
 * Space Complexity: O(N + M)
 */
var gcdSort = function (nums) {
  let maximumValue = 0;
  let arrayCounter = 0;
  while (arrayCounter < nums.length) {
    if (nums[arrayCounter] > maximumValue) {
      maximumValue = nums[arrayCounter];
    }
    arrayCounter++;
  }

  const smallestPrimeFactor = new Array(maximumValue + 1).fill(0);
  let sievePrimaryIterator = 2;
  while (sievePrimaryIterator <= maximumValue) {
    if (smallestPrimeFactor[sievePrimaryIterator] === 0) {
      let sieveSecondaryIterator = sievePrimaryIterator;
      while (sieveSecondaryIterator <= maximumValue) {
        smallestPrimeFactor[sieveSecondaryIterator] = sievePrimaryIterator;
        sieveSecondaryIterator += sievePrimaryIterator;
      }
    }
    sievePrimaryIterator++;
  }

  const parentSet = new Array(maximumValue + 1).fill(0);
  let initializationCounter = 0;
  while (initializationCounter <= maximumValue) {
    parentSet[initializationCounter] = initializationCounter;
    initializationCounter++;
  }

  const findRootNode = (targetValue, collectionOfParents) => {
    if (collectionOfParents[targetValue] === targetValue) {
      return targetValue;
    }
    collectionOfParents[targetValue] = findRootNode(
      collectionOfParents[targetValue],
      collectionOfParents,
    );
    return collectionOfParents[targetValue];
  };

  const unionComponents = (elementX, elementY, collectionOfParents) => {
    const rootX = findRootNode(elementX, collectionOfParents);
    const rootY = findRootNode(elementY, collectionOfParents);
    if (rootX !== rootY) {
      collectionOfParents[rootX] = rootY;
    }
  };

  let processingIndex = 0;
  while (processingIndex < nums.length) {
    let currentNumber = nums[processingIndex];
    let tempNumberValue = currentNumber;
    const uniquePrimeFactors = new Set();
    while (tempNumberValue > 1) {
      const individualPrime = smallestPrimeFactor[tempNumberValue];
      uniquePrimeFactors.add(individualPrime);
      tempNumberValue /= individualPrime;
    }

    const factorIterator = uniquePrimeFactors.values();
    let nextFactorResult = factorIterator.next();
    while (!nextFactorResult.done) {
      unionComponents(currentNumber, nextFactorResult.value, parentSet);
      nextFactorResult = factorIterator.next();
    }
    processingIndex++;
  }

  const sortedArray = [...nums].sort((valueA, valueB) => valueA - valueB);

  let comparisonIndex = 0;
  while (comparisonIndex < nums.length) {
    const originalPositionValue = nums[comparisonIndex];
    const sortedPositionValue = sortedArray[comparisonIndex];
    if (
      findRootNode(originalPositionValue, parentSet) !==
      findRootNode(sortedPositionValue, parentSet)
    ) {
      return false;
    }
    comparisonIndex++;
  }

  return true;
};
