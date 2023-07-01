// Uncomment the code below and write your tests
import {
  throwError,
  throwCustomError,
  resolveValue,
  rejectCustomError,
} from './index';

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    await expect(resolveValue('someValue')).resolves.toBe('someValue');
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    expect(() => throwError('New error message')).toThrow(
      new Error('New error message'),
    );
  });

  test('should throw error with default message if message is not provided', () => {
    expect(throwError).toThrow(new Error('Oops!'));
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    expect(throwCustomError).toThrow(
      new Error('This is my awesome custom error!'),
    );
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    await expect(rejectCustomError()).rejects.toThrow(
      'This is my awesome custom error!',
    );
  });
});
