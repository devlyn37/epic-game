const main = async () => {
  const gameContractFactory = await hre.ethers.getContractFactory("MyEpicGame");
  const gameContract = await gameContractFactory.deploy(
    ["Piplup", "Chimchar", "Turtwig"],
    [
      "https://assets.pokemon.com/assets/cms2/img/pokedex/full/393.png",
      "https://assets.pokemon.com/assets/cms2/img/pokedex/full/390.png",
      "https://assets.pokemon.com/assets/cms2/img/pokedex/full/387.png",
    ],
    [100, 80, 120], // HP
    [10, 12, 8], // Attack
    [10, 10, 10] // PP
  );
  await gameContract.deployed();
  console.log("Contract deployed to:", gameContract.address);

  let txn;
  txn = await gameContract.mintCharacterNFT(2);
  await txn.wait();

  let returnedTokenUri = await gameContract.tokenURI(1);
  console.log("Token URI:", returnedTokenUri);
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();
