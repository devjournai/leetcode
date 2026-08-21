/**
 * Maximum Strong Pair XOR II
 *
 * Intuition:
 * A pair (x, y) is strong if:
 *
 *     |x - y| <= min(x, y)
 *
 * Since XOR is symmetric, we can assume:
 *
 *     x <= y
 *
 * Then:
 *
 *     |x - y| = y - x
 *
 * and:
 *
 *     y - x <= x
 *
 * Therefore:
 *
 *     y <= 2 * x
 *
 * So the problem becomes:
 *
 *     Find maximum x XOR y
 *     such that:
 *
 *         x <= y <= 2 * x
 *
 * ------------------------------------------------------------
 *
 * Sort nums.
 *
 * For every number `y`, we want to find a previous number `x`
 * satisfying:
 *
 *     y / 2 <= x <= y
 *
 * because:
 *
 *     y <= 2 * x
 *
 *     => x >= ceil(y / 2)
 *
 * Since nums is sorted, we can maintain a sliding window:
 *
 *     left ... right
 *
 * where:
 *
 *     nums[left] >= ceil(nums[right] / 2)
 *
 * Every number inside this window can form a strong pair with
 * nums[right].
 *
 * ------------------------------------------------------------
 *
 * Now we need the maximum XOR between:
 *
 *     nums[right]
 *
 * and ANY number inside the current window.
 *
 * A Binary Trie is perfect for maximum XOR.
 *
 * For each bit from the highest bit to the lowest bit:
 *
 *     If the current bit of `num` is 0,
 *     we prefer a number having bit 1.
 *
 *     If the current bit of `num` is 1,
 *     we prefer a number having bit 0.
 *
 * This greedily maximizes the XOR.
 *
 * ------------------------------------------------------------
 *
 * Approach: Sort nums. Maintain a binary trie of the window [left, right] where nums[left]*2 >= nums[right]. Insert nums[right], remove nums[left] while the strong-pair bound fails, then query max XOR of the current number.
 *
 * Sliding Window + Trie:
 *
 * 1. Sort nums.
 *
 * 2. For each right index:
 *
 *       Add nums[right] to the trie.
 *
 * 3. Remove numbers from the left while:
 *
 *       nums[left] * 2 < nums[right]
 *
 *    because those numbers cannot form a strong pair anymore.
 *
 * 4. Query the trie for the maximum XOR with nums[right].
 *
 * 5. Update the answer.
 *
 * ------------------------------------------------------------
 *
 * Important:
 *
 * We add the current number before querying.
 *
 * This automatically handles:
 *
 *     x = y
 *
 * because a number can be paired with itself.
 *
 * ------------------------------------------------------------
 *
 * Dry Run:
 *
 * nums = [1,2,3,4,5]
 *
 * Sorted:
 *
 *     [1,2,3,4,5]
 *
 * right = 0
 * num = 1
 *
 * Window:
 *
 *     [1]
 *
 * Maximum XOR:
 *
 *     1 XOR 1 = 0
 *
 *
 * right = 1
 * num = 2
 *
 * Valid numbers satisfy:
 *
 *     x >= ceil(2 / 2)
 *     x >= 1
 *
 * Window:
 *
 *     [1,2]
 *
 * Maximum:
 *
 *     1 XOR 2 = 3
 *
 *
 * right = 2
 * num = 3
 *
 * Valid numbers:
 *
 *     x >= ceil(3 / 2)
 *     x >= 2
 *
 * Window:
 *
 *     [2,3]
 *
 *     2 XOR 3 = 1
 *
 *
 * right = 3
 * num = 4
 *
 * Valid numbers:
 *
 *     x >= 2
 *
 * Window:
 *
 *     [2,3,4]
 *
 * Maximum:
 *
 *     3 XOR 4 = 7
 *
 * Therefore:
 *
 *     answer = 7
 *
 * ------------------------------------------------------------
 *
 * Time Complexity: O(n log n + n * 20)
 * Space Complexity: O(n * 20)
 */
var maximumStrongPairXor = function (nums) {
  nums.sort((a, b) => a - b);

  const n = nums.length;
  const MAX_BIT = 19;
  const leftChild = [0];
  const rightChild = [0];
  const count = [0];

  const createNode = () => {
    const index = count.length;

    leftChild.push(0);
    rightChild.push(0);
    count.push(0);

    return index;
  };

  const insert = (num) => {
    let node = 0;

    count[node]++;

    for (let bit = MAX_BIT; bit >= 0; bit--) {
      const currentBit = (num >> bit) & 1;

      if (currentBit === 0) {
        if (leftChild[node] === 0) {
          leftChild[node] = createNode();
        }

        node = leftChild[node];
      } else {
        if (rightChild[node] === 0) {
          rightChild[node] = createNode();
        }

        node = rightChild[node];
      }

      count[node]++;
    }
  };

  const remove = (num) => {
    let node = 0;

    count[node]--;

    for (let bit = MAX_BIT; bit >= 0; bit--) {
      const currentBit = (num >> bit) & 1;

      if (currentBit === 0) {
        node = leftChild[node];
      } else {
        node = rightChild[node];
      }

      count[node]--;
    }
  };

  const getMaxXor = (num) => {
    let node = 0;
    let result = 0;

    for (let bit = MAX_BIT; bit >= 0; bit--) {
      const currentBit = (num >> bit) & 1;

      const preferredBit = currentBit ^ 1;

      let nextNode;

      if (preferredBit === 0) {
        nextNode = leftChild[node];
      } else {
        nextNode = rightChild[node];
      }

      if (nextNode !== 0 && count[nextNode] > 0) {
        result |= 1 << bit;
        node = nextNode;
      } else {
        if (currentBit === 0) {
          node = leftChild[node];
        } else {
          node = rightChild[node];
        }
      }
    }

    return result;
  };

  let left = 0;
  let answer = 0;

  for (let right = 0; right < n; right++) {
    const current = nums[right];
    insert(current);
    while (nums[left] * 2 < current) {
      remove(nums[left]);
      left++;
    }

    answer = Math.max(answer, getMaxXor(current));
  }

  return answer;
};
