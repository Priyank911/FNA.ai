// import React from 'react';
// import { Container, Grid, Paper, Typography, Button } from '@mui/material';
// import VerifiedIcon from '@mui/icons-material/Verified';
// import SourceIcon from '@mui/icons-material/Source';
// import ThumbUpIcon from '@mui/icons-material/ThumbUp';
// import SpeedIcon from '@mui/icons-material/Speed';
// import { motion } from 'framer-motion';

// const ExtensionPage = () => {
//   // Styles for the component
//   const styles = {
//     container: {
//       minHeight: '100vh',
//       backgroundColor: '#141010', // Darker background to match original theme
//       padding: '100px 20px 50px 20px', // Updated padding to add space at the top
//       textAlign: 'center',
//       fontFamily: "'Roboto', sans-serif",
//     },
//     header: {
//       fontSize: '3rem',
//       fontWeight: 'bold',
//       marginBottom: '20px',
//       color: '#ffffff',
//     },
//     subheader: {
//       fontSize: '1.5rem',
//       marginBottom: '40px',
//       color: '#cccccc', // Slightly lighter grey for subtext
//     },
//     gridContainer: {
//       marginTop: '30px',
//     },
//     card: {
//       backgroundColor: '#1c1c1c', // Match with the original bg color
//       padding: '30px',
//       borderRadius: '10px',
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center',
//       flexDirection: 'column',
//       minHeight: '200px',
//       textAlign: 'center',
//       transition: 'transform 0.3s ease, box-shadow 0.3s ease',
//       cursor: 'pointer',
//       boxShadow: '0 5px 15px rgba(0, 0, 0, 0.5)', // Soft shadow for better blending
//     },
//     cardHover: {
//       transform: 'translateY(-10px)',
//       boxShadow: '0 15px 25px rgba(0, 0, 0, 0.7)', // Slightly intense shadow on hover
//     },
//     cardIcon: {
//       fontSize: '4rem',
//       marginBottom: '15px',
//       color: '#76ff03', // Bright green accent for icons
//     },
//     cardTitle: {
//       fontSize: '1.4rem',
//       fontWeight: 'bold',
//       color: '#e0e0e0', // Light grey for text
//       marginBottom: '10px',
//     },
//     cardDescription: {
//       fontSize: '1rem',
//       color: '#aaaaaa', // Light grey for text
//     },
//     downloadButton: {
//       padding: '15px 30px',
//       fontSize: '1.2rem',
//       fontWeight: 'bold',
//       borderRadius: '5px',
//       backgroundColor: '#76ff03', // Match the icon color
//       color: '#000',
//       border: 'none',
//       marginTop: '5px',
//       cursor: 'pointer',
//       transition: 'background-color 0.3s ease',
//     },
//     downloadButtonHover: {
//       backgroundColor: '#64dd17', // Darker shade for hover effect
//     },
//   };

//   // Handle Download button click
//   const handleDownload = () => {
//     window.open('/Extension.zip', '_blank');
//   };

//   return (
//     <Container style={styles.container}>
//       <Typography variant="h2" style={styles.header}>
//         Article Credibility Checker
//       </Typography>
//       <Typography variant="subtitle1" style={styles.subheader}>
//         A powerful browser extension to instantly verify the credibility of news articles.
//       </Typography>
//       <motion.div
//         whileHover={{ scale: 1.05 }}
//         transition={{ duration: 0.3 }}
//         style={{ display: 'inline-block', marginTop: '40px' }}
//       >
//         <Button
//           variant="contained"
//           style={styles.downloadButton}
//           onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = styles.downloadButtonHover.backgroundColor)}
//           onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = styles.downloadButton.backgroundColor)}
//           onClick={handleDownload}
//         >
//           Download Extension
//         </Button>
//       </motion.div>

//       <Grid container spacing={4} style={styles.gridContainer}>
//         <Grid item xs={12} sm={6} md={3}>
//           <motion.div
//             whileHover={{ scale: 1.05 }}
//             transition={{ duration: 0.3 }}
//           >
//             <Paper style={styles.card}>
//               <VerifiedIcon style={styles.cardIcon} />
//               <Typography variant="h6" style={styles.cardTitle}>
//                 Instant Verification
//               </Typography>
//               <Typography style={styles.cardDescription}>
//                 Hover over any article and get real-time feedback on its authenticity.
//               </Typography>
//             </Paper>
//           </motion.div>
//         </Grid>

