import { Module } from "@nestjs/common";
import { ConfigModule } from "./config";
import { EventEmitterModule } from "@nestjs/event-emitter";
import { AuthModule, CharactersModule, StoriesModule, UsersModule, RoomsModule } from "./modules";
import { DatabaseModule } from "./database";
import { LoggingModule } from "./logging";
import { RolesModule } from "./roles";

const COLLECTIONS_MODULES = [AuthModule, UsersModule, StoriesModule, CharactersModule, RoomsModule];

@Module({
  imports: [
    DatabaseModule,
    ConfigModule,
    LoggingModule,
    RolesModule,
    EventEmitterModule.forRoot(),
    ...COLLECTIONS_MODULES
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
