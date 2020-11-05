#!/usr/bin/env node

const { ApiPromise, WsProvider } = require("@polkadot/api");
const yargs = require('yargs/yargs')
const { hideBin } = yargs
const argv = yargs(hideBin(process.argv))
  .usage('Retrieve information about a block from either kusama or polkadot')
  .example('$0 -n p', 'show information about the latest block in the polkadot chain.')
  .example('$0 -n k -# 123', 'show information about block #123 in the kusama chain.')
  .example('$0 -n k -x 0x1b2fc...', 'show information about block with given hash in the kusama chain.')
  .option('network', {
    alias: 'n',
    describe: 'choose the network you want to query',
    choices: ['k', 'kusama', 'p', 'polkadot'],
    demandOption: true
  })
  .option('number', {
    alias: '#',
    describe: 'query this block number.',
    type: 'number'
  })
  .option('hash', {
    alias: 'x',
    describe: 'query this block hash.',
    type: 'string'
  })
  .help()
  .argv

async function main() {
  let network
  if (argv.network == 'k'|'kusama') {
    network = "wss://kusama-rpc.polkadot.io"
  } else {
    network = "wss://rpc.polkadot.io"
  }

  console.log(`Trying to get the block information from ${network} ...\n`);

  provider = new WsProvider(network);
  try {
    api = await ApiPromise.create({
      provider: provider,
    });
  } catch (error) {
    console.log("Connection failed!");
    return;
  }
  console.log("Connection succeeded!\n");

  let blockHeader
  if(argv.hash || argv.number) {
    const blockHash = argv.number ? await api.rpc.chain.getBlockHash(argv.number) : argv.hash;
    blockHeader = await api.derive.chain.getHeader(blockHash);
  }
  else {
    blockHeader = await api.rpc.chain.getHeader();
  }

  console.log(`Block Height:\t ${blockHeader.number}`);
  console.log(`Block Hash:\t ${blockHeader.hash}`);
  process.exit(0);
}

main().catch(console.error);