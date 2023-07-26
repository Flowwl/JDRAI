import chaiLib from "chai"
import chaiAsPromised from "chai-as-promised"
import sinonChai from "sinon-chai"

chaiLib.use(chaiAsPromised)
chaiLib.use(sinonChai)

const expect = chaiLib.expect;

export {
    expect
}
