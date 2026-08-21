/**
 * Kth Smallest Product Of Two Sorted Arrays
 * Intuition: The problem asks for the Kth smallest product from two sorted arrays. Since the products can be positive, negative, or zero, and their range is vast, a direct enumeration and sorting approach would be too slow. The key insight is that we can binary search on the *value* of the Kth smallest product. If we can efficiently count how many products are less than or equal to a chosen value `X`, we can use binary search to find the smallest `X` for which this count is at least `k`.
 * Approach:
 * 1. Define a helper function, `determineProductCount(targetValue)`, which calculates the total number of products `nums1[i] * nums2[j]` that are less than or equal to `targetValue`.
 * 2. Inside `determineProductCount`:
 *    a. Iterate through each element `numValueOne` in `nums1`.
 *    b. For each `numValueOne`, perform a specialized binary search on `nums2` to count elements `numValueTwo` such that `numValueOne * numValueTwo <= targetValue`.
 *       i. If `numValueOne` is non-negative: We want to find `numValueTwo <= targetValue / numValueOne`. The binary search on `nums2` counts elements that satisfy this condition, effectively finding the "upper bound" (first element strictly greater than `targetValue / numValueOne`).
 *       ii. If `numValueOne` is negative: We want `numValueTwo >= targetValue / numValueOne` (the inequality flips due to division by a negative number). The binary search on `nums2` counts elements satisfying this, effectively finding the "lower bound" (first element greater than or equal to `targetValue / numValueOne`).
 *    c. Accumulate these counts to get `totalProductsFound`.
 * 3. The main `kthSmallestProduct` function then performs a binary search over the potential range of the Kth smallest product. The bounds for this search are `-(10^10)` and `10^10`, covering all possible products given the input constraints.
 * 4. In each step of the main binary search:
 *    a. Calculate a `currentGuessProduct` (midpoint of the search range).
 *    b. Call `determineProductCount(currentGuessProduct)`.
 *    c. If the returned count is greater than or equal to `k`, it means `currentGuessProduct` could be the Kth smallest product or even larger, so we attempt to find a smaller possible product by setting `highProductBound = currentGuessProduct`.
 *    d. If the returned count is less than `k`, `currentGuessProduct` is too small, and we must search in the upper half by setting `lowProductBound = currentGuessProduct + 1`.
 * 5. The main binary search converges to the smallest product value `P` for which `determineProductCount(P)` is at least `k`. This `P` is the Kth smallest product.
 * Dry Run:
 *   nums1 = [2, 3], nums2 = [1, 4], k = 3
 *   Sorted products: 2*1=2, 3*1=3, 2*4=8, 3*4=12. The 3rd smallest product is 8.
 *
 *   Main Binary Search (using a reduced range for clarity, e.g., `lowProductBound = 0`, `highProductBound = 15`):
 *   Initial: `lowProductBound = 0`, `highProductBound = 15`.
 *
 *   1. `currentGuessProduct = Math.floor((0 + 15) / 2) = 7`.
 *      Call `determineProductCount(7)`:
 *        `totalProductsFound = 0`
 *        For `numValueOne = 2` (from `nums1`):
 *          Binary search `nums2` for `x` such that `2 * x <= 7` (i.e., `x <= 3.5`).
 *          `currentLow = 0`, `currentHigh = 2` (length of `nums2`).
 *          `midElementIndex = 1`. `nums2[1] = 4`. `2 * 4 = 8`. `8 <= 7` is false. `currentHigh = 1`.
 *          `midElementIndex = 0`. `nums2[0] = 1`. `2 * 1 = 2`. `2 <= 7` is true. `currentLow = 1`.
 *          Loop ends (`currentLow = 1`, `currentHigh = 1`). Add `currentLow` (1) to `totalProductsFound`.
 *        For `numValueOne = 3` (from `nums1`):
 *          Binary search `nums2` for `x` such that `3 * x <= 7` (i.e., `x <= 2.33`).
 *          `currentLow = 0`, `currentHigh = 2`.
 *          `midElementIndex = 1`. `nums2[1] = 4`. `3 * 4 = 12`. `12 <= 7` is false. `currentHigh = 1`.
 *          `midElementIndex = 0`. `nums2[0] = 1`. `3 * 1 = 3`. `3 <= 7` is true. `currentLow = 1`.
 *          Loop ends (`currentLow = 1`, `currentHigh = 1`). Add `currentLow` (1) to `totalProductsFound`.
 *      `determineProductCount(7)` returns `1 + 1 = 2`.
 *      Since `2 < k=3`, `lowProductBound = currentGuessProduct + 1 = 7 + 1 = 8`.
 *
 *   2. `lowProductBound = 8`, `highProductBound = 15`.
 *      `currentGuessProduct = Math.floor((8 + 15) / 2) = 11`.
 *      Call `determineProductCount(11)`:
 *        `totalProductsFound = 0`
 *        For `numValueOne = 2`: `2 * x <= 11` (i.e., `x <= 5.5`). Both `1, 4` satisfy. Count is 2.
 *        `totalProductsFound += 2`.
 *        For `numValueOne = 3`: `3 * x <= 11` (i.e., `x <= 3.66`). Only `1` satisfies. Count is 1.
 *        `totalProductsFound += 1`.
 *      `determineProductCount(11)` returns `2 + 1 = 3`.
 *      Since `3 >= k=3`, `highProductBound = currentGuessProduct = 11`.
 *
 *   3. `lowProductBound = 8`, `highProductBound = 11`.
 *      `currentGuessProduct = Math.floor((8 + 11) / 2) = 9`.
 *      Call `determineProductCount(9)`:
 *        `totalProductsFound = 0`
 *        For `numValueOne = 2`: `2 * x <= 9` (i.e., `x <= 4.5`). Both `1, 4` satisfy. Count is 2.
 *        `totalProductsFound += 2`.
 *        For `numValueOne = 3`: `3 * x <= 9` (i.e., `x <= 3`). Only `1` satisfies. Count is 1.
 *        `totalProductsFound += 1`.
 *      `determineProductCount(9)` returns `2 + 1 = 3`.
 *      Since `3 >= k=3`, `highProductBound = currentGuessProduct = 9`.
 *
 *   4. `lowProductBound = 8`, `highProductBound = 9`.
 *      `currentGuessProduct = Math.floor((8 + 9) / 2) = 8`.
 *      Call `determineProductCount(8)`:
 *        `totalProductsFound = 0`
 *        For `numValueOne = 2`: `2 * x <= 8` (i.e., `x <= 4`). Both `1, 4` satisfy. Count is 2.
 *        `totalProductsFound += 2`.
 *        For `numValueOne = 3`: `3 * x <= 8` (i.e., `x <= 2.66`). Only `1` satisfies. Count is 1.
 *        `totalProductsFound += 1`.
 *      `determineProductCount(8)` returns `2 + 1 = 3`.
 *      Since `3 >= k=3`, `highProductBound = currentGuessProduct = 8`.
 *
 *   5. `lowProductBound = 8`, `highProductBound = 8`. Loop terminates (`lowProductBound < highProductBound` is false).
 *   The function returns `lowProductBound`, which is `8`.
 *
 * Time Complexity: O(N * logM * log(MaxProductRange))
 * Space Complexity: O(1)
 */
