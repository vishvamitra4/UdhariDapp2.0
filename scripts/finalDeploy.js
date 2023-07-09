const hre = require("hardhat");

async function main() {
    const Udhari = await hre.ethers.getContractFactory("Udhari");
    const contract = await Udhari.deploy();
    await contract.deployed();

    console.log("Address of Contract", contract.address);
};

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
