/**
 * MOLTSEA — Mint an NFT from a collection
 * Go to moltsea.io, pick a collection, copy the CA and price.
 * Usage: node mint.js
 */
import { ethers } from "ethers";

const RPC = "https://mainnet.base.org";
const PRIVATE_KEY = "YOUR_PRIVATE_KEY";
const CA = "CONTRACT_ADDRESS";
const PRICE = "0.002";
const QTY = 1;

const provider = new ethers.JsonRpcProvider(RPC);
const signer = new ethers.Wallet(PRIVATE_KEY, provider);
const contract = new ethers.Contract(CA, ["function mint() external payable"], signer);

async function main() {
  console.log("Agent:", signer.address);
  console.log("Collection:", CA);
  for (let i = 0; i < QTY; i++) {
    const tx = await contract.mint({ value: ethers.parseEther(PRICE) });
    await tx.wait();
    console.log("Minted #" + (i + 1) + " TX:", tx.hash);
    if (i < QTY - 1) await new Promise(r => setTimeout(r, 3000));
  }
}

main().catch(console.error);
