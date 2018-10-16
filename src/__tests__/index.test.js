import jsSeed from '..';

beforeEach(() => {
  jest.resetAllMocks();
});

describe('js-seed', () => {
  it('should ne true', () => {
    expect(jsSeed()).toBeTruthy();
  });
});
