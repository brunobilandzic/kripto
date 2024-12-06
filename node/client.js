const Client = require("bitcoin-core");
const { config } = require("./config");
const { print_divider } = require("./utils");

const brunoClient = new Client(config("mainnet"));

const tx1 = process.env.TX1;
const tx2 = process.env.TX2;
const bl = process.env.BL;
const bt = "d7aa00bd647086ec3a96ffe590a74466be63419ecaebfda61ee0fd252c287211";

const getBlockchainInfo = async () => {
  try {
    const info = await brunoClient.getBlockchainInfo();
    console.log(`Chain: ${JSON.stringify(info)}`);
    print_divider();
    return info;
  } catch (err) {
    console.error("Error: ", err);
  }
};

const getRawMempool = async () => {
  try {
    const mempool = await brunoClient.getRawMempool();
    console.log(`Mempool length: ${mempool.length}`);
    console.log("first transaction in mempool: ", mempool[0]);
    print_divider();
    return mempool;
  } catch (err) {
    console.error("Error: ", err);
  }
};

const getBlockCount = async () => {
  try {
    const blockCount = await brunoClient.getBlockCount();
    console.log(`Block count: ${blockCount}`);
    print_divider();
    return blockCount;
  } catch (err) {
    console.error("Error: ", err);
  }
};

const getBestBlock = async () => {
  try {
    const bestBlock = await brunoClient.getBestBlockHash();
    console.log(`Best block hash: ${JSON.stringify(bestBlock)}`);
    print_divider();
    return bestBlock;
  } catch (err) {
    console.error("Error: ", err);
  }
};

const getBlockByHeight = async (height) => {
  try {
    const hash = await brunoClient.getBlockHash(height);
    console.log(`Block hash at height ${height}: ${hash}`);
    print_divider();
    return hash;
  } catch (err) {
    console.error("Error: ", err);
  }
};

const getBlockByHash = async (hash) => {
  try {
    const block = await brunoClient.getBlock(hash);
    console.log(`Block at hash ${hash}: ${JSON.stringify(block.tx.length)}`);
    print_divider();
    return block;
  } catch (err) {
    console.error("Error: ", err);
  }
};

const generateRandomBlockHeight = async () => {
  const blockchainSize = await getBlockCount();
  return Math.floor(Math.random() * blockchainSize);
};

const getBlockTransactions = async (height) => {
  try {
    const hash = await getBlockByHeight(height);
    const block = await getBlockByHash(hash);
    console.log(`Block transactions at height ${height}: ${block.tx.length}`);
    print_divider();
    return block.tx;
  } catch (err) {
    console.error("Error: ", err);
  }
};

const main = async () => {
  const outn = await getTransactionOutputNumber(bl, bt);
  console.log("output number: ", outn);
};

const getTransactionOutputNumber = async (bhash, thash) => {
  console.log("searching for transaction: ", thash);
  console.log("block hash: ", bhash);
  let outn = null;
  try {
    const block = await getBlockByHash(bhash);
    console.log(`there are ${block.tx.length} transactions in block ${bhash}`);
    console.log("searching for transaction: ", thash);
    const tx = await brunoClient.getRawTransaction(
      thash,
      (verbose = true),
      (blockhash = bhash)
    );

    for (let key in tx) {
      if (key == "hex") continue;
      if (key == "vout" || key == "vin") {
        if (key == "vout") {
          outn = tx[key].length;
          for (let i = 0; i < tx[key].length; i++) {
            console.log(`${key}[${i}]: ${tx[key][i].value}`);
          }
        }

        console.log(`${key}: ${tx[key].length}`);
        continue;
      }

      console.log(`${key}: ${tx[key]}`);
    }
  } catch (err) {
    console.error("Error: ", err);
  }

  return outn || 0;
};

main();

const working = async () => {
  await getBlockCount();
  await getBestBlock();
  await getBlockchainInfo();
  await getRawMempool();
  await getBlockByHeight(1);
  await getBlockTransactions(873388);
};

module.exports = {
  main,
  getBlockCount,
  getBestBlock,
  getBlockByHeight,
  getBlockByHash,
  getBlockTransactions,
  getBlockchainInfo,
  getRawMempool,
  getTransactionOutputNumber,
  working,
};

// getTransactionOutputNumber(
//   "ba5f2650a46db9c7ac6521d0f121125b7ea04603d4b7e47da2c7d836c3aea491"
// );
