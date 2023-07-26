import { Module } from "@nestjs/common";
import { AuthModule } from "@backend/modules";
import { MockedAuthService } from "./mockedAuth.service";


@Module({
  imports: [AuthModule],
  controllers: [],
  providers: [MockedAuthService],
  exports: [MockedAuthService]
})
export class MockedAuthModule {}

