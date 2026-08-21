/**
 * Number of Integers with Popcount-Depth Equal to K II
 * Intuition: Popcount-depth of values up to 1e15 is at most ~6, so keep a Fenwick tree per depth and answer range counts / point updates.
 * Approach: 1. depth(1)=0, else 1+depth(popcount(x)). 2. One BIT per possible k. 3. Type 1: BIT[k].range(l,r). 4. Type 2: move index from old depth to new.
 * Dry Run: nums = [2,4] depths 1,1. Query [1,0,1,1] → 2.
 * Time Complexity: O((n + q) log n)
 * Space Complexity: O(n)
 */
var popcountDepth = function (nums, queries) {
  const popcount = (value) => {
    let bits = 0;
    let remaining = value;
    while (remaining) {
      remaining &= remaining - 1;
      bits++;
    }
    return bits;
  };

  const smallDepth = Array(64).fill(0);
  for (let value = 2; value < 64; value++) {
    smallDepth[value] = smallDepth[popcount(value)] + 1;
  }

  const depthOf = (value) => {
    if (value === 1) {
      return 0;
    }
    return smallDepth[popcount(value)] + 1;
  };

  class Fenwick {
    constructor(size) {
      this.tree = Array(size + 2).fill(0);
    }

    add(index, delta) {
      for (
        let position = index + 1;
        position < this.tree.length;
        position += position & -position
      ) {
        this.tree[position] += delta;
      }
    }

    prefix(index) {
      let sum = 0;
      for (
        let position = index + 1;
        position > 0;
        position -= position & -position
      ) {
        sum += this.tree[position];
      }
      return sum;
    }

    range(left, right) {
      return this.prefix(right) - this.prefix(left - 1);
    }
  }

  const maxDepth = 6;
  const trees = Array.from(
    { length: maxDepth + 1 },
    () => new Fenwick(nums.length)
  );
  const values = nums.slice();

  for (let index = 0; index < values.length; index++) {
    trees[depthOf(values[index])].add(index, 1);
  }

  const answers = [];
  for (const query of queries) {
    if (query[0] === 1) {
      const [, left, right, k] = query;
      answers.push(k > maxDepth ? 0 : trees[k].range(left, right));
    } else {
      const [, index, nextValue] = query;
      const oldDepth = depthOf(values[index]);
      const newDepth = depthOf(nextValue);
      if (oldDepth !== newDepth) {
        trees[oldDepth].add(index, -1);
        trees[newDepth].add(index, 1);
      }
      values[index] = nextValue;
    }
  }
  return answers;
};
