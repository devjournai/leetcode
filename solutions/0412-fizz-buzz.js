/**
 * Fizz Buzz
 * Intuition: For each integer 1..n emit "FizzBuzz" / "Fizz" / "Buzz" when divisible by 3 and/or 5, otherwise the number as a string.
 * Approach: 1. Loop `currentNumber` from 1 to n. 2. Test `% 3` and `% 5`. 3. Push the matching string into `finalOutput`. 4. Return the array.
 * Dry Run: n = 5 → ["1","2","Fizz","4","Buzz"].
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
var fizzBuzz = function (n) {
  const finalOutput = [];
  const divisorFirst = 3;
  const divisorSecond = 5;

  for (let currentNumber = 1; currentNumber <= n; currentNumber++) {
    const checkDivisibleByFirst = currentNumber % divisorFirst === 0;
    const checkDivisibleBySecond = currentNumber % divisorSecond === 0;

    let stringRepresentation = "";

    if (checkDivisibleByFirst && checkDivisibleBySecond) {
      stringRepresentation = "FizzBuzz";
    } else if (checkDivisibleByFirst) {
      stringRepresentation = "Fizz";
    } else if (checkDivisibleBySecond) {
      stringRepresentation = "Buzz";
    } else {
      stringRepresentation = String(currentNumber);
    }
    finalOutput.push(stringRepresentation);
  }
  return finalOutput;
};
