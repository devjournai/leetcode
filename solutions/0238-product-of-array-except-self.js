/**
 * Product Of Array Except Self
 * Time Complexity: O(n)
 * Space Complexity: O(1)
*/
var productExceptSelf = function (nums) {
    const totalElements = nums.length;
    const finalProducts = new Array(totalElements).fill(1);

    let currentLeftProduct = 1;
    for (let currentForwardIndex = 0; currentForwardIndex < totalElements; currentForwardIndex++) {
        finalProducts[currentForwardIndex] = currentLeftProduct;
        currentLeftProduct = currentLeftProduct * nums[currentForwardIndex];
    }

    let currentRightProduct = 1;
    for (let currentBackwardIndex = totalElements - 1; currentBackwardIndex >= 0; currentBackwardIndex--) {
        finalProducts[currentBackwardIndex] = finalProducts[currentBackwardIndex] * currentRightProduct;
        currentRightProduct = currentRightProduct * nums[currentBackwardIndex];
    }

    return finalProducts;
};