/**
 * Fizz Buzz
 * Time Complexity: O(n)
 * Space Complexity: O(n)
*/
var fizzBuzz = function (n) {
    const finalOutput = [];
    const divisorFirst = 3;
    const divisorSecond = 5;

    for (let currentNumber = 1; currentNumber <= n; currentNumber++) {
        const checkDivisibleByFirst = (currentNumber % divisorFirst === 0);
        const checkDivisibleBySecond = (currentNumber % divisorSecond === 0);

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