const { assert } = require("console");

const CryptoCoders = artifacts.require("./CryptoCoders.sol");

contract("CryptoCoders", accounts => {
  let contract;
  before(async () => {
    contract = await CryptoCoders.deployed();
  })

  it("...should be deployed", async () => {
    assert.notEqual(contract, "");
  });

  it("...it should mint and be added to array", async () => {
    const result = await contract.mint("alex");
    let name = await contract.names(0);
    assert(name, "alex");
  });


});
