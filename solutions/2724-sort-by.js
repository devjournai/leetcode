/**
    * Sort By
    * Intuition: To sort an array based on a derived value, JavaScript's built-in `Array.prototype.sort` method is the most direct and efficient approach. This method accepts a custom comparison function that determines the order of any two elements.
    * Approach: 1. Utilize the `Array.prototype.sort` method directly on the input `arr`. 2. Provide a comparison function `(elementOne, elementTwo)` to `sort`. 3. Inside the comparison function, apply the given `fn` to both `elementOne` and `elementTwo` to get their respective numerical sorting values. 4. Return the difference `fn(elementOne) - fn(elementTwo)` to ensure ascending order based on the `fn`'s output.
    * Dry Run: arr = [{"x": 1}, {"x": 3}, {"x": 2}], fn = (o) => o.x
        1. `arr.sort()` is called.
        2. The comparison function `(elementOne, elementTwo) => fn(elementOne) - fn(elementTwo)` is used internally by `sort`.
        3. Example comparison: `elementOne = {"x": 1}`, `elementTwo = {"x": 3}`.
           `fn({"x": 1})` returns `1`. `fn({"x": 3})` returns `3`.
           The difference `1 - 3` is `-2`. Since it's negative, `{"x": 1}` comes before `{"x": 3}`.
        4. Example comparison: `elementOne = {"x": 3}`, `elementTwo = {"x": 2}`.
           `fn({"x": 3})` returns `3`. `fn({"x": 2})` returns `2`.
           The difference `3 - 2` is `1`. Since it's positive, `{"x": 2}` comes before `{"x": 3}`.
        5. The `sort` method continues comparing elements until the array is fully sorted.
        6. The final sorted array will be `[{"x": 1}, {"x": 2}, {"x": 3}]`.
    * Time Complexity: O(N log N * K), where N is the number of elements in `arr` and K is the time complexity of the `fn` function. Assuming `fn` takes O(1) time, the complexity is O(N log N) due to the nature of typical comparison sort algorithms.
    * Space Complexity: O(N) in the worst case, as JavaScript's `Array.prototype.sort` implementation can use auxiliary space (e.g., for Timsort or Merge Sort), or O(log N) for the recursion stack in QuickSort-like implementations.
*/
var sortBy = function(arr, fn) {
  return arr.sort((elementOne, elementTwo) => fn(elementOne) - fn(elementTwo));
};