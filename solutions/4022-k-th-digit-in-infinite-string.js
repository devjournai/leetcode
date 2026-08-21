/**
 * K-th Digit in Infinite String
 * Intuition: The infinite string is formed by concatenating blocks: block b contains the positive integers from 10b to 10b+9 (block 0 starts from 1). Even blocks are appended in increasing order, and odd blocks in decreasing order.
 * Approach: The infinite string is formed by concatenating blocks: block b contains the positive integers from 10b to 10b+9 (block 0 starts from 1). Even blocks are appended in increasing order, and odd blocks in decreasing order. We first handle 1 through 9 (9 digits in total). Then we group by the number of digits d = 2, 3, ldots: d-digit numbers correspond to blocks b in [10^{d-2}, 10^{d-1} - 1], i.e., 9  *  10^{d-2} blocks. Each block has 10 numbers of d digits, so each block contributes 10d digits. We subtract the total number of digits of each group until we locate the group that contains the k-th digit. Then we compute the block index b and the position within the block from the remaining offset, determine the corresponding integer according to the parity of b, and extract the required digit.
 * Dry Run: Input: k = 4. Output: 4.
 * Time Complexity: O(logk)
 * Space Complexity: O(1)
 */
var kthDigit = function (k) {
  if (k <= 9) {
    return k;
  }

  k -= 9;
  let d = 2;
  let start = 1;
  let size = 0;

  while (true) {
    const cnt = 9 * Math.pow(10, d - 2);
    size = 10 * d;

    if (k <= cnt * size) {
      break;
    }

    k -= cnt * size;
    d++;
    start *= 10;
  }

  const b = start + Math.floor((k - 1) / size);
  const pos = (k - 1) % size;

  const i = Math.floor(pos / d);

  let num;
  if (b % 2 === 0) {
    num = 10 * b + i;
  } else {
    num = 10 * b + 9 - i;
  }

  return Number(String(num)[pos % d]);
};
