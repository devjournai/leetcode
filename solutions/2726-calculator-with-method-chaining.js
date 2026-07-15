/**
 * Calculator With Method Chaining
 * Intuition: To enable method chaining, each operation method must modify the internal state and then return the instance of the Calculator class itself (`this`). This allows subsequent operations to be called on the same object.
 * Approach: 1. Define a class `Calculator` to encapsulate the arithmetic operations and maintain an internal `currentComputationValue`. 2. The constructor initializes this `currentComputationValue` with a given starting number. 3. For each arithmetic method (`add`, `subtract`, `multiply`, `divide`, `power`), perform the calculation on `currentComputationValue` and the input `value`. 4. Crucially, each operation method must return `this` to allow chaining. 5. Implement a check in the `divide` method to throw an error if the divisor is zero. 6. Provide a `getResult` method to return the final `currentComputationValue`.
 * Dry Run:
 * Input: `new Calculator(10).add(5).subtract(3).getResult()`
 * 1. `new Calculator(10)`:
 *    - `initialOperand` is 10.
 *    - `this.currentComputationValue` is initialized to 10.
 *    - Returns `Calculator` instance (let's call it `calc1`) with `currentComputationValue = 10`.
 * 2. `calc1.add(5)`:
 *    - `value` is 5.
 *    - `this.currentComputationValue` (10) becomes `10 + 5 = 15`.
 *    - Returns `calc1` with `currentComputationValue = 15`.
 * 3. `calc1.subtract(3)`:
 *    - `value` is 3.
 *    - `this.currentComputationValue` (15) becomes `15 - 3 = 12`.
 *    - Returns `calc1` with `currentComputationValue = 12`.
 * 4. `calc1.getResult()`:
 *    - Returns `this.currentComputationValue`, which is 12.
 * Output: 12
 * Time Complexity: O(1)
 * Space Complexity: O(1)
 */
class Calculator {
  constructor(initialOperand) {
    this.currentComputationValue = initialOperand;
  }

  add(value) {
    this.currentComputationValue += value;
    return this;
  }

  subtract(value) {
    this.currentComputationValue -= value;
    return this;
  }

  multiply(value) {
    this.currentComputationValue *= value;
    return this;
  }

  divide(value) {
    if (value === 0) {
      throw new Error("Division by zero is not allowed");
    }
    this.currentComputationValue /= value;
    return this;
  }

  power(value) {
    this.currentComputationValue **= value;
    return this;
  }

  getResult() {
    return this.currentComputationValue;
  }
}
