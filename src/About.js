import React from 'react';
import { Container, Box, Typography, Grid, Paper, Avatar } from '@mui/material';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <Container 
      maxWidth="lg"
      style={{ 
        paddingTop: '100px',
        paddingBottom: '50px',
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        style={{ width: '100%' }}
      >
        <Typography variant="h2" align="center" gutterBottom style={{ color: '#FFFFFF' }}>
          Explore Our Project
        </Typography>
        <Typography variant="body1" align="center" paragraph>
          Discover how we use cutting-edge blockchain technology and AI to revolutionize digital media authenticity.
        </Typography>
      </motion.div>

      <Grid container spacing={4} style={{ marginTop: '40px' }}>
        <Grid item xs={12} md={6}>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            <Paper
              elevation={10}
              sx={{
                padding: '30px',
                backgroundColor: '#1e1e1e', // Dark gray background
                borderRadius: '15px',
                textAlign: 'center',
                backgroundImage: 'linear-gradient(315deg, #1e1e1e 0%, #434343 74%)', // Gradient from dark gray to medium gray
              }}
            >
              <Typography variant="h4" gutterBottom>
                Video Upload
              </Typography>
              <Typography variant="body1">
                Upload and verify videos with ease, ensuring authenticity through blockchain.
              </Typography>
            </Paper>
          </motion.div>
        </Grid>

        <Grid item xs={12} md={6}>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            <Paper
              elevation={10}
              sx={{
                padding: '30px',
                backgroundColor: '#1e1e1e',
                borderRadius: '15px',
                textAlign: 'center',
                backgroundImage: 'linear-gradient(315deg, #1e1e1e 0%, #535353 74%)', // A lighter gray gradient for distinction
              }}
            >
              <Typography variant="h4" gutterBottom>
                Article Credibility Checker
              </Typography>
              <Typography variant="body1">
                Evaluate the trustworthiness of news articles in real-time with our browser extension.
              </Typography>
            </Paper>
          </motion.div>
        </Grid>

        <Grid item xs={12} md={6}>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            <Paper
              elevation={10}
              sx={{
                padding: '30px',
                backgroundColor: '#1e1e1e',
                borderRadius: '15px',
                textAlign: 'center',
                backgroundImage: 'linear-gradient(315deg, #1e1e1e 0%, #666666 74%)', // Yet another shade of gray
              }}
            >
              <Typography variant="h4" gutterBottom>
                Video Verification System
              </Typography>
              <Typography variant="body1">
                Detect tampering and deepfakes in video content to maintain integrity and truthfulness.
              </Typography>
            </Paper>
          </motion.div>
        </Grid>

        <Grid item xs={12} md={6}>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            <Paper
              elevation={10}
              sx={{
                padding: '30px',
                backgroundColor: '#1e1e1e',
                borderRadius: '15px',
                textAlign: 'center',
                backgroundImage: 'linear-gradient(315deg, #1e1e1e 0%, #4c4c4c 74%)', // Subtle gray gradient
              }}
            >
              <Typography variant="h4" gutterBottom>
                Blockchain Integration
              </Typography>
              <Typography variant="body1">
                Leverage an immutable blockchain to secure and authenticate video content, creating a trustworthy digital repository.
              </Typography>
            </Paper>
          </motion.div>
        </Grid>
        {/* Other feature boxes */}
      </Grid>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 2 }}
        style={{ width: '100%', marginTop: '60px', textAlign: 'center' }}
      >
        <Typography variant="h3" gutterBottom style={{ color: 'FFFFFF' }}>
          Meet Our Team
        </Typography>
        <Grid container spacing={3} style={{ marginTop: '20px' }}>
          <Grid item xs={12} sm={6} md={3}>
            <Paper sx={{ padding: '20px', backgroundColor: '#292929', color: 'white', borderRadius: '12px' }}>
              <Avatar src="/avatar/Priyank.jpg" sx={{ width: 128, height: 128, margin: 'auto' }}/>
              <Typography variant="h6" gutterBottom>
                Priyank
              </Typography>
              <Typography variant="body2">
               Team Leader and Developer
              </Typography>
              <Typography variant="caption" display="block">
                Work on Backend, Blockchain, AI, and Frontend.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper sx={{ padding: '20px', backgroundColor: '#292929', color: 'white', borderRadius: '12px' }}>
              <Avatar src="./avatar/Prayers.jpg" sx={{ width: 128, height: 128, margin: 'auto' }}/>
              <Typography variant="h6" gutterBottom>
                Prayers
              </Typography>
              <Typography variant="body2">
                AI Model Developer
              </Typography>
              <Typography variant="caption" display="block">
                Works on AI Model Development, Training.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper sx={{ padding: '20px', backgroundColor: '#292929', color: 'white', borderRadius: '12px' }}>
              <Avatar src="/avatar/Harshil.jpg" sx={{ width: 128, height: 128, margin: 'auto' }}/>
              <Typography variant="h6" gutterBottom>
                Harshil
              </Typography>
              <Typography variant="body2">
                Frontend Developer and Designer
              </Typography>
              <Typography variant="caption" display="block">
                Focuses on Frontend Development and Design.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper sx={{ padding: '20px', backgroundColor: '#292929', color: 'white', borderRadius: '12px' }}>
              <Avatar src="/avatar/Pushti.jpg" sx={{ width: 128, height: 128, margin: 'auto' }}/>
              <Typography variant="h6" gutterBottom>
                Pushti
              </Typography>
              <Typography variant="body2">
                UI/UX Designer
              </Typography>
              <Typography variant="caption" display="block">
                Specializes in UI/UX and Frontend Design.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </motion.div>
    </Container>
  );
};

export default About;
