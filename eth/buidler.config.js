usePlugin("@nomiclabs/buidler-waffle");

// This is a sample Buidler task. To learn how to create your own go to
// https://buidler.dev/guides/create-task.html
task("accounts", "Prints the list of accounts", async () => {
  const accounts = await ethers.getSigners();

  for (const account of accounts) {
    console.log(await account.getAddress());
  }
});

task("compile", "Compiles the entire project, building all artifacts", async function(taskArguments, bre, runSuper) {
  await runSuper();
  console.log("Extracting ABIs...");
  const fs = require('fs');
  fs.mkdir('../ui/artifacts', ()=>{});
  const abi = JSON.parse(fs.readFileSync('artifacts/Categories.json')).abi;
  fs.writeFileSync('../ui/artifacts/Categories.abi', JSON.stringify(abi));
});


// You have to export an object to set up your config
// This object can have the following optional entries:
// defaultNetwork, networks, solc, and paths.
// Go to https://buidler.dev/config/ to learn more
module.exports = {
  // This is a sample solc configuration that specifies which version of solc to use
  solc: {
    version: "0.6.8",
  },
};
