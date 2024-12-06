const Client = require("bitcoin-core");
const { config } = require("./config");
const { print_divider, decodeUnix } = require("./utils");

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
    const bestBLockHash = await brunoClient.getBestBlockHash();
    const block = await getBlockByHash(bestBLockHash);
    return block;
  } catch (err) {
    console.error("Error: ", err);
  }
};
const heightBlock = async (height) => {
  const hash = await getBlockByHeight(height);
  const block = await brunoClient.getBlock(hash, 2);
  console.log(`block has ${block.tx.length} transactions`);

  let vin = block.tx[5].vin[0];

  const tx = await brunoClient.getRawTransaction(vin.txid, 2);

  console.log(JSON.stringify(tx));

  vin = tx.vin[0];

  const tx2 = await brunoClient.getRawTransaction(vin.txid, 2);

  console.log(JSON.stringify(tx2));
  // const dt = await brunoClient.getRawTransaction(block.tx[0].vin[0].txid);

  // console.log(JSON.stringify(dt))

  return block;
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
    console.log(
      `Block [${decodeUnix(block.time)}] at hash ${hash} has  ${JSON.stringify(
        block.tx.length
      )} transactions`
    );
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
    const txs = [];

    const fillPromises = block.tx.map(async (t) => {
      const tx = await brunoClient.getRawTransaction(t, (verbose = true));
      // console.log(`${tx.txid}: ${getTvalue(tx)}`);
      txs.push(tx);
    });

    await Promise.all(fillPromises);

    console.log(`promise done, there are ${txs.length} transactions`);

    const sorted = txs.sort((t1, t2) => getTvalue(t2) - getTvalue(t1));
    console.log(sorted.map((s) => getTvalue(s)));
    const ran = Math.floor(Math.random() * sorted.length);
    const biggestTx = sorted[ran];
    console.log(`looking at  tx no  ${ran}`);
    console.log(`there are ${biggestTx.vin.length} inputs`);
    console.log(`fee of the most valuable tx is ${await fee(biggestTx)}`);
    return sorted;
  } catch (err) {
    console.error("Error: ", err);
  }
};

const getBlockTxsInstant = async (height) => {
  const block = await heightBlock(height);
};

const fee = async (tx) => {
  const voutsum = tx.vout.reduce((acc, v) => acc + v.value, 0);
  let vinsum = 0;
  const vinpromises = tx.vin.map(async (vin) => {
    const vinval = await getVinVal(vin);
    vinsum += vinval;
  });
  await Promise.all(vinpromises);
  console.log(vinsum, voutsum);
  const fee = vinsum - voutsum;
  return fee;
};

const getTvalue = (tx) => {
  // get sum of vouts
  let value = 0;
  for (let vout of tx.vout) {
    value += vout.value;
  }
  return value;
};

const getVinVal = async (v) => {
  // get valu of one vin
  const t = await brunoClient.getRawTransaction(v.txid, true);
  return t.vout[v.vout].value;
};

const main = async () => {
  // const outn = await getTransactionOutputNumber(bl, bt);
  // console.log("output number: ", outn);
  // await getBlockTransactions(123123);
  // await getBestBlock();
  await heightBlock(100900);
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

  console.log(`There are ${outn} outputs in transaction ${thash}`);

  return outn || 0;
};

main();

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
};

// getTransactionOutputNumber(
//   "ba5f2650a46db9c7ac6521d0f121125b7ea04603d4b7e47da2c7d836c3aea491"
// );
