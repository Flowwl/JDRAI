import { httpErrorService } from '@/services';
import { expect, sandbox } from '@/tests';
import { Request, Response } from '@/types';
import { errorMiddleware } from './error';
import { SinonStub } from 'sinon';

describe('middleware/error', () => {
  const req = {
    headers: {
      ['x-forwarded-for']: "ip"
    } as Request["headers"],
    originalUrl: "url"
  } as Request;

  let sendStub: SinonStub;
  let statusStub: SinonStub;
  let nextStub: SinonStub;
  let res;
  beforeEach(() => {
    sendStub = sandbox.stub();
    nextStub = sandbox.stub();
    statusStub = sandbox.stub();
    res = { statusCode: 400, status: statusStub as Response["status"], send: sendStub as Response["send"] } as Response;
    statusStub.returns(res);
  });
  it("should have returned status and body in the response", () => {
    const message = "lolol";
    const key = "TOP";
    const status = 103;

    errorMiddleware.handleError(new httpErrorService.HttpError(message, status, key), req, res, nextStub);

    expect(statusStub).to.have.been.calledWith(status);
    expect(sendStub).to.have.been.calledWith({
      key: key,
      error: message,
      code: undefined
    });
  });
});
