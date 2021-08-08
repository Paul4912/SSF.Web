const hre = require("hardhat");
const ethers = require("ethers");

async function main() {
  const SSFContract = await hre.ethers.getContractFactory("StupidSexyFlanders");
  const SSF = await SSFContract.deploy(ethers.utils.parseEther('1000000000000000'));
  await SSF.deployed();
  console.log("SSF deployed to:", SSF.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
