// import React, { useEffect, useState } from 'react';
// import Web3 from 'web3';  // Add this line to import Web3
// import './Popups.css';

// const Popups = ({ setShowPopup, setAccount, setWeb3, connectedWallet, setConnectedWallet }) => {
//   const [walletConnected, setWalletConnected] = useState(false);

//   const connectWallet = async (walletType) => {
//     if (walletType === 'MetaMask') {
//       if (window.ethereum) {
//         try {
//           const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
//           const web3Instance = new Web3(window.ethereum);
//           setWeb3(web3Instance);
//           setAccount(accounts[0]);
//           setConnectedWallet('MetaMask'); // Set the connected wallet
//           setWalletConnected(true); // Mark wallet as connected
//           setShowPopup(false); // Close the popup
//           console.log("Connected account (MetaMask):", accounts[0]);
//         } catch (error) {
//           console.error("Connection to MetaMask failed:", error);
//         }
//       } else {
//         alert('Please install MetaMask to use this feature.');
//       }
//     } else if (walletType === 'Petra') {
//       await connectPetraWallet();
//     }
//   };

//   const connectPetraWallet = async () => {
//     if (window.aptos) {
//       try {
//         const account = await window.aptos.connect();
//         const address = account.address;
//         setAccount(address);
//         setConnectedWallet('Petra'); // Set the connected wallet
//         setWalletConnected(true); // Mark wallet as connected
//         setShowPopup(false); // Close the popup
//         console.log("Connected account (Petra):", address);
//       } catch (error) {
//         console.error("Connection to Petra Wallet failed:", error);
//         alert('Error connecting to Petra Wallet. Please try again.');
//       }
//     } else {
//       alert('Petra Wallet not detected. Please ensure it is installed and enabled.');
//       console.log("Petra Wallet not detected.");
//     }
//   };

//   useEffect(() => {
//     if (connectedWallet) {
//       setWalletConnected(true);
//     }
//   }, [connectedWallet]);

//   return (
//     <div className="popup-overlay">
//       <div className="popup-container">
//         <span className="close-popup" onClick={() => setShowPopup(false)}>✖</span>
//         <div className="popup-left">
//           <div className="wallet"></div>
//           <h3>Connect your wallet</h3>
//           <p>
//             Connecting your wallet is like "logging in" to Web3. Select your wallet to get started.
//           </p>
//           <div className="no-wallet">
//             <span>I don't have a wallet</span>
//           </div>
//         </div>
//         <div className="popup-right">
//           <div className="wallet-options">
//             <button
//               onClick={() => connectWallet('MetaMask')}
//               className={`wallet-btn ${connectedWallet === 'Petra' ? 'disabled' : ''}`}
//               disabled={connectedWallet === 'Petra'}
//               style={{ backgroundColor: connectedWallet === 'MetaMask' ? '#3b82f6' : '#333' }}
//             >
//               <span className="wallet metamask-icon"></span> MetaMask
//             </button>
//             <button
//               onClick={() => connectWallet('Petra')}
//               className={`wallet-btn ${connectedWallet === 'MetaMask' ? 'disabled' : ''}`}
//               disabled={connectedWallet === 'MetaMask'}
//               style={{ backgroundColor: connectedWallet === 'Petra' ? '#3b82f6' : '#333' }}
//             >
//               <span className="wallet petra-icon"></span> Petra Wallet
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Popups;
