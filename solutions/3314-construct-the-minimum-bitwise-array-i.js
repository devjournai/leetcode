/**
 * Construct the Minimum Bitwise Array I
 * Time Complexity: O(N * log(MAX_NUM))
 * Space Complexity: O(N)
*/
var minBitwiseArray = function (nums) {
    const ans = [];

    for (const num of nums) {
        if (num % 2 === 0) {
            ans.push(-1);
            continue;
        }
        let minX = num - 1;
        for (let k = 1; k <= 10; k++) {
            const mask = (1 << (k + 1)) - 1;

            if ((num & mask) === mask) {
                const xCandidate = num ^ (1 << k);
                minX = Math.min(minX, xCandidate);
            }
        }
        ans.push(minX);
    }

    return ans;
};