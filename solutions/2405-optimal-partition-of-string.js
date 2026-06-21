/**
 * Optimal Partition Of String
 * Intuition: To find the minimum number of partitions where each substring has unique characters, we should try to make each substring as long as possible. This suggests a greedy approach: extend the current substring with new, unique characters until a duplicate is encountered. At that point, the current substring is complete, and a new one must begin.
 * Approach: 1. Initialize a counter for the number of partitions to one, as even an empty or single-character string requires at least one partition. 2. Utilize a Set data structure to efficiently track unique characters within the current substring. 3. Iterate through each character of the input string. 4. For each character, check if it's already present in the Set. If it is, this signifies that the current substring cannot be extended further with this character while maintaining uniqueness. Therefore, increment the partition counter, clear the Set to start a new substring, and then add the current character to this new (empty) Set. 5. If the character is not present in the Set, simply add it, effectively extending the current substring. 6. After iterating through all characters, return the final count of partitions.
 * Dry Run: s = "abacaba"
 *   1. Initialize `partitionCount = 1`, `currentPartitionChars = new Set()`.
 *   2. Iterate `currentChar` in "abacaba":
 *      - `currentChar = 'a'`: `currentPartitionChars.has('a')` is false. Add 'a'. `currentPartitionChars = {'a'}`.
 *      - `currentChar = 'b'`: `currentPartitionChars.has('b')` is false. Add 'b'. `currentPartitionChars = {'a', 'b'}`.
 *      - `currentChar = 'a'`: `currentPartitionChars.has('a')` is true.
 *         - Increment `partitionCount` to 2.
 *         - Clear `currentPartitionChars`. `currentPartitionChars = {}`.
 *         - Add 'a'. `currentPartitionChars = {'a'}`.
 *      - `currentChar = 'c'`: `currentPartitionChars.has('c')` is false. Add 'c'. `currentPartitionChars = {'a', 'c'}`.
 *      - `currentChar = 'a'`: `currentPartitionChars.has('a')` is true.
 *         - Increment `partitionCount` to 3.
 *         - Clear `currentPartitionChars`. `currentPartitionChars = {}`.
 *         - Add 'a'. `currentPartitionChars = {'a'}`.
 *      - `currentChar = 'b'`: `currentPartitionChars.has('b')` is false. Add 'b'. `currentPartitionChars = {'a', 'b'}`.
 *      - `currentChar = 'a'`: `currentPartitionChars.has('a')` is true.
 *         - Increment `partitionCount` to 4.
 *         - Clear `currentPartitionChars`. `currentPartitionChars = {}`.
 *         - Add 'a'. `currentPartitionChars = {'a'}`.
 *   3. End of string. Return `partitionCount` which is 4.
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var partitionString = function (s) {
  const uniqueCharsInCurrentPartition = new Set();
  let numberOfPartitions = 1;

  for (const characterInString of s) {
    if (uniqueCharsInCurrentPartition.has(characterInString)) {
      uniqueCharsInCurrentPartition.clear();
      numberOfPartitions++;
    }
    uniqueCharsInCurrentPartition.add(characterInString);
  }

  return numberOfPartitions;
};
