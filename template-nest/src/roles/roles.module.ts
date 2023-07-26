import { APP_GUARD } from "@nestjs/core";
import { RolesGuard } from "./roles.guards";
import { Module } from "@nestjs/common";

@Module({
  providers: [
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    }
  ]
})
export class RolesModule {}
