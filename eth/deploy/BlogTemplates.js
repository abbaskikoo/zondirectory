const buidler = require("@nomiclabs/buidler");
const fs = require('fs');

const {deployIfDifferent, log} = deployments;

module.exports = async ({getNamedAccounts, deployments}) => {
    const namedAccounts = await getNamedAccounts();
    const {deploy} = deployments;
    const {deployer} = namedAccounts;
    log(`Deploying BlogTemplates...`);
    const deployResult = await deploy('BlogTemplates', {from: deployer, args: []});
    if (deployResult.newlyDeployed) {
        log(`contract BlogTemplates deployed at ${deployResult.address} in block ${deployResult.receipt.blockNumber} using ${deployResult.receipt.gasUsed} gas`);
    }
    const mydeploy = require('../lib/mydeploy');
    mydeploy.updateAddress('BlogTemplates', deployResult.address, buidler.network.name); // or ethers.getContractAt
    mydeploy.updateAddress('BlogPostsBlock', deployResult.receipt.blockNumber, buidler.network.name); // or ethers.getContractAt
}
module.exports.tags = ['BlogTemplates'];
module.exports.dependencies = ['Files'];
