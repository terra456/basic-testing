// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    expect(simpleCalculator({ a: 3, b: 2, action: Action.Add })).toBe(5);
  });

  test('should subtract two numbers', () => {
    // Write your test here
    expect(simpleCalculator({ a: 3, b: 2, action: Action.Subtract })).toBe(1);
  });

  test('should multiply two numbers', () => {
    // Write your test here
    expect(simpleCalculator({ a: 3, b: 2, action: Action.Multiply })).toBe(6);
  });

  test('should divide two numbers', () => {
    // Write your test here
    expect(simpleCalculator({ a: 8, b: -2, action: Action.Divide })).toBe(-4);
  });

  test('should exponentiate two numbers', () => {
    // Write your test here
    expect(
      simpleCalculator({
        a: 3,
        b: 2,
        action: Action.Exponentiate,
      }),
    ).toBe(9);
  });

  test('should return null for invalid action', () => {
    // Write your test here
    expect(simpleCalculator({ a: 140, b: 4, action: Action })).toBe(null);
  });

  test('should return null for invalid arguments', () => {
    // Write your test here
    expect(
      simpleCalculator({
        a: 'smth',
        b: 2,
        action: Action.Add,
      }),
    ).toBe(null);
  });
});
