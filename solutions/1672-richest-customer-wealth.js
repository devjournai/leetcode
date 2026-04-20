/**
 * Richest Customer Wealth
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
