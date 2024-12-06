require("dotenv").config();

const {
  getBlockCount,
  getBestBlock,
  getBlockByHeight,
  getBlockByHash,
  getBlockTransactions,
  getBlockchainInfo,
  getRawMempool,
  getTransactionOutputNumber,
} = require("./client");



//

const main = async () => {
  try {
    // await getBlockTransactions(123123)
  } catch (err) {
    console.log("catched error: ");
    console.error("Error: ", err);
  }
};
   
main();
