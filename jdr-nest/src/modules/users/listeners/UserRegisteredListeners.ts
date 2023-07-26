import { Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { AUTH_EVENTS, UserRegisteredEvent } from "@backend/modules/auth/events";

@Injectable()
export class UserRegisteredListeners {
  @OnEvent(AUTH_EVENTS.USER_REGISTERED)
  handleOrderCreatedEvent(event: UserRegisteredEvent) {
    // handle and process "UserDeletedEvent" event
    console.log(event, "A user has been registered");
  }
}
