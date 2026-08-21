/**
 * Maximize Count of Distinct Primes After Split
 * Intuition: After each update, score(k) = (distinct primes on the left of k) + (distinct primes on the right). That equals uniquePrimes + how many primes appear on both sides of k. Both-sides primes are those whose min index < k ≤ max index.
 * Approach: 1. Sieve primes up to 1e5. 2. Track positions of each prime in a sorted list. 3. Lazy segment tree over split points 1..n-1, range-add +1 on (min+1..max) when a prime has ≥2 occurrences. 4. Answer unique + max coverage.
 * Dry Run: nums = [2,1,3,1,2], queries = [[1,2],[3,3]]. After first update unique primes 2,3 and 2 spans both sides → 3. After second, 2 and 3 both span → 4.
 * Time Complexity: O((N + Q) log N log A)
 * Space Complexity: O(N + A)
 */
var maximumCount = function (nums, queries) {
  const MAX = 100000;
  const isPrime = new Array(MAX + 1).fill(true);
  isPrime[0] = false;
  isPrime[1] = false;
  for (let i = 2; i * i <= MAX; i++) {
    if (isPrime[i]) {
      for (let j = i * i; j <= MAX; j += i) {
        isPrime[j] = false;
      }
    }
  }

  const n = nums.length;
  const positions = new Map();

  const insertPos = (value, index) => {
    if (!positions.has(value)) {
      positions.set(value, []);
    }
    const arr = positions.get(value);
    let lo = 0;
    let hi = arr.length;
    while (lo < hi) {
      const mid = (lo + hi) >> 1;
      if (arr[mid] < index) {
        lo = mid + 1;
      } else {
        hi = mid;
      }
    }
    arr.splice(lo, 0, index);
  };

  const removePos = (value, index) => {
    const arr = positions.get(value);
    if (!arr) {
      return;
    }
    const at = arr.indexOf(index);
    if (at >= 0) {
      arr.splice(at, 1);
    }
    if (arr.length === 0) {
      positions.delete(value);
    }
  };

  const size = n;
  const treeMax = new Array(size * 4).fill(0);
  const lazy = new Array(size * 4).fill(0);

  const push = (node) => {
    if (lazy[node] !== 0) {
      treeMax[node * 2] += lazy[node];
      treeMax[node * 2 + 1] += lazy[node];
      lazy[node * 2] += lazy[node];
      lazy[node * 2 + 1] += lazy[node];
      lazy[node] = 0;
    }
  };

  const addRange = (node, l, r, ql, qr, delta) => {
    if (ql > qr || ql > r || qr < l) {
      return;
    }
    if (ql <= l && r <= qr) {
      treeMax[node] += delta;
      lazy[node] += delta;
      return;
    }
    push(node);
    const mid = (l + r) >> 1;
    addRange(node * 2, l, mid, ql, qr, delta);
    addRange(node * 2 + 1, mid + 1, r, ql, qr, delta);
    treeMax[node] = Math.max(treeMax[node * 2], treeMax[node * 2 + 1]);
  };

  const applyPrime = (value, delta) => {
    if (!isPrime[value]) {
      return;
    }
    const arr = positions.get(value);
    if (!arr || arr.length < 2) {
      return;
    }
    const left = arr[0] + 1;
    const right = arr[arr.length - 1];
    if (left <= right) {
      addRange(1, 1, n - 1, left, right, delta);
    }
  };

  let unique = 0;
  for (let i = 0; i < n; i++) {
    const value = nums[i];
    if (isPrime[value] && !positions.has(value)) {
      unique++;
    }
    insertPos(value, i);
  }
  for (const value of positions.keys()) {
    applyPrime(value, 1);
  }

  const answer = [];
  for (const [idx, val] of queries) {
    const oldVal = nums[idx];
    if (oldVal !== val) {
      applyPrime(oldVal, -1);
      const oldArr = positions.get(oldVal);
      const oldUnique = isPrime[oldVal] && oldArr && oldArr.length > 0;
      removePos(oldVal, idx);
      const still = positions.get(oldVal);
      if (oldUnique && (!still || still.length === 0) && isPrime[oldVal]) {
        unique--;
      }
      applyPrime(oldVal, 1);

      applyPrime(val, -1);
      const had = positions.has(val) && positions.get(val).length > 0;
      if (isPrime[val] && !had) {
        unique++;
      }
      insertPos(val, idx);
      applyPrime(val, 1);
      nums[idx] = val;
    }
    answer.push(unique + treeMax[1]);
  }

  return answer;
};
