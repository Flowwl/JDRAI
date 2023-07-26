import { expect, request } from './tests'
import { app } from './app'
import { projectConfig } from "@/config";

describe("app", () => {
    describe('GET /', () => {
        it("should return expected message", async () => {
            const res = await request(app)
                .get('/')
                .expect(200)
            expect(res.body).to.deep.equal({
                message: `Welcome to ${projectConfig.APP_NAME}'s api !`
            })
        })
    })
})
