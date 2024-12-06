

const config = (type) => {
  console.log(
    process.env.KRIPTO_HOST,
    process.env.KRIPTO_USERNAME,
    process.env.KRIPTO_PASSWORD
  );
  const mutualProps = {
    host: process.env.KRIPTO_HOST,
    username: process.env.KRIPTO_USERNAME,
    password: process.env.KRIPTO_PASSWORD,
  };
  if (type === "mainnet") {
    return { ...mutualProps, network: "mainnet", port: 50004 };
  } else if (type === "testnet") {
    return { ...mutualProps, network: "testnet", port: 51002 };
  } else if (type === "litecoin") {
    return { ...mutualProps, network: "litecoin", port: 53012 };
  }
};

// const mutualProps = {
//   host: "blockchain.oss.unist.hr",
//   username: "student",
//   password: "n24PTn9YHfRDteLaMMyE6KPNJTakd4cfmNVj62jd8kr2REi2i8Tn",
// };

// const testnetConfig = {
//   ...mutualProps,
//   network: "testnet",
//   port: 50004,
// };

// const mainnetConfig = {
//   ...mutualProps,
//   network: "mainnet",
//   port: 53012,
// };

module.exports = {
  config,
};
