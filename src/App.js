// import React, { useState, useEffect } from 'react';
// import { Button, Container, TextField, Typography, Paper, Box, Grid, LinearProgress } from '@mui/material';
// import { motion } from 'framer-motion';
// import { jsPDF } from 'jspdf';
// import Web3 from 'web3';
// import contractABI from './contractABI.json';
// import { db } from './firebase.js';
// import { collection, addDoc } from 'firebase/firestore';



// function App() {
//     const [web3, setWeb3] = useState(null);
//     const [account, setAccount] = useState(null);
//     const [videoFile, setVideoFile] = useState(null);
//     const [videoHash, setVideoHash] = useState('');
//     const [caption, setCaption] = useState('');
//     const [tag, setTag] = useState('');
//     const [uploader, setUploader] = useState('');
//     const [overview, setOverview] = useState('');
//     const [isAnalyzing, setIsAnalyzing] = useState(false);
//     const [isAnalysisComplete, setIsAnalysisComplete] = useState(false);
//     const [analysisResult, setAnalysisResult] = useState('');
//     const [thumbnail, setThumbnail] = useState('');
//     const [status, setStatus] = useState('');


//     const connectWallet = async () => {
//         if (window.ethereum) {
//             try {
//                 const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
//                 const web3Instance = new Web3(window.ethereum);
//                 setWeb3(web3Instance);
//                 setAccount(accounts[0]);
//             } catch (error) {
//                 console.error("Connection to MetaMask failed:", error);
//             }
//         } else {
//             alert('Please install MetaMask to use this feature.');
//         }
//     };

//     // Effect hook to connect to wallet on load
//     useEffect(() => {
//         connectWallet();
//     }, []);

//     // Calculate SHA-256 hash of video
//     const hashVideo = async (file) => {
//         const arrayBuffer = await file.arrayBuffer();
//         const hashBuffer = await crypto.subtle.digest('SHA-256', arrayBuffer);
//         const hashArray = Array.from(new Uint8Array(hashBuffer));
//         const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
//         setVideoHash(hashHex);
//         return hashHex;
//     };

//     const handleVideoUpload = (e) => {
//         const file = e.target.files[0];
//         if (file) {
//             setVideoFile(file);
//             hashVideo(file);
//             setThumbnail(URL.createObjectURL(file));
//         }
//     };

//     const handleAnalyzeVideo = () => {
//         setIsAnalyzing(true);
//         setTimeout(() => {
//             const approved = Math.random() > 0.5;
//             setAnalysisResult(approved ? 'approved' : 'rejected');
//             setIsAnalyzing(false);
//             setIsAnalysisComplete(true);
//         }, 2000);
//     };

//     // const uploadToBlockchain = async () => {
//     //     if (web3 && account) {
//     //         try {
//     //             const contractAddress = '0x16726d44f6b1ed8145c407e2950e15e0a03b9ade'; 
//     //             const contract = new web3.eth.Contract(contractABI, contractAddress);
                
//     //             // Assuming the smart contract has a method 'uploadVideo'
//     //             const receipt = await contract.methods.uploadVideo(videoHash, caption, tag)
//     //                 .send({ from: account });

//     //             setStatus(`Transaction successful! Tx Hash: ${receipt.transactionHash}`);
//     //         } catch (error) {
//     //             console.error("Error uploading to blockchain:", error);
//     //             setStatus("Error uploading video to the blockchain.");
//     //         }
//     //     } else {
//     //         alert('Connect to MetaMask to interact with the blockchain.');
//     //     }
//     // };

//     const uploadToBlockchain = async () => {
//         if (web3 && account) {
//             try {
//                 const contractAddress = '0x16726d44f6b1ed8145c407e2950e15e0a03b9ade'; 
//                 const contract = new web3.eth.Contract(contractABI, contractAddress);
    
//                 const receipt = await contract.methods.uploadVideo(videoHash, caption, tag)
//                     .send({ from: account });
    
//                 setStatus(`Transaction successful! Tx Hash: ${receipt.transactionHash}`);
                
