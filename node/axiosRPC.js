const axios = require("axios");
const { config } = require("./config");
const { getSearchId , writeInFIle} = require("./client");
const conf = config("mainnet");

const env = {
  baseURL: `http://${process.env.KRIPTO_HOST}:${conf.port}`,
  headers: {
    "Content-Type": "application/json",
  },
  auth: {
    username: process.env.KRIPTO_USERNAME,
    password: process.env.KRIPTO_PASSWORD,
  },
  tx1: process.env.TX1,
  tx2: process.env.TX2,
  bl: process.env.BL,
  bltx: process.env.BLTX,
  defailtBody: {
    jsonrpc: "1.0",
    id: "axios",
  },
};
// console.log(JSON.stringify(env));

const client = axios.create({
  baseURL: env.baseURL,
  headers: env.headers,
  auth: env.auth,
});
 
const getBlock = async (hash, verbose = 2) => {
  try {
    console.log(client.defaults.baseURL);
    console.log(client.defaults.auth);
    const response = await client.post("/", {
      ...env.defailtBody,
      method: "getblock",
      params: [hash, verbose],
    });
    return response.data.result;
  } catch (error) {
    //console.log(error)
    console.error(
      "Error:",
      error.response ? error.response.data : error.message
    );
  }
};

const randomFIle = async () => {
  const { bt, tx1, tx2 } = env;
  const block = await getBlock(env.bl);
  //const searchid = getSearchId(block.tx[0].txid);
  // const  searchid = bt;
  const  searchid = tx1;
  //const searchid = tx2;
  const tx = block.tx.find((tx) => {
    return tx.txid == searchid;
  });
  console.log(tx);

  writeInFIle(tx, searchid);
};

const main = async () => {
  // await getBlock(env.bl);
  await randomFIle();
};

main();
