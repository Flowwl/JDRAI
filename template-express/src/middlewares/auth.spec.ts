import { AuthedRequest, NextFunction, Response } from '@/types';
import { expect, sandbox, simpleUser, SinonStub } from '@/tests';
import { MESSAGES, PERMISSIONS } from '@/enums';
import * as permissionUtils from '@/utils/permissions';
import { httpErrorService, jwtService } from '@/services';
import { authMiddleware } from './auth';

describe('middleware/auth', function () {
  const response = {} as Response;

  let nextStub: NextFunction;
  let hasPermStub: SinonStub;
  let req: AuthedRequest;
  beforeEach(async () => {
    hasPermStub = sandbox.stub(permissionUtils, "hasPermission");
    nextStub = sandbox.stub() as unknown as NextFunction;
  });
  it("should return a function", () => {
    const res = authMiddleware.getRestrictHandler(PERMISSIONS.CAN_FIND_ALL_USERS);

    expect(res).to.be.instanceOf(Function);
  });
  it("should add user to request if user has permissions", async () => {
    req = { signedCookies: { token: jwtService.generateToken(simpleUser) } } as AuthedRequest;
    hasPermStub.returns(true);
    const res = authMiddleware.getRestrictHandler(PERMISSIONS.CAN_LOGIN)(req, response, nextStub);

    await expect(res).to.be.fulfilled;
    expect(req.user).to.deep.contains({
      _id: simpleUser._id,
      email: simpleUser.email,
      roleId: simpleUser.roleId
    });
    expect(nextStub).to.have.been.calledWith();
  });
  it("should throw error if user doesn't have perm", async () => {
    req = { signedCookies: { token: jwtService.generateToken(simpleUser) } } as AuthedRequest;
    hasPermStub.returns(false);

    const failingPromise = authMiddleware.getRestrictHandler(PERMISSIONS.CAN_FIND_ALL_USERS)(req, response, nextStub);

    expect(failingPromise).to.be.rejectedWith(httpErrorService.HttpError, MESSAGES.unauthorized);
  });
  it("should throw error if no user provided", async () => {
    req = {} as AuthedRequest;
    hasPermStub.returns(false);

    const failingPromise = authMiddleware.getRestrictHandler(PERMISSIONS.CAN_LOGIN)(req, response, nextStub);

    expect(failingPromise).to.be.rejectedWith(httpErrorService.HttpError, MESSAGES.emptyOrInvalidToken);

  });
});
