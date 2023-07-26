import { JwtModule as JWTM } from "@nestjs/jwt";
import { buildConfig } from "../../config";

export const JwtModule = JWTM.register({
  global: true,
  secret: buildConfig().JWT_API_KEY,
  signOptions: { expiresIn: buildConfig().EXPIRATION_TOKEN }
});
