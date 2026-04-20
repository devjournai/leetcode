/**
 * Lemonade Change
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var lemonadeChange = function (incomingBills) {
  let countOfFives = 0;
  let countOfTens = 0;

  for (const paymentAmount of incomingBills) {
    switch (paymentAmount) {
      case 5:
        countOfFives++;
        break;
      case 10:
        if (countOfFives === 0) {
          return false;
        }
        countOfFives--;
        countOfTens++;
        break;
      case 20:
        if (countOfTens > 0 && countOfFives > 0) {
          countOfTens--;
          countOfFives--;
        } else if (countOfFives >= 3) {
          countOfFives -= 3;
        } else {
          return false;
        }
        break;
    }
  }

  return true;
};