//                 // Firestore: Store the data in Firestore only if the transaction is successful
//                 await addDoc(collection(db, 'videos'), {
//                     videoHash: videoHash,
//                     caption: caption,
//                     tag: tag,
//                     uploader: uploader,
//                     overview: overview,
//                     transactionHash: receipt.transactionHash, // Store the transaction hash as well
//                     timestamp: new Date() // Store a timestamp
//                 });
    
//                 console.log("Video details stored in Firestore.");
//             } catch (error) {
//                 console.error("Error uploading to blockchain or storing in Firestore:", error.message);
//                 setStatus("Error uploading video to the blockchain.");
//             }
//         } else {
//             alert('Connect to MetaMask to interact with the blockchain.');
//         }
//     };

//     const generatePDF = () => {
//         const doc = new jsPDF();
//         doc.setFontSize(22);
//         doc.text('Video Upload Agreement', 20, 20);
//         doc.setFontSize(12);
//         doc.text(`Video Hash: ${videoHash}`, 20, 40);
//         doc.text(`Caption: ${caption}`, 20, 50);
//         doc.text(`Tag: ${tag}`, 20, 60);
//         doc.text(`Uploader: ${uploader}`, 20, 70);
//         doc.text(`Transaction Status: ${status}`, 20, 80);
//         doc.setFontSize(10);
//         doc.text(`Generated on: ${new Date().toLocaleString()}`, 20, 100);
//         doc.save('VideoUploadAgreement.pdf');
//     };

//     return (
//         <Container component="main" maxWidth="lg" sx={{ mt: 6 }}>
//             <Grid container spacing={4}>
//                 <Grid item xs={12} md={4}>
//                     <Paper elevation={3} sx={{ padding: 3, backgroundColor: '#2C2C2C', color: 'white' }}>
//                         <Typography variant="h4" gutterBottom>
//                             Video Blockchain Tracker
//                         </Typography>
//                         <Button
//                             variant="contained"
//                             component="label"
//                             fullWidth
//                             sx={{ mb: 2, backgroundColor: '#00cc88', color: 'white' }}
//                         >
//                             Upload/Drag Video
//                             <input type="file" hidden onChange={handleVideoUpload} />
//                         </Button>

//                         {videoHash && (
//                       <Box sx={{ 
//                         p: 2, 
//                         border: '1px solid #777', 
//                         borderRadius: '4px', 
//                         backgroundColor: '#333', 
//                         color: 'white', 
//                         mb: 2, 
//                         wordBreak: 'break-all' 
//                         }}>
//                       <Typography variant="body1" gutterBottom>
//                       <strong>Video Hash:</strong> {videoHash}
//                       </Typography>
//                      </Box>
//                       )}


//                         <TextField
//                             fullWidth
//                             label="Enter Caption"
//                             variant="outlined"
//                             margin="normal"
//                             value={caption}
//                             onChange={(e) => setCaption(e.target.value)}
//                             sx={{ backgroundColor: '#444', mb: 2 }}
//                             InputLabelProps={{ style: { color: '#AAA' } }}
//                             InputProps={{ style: { color: 'white' } }}
//                         />
//                         <TextField
//                             fullWidth
//                             label="Enter Main Tag"
//                             variant="outlined"
//                             margin="normal"
//                             value={tag}
//                             onChange={(e) => setTag(e.target.value)}
//                             sx={{ backgroundColor: '#444', mb: 2 }}
//                             InputLabelProps={{ style: { color: '#AAA' } }}
//                             InputProps={{ style: { color: 'white' } }}
//                         />
//                         <TextField
//                             fullWidth
//                             label="Enter Uploader Name"
//                             variant="outlined"
//                             margin="normal"
//                             value={uploader}
//                             onChange={(e) => setUploader(e.target.value)}
//                             sx={{ backgroundColor: '#444', mb: 2 }}
//                             InputLabelProps={{ style: { color: '#AAA' } }}
//                             InputProps={{ style: { color: 'white' } }}
//                         />
//                         <TextField
//                             fullWidth
//                             label="Enter Overview of Video"
//                             variant="outlined"
//                             margin="normal"
//                             value={overview}
//                             onChange={(e) => setOverview(e.target.value)}
//                             sx={{ backgroundColor: '#444', mb: 2 }}
//                             InputLabelProps={{ style: { color: '#AAA' } }}
//                             InputProps={{ style: { color: 'white' } }}
//                         />

