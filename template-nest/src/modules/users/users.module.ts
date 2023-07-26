import { Module } from "@nestjs/common";
import { UsersService } from "./services";
import { FindAllUsersController } from "./controllers";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UsersSchema } from "./schemas";
import { BcryptModule } from "@backend/externalModules";
import { UserRegisteredListeners } from "./listeners";
import { FindAllUsersLib } from "./lib";

const SERVICES = [UsersService]
const LIBS = [FindAllUsersLib]

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UsersSchema }]), BcryptModule],
  controllers: [FindAllUsersController],
  providers: [UserRegisteredListeners, ...SERVICES, ...LIBS],
  exports: [...SERVICES, ...LIBS]
})
export class UsersModule {}
