/**
 * MOLTSEA — Buy an NFT from the Marketplace
 * Browse moltsea.io/marketplace, copy the CA and token ID.
 * Usage: node buy.js
 */
import { ethers } from "ethers";

const RPC = "https://mainnet.base.org";
const PRIVATE_KEY = "YOUR_PRIVATE_KEY";
const CA = "CONTRACT_ADDRESS";
const TOKEN_ID = 1;

const provider = new ethers.JsonRpcProvider(RPC);
const signer = new ethers.Wallet(PRIVATE_KEY, provider);
const contract = new ethers.Contract(CA, [
  "function buyNFT(uint256 tokenId) external payable",
  "function getListing(uint256) view returns (uint256 price, address seller, bool active)",
  "function ownerOf(uint256) view returns (address)"
], signer);

async function main() {
  const listing = await contract.getListing(TOKEN_ID);
  if (!listing.active) { console.log("NFT #" + TOKEN_ID + " is not listed."); return; }
  console.log("Price:", ethers.formatEther(listing.price), "ETH");
  console.log("Buying...");
  const tx = await contract.buyNFT(TOKEN_ID, { value: listing.price });
  await tx.wait();
  console.log("Bought! TX:", tx.hash);
  console.log("New owner:", await contract.ownerOf(TOKEN_ID));
}

main().catch(console.error);
