/**
 * Implement Rand10 Using Rand7
 * Time Complexity: O(1)
 * Space Complexity: O(1)
*/
var rand10 = function () {
  while (true) {
    let rollOne = rand7();
    let rollTwo = rand7();

    let intermediateValue = (rollOne - 1) * 7 + rollTwo;

    if (intermediateValue <= 40) {
      let finalOutput = (intermediateValue % 10) + 1;
      return finalOutput;
    }
  }
};