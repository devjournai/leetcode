/**
 * Minimum Operations to Transform Array into Alternating Prime
 * Intuition: We can first preprocess a sufficiently large list of prime numbers, denoted as $\textit{primes}$, and a boolean array $\textit{isPrime}$, where $\textit{isPrime}[i]$ indicates whether $i$ is a prime number. Then we traverse each element in the array: - If the index of the current element is even, we need to increase it to the next prime number. We can use binary search on $\textit{primes}$ to find the first prime number greater than or equal to the current element, and add the difference between them to the answer. - If the index of the current element is odd and the current element is prime, we need to increase it to the next non-prime number. For the prime number 2, we need 2 increments to reach the next non-prime number 4; for other prime numbers, we only need 1 increment to reach the next non-prime number. Finally, return the answer. The time complexity is $O(n \times \log P)$, and t...
 * Approach: We can first preprocess a sufficiently large list of prime numbers, denoted as $\textit{primes}$, and a boolean array $\textit{isPrime}$, where $\textit{isPrime}[i]$ indicates whether $i$ is a prime number. Then we traverse each element in the array: - If the index of the current element is even, we need to increase it to the next prime number. We can use binary search on $\textit{primes}$ to find the first prime number greater than or equal to the current element, and add the difference between them to the answer. - If the index of the current element is odd and the current element is prime, we need to increase it to the next non-prime number. For the prime number 2, we need 2 increments to reach the next non-prime number 4; for other prime numbers, we only need 1 increment to reach the next non-prime number. Finally, return the answer. The time complexity is $O(n \times \log P)$, and t...
 * Dry Run: Input: nums = [1,2,3,4] => Output: 3
 * Time Complexity: O(O(n * log P))
 * Space Complexity: O(O(P))
 */
const MX = 200000;

const isPrime = (() => {
    const p = Array(MX + 1).fill(true);
    p[0] = p[1] = false;
    for (let i = 2; i <= Math.floor(MX / i); ++i) {
        if (p[i]) {
            for (let j = i * i; j <= MX; j += i) {
                p[j] = false;
            }
        }
    }
    return p;
})();

const primes = Array.from({ length - 1 }, (_, i) => i + 2).filter(i => isPrime[i]);

var minOperations = function (nums) {
    let ans = 0;
    for (let i = 0; i < nums.length; ++i) {
        const x = nums[i];
        if ((i & 1) === 0) {
            let lo = 0, hi = primes.length; while (lo < hi) { const mid = (lo + hi) >> 1; if (primes[mid] < x) lo = mid + 1; else hi = mid; } const j = lo;
            ans += primes[j] - x;
        } else if (isPrime[x]) {
            ans += x === 2 ? 2 : 1;
        }
    }
    return ans;
}