//                         <Button
//                             fullWidth
//                             variant="contained"
//                             color="primary"
//                             onClick={handleAnalyzeVideo}
//                             disabled={!videoFile || !caption || !tag || !uploader || !overview || isAnalyzing}
//                             sx={{ backgroundColor: '#00cc88', color: 'white' }}
//                         >
//                             Analyze Video
//                         </Button>
//                     </Paper>
//                 </Grid>

//                 <Grid item xs={12} md={8}>
//                     <Paper elevation={3} sx={{ padding: 3, backgroundColor: '#2C2C2C', color: 'white' }}>
//                         {videoFile && (
//                             <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 250, mb: 3 }}>
//                                 <video width="100%" height="100%" controls>
//                                     <source src={thumbnail} type="video/mp4" />
//                                     Your browser does not support the video tag.
//                                 </video>
//                             </Box>
//                         )}

//                         {isAnalyzing ? (
//                             <>
//                                 <Typography variant="h6" align="center">
//                                     Analysis in Progress...
//                                 </Typography>
//                                 <LinearProgress color="secondary" />
//                             </>
//                         ) : isAnalysisComplete ? (
//                             <>
//                                 <Typography variant="h5" align="center" gutterBottom>
//                                     AI Analysis Complete
//                                 </Typography>
//                                 <Typography variant="body1" align="center">
//                                     This video is <strong>{analysisResult}</strong>.
//                                 </Typography>
                                // <Typography align="center" color={analysisResult === 'approved' ? 'green' : 'red'} variant="h6" sx={{ mt: 2 }}>
                                //     <strong>{analysisResult === 'approved' ? '✔ Video Approved!' : '✖ Video Rejected'}</strong>
                                // </Typography>

                                // {analysisResult === 'approved' && (
                                //     <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
                                //         <Button
                                //             variant="contained"
                                //             onClick={uploadToBlockchain}
                                //             sx={{ backgroundColor: '#00cc88', color: 'white', mr: 2 }}
                                //         >
                                //             Upload to Blockchain
                                //         </Button>
                                //         <Button
                                //             variant="contained"
                                //             color="secondary"
                                //             onClick={generatePDF}
                                //         >
                                //             Download Agreement
                                //         </Button>
                                //     </Box>
                                // )}
//                             </>
//                         ) : null}

//                         {status && (
//                             <Box sx={{ mt: 3, p: 2, backgroundColor: '#444', borderRadius: '4px', textAlign: 'center' }}>
//                                 <Typography variant="body1">{status}</Typography>
//                             </Box>
//                         )}
//                     </Paper>
//                 </Grid>
//             </Grid>
//         </Container>
//     );
// }

// export default App;

import React, { useState} from 'react';
import { Button, Container, TextField, Typography, Paper, Box, Grid, LinearProgress,Select,MenuItem,InputLabel,FormControl } from '@mui/material';
import { jsPDF } from 'jspdf';
import Web3 from 'web3';
import contractABI from './contractABI.json';
import { db } from './firebase.js';
import { collection, addDoc } from 'firebase/firestore';
import logoImage from "./logo.png";
import successImage from "./success.png";
import failedImage from "./failed.png"; 
import Navbar from './Navbar';
import IconButton from '@mui/material/IconButton';


//------Firebase Storage

import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'; // Import necessary Firebase storage methods
import { storage } from './firebase.js'; // Import storage from firebase.js

