async function main() {
  const CarChainFactory = await ethers.getContractFactory("CarChain");
  const carChain = await CarChainFactory.deploy();
  console.log("Contract Deployed to Address:", carChain.address);
}
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
