/**
* Fair Distribution Of Cookies
* Intuition: This problem asks for the minimum possible maximum sum of cookies among `k` children when distributing `N` cookie bags. Since `N` is small (up to 8), we can explore all possible assignments of cookie bags to children using a recursive backtracking (depth-first search) approach. We aim to prune search paths that cannot lead to a better solution than the best one found so far, and introduce symmetry-breaking to avoid redundant computations.
* Approach: 1. Initialize an array `childrenTotals` of size `k` to store the total cookies each child currently has, setting all elements to zero. 2. Initialize a global variable `minimalOverallUnfairness` to `Infinity` to track the minimum unfairness found across all distributions. 3. Define a recursive helper function, `performDistribution`, which takes `bagIndex` as an argument, representing the current cookie bag to be distributed. 4. In `performDistribution`, if `bagIndex` reaches `cookies.length` (all bags distributed), calculate the maximum value in `childrenTotals` (this is the unfairness for the current distribution) and update `minimalOverallUnfairness` with the minimum of its current value and this new unfairness, then return. 5. Otherwise, for the current `bagIndex`, iterate through each child `childSlotIndex` from `0` to `k-1`. 6. Assign `cookies[bagIndex]` to `childSlotIndex` by adding it to `childrenTotals[childSlotIndex]`. 7. Apply pruning: If `childrenTotals[childSlotIndex]` is already greater than or equal to `minimalOverallUnfairness`, this path cannot lead to a better solution, so skip the recursive call. 8. Recursively call `performDistribution(bagIndex + 1)` to distribute the next cookie bag. 9. Backtrack: Remove `cookies[bagIndex]` from `childrenTotals[childSlotIndex]` by subtracting it, to explore other assignments. 10. Apply symmetry-breaking optimization: If, after backtracking, `childrenTotals[childSlotIndex]` is 0, it means this child was empty before receiving the bag and is empty again. Any subsequent assignment to another initially empty child `j` (where `j > childSlotIndex`) would lead to a symmetric distribution already covered or to be covered. Therefore, `break` the loop, as further iterations for currently empty children are redundant. 11. Initiate the distribution process by calling `performDistribution(0)`. 12. Return the final `minimalOverallUnfairness`.
* Dry Run: `cookies = [8,15,10], k = 2`
        `childrenTotals = [0, 0]`, `minimalOverallUnfairness = Infinity`
        `performDistribution(0)` (distribute `cookies[0]=8`):
            `currentCookieCount = 8`
            `childSlotIndex = 0`:
                `childrenTotals = [8, 0]`
                `8 < Infinity` (true) -> `performDistribution(1)` (distribute `cookies[1]=15`):
                    `currentCookieCount = 15`
                    `childSlotIndex = 0`:
                        `childrenTotals = [23, 0]`
                        `23 < Infinity` (true) -> `performDistribution(2)` (distribute `cookies[2]=10`):
                            `currentCookieCount = 10`
                            `childSlotIndex = 0`:
                                `childrenTotals = [33, 0]`
                                `33 < Infinity` (true) -> `performDistribution(3)` (base case):
                                    `currentMaxSum = Math.max(33, 0) = 33`
                                    `minimalOverallUnfairness = Math.min(Infinity, 33) = 33`
                                    Return
                                `childrenTotals = [23, 0]` (backtrack)
                                `23 === 0` (false)
                            `childSlotIndex = 1`:
                                `childrenTotals = [23, 10]`
                                `23 < 33` (true) -> `performDistribution(3)` (base case):
                                    `currentMaxSum = Math.max(23, 10) = 23`
                                    `minimalOverallUnfairness = Math.min(33, 23) = 23`
                                    Return
                                `childrenTotals = [23, 0]` (backtrack)
                                `0 === 0` (true) -> **Break** loop for `performDistribution(2)`
                            Return
                        `childrenTotals = [8, 0]` (backtrack)
                        `8 === 0` (false)
                    `childSlotIndex = 1`:
                        `childrenTotals = [8, 15]`
                        `15 < 23` (true) -> `performDistribution(2)` (distribute `cookies[2]=10`):
                            `currentCookieCount = 10`
                            `childSlotIndex = 0`:
                                `childrenTotals = [18, 15]`
                                `18 < 23` (true) -> `performDistribution(3)` (base case):
                                    `currentMaxSum = Math.max(18, 15) = 18`
                                    `minimalOverallUnfairness = Math.min(23, 18) = 18`
                                    Return
                                `childrenTotals = [8, 15]` (backtrack)
                                `8 === 0` (false)
                            `childSlotIndex = 1`:
                                `childrenTotals = [8, 25]`
                                `25 < 18` (false) -> Pruning: No recursion.
                                `childrenTotals = [8, 15]` (backtrack)
                                `15 === 0` (false)
                            Return
                        `childrenTotals = [8, 0]` (backtrack)
                        `0 === 0` (true) -> **Break** loop for `performDistribution(1)`
                    Return
                `childrenTotals = [0, 0]` (backtrack)
                `0 === 0` (true) -> **Break** loop for `performDistribution(0)`
            Return
        Final `minimalOverallUnfairness = 18`.
* Time Complexity: O(k * k^N)
* Space Complexity: O(N + k)
*/
var distributeCookies = function (cookies, k) {
  const childrenTotals = new Array(k).fill(0);
  let minimalOverallUnfairness = Infinity;

  const performDistribution = (bagIndex) => {
    if (bagIndex === cookies.length) {
      const currentMaxSum = Math.max(...childrenTotals);
      minimalOverallUnfairness = Math.min(
        minimalOverallUnfairness,
        currentMaxSum
      );
      return;
    }

    const currentCookieCount = cookies[bagIndex];

    for (let childSlotIndex = 0; childSlotIndex < k; childSlotIndex++) {
      childrenTotals[childSlotIndex] += currentCookieCount;

      if (childrenTotals[childSlotIndex] < minimalOverallUnfairness) {
        performDistribution(bagIndex + 1);
      }

      childrenTotals[childSlotIndex] -= currentCookieCount;

      if (childrenTotals[childSlotIndex] === 0) {
        break;
      }
    }
  };

  performDistribution(0);

  return minimalOverallUnfairness;
};
