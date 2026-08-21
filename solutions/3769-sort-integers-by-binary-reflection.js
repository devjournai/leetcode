/**
 * Sort Integers by Binary Reflection
 * Intuition: We define a function f(x) to calculate the binary reflection value of integer x. Specifically, we continuously extract the lowest bit of x and add it to the end of the result y until x becomes 0.
 * Approach: Then, we sort the array \textit{nums} with the sorting key being the tuple (f(x), x) of each element's binary reflection value and original value. This ensures that when two elements have the same binary reflection value, the smaller original value will be placed first. Finally, we return the sorted array. The time complexity is O(n \times \log n), and the space complexity is O(\log n). Where n is the length of the array \textit{nums}.
 * Dry Run: Input nums = [4,5,4]. Output [4,4,5].
 * Time Complexity: O(n \times \log n)
 * Space Complexity: O(\log n)
 */
var sortByReflection = function (nums) {
  const f = (x) => {
    let y = 0;
    for (; x; x >>= 1) {
      y = (y << 1) | (x & 1);
    }
    return y;
  };

  nums.sort((a, b) => {
    const fa = f(a);
    const fb = f(b);
    if (fa !== fb) {
      return fa - fb;
    }
    return a - b;
  });

  return nums;
};
