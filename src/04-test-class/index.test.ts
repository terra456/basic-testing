import { getBankAccount } from '.';

describe('BankAccount', () => {
  const account = getBankAccount(48);
  const newAccount = getBankAccount(10);

  test('should create account with initial balance', () => {
    expect(account.getBalance()).toBe(48);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    expect(() => account.withdraw(50)).toThrow(
      new Error('Insufficient funds: cannot withdraw more than 48'),
    );
  });

  test('should throw error when transferring more than balance', () => {
    expect(() => account.transfer(100, newAccount)).toThrow(
      new Error('Insufficient funds: cannot withdraw more than 48'),
    );
  });

  test('should throw error when transferring to the same account', () => {
    expect(() => account.transfer(100, account)).toThrow(
      new Error('Transfer failed'),
    );
  });

  test('should deposit money', () => {
    account.deposit(10);
    expect(account.getBalance()).toBe(58);
  });

  test('should withdraw money', () => {
    account.withdraw(30);
    expect(account.getBalance()).toBe(28);
  });

  test('should transfer money', () => {
    account.transfer(3, newAccount);
    expect(account.getBalance()).toBe(25);
    expect(newAccount.getBalance()).toBe(13);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const mockFetchBalancePromise = Promise.resolve(222);
    account.fetchBalance = jest
      .fn()
      .mockImplementation(() => mockFetchBalancePromise);
    await expect(account.fetchBalance()).resolves.toBe(222);
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const mockFetchBalancePromise = Promise.resolve(99);
    account.fetchBalance = jest
      .fn()
      .mockImplementation(() => mockFetchBalancePromise);
    await account.synchronizeBalance();
    expect(account.getBalance()).toBe(99);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const mockFetchBalancePromise = Promise.resolve(null);
    account.fetchBalance = jest
      .fn()
      .mockImplementation(() => mockFetchBalancePromise);
    try {
      await account.synchronizeBalance();
    } catch (e) {
      expect(e).toEqual(new Error('Synchronization failed'));
    }
  });
});