//         <Grid item xs={12} sm={6} md={3}>
//           <motion.div
//             whileHover={{ scale: 1.05 }}
//             transition={{ duration: 0.3 }}
//           >
//             <Paper style={styles.card}>
//               <SourceIcon style={styles.cardIcon} />
//               <Typography variant="h6" style={styles.cardTitle}>
//                 Trusted Sources
//               </Typography>
//               <Typography style={styles.cardDescription}>
//                 Cross-reference with reliable and verified news sources to avoid misinformation.
//               </Typography>
//             </Paper>
//           </motion.div>
//         </Grid>

//         <Grid item xs={12} sm={6} md={3}>
//           <motion.div
//             whileHover={{ scale: 1.05 }}
//             transition={{ duration: 0.3 }}
//           >
//             <Paper style={styles.card}>
//               <ThumbUpIcon style={styles.cardIcon} />
//               <Typography variant="h6" style={styles.cardTitle}>
//                 Easy to Use
//               </Typography>
//               <Typography style={styles.cardDescription}>
//                 Simple and intuitive user experience. Just install and start verifying.
//               </Typography>
//             </Paper>
//           </motion.div>
//         </Grid>

//         <Grid item xs={12} sm={6} md={3}>
//           <motion.div
//             whileHover={{ scale: 1.05 }}
//             transition={{ duration: 0.3 }}
//           >
//             <Paper style={styles.card}>
//               <SpeedIcon style={styles.cardIcon} />
//               <Typography variant="h6" style={styles.cardTitle}>
//                 Fast & Lightweight
//               </Typography>
//               <Typography style={styles.cardDescription}>
//                 Designed to work seamlessly without slowing down your browsing experience.
//               </Typography>
//             </Paper>
//           </motion.div>
//         </Grid>
//       </Grid>
//       <motion.div
//         initial={{ opacity: 0, y: 50 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 1 }}
//         style={{
//           marginTop: '60px',
//           backgroundColor: '#141010',
//           padding: '50px 20px',
//           borderRadius: '15px',
//         }}
//       >
//         <Typography variant="h3" gutterBottom style={{ color: '#FFFFFF' }}>
//           How It Works
//         </Typography>
//         <Typography variant="body1" paragraph style={{ maxWidth: '800px', margin: '0 auto', lineHeight: '1.6' }}>
//           The Article Credibility Checker analyzes articles in real-time as you hover over them. 
//           Using a combination of AI and trusted databases, it provides instant feedback on whether 
//           the content you're reading is reliable or contains misinformation.
//         </Typography>

//         <Grid container spacing={2} style={{ marginTop: '20px' }}>
//           <Grid item xs={12} md={4}>
//             <Paper
//               sx={{
//                 padding: '20px',
//                 backgroundColor: '#1e1e1e',
//                 borderRadius: '10px',
//                 textAlign: 'center',
//                 boxShadow: '0 4px 15px rgba(0, 0, 0, 0.5)',
//               }}
//             >
//               <Typography variant="h5" gutterBottom style={{ color: '#00FFCC' }}>
//                 1. Hover
//               </Typography>
//               <Typography variant="body1">
//                 Hover over a news article to trigger analysis.
//               </Typography>
//             </Paper>
//           </Grid>

//           <Grid item xs={12} md={4}>
//             <Paper
//               sx={{
//                 padding: '20px',
//                 backgroundColor: '#1e1e1e',
//                 borderRadius: '10px',
//                 textAlign: 'center',
//                 boxShadow: '0 4px 15px rgba(0, 0, 0, 0.5)',
//               }}
//             >
//               <Typography variant="h5" gutterBottom style={{ color: '#00FFCC' }}>
//                 2. Analyze
//               </Typography>
//               <Typography variant="body1">
//                 The extension scans the article for credibility signals.
//               </Typography>
//             </Paper>
//           </Grid>

