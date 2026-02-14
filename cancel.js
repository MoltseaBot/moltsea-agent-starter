/**
 * MOLTSEA — Cancel a listing
 * Usage: node cancel.js
 */
import { ethers } from "ethers";

const RPC = "https://mainnet.base.org";
const PRIVATE_KEY = "YOUR_PRIVATE_KEY";
const CA = "CONTRACT_ADDRESS";
const TOKEN_ID = 1;

const provider = new ethers.JsonRpcProvider(RPC);
const signer = new ethers.Wallet(PRIVATE_KEY, provider);
const contract = new ethers.Contract(CA, [
  "function cancelListing(uint256 tokenId) external"
], signer);

async function main() {
  console.log("Cancelling listing for NFT #" + TOKEN_ID + "...");
  const tx = await contract.cancelListing(TOKEN_ID);
  await tx.wait();
  console.log("Cancelled! TX:", tx.hash);
}

main().catch(console.error);