var kthSmallestProduct = function (nums1, nums2, k) {
  const determineProductCount = (targetValue) => {
    let totalProductsFound = 0;
    const arrayTwoLength = nums2.length;

    for (let primaryIndex = 0; primaryIndex < nums1.length; ++primaryIndex) {
      const numValueOne = nums1[primaryIndex];
      let currentLow = 0;
      let currentHigh = arrayTwoLength;

      if (numValueOne >= 0) {
        while (currentLow < currentHigh) {
          const midElementIndex = Math.floor((currentLow + currentHigh) / 2);
          if (numValueOne * nums2[midElementIndex] <= targetValue) {
            currentLow = midElementIndex + 1;
          } else {
            currentHigh = midElementIndex;
          }
        }
        totalProductsFound += currentLow;
      } else {
        while (currentLow < currentHigh) {
          const midElementIndex = Math.floor((currentLow + currentHigh) / 2);
          if (numValueOne * nums2[midElementIndex] <= targetValue) {
            currentHigh = midElementIndex;
          } else {
            currentLow = midElementIndex + 1;
          }
        }
        totalProductsFound += arrayTwoLength - currentLow;
      }
    }
    return totalProductsFound;
  };

  let lowProductBound = -(10 ** 10);
  let highProductBound = 10 ** 10;

  while (lowProductBound < highProductBound) {
    const currentGuessProduct = Math.floor(
      (lowProductBound + highProductBound) / 2
    );
    if (determineProductCount(currentGuessProduct) >= k) {
      highProductBound = currentGuessProduct;
    } else {
      lowProductBound = currentGuessProduct + 1;
    }
  }

  return lowProductBound;
};
