// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function getBalances(address)
{
  const balanceBigInt = await hre.ethers.provider.getBalance(address);
  return hre.ethers.utils.formatEther(balanceBigInt);
};

async function consoleBalances(addresses)
{
  let counter = 0;
  for(const address of addresses){
    console.log(`Address ${counter++} balance` , await getBalances(address));
  }
};

async function consoleMemos(memos){
  for(const memo of memos){
    const timestamp = memo.timestamp;
    const name = memo.name;
    const from = memo.from;
    const message = memo.message;

    console.log(`At ${timestamp} , name ${name} , from ${from} , message ${message}`);

  }
}

async function main() {

  const [owner , from1 , from2 , from3] = await hre.ethers.getSigners();
  const Udhari = await hre.ethers.getContractFactory("Udhari");
  const contract = await Udhari.deploy(); /// instance of our contract...
  await contract.deployed();

  console.log("address of Contract" , contract.address);

  const addresses = [owner.address , from1.address , from2.address];
  console.log("Before Taking Udhari ");
  await consoleBalances(addresses);

  const amount = {value : hre.ethers.utils.parseEther("1")};
  await contract.connect(from1).sendUdhari("from1" , "Very Good!" , amount);
  await contract.connect(from2).sendUdhari("from2" , "Le Chutye!" , amount);
  await contract.connect(from3).sendUdhari("from3" , "Le Chutye!" , amount);

  console.log("After Geting Udhari");
  await consoleBalances(addresses);

  const memos = await contract.getMemos();
  await consoleMemos(memos);



}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
 