/**
 * Beautiful Array
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
      (elementValueOne) => elementValueOne * 2 - 1,
    );
    const transformedEvens = evenElementsSource.map(
      (elementValueTwo) => elementValueTwo * 2,
    );

    const finalArray = [...transformedOdds, ...transformedEvens];
    resultCache.set(currentSize, finalArray);
    return finalArray;
  }

  return recursiveSolver(n);
};
