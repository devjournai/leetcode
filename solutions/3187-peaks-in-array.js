/**
 * Peaks in Array
 * Intuition: A peak is an interior index i with nums[i-1] < nums[i] > nums[i+1]. Range peak counts with point updates are prefix sums on a 0/1 peak array, maintained by a Fenwick tree. An update at i only changes peak status of i-1, i, and i+1.
 * Approach: 1. Build `peak[i]` and Fenwick prefix sums. 2. Type 1 query [l,r]: peaks strictly inside (l, r), i.e. `tree.get(r) - tree.get(l + 1)` (0 if r-l < 2). 3. Type 2: assign nums[index]=val then refresh peak bits at index-1, index, index+1.
 * Dry Run: nums = [3,1,4,2,5], queries = [[1,0,4]]
 *   Peaks: index 2 is 1<4>2 -> peak[2]=1
 *   Query l=0,r=4: tree.get(4)-tree.get(1) = 1
 * Time Complexity: O((n + q) log n)
 * Space Complexity: O(n)
 */
class FenwickTree {
  constructor(n) {
    this.sums = Array(n + 1).fill(0);
  }

  add(i, delta) {
    while (i < this.sums.length) {
      this.sums[i] += delta;
      i += i & -i;
    }
  }

  get(i) {
    let sum = 0;
    while (i > 0) {
      sum += this.sums[i];
      i -= i & -i;
    }
    return sum;
  }
}

var countOfPeaks = function (nums, queries) {
  const ans = [];
  const peak = getPeak(nums);
  const tree = new FenwickTree(peak.length);

  for (let i = 0; i < peak.length; i++) {
    tree.add(i + 1, peak[i]);
  }

  const update = (i) => {
    const newPeak = isPeak(nums, i) ? 1 : 0;
    if (newPeak !== peak[i]) {
      tree.add(i + 1, newPeak - peak[i]);
      peak[i] = newPeak;
    }
  };

  for (const query of queries) {
    if (query[0] === 1) {
      const l = query[1];
      const r = query[2];
      ans.push(r - l < 2 ? 0 : tree.get(r) - tree.get(l + 1));
    } else if (query[0] === 2) {
      const index = query[1];
      const val = query[2];
      nums[index] = val;
      update(index);
      if (index > 0) {
        update(index - 1);
      }
      if (index + 1 < nums.length) {
        update(index + 1);
      }
    }
  }

  return ans;

  function getPeak(arr) {
    const p = Array(arr.length).fill(0);
    for (let i = 1; i + 1 < arr.length; i++) {
      p[i] = arr[i] > arr[i - 1] && arr[i] > arr[i + 1] ? 1 : 0;
    }
    return p;
  }

  function isPeak(arr, i) {
    return (
      i > 0 && i + 1 < arr.length && arr[i] > arr[i - 1] && arr[i] > arr[i + 1]
    );
  }
};
