import { expect } from '@/tests';
import { corsMiddleware } from './cors';

describe('middleware/cors', () => {
  it("should be defined", () => {
    expect(corsMiddleware.cors).not.to.be.undefined;
  });
});
