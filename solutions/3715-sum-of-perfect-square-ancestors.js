/**
 * Sum Of Perfect Square Ancestors
 * Intuition: nums[i] * nums[anc] is square iff they share the same square-free kernel (primes with odd exponent). DFS from the root, counting ancestors with that kernel, then backtrack.
 * Approach: 1. Linear sieve for smallest prime factors up to 1e5. 2. Map each value to its odd-exponent kernel. 3. Iterative DFS: add the current kernel's ancestor count, recurse, then decrement.
 * Dry Run: nums = [2, 8, 2] on a path. Kernels of 2 and 8 are both 2, so node 1 counts 1 and node 2 counts 2 → 3.
 * Time Complexity: O(N log A)
 * Space Complexity: O(N + A)
 */
var sumOfAncestors = function (n, edges, nums) {
  const maxValue = 100000;
  const smallestPrime = Array(maxValue + 1).fill(-1);
  const primes = [];
  for (let i = 2; i <= maxValue; i++) {
    if (smallestPrime[i] === -1) {
      smallestPrime[i] = i;
      primes.push(i);
    }
    for (const prime of primes) {
      const product = i * prime;
      if (product > maxValue || prime > smallestPrime[i]) {
        break;
      }
      smallestPrime[product] = prime;
    }
  }

  const oddKernel = (value) => {
    let kernel = 1;
    while (value !== 1) {
      const prime = smallestPrime[value];
      if (kernel % prime === 0) {
        kernel = Math.floor(kernel / prime);
      } else {
        kernel *= prime;
      }
      value = Math.floor(value / prime);
    }
    return kernel;
  };

  const graph = Array.from({ length: n }, () => []);
  for (const [left, right] of edges) {
    graph[left].push(right);
    graph[right].push(left);
  }

  const ancestorCount = new Map();
  let total = 0;
  const stack = [{ step: 1, node: 0, parent: -1, childIndex: 0, kernel: 0 }];

  while (stack.length) {
    const frame = stack.pop();
    if (frame.step === 1) {
      const kernel = oddKernel(nums[frame.node]);
      total += ancestorCount.get(kernel) || 0;
      ancestorCount.set(kernel, (ancestorCount.get(kernel) || 0) + 1);
      stack.push({ step: 3, kernel });
      stack.push({
        step: 2,
        node: frame.node,
        parent: frame.parent,
        childIndex: 0,
      });
    } else if (frame.step === 2) {
      if (frame.childIndex >= graph[frame.node].length) {
        continue;
      }
      stack.push({
        step: 2,
        node: frame.node,
        parent: frame.parent,
        childIndex: frame.childIndex + 1,
      });
      const child = graph[frame.node][frame.childIndex];
      if (child !== frame.parent) {
        stack.push({ step: 1, node: child, parent: frame.node });
      }
    } else {
      ancestorCount.set(frame.kernel, ancestorCount.get(frame.kernel) - 1);
    }
  }
  return total;
};
