import React, { useState} from 'react';
import axios from 'axios';
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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons'
import CircularProgress from '@mui/material/CircularProgress';



//------Firebase Storage

import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'; 
import { storage } from './firebase.js'; 

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
    const [description, setDescription] = useState('');
    const [summary, setSummary] = useState('');

    //<--New
    const [metadataURL, setMetadataURL] = useState('');
    const [mediaURL, setMediaURL] = useState('');
    const [transactionHash, setTransactionHash] = useState('');
    const [tokenId, setTokenId] = useState('');
    const [nftInfo, setNftInfo] = useState(null);
    const BASE_URL = "https://brown-passive-cattle-71.mypinata.cloud/ipfs/"


    // const connectWallet = async () => {
    //     if (window.ethereum) {
    //         try {
    //             const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    //             const web3Instance = new Web3(window.ethereum);
    //             setWeb3(web3Instance);
    //             setAccount(accounts[0]);
    //             console.log("Connected account:", accounts[0]);
    //         } catch (error) {
    //             console.error("Connection to MetaMask failed:", error);
    //         }
    //     } else {
    //         alert('Please install MetaMask to use this feature.');
    //     }
    // };

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


  const handleAnalyzeVideo = async () => {
    setIsAnalyzing(true);
    try {
        const formData = new FormData();
        formData.append('file', videoFile);

        const response = await fetch('http://localhost:8000/upload_video', {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            throw new Error('Video analysis failed');
        }
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        setDownloadUrl(url);

        setDescription("Analysis complete. Ready to download summary.");
        setSummary("Click the 'Summarize Video' button to download the PDF.");
        setAnalysisResult('approved');
        setIsAnalysisComplete(true);
    } catch (error) {
        console.error('Error analyzing video:', error);
        setAnalysisResult('rejected');
        setDescription("Error occurred during analysis.");
        setSummary(error.message);
    } finally {
        setIsAnalyzing(false);
    }
};
const [downloadUrl, setDownloadUrl] = useState(null);


//----Updated uploadToBlockchain function to upload video to Firebase Storage

// const uploadToBlockchain = async () => {
//     if (web3 && account) {
//         try {
//             const contractAddress = '0xda4bcd87fa9986ea7b0e4c44b183b00917ddeb91';
//             const contract = new web3.eth.Contract(contractABI, contractAddress);

//             const receipt = await contract.methods.uploadVideo(videoHash, caption, tag)
//                 .send({ from: account });

//             setStatus(`Transaction successful! Tx Hash: ${receipt.transactionHash}`);

//             // Upload to Firebase Storage
//             if (videoFile) {
//                 const storageRef = ref(storage, `videos/${videoFile.name}`);
//                 const uploadTask = uploadBytesResumable(storageRef, videoFile);

//                 uploadTask.on(
//                     "state_changed",
//                     (snapshot) => {
                    
//                     },
//                     (error) => {
//                         console.error("Error uploading video to Firebase Storage:", error.message);
//                         setStatus("Error uploading video to Firebase Storage.");
//                     },
//                     async () => {
//                         const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

                        
//                         await addDoc(collection(db, 'videos'), {
//                             videoHash: videoHash,
//                             caption: caption,
//                             tag: tag,
//                             uploader: uploader,
//                             overview: overview,
//                             videoURL: downloadURL, 
//                             transactionHash: receipt.transactionHash,
//                             timestamp: new Date()
//                         });

//                         console.log("Video details stored in Firestore.");
//                     }
//                 );
//             }
//         } catch (error) {
//             console.error("Error uploading to blockchain or storing in Firestore:", error.message);
//             setStatus("Error uploading video to the blockchain.");
//         }
//     } else {
//         alert('Connect to MetaMask to interact with the blockchain.');
//     }
// };


//-->New

// const uploadToBlockchain = async () => {
//   if (!videoFile) {
//       setStatus('Please select a video file.');
//       return;
//   }
//   setStatus('Uploading to IPFS and blockchain...');
//    const reader = new FileReader();
//    reader.readAsDataURL(videoFile);
//      reader.onloadend = async () => {
//      const base64String = reader.result;
//        const metadata = {
//            title: caption,
//            uploader: uploader,
//            tags: tag ? tag.split(",").map(t => t.trim()) : [],
//            description: overview,
//        };

//       try {
//           const response = await axios.post('http://localhost:3001/upload', {
//                 mediaFile: base64String,
//                metadata: metadata
//             });
//           setMetadataURL(response.data.metadataURL);
//           setMediaURL(response.data.mediaURL);
//           setTransactionHash(response.data.txHash);
//           setStatus(`Successfully uploaded to the blockchain! Metadata URL: ${response.data.metadataURL}, Media URL: ${response.data.mediaURL}, Tx Hash: ${response.data.txHash}`);

//              // Upload to Firebase Storage
//           if (videoFile) {
//                const storageRef = ref(storage, `videos/${videoFile.name}`);
//               const uploadTask = uploadBytesResumable(storageRef, videoFile);

//                 uploadTask.on(
//                   "state_changed",
//                 (snapshot) => {

//               },
//              (error) => {
//                   console.error("Error uploading video to Firebase Storage:", error.message);
//                   setStatus("Error uploading video to Firebase Storage.");
//                 },
//              async () => {
//              const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

//                  await addDoc(collection(db, 'videos'), {
//                   videoHash: videoHash,
//                   caption: caption,
//                    tag: tag,
//                    uploader: uploader,
//                     overview: overview,
//                    videoURL: downloadURL,
//                    transactionHash: response.data.txHash,
//                   timestamp: new Date()
//                     });

//                console.log("Video details stored in Firestore.");
//               }
//              );
//              }

//       } catch (error) {
//           console.error('Error uploading to backend:', error);
//         setStatus('Error uploading to IPFS and blockchain.');
//      }
//      };
// };

// const uploadToBlockchain = async () => {
//   if (!videoFile) {
//     setStatus('Please select a video file.');
//     return;
//   }
//   setStatus('Uploading to IPFS and blockchain...');
  
//   const reader = new FileReader();
//   reader.readAsDataURL(videoFile);
  
//   reader.onloadend = async () => {
//     const base64String = reader.result;
//     const metadata = {
//       title: caption,
//       uploader: uploader,
//       tags: tag ? tag.split(",").map(t => t.trim()) : [],
//       description: overview,
//     };

//     try {
//       const response = await axios.post('http://localhost:3001/upload', {
//         mediaFile: base64String,
//         metadata: metadata
//       });
      
//       setMetadataURL(response.data.metadataURL);
//       setMediaURL(response.data.mediaURL);
//       setTransactionHash(response.data.txHash);
//       setStatus(`Successfully uploaded to the blockchain! Metadata URL: ${response.data.metadataURL}, Media URL: ${response.data.mediaURL}, Tx Hash: ${response.data.txHash}`);
      
//     } catch (error) {
//       console.error('Error uploading to backend:', error);
//       setStatus('Error uploading to IPFS and blockchain.');
//     }
//   };
// };

const uploadToBlockchain = async () => {
  if (!videoFile) {
    setStatus('Please select a video file.');
    return;
  }
  setStatus('Uploading to IPFS and blockchain...');
  
  const reader = new FileReader();
  reader.readAsDataURL(videoFile);
  
  reader.onloadend = async () => {
    const base64String = reader.result;
    const metadata = {
      title: caption,
      uploader: uploader,
      tags: tag ? tag.split(",").map(t => t.trim()) : [],
      description: overview,
    };

    try {
      const response = await axios.post('http://localhost:3001/upload', {
        mediaFile: base64String,
        metadata: metadata
      });
      
      setMetadataURL(response.data.metadataURL);
      setMediaURL(response.data.mediaURL);
      setTransactionHash(response.data.txHash);
      setStatus(`Successfully uploaded to the blockchain! Metadata URL: ${response.data.metadataURL}, Media URL: ${response.data.mediaURL}, Tx Hash: ${response.data.txHash}`);

      // Store details in Firestore
      await addDoc(collection(db, 'videos'), {
        videoHash: response.data.mediaURL, // Assuming mediaURL from backend is a unique hash
        caption: caption,
        tag: tag,
        uploader: uploader,
        overview: overview,
        transactionHash: response.data.txHash,
        timestamp: new Date()
      });

      console.log("Video details stored in Firestore.");

    } catch (error) {
      console.error('Error uploading to backend:', error);
      setStatus('Error uploading to IPFS and blockchain.');
    }
  };
};




const handleGetNFTInfo = async () => {
 if (!tokenId) {
     setStatus("Please enter a token ID.");
     return;
 }
 try{
     const response = await axios.get(`http://localhost:3001/getNFTInfo/${tokenId}`);
     setNftInfo(response.data);
     setStatus("Successfully fetch NFT details")
 }catch (error){
     console.error("Error fetching NFT Information", error);
     setStatus("Error fetching NFT information")
 }
}



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
  sx={{ mt: 18, mb: 10 }} 
>
  <Grid container spacing={2} justifyContent="center">
    <Grid item xs={12} md={5}>
      <Paper
        elevation={3}
        sx={{
          padding: 1.5,
          backgroundColor: '#111111',
          color: 'white',
          borderRadius: '12px',
          border: '1px solid rgba(255, 255, 255, 0.2)',
        }}
      >
<Typography
  variant="h6"
  gutterBottom
  sx={{
    fontFamily: 'Roboto, sans-serif',
    fontWeight: 'bold',
    letterSpacing: 1,
    color: 'white',
  }}
>
  News Analyzer
</Typography>
<Button
    variant="contained"
    component="label"
    fullWidth
    sx={{
        mb: 1.5,
        backgroundColor: '#1e1e2e', // Dark tone for black theme
        color: '#e6e6e6', // Soft light color for text
        borderRadius: '16px',
        fontWeight: 'bold',
        padding: '14px 24px',
        textTransform: 'none',
        fontSize: '16px',
        position: 'relative',
        overflow: 'hidden',
        transition: 'transform 0.3s ease-in-out, background-color 0.3s ease-in-out',
        '&:hover': {
            backgroundColor: '#28293d', // Slightly lighter for hover effect
            transform: 'scale(1.05)',
        },
        '&:active': {
            backgroundColor: '#34354b',
            transform: 'scale(0.98)',
        },
        '&:focus': {
            outline: 'none',
        },
        '&::before': {
            content: '""',
            position: 'absolute',
            top: '-100%',
            left: '0',
            width: '100%',
            height: '100%',
            background: 'linear-gradient(180deg, rgba(126, 63, 242, 0.2), rgba(126, 63, 242, 0))',
            animation: 'uploadGlow 2s infinite',
        },
        '@keyframes uploadGlow': {
            '0%': {
                top: '-100%',
            },
            '50%': {
                top: '50%',
            },
            '100%': {
                top: '100%',
            },
        },
    }}
>
    Upload News Data
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
  sx={{
    backgroundColor: '#1a1a1a',
    mb: 1.5,
    borderRadius: '8px',
    border: '1px solid rgba(255, 255, 255, 0.2)', 
  }}
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
  sx={{
    backgroundColor: '#1a1a1a',
    mb: 1.5,
    borderRadius: '8px',
    border: '1px solid rgba(255, 255, 255, 0.2)', 
  }}
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
  sx={{
    backgroundColor: '#1a1a1a',
    mb: 1.5,
    borderRadius: '8px',
    border: '1px solid rgba(255, 255, 255, 0.2)',
  }}
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
  sx={{
    backgroundColor: '#1a1a1a',
    mb: 1.5,
    borderRadius: '8px',
    border: '1px solid rgba(255, 255, 255, 0.2)', 
  }}
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
      backgroundColor: '#1a1a1a',
      color: '#fff',
      borderRadius: '8px',
      border: '1px solid rgba(255, 255, 255, 0.2)', 
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
    sx={{
      background: 'linear-gradient(90deg, #733bea, #3d1497)',
        color: 'white',
        borderRadius: '12px',
        fontWeight: 'bold',
        padding: '10px 20px',
        textTransform: 'none',
        transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
        '&:hover': {
            background: 'linear-gradient(90deg, #3d1497, #733bea)',
            transform: 'scale(1.05)',
        },
        '&:disabled': {
            backgroundColor: '#1a1a1a',
            color: '#e0e0e0',
        },
        '&:focus': {
            animation: `0 0 10px 0 rgba(0, 204, 136, 0.5) 1.5s infinite`,
        },
    }}
    startIcon={isAnalyzing ? <CircularProgress size={24} style={{ color: 'white' }} /> : null}
>
    {isAnalyzing ? 'Analyzing...' : 'Analyze Video'}
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
      {/* <Button
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
      </Button> */}
    <Button
  variant="contained"
  onClick={uploadToBlockchain}
  sx={{
    fontSize: { xs: '10px', sm: '12px', md: '14px' }, 
    background: 'linear-gradient(90deg, #003366, #800080)', 
    color: 'white',
    padding: { xs: '8px 20px', sm: '10px 25px', md: '10px 30px' }, 
    borderRadius: '25px', 
    position: 'relative',
    boxShadow: '3px 3px 8px rgba(0, 0, 0, 0.2)', 
    marginRight: '15px', 
    textTransform: 'uppercase', 
    letterSpacing: '1px', 
    fontWeight: 'bold',
    transition: 'all 0.4s ease', 
    '&:hover': {
      background: 'linear-gradient(90deg, #0055cc, #9900cc)', 
      transform: 'translateY(-3px)', 
      boxShadow: '5px 5px 12px rgba(0, 0, 0, 0.4)', 
      letterSpacing: '2px', 
    },
    '&:active': {
      transform: 'scale(0.97)', 
    },

    '@media (max-width: 600px)': {
      width: '100%', 
      marginTop: '10px', 
    },
  }}
>
  Launch to Blockchain
</Button>


      <IconButton
        onClick={generatePDF}
        sx={{
          backgroundColor: '#e74c3c', 
          color: 'white',
          padding: '12px',
          borderRadius: '50%',
          boxShadow: '3px 3px 8px rgba(0, 0, 0, 0.2)',
          '&:hover': {
            backgroundColor: '#c0392b',
            transform: 'scale(1.1)',
            boxShadow: '5px 5px 12px rgba(0, 0, 0, 0.3)',
          },
          transition: 'all 0.3s ease',
        }}
      >
        <i className="fas fa-file-pdf"></i> {/* PDF Icon */}
      </IconButton>
      {/* <Button
        variant="contained"
        onClick={() => {
          const a = document.createElement('a');
          a.style.display = 'none';
          a.href = downloadUrl;
          a.download = 'video_summary.pdf';
          document.body.appendChild(a);
          a.click();
          window.URL.revokeObjectURL(downloadUrl);
        }}
        sx={{
          ml: 2, // Spacing from the previous buttons
          paddingLeft: '20px', // Padding from left side
          background: 'linear-gradient(90deg,#800080 ,#003366)',
          color: 'white',
          borderRadius: '20px',
          padding: '10px 20px',
          boxShadow: '3px 3px 8px rgba(0, 0, 0, 0.2)',
          '&:hover': {
            background: 'linear-gradient(90deg,#9900cc ,#0055cc)',
            transform: 'translateY(-2px)',
            boxShadow: '5px 5px 12px rgba(0, 0, 0, 0.3)',
          },
          transition: 'all 0.3s ease',
        }}
      >
        Summarize Video
      </Button> */}

      

<Button
  variant="contained"
  onClick={() => {
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = downloadUrl;
    a.download = 'video_summary.pdf';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(downloadUrl);
  }}
  sx={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: { xs: '12px', sm: '14px', md: '16px' }, 
    background: 'linear-gradient(90deg, #6E00A3 , #1B6BFF)', 
    color: 'white',
    padding: { xs: '8px 12px', sm: '10px 20px', md: '12px 30px' }, 
    borderRadius: '25px', 
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
    transition: 'all 0.6s ease', 
    marginLeft: '10px',
    position: 'relative',

    '&:hover': {
      background: 'linear-gradient(90deg, #800080 , #003366)', 
      transform: 'translateY(-2px)',
      boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.3)',
    },

    '&:active': {
      transform: 'scale(0.98)',
    },

    '@media (max-width: 600px)': {
      width: '100%', 
      marginTop: '10px', 
    },

    '& .svg-wrapper': {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      transition: 'transform 0.6s ease-in-out', 
    },

    '&:hover .svg-wrapper': {
      transform: 'scale(1.2)',
      transition: '0.6s ease-in-out',
    },

    '& svg': {
      transformOrigin: 'center',
      transition: 'transform 0.6s ease-in-out', 
    },

    '&:hover svg': {
      transform: 'translateX(0) scale(1.1)', 
      fill: '#fff',
    },

    '& span': {
      display: 'block',
      marginLeft: '8px',
      transition: 'opacity 0.6s ease-in-out',
    },

    '&:hover span': {
      opacity: 0,
    },
  }}
