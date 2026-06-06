/**
 * Design An Atm Machine
 * Intuition: Store available banknotes by denomination. For deposits, directly add. For withdrawals, prioritize larger denominations. To handle a rejected withdrawal without altering ATM state, first perform a trial withdrawal to determine if it's possible, then update the state only if successful.
 * Approach: 1. Initialize ATM with fixed denominations and empty banknote counts. 2. For deposit, iterate through the input banknote counts and add them to the corresponding stored counts. 3. For withdrawal, create a temporary array to store proposed banknote counts. Iterate from the largest denomination to the smallest. For each denomination, calculate the maximum notes that can be taken (limited by remaining amount and available notes) and subtract from the remaining amount. 4. After the trial, if the remaining amount is not zero, return [-1]. 5. Otherwise, iterate through the temporary banknote counts and deduct them from the actual stored ATM counts, then return the temporary counts.
 * Dry Run:
 * ATM initialization:
 *   this.atmDenominations = [20, 50, 100, 200, 500]
 *   this.atmNotesStored = [0, 0, 0, 0, 0]
 *
 * deposit([0, 0, 2, 1, 0]): (2x$100, 1x$200 deposited)
 *   depositBanknotesCount = [0, 0, 2, 1, 0]
 *   depositLoopIndex = 0: this.atmNotesStored[0] += 0 -> [0,0,0,0,0]
 *   depositLoopIndex = 1: this.atmNotesStored[1] += 0 -> [0,0,0,0,0]
 *   depositLoopIndex = 2: this.atmNotesStored[2] += 2 -> [0,0,2,0,0]
 *   depositLoopIndex = 3: this.atmNotesStored[3] += 1 -> [0,0,2,1,0]
 *   depositLoopIndex = 4: this.atmNotesStored[4] += 0 -> [0,0,2,1,0]
 *   Final this.atmNotesStored = [0, 0, 2, 1, 0]
 *
 * withdraw(300):
 *   withdrawRequestedAmount = 300
 *   provisionalWithdrawalUnits = [0, 0, 0, 0, 0]
 *   remainingMoney = 300
 *   denominationIterator loop (4 down to 0):
 *     denominationIterator = 4 (value 500):
 *       currentDenomValue = 500
 *       currentNotesAvailable = this.atmNotesStored[4] = 0
 *       maxNotesToCover = floor(300 / 500) = 0
 *       actualNotesToProcess = min(0, 0) = 0
 *       provisionalWithdrawalUnits[4] = 0
 *       remainingMoney = 300 - (0 * 500) = 300
 *     denominationIterator = 3 (value 200):
 *       currentDenomValue = 200
 *       currentNotesAvailable = this.atmNotesStored[3] = 1
 *       maxNotesToCover = floor(300 / 200) = 1
 *       actualNotesToProcess = min(1, 1) = 1
 *       provisionalWithdrawalUnits[3] = 1
 *       remainingMoney = 300 - (1 * 200) = 100
 *     denominationIterator = 2 (value 100):
 *       currentDenomValue = 100
 *       currentNotesAvailable = this.atmNotesStored[2] = 2
 *       maxNotesToCover = floor(100 / 100) = 1
 *       actualNotesToProcess = min(1, 2) = 1
 *       provisionalWithdrawalUnits[2] = 1
 *       remainingMoney = 100 - (1 * 100) = 0
 *     denominationIterator = 1 (value 50): remainingMoney is 0, so actualNotesToProcess = 0.
 *     denominationIterator = 0 (value 20): remainingMoney is 0, so actualNotesToProcess = 0.
 *   Loop ends.
 *   remainingMoney (0) === 0.
 *   updateIterator loop (0 up to 4):
 *     updateIterator = 0: this.atmNotesStored[0] -= 0 -> [0,0,2,1,0]
 *     updateIterator = 1: this.atmNotesStored[1] -= 0 -> [0,0,2,1,0]
 *     updateIterator = 2: this.atmNotesStored[2] -= 1 -> [0,0,1,1,0]
 *     updateIterator = 3: this.atmNotesStored[3] -= 1 -> [0,0,1,0,0]
 *     updateIterator = 4: this.atmNotesStored[4] -= 0 -> [0,0,1,0,0]
 *   Final this.atmNotesStored = [0, 0, 1, 0, 0]
 *   Return provisionalWithdrawalUnits = [0, 0, 1, 1, 0] (1x$100, 1x$200)
 * Time Complexity: O(1)
 * Space Complexity: O(1)
 */
var ATM = function () {
  this.atmDenominations = [20, 50, 100, 200, 500];
  this.atmNotesStored = [0, 0, 0, 0, 0];
};

ATM.prototype.deposit = function (banknotesCount) {
  for (let depositLoopIndex = 0; depositLoopIndex < 5; depositLoopIndex++) {
    this.atmNotesStored[depositLoopIndex] += banknotesCount[depositLoopIndex];
  }
};

ATM.prototype.withdraw = function (amount) {
  const provisionalWithdrawalUnits = [0, 0, 0, 0, 0];
  let remainingMoney = amount;

  for (
    let denominationIterator = 4;
    denominationIterator >= 0;
    denominationIterator--
  ) {
    const currentDenomValue = this.atmDenominations[denominationIterator];
    const currentNotesAvailable = this.atmNotesStored[denominationIterator];

    const maxNotesToCover = Math.floor(remainingMoney / currentDenomValue);
    const actualNotesToProcess = Math.min(
      maxNotesToCover,
      currentNotesAvailable,
    );

    provisionalWithdrawalUnits[denominationIterator] = actualNotesToProcess;
    remainingMoney -= actualNotesToProcess * currentDenomValue;
  }

  if (remainingMoney !== 0) {
    return [-1];
  }

  for (let updateIterator = 0; updateIterator < 5; updateIterator++) {
    this.atmNotesStored[updateIterator] -=
      provisionalWithdrawalUnits[updateIterator];
  }

  return provisionalWithdrawalUnits;
};
