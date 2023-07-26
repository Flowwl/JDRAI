import { NextFunction, Request, Response } from '@/types';
import { expect, sandbox, SinonStub } from '@/tests';
import { loggerService } from '@/services';
import { loggerMiddleware } from './logger';

describe('middleware/logger', () => {
  describe('log', () => {
    const req = {
      headers: { 'x-forwarded-for': "test" } as Request["headers"],
      method: "GET",
      url: "url"
    } as Request;
    const res = { statusCode: 400 } as Response;
    let nextStub: NextFunction;
    let standardLoggerStub: SinonStub;
    beforeEach(() => {
      nextStub = sandbox.stub() as unknown as NextFunction;
      standardLoggerStub = sandbox.stub(loggerService.standardLogger, "info");
    });
    it('should call standardLogger with right infos', async () => {
      await loggerMiddleware.logger(req, res, nextStub);

      expect(nextStub).to.have.been.calledOnceWith();
    });
  });
});
