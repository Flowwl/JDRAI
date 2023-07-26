import jwt from 'jsonwebtoken';
import { expect, sandbox, SinonStub } from '@/tests';
import { Request, Response } from '@/types';
import { User } from '@/components/users';
import { DAY, MINUTE } from '@/utils';
import { jwtService } from './jwt';
import { ObjectId } from "mongodb";

describe('service/jwt', () => {
  describe('jwt', () => {
    it("should be jwt", () => {
      expect(jwtService.jwt).to.be.deep.equal(jwt);
    });
  });
  describe('generateToken', () => {
    it("should generate a token", () => {
      const user = { _id: new ObjectId(), email: "test@studyo/test.fr", password: "" };

      const token = jwtService.generateToken(user as unknown as User);

      expect(token).not.to.be.undefined;

      const decodedToken = jwt.decode(token) as User & { exp: number };
      expect(decodedToken._id).to.be.equal(user._id.toString());
      expect(decodedToken.email).to.be.equal(user.email);
    });
  });
  describe('getRequestToken', () => {
    it('should get token from request', () => {
      const token = "abxce";
      const req = {
        signedCookies: {
          token: token
        }
      } as Request;

      const res = jwtService.getRequestToken(req);

      expect(res).to.be.equal(token);
    });
    it('should return null when no token in request', () => {
      const req = {
        signedCookies: {}
      } as Request;

      const res = jwtService.getRequestToken(req);

      expect(res).to.be.undefined;
    });
  });
  describe('clearToken', () => {
    let resClearStub: SinonStub;
    beforeEach(() => {
      resClearStub = sandbox.stub();
    });
    it("should do nothing when no cookies in response", () => {
      const response = {
        clearCookie: resClearStub as Response["clearCookie"]
      } as Response;

      jwtService.clearToken(response);

      expect(resClearStub).to.have.been.calledOnceWith('token');
    });
  });
});
