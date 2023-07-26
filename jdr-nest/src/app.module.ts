import { Module } from "@nestjs/common";
import { ConfigModule } from "./config";
import { EventEmitterModule } from '@nestjs/event-emitter';
import { AuthModule, UsersModule } from "./modules";
import { DatabaseModule } from "./database";
import { LoggingModule } from "./logging";
import { RolesModule } from "./roles";

const COLLECTIONS_MODULES = [AuthModule, UsersModule];

@Module({
  imports: [
    DatabaseModule,
    ConfigModule,
    LoggingModule,
    EventEmitterModule.forRoot(),
    ...COLLECTIONS_MODULES,
    RolesModule,
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
