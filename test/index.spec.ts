import { LoopsClient } from '../src';

describe('index', () => {
  describe('LoopsClient', () => {
    it('should be able to be constructed', () => {
      const client = new LoopsClient('TEST_KEY');

      expect(client).toBeDefined();
    });
  });
});
