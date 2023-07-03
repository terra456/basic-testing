// Uncomment the code below and write your tests
import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';
import { jest } from '@jest/globals';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
    jest.clearAllTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const callback = jest.fn();
    jest.spyOn(global, 'setTimeout');
    doStuffByTimeout(callback, 3000);
    expect(setTimeout).toHaveBeenCalled();
    jest.runAllTimers();
    expect(setTimeout).toHaveBeenLastCalledWith(callback, 3000);
  });

  test('should call callback only after timeout', () => {
    const callback = jest.fn();
    jest.spyOn(global, 'setTimeout');
    doStuffByTimeout(callback, 3000);
    expect(callback).not.toHaveBeenCalled();
    jest.runAllTimers();
    expect(callback).toHaveBeenCalledTimes(1);
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers({ timerLimit: 100 });
  });

  afterAll(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const callback = jest.fn();
    jest.spyOn(global, 'setInterval');
    doStuffByInterval(callback, 25);
    expect(setInterval).toHaveBeenCalled();
    jest.advanceTimersByTime(500);
    expect(setInterval).toHaveBeenLastCalledWith(callback, 25);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const callback = jest.fn();
    jest.spyOn(global, 'setInterval');
    doStuffByInterval(callback, 50);
    expect(callback).not.toHaveBeenCalled();
    jest.advanceTimersByTime(250);
    expect(callback).toHaveBeenCalledTimes(5);
  });
});

describe('readFileAsynchronously', () => {
  // type Fs = {
  //   existsSync: (fullPath: string) => boolean;
  // };
  // type Path = {
  //   join: (__dirname: string, pathToFile: string) => string;
  // };
  // const fs = jest.createMockFromModule<Fs>('fs');
  // const path = jest.createMockFromModule<Path>('path');
  // fs.existsSync = jest.fn(() => true);
  const pathJoinJest = jest.fn((a, b) => {
    console.log('join');
    return [a, b].join('////');
  });

  // const MOCK_FILE_INFO = {
  //   '/path/to/file1.js': 'console.log("file1 contents");',
  //   '/path/to/file2.txt': 'file2 contents',
  // };
  beforeEach(() => {
    // Set up some mocked out file info before each test
    // require('fs').__setMockFiles(MOCK_FILE_INFO);
    jest.unstable_mockModule('node:path', () => ({
      join: pathJoinJest,
      // etc.
    }));
  });

  test('should call join with pathToFile', async () => {
    await readFileAsynchronously('dir/name.txt');
    // expect(path.join).toHaveBeenLastCalledWith('dir/name.txt');
    await expect(pathJoinJest).toHaveBeenLastCalledWith(
      __dirname,
      'dir/name.txt',
    );
  });

  test('should return null if file does not exist', async () => {
    // Write your test here
  });

  test('should return file content if file exists', async () => {
    // Write your test here
  });
});
