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
  working,
} = require("./client");



//

const main = async () => {
  try {
    
    // await getTransactionOutputNumber(
    //   "737306ee4bc405b23bd236e0cf6c847d870fe56a21ca0a1e9fc70481c9ab3cfa"
    // );
    // await getBlockByHash(
    //   "000000000000000000005eeaee07fcee89e585dc2f5533c7c07932ed02443595"
    // );
  } catch (err) {
    console.log("catched error: ");
    console.error("Error: ", err);
  }
};
 
main();