function App() {
    const [web3, setWeb3] = useState(null);
    const [account, setAccount] = useState(null);
    const [videoFile, setVideoFile] = useState(null);
    const [videoHash, setVideoHash] = useState('');
    const [caption, setCaption] = useState('');
    const [tag, setTag] = useState('');
    const [uploader, setUploader] = useState('');
    const [overview, setOverview] = useState('');
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [isAnalysisComplete, setIsAnalysisComplete] = useState(false);
    const [analysisResult, setAnalysisResult] = useState('');
    const [thumbnail, setThumbnail] = useState('');
    const [status, setStatus] = useState('');
    const [category, setCategory] = useState("");

    const connectWallet = async () => {
        if (window.ethereum) {
            try {
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                const web3Instance = new Web3(window.ethereum);
                setWeb3(web3Instance);
                setAccount(accounts[0]);
                console.log("Connected account:", accounts[0]);
            } catch (error) {
                console.error("Connection to MetaMask failed:", error);
            }
        } else {
            alert('Please install MetaMask to use this feature.');
        }
    };

    const hashVideo = async (file) => {
        const arrayBuffer = await file.arrayBuffer();
        const hashBuffer = await crypto.subtle.digest('SHA-256', arrayBuffer);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        setVideoHash(hashHex);
        return hashHex;
    };

    const handleVideoUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setVideoFile(file);
            hashVideo(file);
            setThumbnail(URL.createObjectURL(file));
        }
    };

    const handleAnalyzeVideo = () => {
        setIsAnalyzing(true);
        setTimeout(() => {
            const approved = Math.random() > 0.5;
            setAnalysisResult(approved ? 'approved' : 'rejected');
            setIsAnalyzing(false);
            setIsAnalysisComplete(true);
        }, 2000);
    };

    // const uploadToBlockchain = async () => {
    //     if (web3 && account) {
    //         try {
    //             const contractAddress = '0x16726d44f6b1ed8145c407e2950e15e0a03b9ade';
    //             const contract = new web3.eth.Contract(contractABI, contractAddress);

    //             const receipt = await contract.methods.uploadVideo(videoHash, caption, tag)
    //                 .send({ from: account });

    //             setStatus(`Transaction successful! Tx Hash: ${receipt.transactionHash}`);

    //             await addDoc(collection(db, 'videos'), {
    //                 videoHash: videoHash,
    //                 caption: caption,
    //                 tag: tag,
    //                 uploader: uploader,
    //                 overview: overview,
    //                 category,
    //                 transactionHash: receipt.transactionHash,
    //                 timestamp: new Date()
    //             });

    //             console.log("Video details stored in Firestore.");
    //         } catch (error) {
    //             console.error("Error uploading to blockchain or storing in Firestore:", error.message);
    //             setStatus("Error uploading video to the blockchain.");
    //         }
    //     } else {
    //         alert('Connect to MetaMask to interact with the blockchain.');
    //     }
    // };

//----Updated uploadToBlockchain function to upload video to Firebase Storage
const uploadToBlockchain = async () => {
    if (web3 && account) {
        try {
            const contractAddress = '0x16726d44f6b1ed8145c407e2950e15e0a03b9ade';
            const contract = new web3.eth.Contract(contractABI, contractAddress);

            const receipt = await contract.methods.uploadVideo(videoHash, caption, tag)
                .send({ from: account });

            setStatus(`Transaction successful! Tx Hash: ${receipt.transactionHash}`);

            // Upload to Firebase Storage
            if (videoFile) {
                const storageRef = ref(storage, `videos/${videoFile.name}`);
                const uploadTask = uploadBytesResumable(storageRef, videoFile);

                uploadTask.on(
                    "state_changed",
                    (snapshot) => {
                    
                    },
                    (error) => {
                        console.error("Error uploading video to Firebase Storage:", error.message);
                        setStatus("Error uploading video to Firebase Storage.");
                    },
                    async () => {
                        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

                        // Store metadata in Firestore
                        await addDoc(collection(db, 'videos'), {
                            videoHash: videoHash,
                            caption: caption,
                            tag: tag,
                            uploader: uploader,
                            overview: overview,
                            // category: category,
                            videoURL: downloadURL, // Add video URL from Firebase Storage
                            transactionHash: receipt.transactionHash,
                            timestamp: new Date()
                        });

                        console.log("Video details stored in Firestore.");
                    }
                );
            }
        } catch (error) {
            console.error("Error uploading to blockchain or storing in Firestore:", error.message);
            setStatus("Error uploading video to the blockchain.");
        }
    } else {
        alert('Connect to MetaMask to interact with the blockchain.');
    }
};

