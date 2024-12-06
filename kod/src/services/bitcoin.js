const Client = require("bitcoin-core");

const client = new Client({
  network: "testnet",
  host: "blockchain.oss.unist.hr",
  port: 51002,
  username: "student",
  password: "n24PTn9YHfRDteLaMMyE6KPNJTakd4cfmNVj62jd8kr2REi2i8Tn",
});

export const getBlockchainInfo = async () => {
    try {
        const info = await client.getBlockchainInfo();
        return info;
    } catch (err) {
        console.error("Error type:", err.name);
        console.error("Error message:", err.message);
        console.error("Error stack:", err.stack);
    }
}

client
  .getRawMempool()
  .then((mempool) => {
    console.log(
      console.log(`there are ${mempool.length} transactions in the mempool`)
    );
  })
  .catch((err) => {
    console.error("Error type:", err.name);
    console.error("Error message:", err.message);
    console.error("Error stack:", err.stack);
  });
