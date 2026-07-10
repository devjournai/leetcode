/**
 * Make Array Empty
 *
 * Intuition:
 * Remove the numbers in increasing order.
 *
 * For every value, we need to know how many elements are still alive between
 * the previously removed position and the current position in the circular
 * array.
 *
 * A Binary Indexed Tree (Fenwick Tree) efficiently maintains the number of
 * remaining elements.
 *
 * -----------------------------------------------------------------------
 *
 * Approach:
 *
 * 1. Store:
 *
 *      [value, originalIndex]
 *
 *      for every element.
 *
 * 2. Sort by value.
 *
 * 3. Build a Fenwick Tree.
 *
 *      Initially every index contains 1
 *      (every element is alive).
 *
 * 4. Let:
 *
 *      previousIndex = 0
 *
 * 5. Process elements in increasing order.
 *
 *      Suppose current index is idx.
 *
 *      If:
 *
 *          idx >= previousIndex
 *
 *      operations =
 *
 *          alive(previousIndex...idx)
 *
 *      Otherwise we wrap around:
 *
 *          alive(previousIndex...n-1)
 *          +
 *          alive(0...idx)
 *
 *      Add the operations.
 *
 *      Remove the current element from the Fenwick Tree.
 *
 *      previousIndex = idx
 *
 * 6. Return the total operations.
 *
 * -----------------------------------------------------------------------
 *
 * Dry Run:
 *
 * nums =
 *
 * [3,4,-1]
 *
 * Sorted:
 *
 * (-1,2)
 * (3,0)
 * (4,1)
 *
 * Alive:
 *
 * [1,1,1]
 *
 * Remove index 2:
 *
 * operations = 3
 *
 * Alive:
 *
 * [1,1,0]
 *
 * Remove index 0:
 *
 * operations += 1
 *
 * Alive:
 *
 * [0,1,0]
 *
 * Remove index 1:
 *
 * operations += 1
 *
 * Total:
 *
 * 5
 *
 * -----------------------------------------------------------------------
 *
 * Time Complexity: O(N log N)
 * Space Complexity: O(N)
 */

var countOperationsToEmptyArray = function (nums) {
  const n = nums.length;

  const values = [];

  for (let i = 0; i < n; i++) {
    values.push([nums[i], i]);
  }

  values.sort((a, b) => a[0] - b[0]);

  const bit = new Array(n + 1).fill(0);

  const update = (index, delta) => {
    index++;

    while (index <= n) {
      bit[index] += delta;
      index += index & -index;
    }
  };

  const query = (index) => {
    index++;

    let sum = 0;

    while (index > 0) {
      sum += bit[index];
      index -= index & -index;
    }

    return sum;
  };

  const rangeQuery = (left, right) => {
    if (left > right) {
      return 0;
    }

    return query(right) - (left === 0 ? 0 : query(left - 1));
  };

  for (let i = 0; i < n; i++) {
    update(i, 1);
  }

  let answer = 0n;
  let previousIndex = 0;

  for (const [, index] of values) {
    if (index >= previousIndex) {
      answer += BigInt(rangeQuery(previousIndex, index));
    } else {
      answer += BigInt(rangeQuery(previousIndex, n - 1));

      answer += BigInt(rangeQuery(0, index));
    }

    update(index, -1);

    previousIndex = index;
  }

  return Number(answer);
};
