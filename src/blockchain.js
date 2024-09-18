import Web3 from 'web3';
import contractABI from './contractABI.json';

const contractAddress = '0x13db34f01e36fde777e2c6a33ab8608dd9883a09'; // Your contract address

let web3;
let videoContract;

export const connectToBlockchain = async () => {
    if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        try {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            videoContract = new web3.eth.Contract(contractABI, contractAddress);
            return { success: true, contract: videoContract };
        } catch (error) {
            console.error('User denied account access or error:', error);
            return { success: false };
        }
    } else {
        console.error('MetaMask not found. Install it at https://metamask.io/');
        return { success: false };
    }
};
