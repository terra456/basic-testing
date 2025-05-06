// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  { a: 3, b: 2, action: Action.Subtract, expected: 1 },
  { a: 3, b: -12, action: Action.Subtract, expected: 15 },
  { a: 10, b: 2, action: Action.Divide, expected: 5 },
  { a: 1, b: 2, action: Action.Divide, expected: 0.5 },
  { a: 3, b: 2, action: Action.Multiply, expected: 6 },
  { a: 3, b: -2, action: Action.Multiply, expected: -6 },
  { a: -3, b: -2, action: Action.Multiply, expected: 6 },
  { a: 3, b: 2, action: Action.Exponentiate, expected: 9 },
  { a: 3, b: 2, action: 'jwd', expected: null },
  { a: '3', b: 2, action: Action.Exponentiate, expected: null },
  { a: false, b: 2, action: Action.Exponentiate, expected: null },
  // continue cases for other actions
];

describe.each(testCases)('.add($a, $b)', ({ a, b, action, expected }) => {
  // This test case is just to run this test suite, remove it when you write your own tests
  test(`should ${action} two numbers`, () => {
    expect(simpleCalculator({ a, b, action })).toBe(expected);
  });
  // Consider to use Jest table tests API to test all cases above
});