//           <Grid item xs={12} md={4}>
//             <Paper
//               sx={{
//                 padding: '20px',
//                 backgroundColor: '#1e1e1e',
//                 borderRadius: '10px',
//                 textAlign: 'center',
//                 boxShadow: '0 4px 15px rgba(0, 0, 0, 0.5)',
//               }}
//             >
//               <Typography variant="h5" gutterBottom style={{ color: '#00FFCC' }}>
//                 3. Feedback
//               </Typography>
//               <Typography variant="body1">
//                 Get instant feedback indicating if the article is credible.
//               </Typography>
//             </Paper>
//           </Grid>
//         </Grid>
//       </motion.div>
//     </Container>
//   );
// };

// export default ExtensionPage;
import React, { useState } from 'react';
import { Container, Grid, Paper, Typography, Button } from '@mui/material';
import VerifiedIcon from '@mui/icons-material/Verified';
import SourceIcon from '@mui/icons-material/Source';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import SpeedIcon from '@mui/icons-material/Speed';
import { motion } from 'framer-motion';
import Modal from 'react-modal';
import Lottie from 'lottie-react';
import animationData from './installation-animation.json';

const ExtensionPage = () => {
  // Styles for the component
  const styles = {
    container: {
      minHeight: '100vh',
      backgroundColor: '#141010', // Darker background to match original theme
      padding: '100px 20px 50px 20px', // Updated padding to add space at the top
      textAlign: 'center',
      fontFamily: "'Roboto', sans-serif",
    },
    header: {
      fontSize: '3rem',
      fontWeight: 'bold',
      marginBottom: '20px',
      color: '#ffffff',
    },
    subheader: {
      fontSize: '1.5rem',
      marginBottom: '40px',
      color: '#cccccc', // Slightly lighter grey for subtext
    },
    gridContainer: {
      marginTop: '30px',
    },
    card: {
      backgroundColor: '#1c1c1c', 
      padding: '30px',
      borderRadius: '10px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      minHeight: '200px',
      textAlign: 'center',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      cursor: 'pointer',
      boxShadow: '0 5px 15px rgba(0, 0, 0, 0.5)', 
    },
    cardHover: {
      transform: 'translateY(-10px)',
      boxShadow: '0 15px 25px rgba(0, 0, 0, 0.7)', // Slightly intense shadow on hover
    },
    cardIcon: {
      fontSize: '4rem',
      marginBottom: '15px',
      color: '#ffffff', // Bright green accent for icons
    },
    cardTitle: {
      fontSize: '1.4rem',
      fontWeight: 'bold',
      color: '#e0e0e0', // Light grey for text
      marginBottom: '10px',
    },
    cardDescription: {
      fontSize: '1rem',
      color: '#aaaaaa', // Light grey for text
    },
    downloadButton: {
      padding: '15px 30px',
      fontSize: '1.2rem',
      fontWeight: 'bold',
      borderRadius: '5px',
      backgroundColor: '#ffffff', // Match the icon color
      color: '#000',
      border: 'none',
      marginTop: '5px',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease',
    },
    downloadButtonHover: {
      backgroundColor: '#64dd17', // Darker shade for hover effect
    },
    modalStyles: {
      content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        transform: 'translate(-50%, -50%)',
        backgroundColor: '#222',
        color: '#fff',
        borderRadius: '15px',
        border: 'none',
        width: '60%',
        maxWidth: '600px',
        boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.3)',
      },
    },
  };

  const handleDownload = () => {
    window.open('/Extension.zip', '_blank');
  };

  const [modalIsOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);


  const closeModal = () => setIsOpen(false);

  return (
    <Container style={styles.container}>
      <Typography variant="h2" style={styles.header}>
        Article Credibility Checker
      </Typography>
      <Typography variant="subtitle1" style={styles.subheader}>
        A powerful browser extension to instantly verify the credibility of news articles.
      </Typography>

      <motion.div
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3 }}
        style={{ display: 'inline-block', marginTop: '40px' }}
      >
        <Button
          variant="contained"
          style={styles.downloadButton}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = styles.downloadButtonHover.backgroundColor)}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = styles.downloadButton.backgroundColor)}
          onClick={handleDownload}
        >
          Download Extension
        </Button>
      </motion.div>

      <Grid container spacing={4} style={styles.gridContainer}>
        {[
          {
            icon: <VerifiedIcon style={styles.cardIcon} />,
            title: 'Instant Verification',
            description: 'Hover over any article and get real-time feedback on its authenticity.',
          },
          {
            icon: <SourceIcon style={styles.cardIcon} />,
            title: 'Trusted Sources',
            description: 'Cross-reference with reliable and verified news sources to avoid misinformation.',
          },
          {
            icon: <ThumbUpIcon style={styles.cardIcon} />,
            title: 'Easy to Use',
            description: 'Simple and intuitive user experience. Just install and start verifying.',
          },
          {
            icon: <SpeedIcon style={styles.cardIcon} />,
            title: 'Fast & Lightweight',
            description: 'Designed to work seamlessly without slowing down your browsing experience.',
          },
        ].map((feature, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
              <Paper style={styles.card}>
                {feature.icon}
                <Typography variant="h6" style={styles.cardTitle}>
                  {feature.title}
                </Typography>
                <Typography style={styles.cardDescription}>{feature.description}</Typography>
              </Paper>
            </motion.div>
          </Grid>
        ))}
      </Grid>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        style={{
          marginTop: '60px',
          backgroundColor: '#141010',
          padding: '50px 20px',
          borderRadius: '15px',
        }}
      >
        <Typography variant="h3" gutterBottom style={{ color: '#FFFFFF' }}>
          How It Works
        </Typography>
        <Typography variant="body1" paragraph style={{ maxWidth: '800px', margin: '0 auto', lineHeight: '1.6' }}>
          The Article Credibility Checker analyzes articles in real-time as you hover over them. Using a combination of AI and trusted databases, it provides instant feedback on whether the content you're reading is reliable or contains misinformation.
        </Typography>

        <Grid container spacing={2} style={{ marginTop: '20px' }}>
          {[
            { step: '1. Hover', description: 'Hover over a news article to trigger analysis.' },
            { step: '2. Analyze', description: 'The extension scans the article for credibility signals.' },
            { step: '3. Feedback', description: 'Get instant feedback indicating if the article is credible.' },
          ].map((item, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Paper
                sx={{
                  padding: '20px',
                  backgroundColor: '#1e1e1e',
                  borderRadius: '10px',
                  textAlign: 'center',
                  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.5)',
                }}
              >
                <Typography variant="h5" gutterBottom style={{ color: '#00FFCC' }}>
                  {item.step}
                </Typography>
                <Typography variant="body1">{item.description}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        style={{ marginTop: '60px', textAlign: 'center' }}
      >
        <Button
          variant="contained"
          onClick={openModal}
          style={{
            padding: '15px 30px',
            fontSize: '1.2rem',
            fontWeight: 'bold',
            borderRadius: '5px',
            backgroundColor: '#ffffff',
            color: '#000',
            border: 'none',
            marginTop: '5px',
          }}
        >
          How to Install
        </Button>
      </motion.div>

      {/* Modal for installation steps */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={styles.modalStyles}
        contentLabel="Installation Instructions"
        ariaHideApp={false}
      >
        <div style={{ padding: '20px' }}>
          <Typography variant="h4" gutterBottom>
            Installation Instructions
          </Typography>
          <Typography variant="body1" gutterBottom>
            1. Download the extension file by clicking the "Download Extension" button.
          </Typography>
          <Typography variant="body1" gutterBottom>
            2. Open your browser settings and go to Extensions.
          </Typography>
          <Typography variant="body1" gutterBottom>
            3. Enable "Developer Mode" and click "Load unpacked."
          </Typography>
          <Typography variant="body1" gutterBottom>
            4. Select the extracted folder to install the extension.
          </Typography>
          <Typography variant="body1" gutterBottom>
            5. The extension is now installed and ready to use!
          </Typography>
          <Button
            variant="contained"
            onClick={closeModal}
            style={{
              padding: '10px 20px',
              fontSize: '1rem',
              fontWeight: 'bold',
              borderRadius: '5px',
              backgroundColor: '#ffffff',
              color: '#000',
              border: 'none',
              marginTop: '15px',
            }}
          >
            Close
          </Button>
        </div>
      </Modal>

      <div style={{ marginTop: '60px', textAlign: 'center' }}>
        <Typography variant="subtitle2" style={{ color: '#777777' }}>
          © 2024 Article Credibility Checker. All rights reserved.
        </Typography>
      </div>
    </Container>
  );
};

export default ExtensionPage;
