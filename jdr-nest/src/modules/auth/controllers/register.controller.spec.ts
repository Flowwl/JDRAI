import { initApp, Test } from "@backend/tests";
import { TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import * as request from "supertest";
import { UsersService } from "@backend/modules";
import { simpleUserWithPassword } from "@backend/modules/users/tests/mockedUsers";
import { AppModule } from "@backend/app.module";
import * as _ from "lodash";
import { EventEmitter2 } from "@nestjs/event-emitter";

describe("registerController", () => {
  let app: INestApplication;
  let moduleRef: TestingModule;
  let userService: UsersService;
  let mockEmit: jest.SpyInstance;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule({
      imports: [AppModule],
      providers: [],
      controllers: []
    }).compile();

    userService = moduleRef.get<UsersService>(UsersService);
    
    mockEmit = jest.spyOn(moduleRef.get(EventEmitter2), "emit")
    mockEmit.mockImplementation(jest.fn());
    
    app = await initApp(moduleRef)
  });
  
  afterEach(() => {
    mockEmit.mockClear()
  })

  it("should throw 400 if a mail is not of format email", () => {
    return request(app.getHttpServer())
      .post("/auth/register")
      .send({
        email: "toto",
        password: "titi"
      })
      .expect(400);
  });
  it("should throw 400 if a field is missing", () => {
    return request(app.getHttpServer())
      .post("/auth/register")
      .send({
        email: "toto"
      })
      .expect(400);
  });
  it("should have register the user", async () => {
    await request(app.getHttpServer())
      .post("/auth/register")
      .send({
        email: simpleUserWithPassword.email,
        password: simpleUserWithPassword.password
      })
      .expect(201);
    
    const user = await userService.findOneByEmail(simpleUserWithPassword.email, ["_id", "email", "isConfirmed", "roles", "confirmationCode"]);
    expect(_.omit(user, "_id")).toEqual({
      email: simpleUserWithPassword.email,
      roles: simpleUserWithPassword.roles,
      confirmationCode: null,
      isConfirmed: false
    });
    
    expect(mockEmit).toHaveBeenCalled()
  });
});
