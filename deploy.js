const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode } = require('./compile');
const { mnemonicKeys, networkURL } = require('./config/config');

const INITIAL_STRING = 'There is a new message';

const provider = new HDWalletProvider(mnemonicKeys, networkURL);
const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();
  console.log('Attempting to deploy from account', accounts[0]);

  const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({
      data: bytecode,
      arguments: [INITIAL_STRING],
    })
    .send({ from: accounts[0], gas: '1000000' });
  console.log('Contract deployed to: ', result.options.address);
};
deploy();
