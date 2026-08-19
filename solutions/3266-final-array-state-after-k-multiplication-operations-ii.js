/**
 * Final Array State After K Multiplication Operations II
 * Intuition: While the minimum is still <= max(nums) / multiplier, each op just lifts that min toward the current maximum. After every value sits in one "band", remaining multiplies cycle evenly across the n values and can be applied with modular exponentiation.
 * Approach: 1. If multiplier is 1, return nums. 2. Min-heap multiply while k > 0 and min * multiplier <= maxNum. 3. Sort remaining (value, index) pairs. Each gets multiplier^(k/n) (mod 1e9+7); the first k%n also get one extra multiply. 4. Write values back by index.
 * Dry Run:
 *   nums = [2, 1, 3, 5, 6], k = 5, multiplier = 2
 *   Lift 1 then 2 then 2 then 3 then 4 until they catch the max band, matching the small-k simulation [8, 4, 6, 5, 6].
 * Time Complexity: O(n log n + k log n) in the lifting phase, then O(n log (k/n)) for exponentiation
 * Space Complexity: O(n)
 */
var getFinalState = function (nums, k, multiplier) {
  if (multiplier === 1) {
    return nums;
  }

  const MOD = 1000000007n;
  const n = nums.length;
  const maxNum = Math.max(...nums);
  const heap = nums.map((num, i) => [num, i]);

  const compare = (a, b) => a[0] - b[0] || a[1] - b[1];

  const bubbleUp = (idx) => {
    while (idx > 0) {
      const parent = Math.floor((idx - 1) / 2);
      if (compare(heap[idx], heap[parent]) >= 0) break;
      [heap[idx], heap[parent]] = [heap[parent], heap[idx]];
      idx = parent;
    }
  };

  const bubbleDown = (idx) => {
    while (true) {
      let smallest = idx;
      const left = idx * 2 + 1;
      const right = idx * 2 + 2;
      if (left < heap.length && compare(heap[left], heap[smallest]) < 0) {
        smallest = left;
      }
      if (right < heap.length && compare(heap[right], heap[smallest]) < 0) {
        smallest = right;
      }
      if (smallest === idx) break;
      [heap[idx], heap[smallest]] = [heap[smallest], heap[idx]];
      idx = smallest;
    }
  };

  for (let i = Math.floor(heap.length / 2) - 1; i >= 0; i--) {
    bubbleDown(i);
  }

  const pop = () => {
    const top = heap[0];
    const last = heap.pop();
    if (heap.length > 0) {
      heap[0] = last;
      bubbleDown(0);
    }
    return top;
  };

  const push = (item) => {
    heap.push(item);
    bubbleUp(heap.length - 1);
  };

  while (k > 0 && heap[0][0] * multiplier <= maxNum) {
    const [num, i] = pop();
    push([num * multiplier, i]);
    k--;
  }

  const sortedIndexedNums = heap.slice().sort(compare);
  const multipliesPerNum = Math.floor(k / n);
  const remainingK = k % n;

  const modPow = (x, exp) => {
    let base = BigInt(x) % MOD;
    let e = BigInt(exp);
    let res = 1n;
    while (e > 0n) {
      if (e & 1n) {
        res = (res * base) % MOD;
      }
      base = (base * base) % MOD;
      e >>= 1n;
    }
    return res;
  };

  const factor = modPow(multiplier, multipliesPerNum);
  for (let i = 0; i < n; i++) {
    sortedIndexedNums[i][0] = Number((BigInt(sortedIndexedNums[i][0]) * factor) % MOD);
  }

  for (let i = 0; i < remainingK; i++) {
    sortedIndexedNums[i][0] = Number(
      (BigInt(sortedIndexedNums[i][0]) * BigInt(multiplier)) % MOD
    );
  }

  const ans = Array(n);
  for (const [num, i] of sortedIndexedNums) {
    ans[i] = num;
  }
  return ans;
};
