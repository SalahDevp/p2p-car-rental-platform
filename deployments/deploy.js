async function main() {
  const CarRentalFactory = await ethers.getContractFactory("CarRental");
  const carChain = await CarRentalFactory.deploy();
  console.log("Contract Deployed to Address:", carChain.address);
}
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