>
  <div className="svg-wrapper">
    <FontAwesomeIcon icon={faDownload} size="lg" />
  </div>
  <span>Summary</span>
</Button>
    </Box>
    )}
                            </>
                        ) : (
                            <Typography variant="body1" align="center" gutterBottom>
                                Please upload and analyze the video.
                            </Typography> 
                        )}

{status && (
    <Box
    sx={{
      p: 3,
      borderRadius: '12px',
      backgroundColor: '#2c2c3d',
      color: '#f0f0f0',
      mt: 3,
      boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.4)',
      maxWidth: '600px',
      mx: 'auto',
    }}
  >
    <Typography variant="h6" align="center" sx={{ mb: 2, color: '#ffffff', fontWeight: 'bold' }}>
      Status Update
    </Typography>
  
    <Box sx={{ mb: 2 }}>
      <Typography
        variant="body2"
        sx={{
          color: '#4caf50',
          fontWeight: 'bold',
          fontSize: '14px',
          textAlign: 'left',
          marginBottom: '8px',
        }}
      >
        Metadata URL:
      </Typography>
      <a
        href={metadataURL}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'block',
          color: '#4caf50',
          textDecoration: 'none',
          fontSize: '12px',
          wordBreak: 'break-word',
          lineHeight: 1.4,
          marginBottom: '16px',
        }}
      >
        {metadataURL}
      </a>
    </Box>
  
    <Box sx={{ mb: 2 }}>
      <Typography
        variant="body2"
        sx={{
          color: '#4caf50',
          fontWeight: 'bold',
          fontSize: '14px',
          textAlign: 'left',
          marginBottom: '8px',
        }}
      >
        Media URL:
      </Typography>
      <a
        href={mediaURL}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'block',
          color: '#4caf50',
          textDecoration: 'none',
          fontSize: '12px',
          wordBreak: 'break-word',
          lineHeight: 1.4,
          marginBottom: '16px',
        }}
      >
        {mediaURL}
      </a>
    </Box>
  
    <Box sx={{ mb: 2 }}>
      <Typography
        variant="body2"
        sx={{
          color: '#4caf50',
          fontWeight: 'bold',
          fontSize: '14px',
          textAlign: 'left',
          marginBottom: '8px',
        }}
      >
        Tx Hash:
      </Typography>
      <Typography
        variant="body2"
        sx={{
          color: '#f0f0f0',
          fontSize: '12px',
          wordBreak: 'break-word',
          lineHeight: 1.4,
          marginBottom: '16px',
        }}
      >
        {transactionHash}
      </Typography>
    </Box>
    <Box
      sx={{
        mt: 2,
        display: 'flex',
        justifyContent: 'center',
        gap: 1.5,
      }}
    >
      {metadataURL && (
        <a
          href={`${BASE_URL}${metadataURL.split('/').pop()}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            textDecoration: 'none',
            color: '#4caf50',
            fontWeight: '500',
            fontSize: '0.9rem',
          }}
        >
          View Metadata
        </a>
      )}
      {mediaURL && (
        <a
          href={`${BASE_URL}${mediaURL.split('/').pop()}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            textDecoration: 'none',
            color: '#4caf50',
            fontWeight: '500',
            fontSize: '0.9rem',
          }}
        >
          View Media
        </a>
      )}
    </Box>
  </Box>

)}

                    </Paper>
                </Grid>
            </Grid>
            {/* <Navbar connectWallet={connectWallet} /> */}
            {/* <Navbar account={account} connectWallet={connectWallet} /> */}
        </Container>
    );
}

export default App;