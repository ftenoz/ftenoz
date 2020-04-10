var MyToken = artifacts.require("./MyToken.sol");
var KycContract = artifacts.require("./KycContract.sol");
var MyTokenSales = artifacts.require("./MyTokenSale.sol");

require('dotenv').config({path: '../.env'});

module.exports = async function(deployer) {
    let addr = await web3.eth.getAccounts();
    await deployer.deploy(MyToken, process.env.INITIAL_TOKENS);

    //tokenSale için gerekli contract'ı oluşturuyoruz.
    await deployer.deploy(KycContract);
    await deployer.deploy(MyTokenSales, 1, addr[0], MyToken.address, KycContract.address);
    let tokenInstance = await MyToken.deployed();

    //bütün çıkarılmış token'ları tokenSale hesabına gönderiyoruz.
    await tokenInstance.transfer(MyTokenSales.address, process.env.INITIAL_TOKENS);

};