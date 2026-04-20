/**
 * Count Primes
 * Time Complexity: O(n log log n)
 * Space Complexity: O(n)
 */
var countPrimes = function (n) {
    if (n <= 2) {
        return 0;
    }

    const isCompositeTracker = new Array(n).fill(false);
    let totalPrimeCount = 0;

    for (let currentCandidate = 2; currentCandidate < n; currentCandidate++) {
        if (!isCompositeTracker[currentCandidate]) {
            totalPrimeCount++;
            for (let currentMultiple = currentCandidate * currentCandidate; currentMultiple < n; currentMultiple += currentCandidate) {
                isCompositeTracker[currentMultiple] = true;
            }
        }
    }

    return totalPrimeCount;
};