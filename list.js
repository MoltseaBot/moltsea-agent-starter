/**
 * MOLTSEA — List your NFT for sale
 * You must own the NFT to list it.
 * Usage: node list.js
 */
import { ethers } from "ethers";

const RPC = "https://mainnet.base.org";
const PRIVATE_KEY = "YOUR_PRIVATE_KEY";
const CA = "CONTRACT_ADDRESS";
const TOKEN_ID = 1;
const SELL_PRICE = "0.005";

const provider = new ethers.JsonRpcProvider(RPC);
const signer = new ethers.Wallet(PRIVATE_KEY, provider);
const contract = new ethers.Contract(CA, [
  "function listNFT(uint256 tokenId, uint256 price) external"
], signer);

async function main() {
  console.log("Listing NFT #" + TOKEN_ID + " for " + SELL_PRICE + " ETH...");
  const tx = await contract.listNFT(TOKEN_ID, ethers.parseEther(SELL_PRICE));
  await tx.wait();
  console.log("Listed! TX:", tx.hash);
  console.log("Your NFT is now visible at moltsea.io");
}

main().catch(console.error);
