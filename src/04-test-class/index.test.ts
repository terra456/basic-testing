// Uncomment the code below and write your tests
import { random } from 'lodash';
import { getBankAccount } from '.';

describe('BankAccount', () => {
  let balance = 1325;
  const bankAccount = getBankAccount(balance);
  test('should create account with initial balance', () => {
    expect(bankAccount.getBalance()).toBe(balance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    return expect(() => {
      bankAccount.withdraw(1500);
    }).toThrow(`Insufficient funds: cannot withdraw more than ${balance}`);
  });

  test('should throw error when transferring more than balance', () => {
    expect(() => bankAccount.transfer(1500, getBankAccount(0))).toThrow(
      `Insufficient funds: cannot withdraw more than ${balance}`,
    );
  });

  test('should throw error when transferring to the same account', () => {
    expect(() => bankAccount.transfer(1000, bankAccount)).toThrow(
      'Transfer failed',
    );
  });

  test('should deposit money', () => {
    bankAccount.deposit(500);
    balance += 500;
    expect(bankAccount.getBalance()).toBe(balance);
  });

  test('should withdraw money', () => {
    bankAccount.withdraw(1000);
    balance -= 1000;
    expect(bankAccount.getBalance()).toBe(balance);
  });

  test('should transfer money', () => {
    bankAccount.transfer(700, getBankAccount(0));
    balance -= 700;
    expect(bankAccount.getBalance()).toBe(balance);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    // Write your tests here
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const newBalance = await bankAccount.fetchBalance();
    if (typeof newBalance === 'number') {
      balance = newBalance;
    }
    expect(bankAccount.getBalance()).toBe(balance);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    // Write your tests here
  });
});
