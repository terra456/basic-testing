// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 3, b: 2, action: Action.Subtract, expected: 1 },
  { a: 3, b: 2, action: Action.Multiply, expected: 6 },
  { a: 8, b: -2, action: Action.Divide, expected: -4 },
  { a: 3, b: 2, action: Action.Exponentiate, expected: 9 },
  { a: 140, b: 4, action: Action, expected: null },
  { a: 'smth', b: 2, action: Action.Add, expected: null },
];

describe.each(testCases)('simpleCalculator', ({ a, b, action, expected }) => {
  test(`returns ${expected}`, () => {
    expect(simpleCalculator({ a, b, action })).toBe(expected);
  });
});
