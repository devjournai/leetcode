/**
 * Maximum Transactions Without Negative Balance
 * Intuition: Take every transaction, then if the running balance goes negative drop the most negative kept transaction (a min-heap) until the balance is nonnegative. That discards as little as possible.
 * Approach: 1. Add each amount to the balance and a min-heap. 2. While balance < 0, subtract/pop the smallest (most negative) value and count one skip.
 * Dry Run: [2, -5, 3, -1, -2] drops -5 and keeps 4 transactions.
 * Time Complexity: O(N log N)
 * Space Complexity: O(N)
 */
var maxTransactions = function (transactions) {
  const minHeap = [];
  const push = (value) => {
    minHeap.push(value);
    let i = minHeap.length - 1;
    while (i > 0) {
      const parent = Math.floor((i - 1) / 2);
      if (minHeap[parent] <= minHeap[i]) {
        break;
      }
      [minHeap[parent], minHeap[i]] = [minHeap[i], minHeap[parent]];
      i = parent;
    }
  };
  const pop = () => {
    const smallest = minHeap[0];
    const last = minHeap.pop();
    if (minHeap.length === 0) {
      return smallest;
    }
    minHeap[0] = last;
    let i = 0;
    while (true) {
      const left = 2 * i + 1;
      const right = 2 * i + 2;
      let smallestIndex = i;
      if (left < minHeap.length && minHeap[left] < minHeap[smallestIndex]) {
        smallestIndex = left;
      }
      if (right < minHeap.length && minHeap[right] < minHeap[smallestIndex]) {
        smallestIndex = right;
      }
      if (smallestIndex === i) {
        break;
      }
      [minHeap[i], minHeap[smallestIndex]] = [
        minHeap[smallestIndex],
        minHeap[i],
      ];
      i = smallestIndex;
    }
    return smallest;
  };

  let balance = 0;
  let kept = transactions.length;
  for (const amount of transactions) {
    balance += amount;
    push(amount);
    while (balance < 0) {
      const dropped = pop();
      balance -= dropped;
      kept--;
    }
  }
  return kept;
};
