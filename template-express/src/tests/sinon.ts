import sinon, { SinonStub } from 'sinon'

const sandbox = sinon.createSandbox()

afterEach(() => {
    sandbox.restore()
})
export {
    SinonStub,
    sandbox,
    sinon
}
