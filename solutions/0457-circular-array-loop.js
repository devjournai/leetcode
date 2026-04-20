/**
 * Circular Array Loop
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var circularArrayLoop = function (nums) {
    const arraySizeParam = nums.length;
    if (arraySizeParam <= 1) {
        return false;
    }

    const calculateNextIndex = (currentIndexForCalc, currentNumsForCalc, arrLengthForCalc) => {
        const stepAmountForCalc = currentNumsForCalc[currentIndexForCalc];
        let calculatedNextIndex = (currentIndexForCalc + stepAmountForCalc) % arrLengthForCalc;
        if (calculatedNextIndex < 0) {
            calculatedNextIndex += arrLengthForCalc;
        }
        return calculatedNextIndex;
    };

    for (let currentPathStart = 0; currentPathStart < arraySizeParam; currentPathStart++) {
        if (nums[currentPathStart] === 0) {
            continue;
        }

        let slowTraveler = currentPathStart;
        let fastTraveler = currentPathStart;
        const initialDirectionPositive = nums[currentPathStart] > 0;

        while (true) {
            slowTraveler = calculateNextIndex(slowTraveler, nums, arraySizeParam);
            fastTraveler = calculateNextIndex(fastTraveler, nums, arraySizeParam);
            fastTraveler = calculateNextIndex(fastTraveler, nums, arraySizeParam);

            const slowTravelerValue = nums[slowTraveler];
            const fastTravelerValue = nums[fastTraveler];

            if ((initialDirectionPositive && slowTravelerValue < 0) || (!initialDirectionPositive && slowTravelerValue > 0) || slowTravelerValue === 0) {
                break;
            }
            if ((initialDirectionPositive && fastTravelerValue < 0) || (!initialDirectionPositive && fastTravelerValue > 0) || fastTravelerValue === 0) {
                break;
            }

            if (slowTraveler === fastTraveler) {
                const nextFromSlow = calculateNextIndex(slowTraveler, nums, arraySizeParam);
                if (slowTraveler !== nextFromSlow) {
                    return true;
                } else {
                    break;
                }
            }
        }

        let markPointer = currentPathStart;
        while (nums[markPointer] !== 0 && (initialDirectionPositive === (nums[markPointer] > 0))) {
            const nextMarkPosition = calculateNextIndex(markPointer, nums, arraySizeParam);

            if (markPointer === nextMarkPosition || (initialDirectionPositive !== (nums[nextMarkPosition] > 0))) {
                nums[markPointer] = 0;
                break;
            }

            nums[markPointer] = 0;
            markPointer = nextMarkPosition;
        }
    }

    return false;
};