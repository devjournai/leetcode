/**
 * Digit Operations to Make Two Integers Equal
 * Intuition: Each move changes one digit by ±1 (no leading zeros) and costs the new number. Prime numbers are forbidden, so the cheapest path from `n` to `m` is Dijkstra on the 4-digit graph.
 * Approach: 1. If `n` or `m` is prime, return -1. 2. Sieve primes up to 10000. 3. Dijkstra from `n` with cost equal to the running sum of visited values (start cost is `n`). 4. Neighbors are valid non-prime digit ±1 mutations.
 * Dry Run: n = 10, m = 12.
 *   - 10 is not prime. +1 on the ones digit → 11 (prime, skip). +1 on tens is invalid (2). -1 on tens would be 00 invalid. Ones -1 → 9, cost 10+9=19.
 *   - From 10, ones +1 is blocked; actually 10→12 by ones +2 via 11 which is prime, so another path 10→20→21→22→12 etc. Official samples: 10 → 12 costs 13 via 10+12 if 11 blocked... 10 increment ones is 11 prime. 10 increment tens is 20. Then 20→21→22→12. Costs accumulate.
 * Time Complexity: O(D * log D) with D ≤ 10000
 * Space Complexity: O(D)
 */

var minOperations = function (n, m) {
  const LIMIT = 10000;
  const isPrime = sieveEratosthenes(LIMIT);
  if (isPrime[n] || isPrime[m]) {
    return -1;
  }
  return dijkstraDigitGraph(n, m, isPrime);
};

function sieveEratosthenes(limit) {
  const isPrime = new Array(limit).fill(true);
  isPrime[0] = false;
  isPrime[1] = false;
  for (let factor = 2; factor * factor < limit; factor++) {
    if (isPrime[factor]) {
      for (
        let multiple = factor * factor;
        multiple < limit;
        multiple += factor
      ) {
        isPrime[multiple] = false;
      }
    }
  }
  return isPrime;
}

function dijkstraDigitGraph(sourceValue, targetValue, isPrime) {
  const seenNumbers = new Set([sourceValue]);
  const costHeap = [[sourceValue, sourceValue]];

  const pushHeap = (entry) => {
    costHeap.push(entry);
    let index = costHeap.length - 1;
    while (index > 0) {
      const parentIndex = (index - 1) >> 1;
      if (costHeap[parentIndex][0] <= costHeap[index][0]) {
        break;
      }
      const swap = costHeap[parentIndex];
      costHeap[parentIndex] = costHeap[index];
      costHeap[index] = swap;
      index = parentIndex;
    }
  };

  const popHeap = () => {
    const topEntry = costHeap[0];
    const lastEntry = costHeap.pop();
    if (costHeap.length > 0) {
      costHeap[0] = lastEntry;
      let index = 0;
      while (true) {
        let smallestIndex = index;
        const leftIndex = index * 2 + 1;
        const rightIndex = leftIndex + 1;
        if (
          leftIndex < costHeap.length &&
          costHeap[leftIndex][0] < costHeap[smallestIndex][0]
        ) {
          smallestIndex = leftIndex;
        }
        if (
          rightIndex < costHeap.length &&
          costHeap[rightIndex][0] < costHeap[smallestIndex][0]
        ) {
          smallestIndex = rightIndex;
        }
        if (smallestIndex === index) {
          break;
        }
        const swap = costHeap[smallestIndex];
        costHeap[smallestIndex] = costHeap[index];
        costHeap[index] = swap;
        index = smallestIndex;
      }
    }
    return topEntry;
  };

  while (costHeap.length > 0) {
    const [pathCost, currentValue] = popHeap();
    if (currentValue === targetValue) {
      return pathCost;
    }

    const digits = String(currentValue).split("");
    for (let digitIndex = 0; digitIndex < digits.length; digitIndex++) {
      const originalDigit = digits[digitIndex];

      if (originalDigit < "9") {
        digits[digitIndex] = String(Number(originalDigit) + 1);
        const nextValue = Number(digits.join(""));
        if (!isPrime[nextValue] && !seenNumbers.has(nextValue)) {
          seenNumbers.add(nextValue);
          pushHeap([pathCost + nextValue, nextValue]);
        }
        digits[digitIndex] = originalDigit;
      }

      if (originalDigit > "0" && !(digitIndex === 0 && originalDigit === "1")) {
        digits[digitIndex] = String(Number(originalDigit) - 1);
        const nextValue = Number(digits.join(""));
        if (!isPrime[nextValue] && !seenNumbers.has(nextValue)) {
          seenNumbers.add(nextValue);
          pushHeap([pathCost + nextValue, nextValue]);
        }
        digits[digitIndex] = originalDigit;
      }
    }
  }

  return -1;
}