const generatePDF = () => {
const doc = new jsPDF();

  
  doc.setFont("helvetica", "normal");
  doc.setFontSize(12);
  const logoWidth = 50;
  const logoHeight = 15;
  doc.addImage(logoImage, "PNG", 10, 10, logoWidth, logoHeight);

  const dateTime = new Date().toLocaleString();
  doc.setFontSize(10);
  doc.text(`Generated on: ${dateTime}`, 180, 15, { align: "right" });

  
  doc.setFontSize(18);
  doc.setTextColor(0, 51, 102);
  doc.text("Video Upload Agreement", 105, 40, { align: "center" });


  doc.setLineWidth(0.5);
  doc.setDrawColor(0, 0, 0);
  doc.line(20, 45, 190, 45);
  doc.setLineDash([2, 2], 0);


  const boxX = 20;
  const boxWidth = 170; 
  const boxHeight = 20; 
  const detailsStartY = 60;
  const lineHeight = 8;

  
  const details = [
    { label: "Video Hash:", value: videoHash || "N/A" },
    { label: "Caption:", value: caption || "N/A" },
    { label: "Tag:", value: tag || "N/A" },
    { label: "Uploader:", value: uploader || "N/A" },
    { label: "Category News:", value: category || "N/A" },
    { label: "Transaction Status:", value: status || "N/A" },
  ];

 
  details.forEach((detail, index) => {
    const boxY = detailsStartY + index * (boxHeight + lineHeight);

 
    doc.setDrawColor(0, 0, 0);
    doc.rect(boxX, boxY, boxWidth, boxHeight);

    
    doc.line(boxX + 50, boxY, boxX + 50, boxY + boxHeight);

    doc.setFontSize(12);
    doc.setFont("helvetica", "bold"); 
    doc.text(detail.label, boxX + 5, boxY + 12);

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal"); 
    const valueText = doc.splitTextToSize(detail.value, boxWidth - 55);
    doc.text(valueText, boxX + 55, boxY + 10);
  });

  const iconWidth = 28;
  const iconHeight = 28;
  const iconX = 150;
  const iconY = detailsStartY + details.length * (boxHeight + lineHeight);

  if (status && status.trim()) {
    doc.addImage(successImage, "PNG", iconX, iconY, iconWidth, iconHeight);
    doc.text("Video Verified & Uploaded Successfully", 105, iconY + 30, { align: "center" });
  } else {
    doc.addImage(failedImage, "PNG", iconX, iconY, iconWidth, iconHeight);
    doc.text("Transaction Failed", 105, iconY + 30, { align: "center" });
  }
  doc.setFontSize(10);
  doc.setTextColor(150);
  doc.text("© 2023 FNA.ai . All rights reserved.", 105, 280, { align: "center" });
  doc.save("VideoUploadAgreement.pdf");
};




    return (
<Container 
  component="main" 
  maxWidth="md" 
  sx={{ mt: 18, mb: 10 }} // Adjust this value to create space between the navbar and content
>
  <Grid container spacing={2} justifyContent="center">
    <Grid item xs={12} md={5}>
      <Paper
        elevation={3}
        sx={{
          padding: 1.5,
          backgroundColor: '#2C2C2C',
          color: 'white',
          borderRadius: '12px',
        }}
      >
        <Typography variant="h6" gutterBottom>
          Newschain Tracker
        </Typography>
        <Button
          variant="contained"
          component="label"
          fullWidth
          sx={{
            mb: 1.5,
            backgroundColor: '#00cc88',
            color: 'white',
            borderRadius: '8px',
          }}
        >
          Upload/Drag Video
          <input type="file" hidden onChange={handleVideoUpload} />
        </Button>

                        {videoHash && (
                            <Box sx={{ 
                                p: 1.5, 
                                border: '1px solid #777', 
                                borderRadius: '8px', 
                                backgroundColor: '#333', 
                                color: 'white', 
                                mb: 1.5, 
                                wordBreak: 'break-all' 
                            }}>
                                <Typography variant="body2" gutterBottom>
                                    <strong>Video Hash:</strong> {videoHash}
                                </Typography>
                            </Box>
                        )}

                        <TextField
                            fullWidth
                            label="Enter Caption"
                            variant="outlined"
                            margin="normal"
                            value={caption}
                            onChange={(e) => setCaption(e.target.value)}
                            sx={{ backgroundColor: '#444', mb: 1.5, borderRadius: '8px' }}
                            InputLabelProps={{ style: { color: '#AAA' } }}
                            InputProps={{ style: { color: 'white' } }}
                        />
                        <TextField
                            fullWidth
                            label="Enter Main Tag"
                            variant="outlined"
                            margin="normal"
                            value={tag}
                            onChange={(e) => setTag(e.target.value)}
                            sx={{ backgroundColor: '#444', mb: 1.5, borderRadius: '8px' }}
                            InputLabelProps={{ style: { color: '#AAA' } }}
                            InputProps={{ style: { color: 'white' } }}
                        />
                        <TextField
                            fullWidth
                            label="Enter Uploader Name"
                            variant="outlined"
                            margin="normal"
                            value={uploader}
                            onChange={(e) => setUploader(e.target.value)}
                            sx={{ backgroundColor: '#444', mb: 1.5, borderRadius: '8px' }}
                            InputLabelProps={{ style: { color: '#AAA' } }}
                            InputProps={{ style: { color: 'white' } }}
                        />
                        <TextField
                            fullWidth
                            label="Enter Overview of Video"
                            variant="outlined"
                            margin="normal"
                            value={overview}
                            onChange={(e) => setOverview(e.target.value)}
                            sx={{ backgroundColor: '#444', mb: 1.5, borderRadius: '8px' }}
                            InputLabelProps={{ style: { color: '#AAA' } }}
                            InputProps={{ style: { color: 'white' } }}
                        />


<FormControl
  fullWidth
  variant="outlined"
  margin="normal"
  sx={{
    maxWidth: '400px',
    backgroundColor: 'transparent',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
  }}
>
  <InputLabel
    id="category-label"
    sx={{ color: '#fff', fontWeight: 'medium' }}
  >
    Select Category
  </InputLabel>
  <Select
    labelId="category-label"
    id="category-select"
    value={category}
    onChange={(e) => setCategory(e.target.value)}
    label="Select Category"
    sx={{
      backgroundColor: '#444',
      color: '#fff',
      borderRadius: '8px',
      '& .MuiSelect-icon': {
        color: '#000',
      },
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: '#ccc',
      },
      '&:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: '#999',
      },
      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: '#666',
      },
      '& .MuiPaper-root': {
        backgroundColor: '#000',
      },
      '& .MuiMenuItem-root': {
        color: '#fff',
        backgroundColor: '#000',
      },
      '& .MuiMenuItem-root:hover': {
        backgroundColor: '#333',
      },
      '& .MuiMenuItem-root.Mui-selected': {
        backgroundColor: '#444',
      },
      '& .MuiMenuItem-root.Mui-selected:hover': {
        backgroundColor: '#555',
      },
    }}
    MenuProps={{
      PaperProps: {
        sx: {
          bgcolor: '#444',
          '& .MuiMenuItem-root': {
            color: 'white',
          },
        },
      },
    }}
  >
    <MenuItem value="News">🌐 News</MenuItem>
    <MenuItem value="Sports">🏅 Sports</MenuItem>
    <MenuItem value="Entertainment">🎭 Entertainment</MenuItem>
    <MenuItem value="Education">📚 Education</MenuItem>
  </Select>
