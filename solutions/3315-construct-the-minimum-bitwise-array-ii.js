/**
 * Construct the Minimum Bitwise Array II
 * Time Complexity: O(N * log(max(nums[i])))
 * Space Complexity: O(N)
*/
var minBitwiseArray = function (nums) {
    const ans = [];

    for (const target of nums) {
        let minX = Infinity;
        for (let k = 0; k < 30; k++) {
            const mask = (1 << (k + 1)) - 1;
            if ((target & mask) === mask) {
                const currentX = (target & ~mask) | ((1 << k) - 1);
                if (currentX < minX) {
                    minX = currentX;
                }
            }
        }
        if (minX === Infinity) {
            ans.push(-1);
        } else {
            ans.push(minX);
        }
    }

    return ans;
};