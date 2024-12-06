const decodeUnix = (timestamp) => {
  return new Date(timestamp * 1000).toLocaleString();
};

const print_divider = () => {
  console.log("=".repeat(80));
};

module.exports = {
  print_divider,
  decodeUnix
};