</FormControl>
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            onClick={handleAnalyzeVideo}
                            disabled={!videoFile || !caption || !tag || !uploader || !overview || isAnalyzing}
                            sx={{ backgroundColor: '#00cc88', color: 'white', borderRadius: '8px' }}
                        >
                            Analyze Video
                        </Button>
                    </Paper>
                </Grid>

                <Grid item xs={12} md={7}>
                    <Paper elevation={3} sx={{ padding: 1.5, backgroundColor: '#2C2C2C', color: 'white', borderRadius: '12px' }}>
                        {videoFile && (
                            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 200, mb: 2 }}>
                                <video width="100%" height="100%" controls style={{ borderRadius: '12px' }}>
                                    <source src={thumbnail} type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                            </Box>
                        )}

                        {isAnalyzing ? (
                            <>
                                <Typography variant="body1" align="center">
                                    Analysis in Progress...
                                </Typography>
                                <LinearProgress color="secondary" />
                            </>
                        ) : isAnalysisComplete ? (
                            <>
                                <Typography variant="body1" align="center" gutterBottom>
                                    AI Analysis Result: <strong>{analysisResult}</strong>
                                </Typography>
                                <Typography align="center" color={analysisResult === 'approved' ? 'green' : 'red'} variant="h6" sx={{ mt: 2 }}>
                                    <strong>{analysisResult === 'approved' ? '✔ Video Approved!' : '✖ Video Rejected'}</strong>
                                </Typography>

                                {/* {analysisResult === 'approved' && (
                                    <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
                                        <Button
                                            variant="contained"
                                            onClick={uploadToBlockchain}
                                            sx={{ backgroundColor: '#00cc88', color: 'white', mr: 2 }}
                                        >
                                            Upload to Blockchain
                                        </Button>
                                        <Button
                                            variant="contained"
                                            color="secondary"
                                            onClick={generatePDF}
                                        >
                                            Download Agreement
                                        </Button>
                                    </Box>
                                )} */}

{analysisResult === 'approved' && (
      <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      {/* Upload to Blockchain Button centered */}
      <Button
        variant="contained"
        onClick={uploadToBlockchain}
        sx={{
          background: 'linear-gradient(90deg, #003366, #800080)', // Background gradient
          color: 'white',
          padding: '10px 30px',
          borderRadius: '30px',
          position: 'relative',
          boxShadow: '3px 3px 8px rgba(0, 0, 0, 0.2)',
          mr: 2,
          '&:hover': {
            background: 'linear-gradient(90deg, #0055cc, #9900cc)', // Hover gradient
            transform: 'translateY(-2px)',
            boxShadow: '5px 5px 12px rgba(0, 0, 0, 0.3)',
          },
          transition: 'all 0.3s ease',
        }}
      >
        Upload to Blockchain
      </Button>
    
      {/* Download Agreement Button as Icon beside Upload Button */}
      <IconButton
        onClick={generatePDF}
        sx={{
          backgroundColor: '#e74c3c', // Change to your preferred color
          color: 'white',
          padding: '12px',
          borderRadius: '50%',
          boxShadow: '3px 3px 8px rgba(0, 0, 0, 0.2)',
          '&:hover': {
            backgroundColor: '#c0392b', // Hover color
            transform: 'scale(1.1)',
            boxShadow: '5px 5px 12px rgba(0, 0, 0, 0.3)',
          },
          transition: 'all 0.3s ease',
        }}
      >
        <i className="fas fa-file-pdf"></i> {/* PDF Icon */}
      </IconButton>
    </Box>
    )}
                            </>
                        ) : (
                            <Typography variant="body1" align="center" gutterBottom>
                                Please upload and analyze the video.
                            </Typography> 
                        )}

                        {status && (
                            <Box sx={{ p: 1.5, borderRadius: '8px', backgroundColor: '#333', color: 'white', mt: 2 }}>
                                <Typography variant="body2" align="center">
                                    {status}
                                </Typography>
                            </Box>
                        )}
                    </Paper>
                </Grid>
            </Grid>
            {/* <Navbar connectWallet={connectWallet} /> */}
            <Navbar account={account} connectWallet={connectWallet} />
        </Container>
    );
}

export default App;