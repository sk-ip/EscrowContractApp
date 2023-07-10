import { ethers } from "ethers";
import Escrow from '../artifacts/contracts/Escrow.sol/Escrow';

const provider = new ethers.providers.Web3Provider(window.ethereum);

export default async function getContract(address) {
    const contract = new ethers.Contract(address, Escrow.abi, provider);
    return contract;
}