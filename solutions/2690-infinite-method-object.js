/**
 * Infinite Method Object
 * Intuition: The core idea is to intercept all property access on an object using a Proxy. When a property is accessed, instead of returning a static value, we return a function. This returned function, when invoked, will then yield the name of the property that was originally accessed.
 * Approach: 1. Create a new JavaScript Proxy object, wrapping an empty target object. 2. Define a 'get' trap within the Proxy handler. This trap will intercept any attempt to access a property on the proxied object. 3. Inside the 'get' trap, return an anonymous arrow function. This function will capture the 'propertyName' (the name of the property being accessed) through its closure. 4. When the returned function is subsequently invoked, it simply returns the captured 'propertyName' string.
 * Dry Run:
 * Input: `const myInfiniteInstance = createInfiniteObject();`
 * Call: `myInfiniteInstance.exampleMethod();`
 * 1. `createInfiniteObject()` is executed.
 * 2. A new `Proxy` is constructed. Its first argument is an empty object `{}` (the target). Its second argument is an object containing a `get` handler function.
 * 3. `myInfiniteInstance` now holds this new `Proxy` object.
 * 4. When `myInfiniteInstance.exampleMethod` is accessed, the `get` trap of the `Proxy` is triggered.
 * 5. The `get` trap receives `targetObject = {}` and `propertyName = "exampleMethod"`.
 * 6. The `get` trap returns an anonymous function: `() => propertyName`. This function closes over `propertyName`, which is currently `"exampleMethod"`.
 * 7. The expression becomes `(function() { return "exampleMethod"; })()`.
 * 8. This function is immediately invoked, and it returns `"exampleMethod"`.
 * 9. The final result of `myInfiniteInstance.exampleMethod()` is `"exampleMethod"`.
 * Time Complexity: O(1)
 * Space Complexity: O(1)
 */
var createInfiniteObject = function () {
  return new Proxy(
    {},
    {
      get(targetObject, propertyName) {
        return () => propertyName;
      },
    },
  );
};
