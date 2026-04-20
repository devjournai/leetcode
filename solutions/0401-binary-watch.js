/**
 * Binary Watch
 * Time Complexity: O(1)
 * Space Complexity: O(1)
*/
var readBinaryWatch = function (turnedOn) {
    const allPossibleTimes = [];

    for (let hourValue = 0; hourValue < 12; hourValue++) {
        for (let minuteValue = 0; minuteValue < 60; minuteValue++) {
            const hourSetBits = hourValue.toString(2).split('1').length - 1;
            const minuteSetBits = minuteValue.toString(2).split('1').length - 1;

            const totalOnLeds = hourSetBits + minuteSetBits;

            if (totalOnLeds === turnedOn) {
                let minuteDisplayString = minuteValue.toString();
                if (minuteValue < 10) {
                    minuteDisplayString = '0' + minuteDisplayString;
                }
                const formattedTimeString = `${hourValue}:${minuteDisplayString}`;
                allPossibleTimes.push(formattedTimeString);
            }
        }
    }

    return allPossibleTimes;
};