/**
 * Beautiful Array
 * Intuition: Odds then evens: any arithmetic mid 2*a[k]=a[i]+a[j] cannot sit between an odd and an even. Recursively build smaller beautiful arrays and map them to odd/even values in 1..n.
 * Approach: 1. Memoized `recursiveSolver(size)`: size 1 → [1]. 2. Odds from solver(ceil(n/2)) via 2x−1; evens from solver(floor(n/2)) via 2x. 3. Concatenate odds+evens and cache.
 * Dry Run: n=4. Odds from size 2 → [1,3]; evens from size 2 → [2,4]. Result [1,3,2,4].
 * Time Complexity: O(N^2)
 * Space Complexity: O(N^2)
 */
var beautifulArray = function (n) {
  const resultCache = new Map();

  function recursiveSolver(currentSize) {
    if (resultCache.has(currentSize)) {
      return resultCache.get(currentSize);
    }

    if (currentSize === 1) {
      return [1];
    }

    const oddElementsSource = recursiveSolver(Math.ceil(currentSize / 2));
    const evenElementsSource = recursiveSolver(Math.floor(currentSize / 2));

    const transformedOdds = oddElementsSource.map(
      (elementValueOne) => elementValueOne * 2 - 1
    );
    const transformedEvens = evenElementsSource.map(
      (elementValueTwo) => elementValueTwo * 2
    );

    const finalArray = [...transformedOdds, ...transformedEvens];
    resultCache.set(currentSize, finalArray);
    return finalArray;
  }

  return recursiveSolver(n);
};
