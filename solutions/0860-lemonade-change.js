/**
 * Lemonade Change
 * Intuition: Track fives and tens. A 10 needs one 5. A 20 prefers one 10+one 5 (keep fives) else three 5s.
 * Approach: 1. For each bill: 5 increment fives. 2. 10: if no five return false else five--, ten++. 3. 20: if ten and five, decrement both; else if fives≥3 subtract 3; else false. 4. Return true.
 * Dry Run: [5,5,5,10,20]. After three 5s and a 10: fives=2, tens=1. 20 uses 10+5 → true. [5,5,10,10,20] fails on last 20.
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
