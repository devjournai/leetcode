/**
 * Richest Customer Wealth
 * Intuition: Wealth of a customer is the sum of their bank accounts; the answer is the maximum of those row sums.
 * Approach: 1. For each customer row, add every account. 2. Keep a running max of those totals. 3. Return the max.
 * Dry Run: [[1,2,3],[3,2,1]].
 *   - Row sums 6 and 6 → 6.
 * Time Complexity: O(m*n)
 * Space Complexity: O(1)
 */
var maximumWealth = function (accounts) {
  let richestCustomerCurrentMax = 0;

  for (
    let customerIterator = 0;
    customerIterator < accounts.length;
    customerIterator++
  ) {
    let singleCustomerTotal = 0;
    let customerAccountArray = accounts[customerIterator];

    for (
      let accountIterator = 0;
      accountIterator < customerAccountArray.length;
      accountIterator++
    ) {
      singleCustomerTotal += customerAccountArray[accountIterator];
    }

    if (singleCustomerTotal > richestCustomerCurrentMax) {
      richestCustomerCurrentMax = singleCustomerTotal;
    }
  }

  return richestCustomerCurrentMax;
};
