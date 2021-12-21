import {expect, use} from "chai"
import {Contract} from "ethers"
import {deployContract, MockProvider, solidity} from "ethereum-waffle"
import Counter from "../build/Counter.json"

use(solidity)

describe("Counter", () => {
    const [wallet, walletTo] = new MockProvider().getWallets();
    let counter: Contract;
    beforeEach(async () => {
        counter = await deployContract(wallet, Counter);
    })

    describe(".count", async () => {
        it("is initialized with 0", async () => {
            expect(await counter.count()).to.equal(0);
        })
    })

    describe(".inc()", () => {
        it('increases the count by 1', async () => {
            await counter.inc();
            expect(await counter.count()).to.equal(1);
        })

        it('emits a Change event', async () => {
            expect(counter.inc())
                .to
                .emit(counter, "Changed")
                .withArgs(1, wallet.address);
        })
    })
})
