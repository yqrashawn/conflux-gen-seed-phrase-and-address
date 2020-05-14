const HDKeyring = require("cfx-hd-keyring");

const GEN_ACCOUNTS_COUNT = process.env.GEN_ACCOUNTS_COUNT || 3;

const wallets = [];

for (let i = 0; i < GEN_ACCOUNTS_COUNT; i++) {
  const w = new HDKeyring();
  w.addAccounts();
  wallets.push(w);
}

(async function () {
  const rst = await Promise.all(
    wallets.map((w) => {
      return new Promise((resolve, reject) => {
        w.getAccounts().then((accounts) => {
          resolve({
            address: accounts[0],
            mnemonic: w.mnemonic,
          });
        });
      });
    })
  );
  console.log("mnemonic" + "," + "address");
  rst.forEach(({ address, mnemonic }) => {
    console.log(mnemonic + "," + address);
  });
})();
