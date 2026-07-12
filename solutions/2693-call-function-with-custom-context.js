/**
 * Call Function With Custom Context
 * Intuition: To set the 'this' context of a function, we can temporarily attach the function as a method to the desired context object. When called as a method, 'this' inside the function will correctly reference that object. After execution, the temporary method can be removed to restore the context object's original state.
 * Approach: 1. Store the original function (which 'callPolyfill' is invoked upon). 2. Create a unique symbol to serve as a temporary property key. 3. Determine the effective context: if the provided 'context' is null or undefined, use 'globalThis'; otherwise, box primitive 'context' values using 'Object(context)' and use objects directly. 4. Assign the original function to the effective context using the unique symbol as the property key. 5. Invoke this newly assigned method on the effective context, passing all additional arguments. 6. Store the result of this invocation. 7. Delete the temporary property from the effective context. 8. Return the stored result.
 * Dry Run:
 * Given function:
 * function greet(city) { return `Hello from ${this.name} in ${city}`; }
 * Call: greet.callPolyfill({name: "Alice"}, "New York")
 * Inside callPolyfill:
 * originalMethod = greet function
 * contextParam = {name: "Alice"}
 * additionalArguments = ["New York"]
 * //
 * 1. temporaryPropertyKey = Symbol() (e.g., Symbol(some_unique_id))
 * 2. executionContext: contextParam is an object, so executionContext = {name: "Alice"}
 * 3. executionContext[temporaryPropertyKey] = greet function
 *    executionContext now looks like: {name: "Alice", Symbol(some_unique_id): function greet(...)}
 * 4. methodExecutionResult = executionContext[temporaryPropertyKey](...additionalArguments)
 *    This calls greet("New York"). Inside greet, 'this' is executionContext ({name: "Alice", Symbol(some_unique_id): ...}).
 *    'this.name' resolves to "Alice".
 *    greet returns "Hello from Alice in New York".
 *    methodExecutionResult = "Hello from Alice in New York"
 * 5. delete executionContext[temporaryPropertyKey]
 *    executionContext reverts to: {name: "Alice"}
 * 6. return methodExecutionResult ("Hello from Alice in New York")
 * Time Complexity: O(K)
 * Space Complexity: O(1)
 */
Function.prototype.callPolyfill = function (
  contextParam,
  ...additionalArguments
) {
  const originalMethod = this;
  const temporaryPropertyKey = Symbol();

  let executionContext = contextParam;
  if (contextParam === null || contextParam === undefined) {
    executionContext = globalThis;
  } else {
    executionContext = Object(contextParam);
  }

  executionContext[temporaryPropertyKey] = originalMethod;
  const methodExecutionResult = executionContext[temporaryPropertyKey](
    ...additionalArguments,
  );
  delete executionContext[temporaryPropertyKey];
  return methodExecutionResult;
};
