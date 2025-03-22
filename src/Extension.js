import React, { useState } from 'react';
import { Container, Grid, Typography, Button, Box } from '@mui/material';
import { motion } from 'framer-motion';
import Modal from 'react-modal';
import { styled } from '@mui/material/styles';
import VerifiedIcon from '@mui/icons-material/Verified';
import SourceIcon from '@mui/icons-material/Source';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import SpeedIcon from '@mui/icons-material/Speed';

const StyledContainer = styled(Box)(({ theme }) => ({
  color: '#fff',
  minHeight: '100vh',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    right: 0,
    width: '40%',
    height: '100%',
    background: 'linear-gradient(135deg, rgba(139,0,0,0.1) 0%, rgba(0,0,0,0) 100%)',
    zIndex: 0,
  }
}));

const FeatureCard = styled(motion.div)(({ theme }) => ({
  padding: '2rem',
  background: 'rgba(20,20,20,0.8)',
  backdropFilter: 'blur(10px)',
  borderRadius: '20px',
  position: 'relative',
  overflow: 'hidden',
  border: '1px solid rgba(255,255,255,0.1)',
  transition: 'all 0.3s ease',
  '&::before': {
    content: '""',
    position: 'absolute',
    inset: 0,
    background: 'linear-gradient(125deg, rgba(255,0,0,0.1) 0%, transparent 70%)',
    opacity: 0,
    transition: 'opacity 0.3s ease',
  },
  '&:hover': {
    transform: 'translateY(-10px)',
    border: '1px solid rgba(255,0,0,0.3)',
    '&::before': {
      opacity: 1,
    }
  },
  '.feature-icon': {
    fontSize: '3rem',
    color: '#ff0000',
    marginBottom: '1rem',
    transition: 'all 0.3s ease',
  },
  '&:hover .feature-icon': {
    transform: 'scale(1.1)',
    color: '#ffffff',
  }
}));

const StyledButton = styled(Button)(({ theme }) => ({
  padding: '1rem 2rem',
  background: 'linear-gradient(45deg, #ff0000, #ff4444)',
  color: '#ffffff',
  borderRadius: '8px',
  fontSize: '1rem',
  fontWeight: 600,
  textTransform: 'none',
  border: 'none',
  position: 'relative',
  overflow: 'hidden',
  transition: 'all 0.3s ease',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'linear-gradient(45deg, transparent, rgba(255,255,255,0.2), transparent)',
    transform: 'translateX(-100%)',
    transition: 'transform 0.5s ease',
  },
  '&:hover': {
    transform: 'translateY(-3px)',
    boxShadow: '0 10px 20px rgba(255,0,0,0.2)',
    '&::before': {
      transform: 'translateX(100%)',
    }
  }
}));

const StepCard = styled(motion.div)(({ theme }) => ({
  padding: '2rem',
  background: 'rgba(20,20,20,0.9)',
  backdropFilter: 'blur(10px)',
  borderRadius: '15px',
  position: 'relative',
  overflow: 'hidden',
  border: '1px solid rgba(255,255,255,0.1)',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '2px',
    height: '100%',
    background: '#ff0000',
    boxShadow: '0 0 10px #ff0000',
  }
}));

const StyledModal = {
  content: {
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    background: '#0A0A0A',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '20px',
    padding: '2rem',
    maxWidth: '500px',
    width: '90%',
    color: '#ffffff',
    backdropFilter: 'blur(10px)',
    boxShadow: '0 25px 50px rgba(0,0,0,0.5)',
  },
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.8)',
    backdropFilter: 'blur(5px)',
  }
};

const ExtensionPage = () => {
  const [modalIsOpen, setIsOpen] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8
      }
    }
  };

  return (
    <StyledContainer>
      <Container maxWidth="lg" sx={{ pt: { xs: 8, md: 12 }, pb: 8 }}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Hero Section */}
          <motion.div variants={itemVariants}>
            <Typography 
              variant="overline" 
              sx={{ 
                color: '#ff0000', 
                letterSpacing: 4,
                mb: 2,
                display: 'block'
              }}
            >
              BROWSER EXTENSION
            </Typography>
            <Typography 
              variant="h2" 
              sx={{ 
                fontWeight: 300,
                mb: 3,
                background: 'linear-gradient(45deg, #ffffff, #ff0000)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Article Credibility<br />
              Checker
            </Typography>
            <Typography 
              variant="body1" 
              sx={{ 
                color: 'rgba(255,255,255,0.7)',
                maxWidth: '600px',
                mb: 4,
                lineHeight: 1.8
              }}
            >
              A powerful browser extension to instantly verify the credibility of news articles.
              Using advanced AI and trusted databases to provide real-time feedback.
            </Typography>
            <StyledButton onClick={() => window.open('/Extension.zip', '_blank')}>
              Download Extension
            </StyledButton>
          </motion.div>

          {/* Features Section */}
          <Grid container spacing={4} sx={{ mt: 8 }}>
            {[
              {
                icon: <VerifiedIcon className="feature-icon" />,
                title: "Instant Verification",
                description: "Hover over any article and get real-time feedback on its authenticity."
              },
              {
                icon: <SourceIcon className="feature-icon" />,
                title: "Trusted Sources",
                description: "Cross-reference with reliable and verified news sources to avoid misinformation."
              },
              {
                icon: <ThumbUpIcon className="feature-icon" />,
                title: "Easy to Use",
                description: "Simple and intuitive user experience. Just install and start verifying."
              },
              {
                icon: <SpeedIcon className="feature-icon" />,
                title: "Fast & Lightweight",
                description: "Designed to work seamlessly without slowing down your browsing experience."
              }
            ].map((feature, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <motion.div variants={itemVariants}>
                  <FeatureCard>
                    {feature.icon}
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        mb: 2,
                        fontWeight: 'bold',
                        color: '#ffffff'
                      }}
                    >
                      {feature.title}
                    </Typography>
                    <Typography 
                      variant="body2"
                      sx={{ 
                        color: 'rgba(255,255,255,0.7)',
                        lineHeight: 1.6
                      }}
                    >
                      {feature.description}
                    </Typography>
                  </FeatureCard>
                </motion.div>
              </Grid>
            ))}
          </Grid>

          {/* How It Works Section */}
          <Box sx={{ mt: 12 }}>
            <motion.div variants={itemVariants}>
              <Typography 
                variant="h3" 
                sx={{ 
                  mb: 6,
                  textAlign: 'center',
                  background: 'linear-gradient(45deg, #ffffff, #ff0000)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                How It Works
              </Typography>
              <Grid container spacing={4}>
                {[
                  {
                    step: "1. Hover",
                    description: "Hovering over a news article triggers instant analysis."
                  },
                  {
                    step: "2. Analyze",
                    description: "The extension scans the article for credibility signals."
                  },
                  {
                    step: "3. Feedback",
                    description: "Get instant feedback indicating if the article is credible."
                  }
                ].map((step, index) => (
                  <Grid item xs={12} md={4} key={index}>
                    <motion.div variants={itemVariants}>
                      <StepCard>
                        <Typography 
                          variant="h5" 
                          sx={{ 
                            mb: 2,
                            color: '#ff0000',
                            fontWeight: 'bold'
                          }}
                        >
                          {step.step}
                        </Typography>
                        <Typography 
                          variant="body1"
                          sx={{ 
                            color: 'rgba(255,255,255,0.7)',
                            lineHeight: 1.8
                          }}
                        >
                          {step.description}
                        </Typography>
                      </StepCard>
                    </motion.div>
                  </Grid>
                ))}
              </Grid>
            </motion.div>
          </Box>

          {/* Installation Button */}
          <Box sx={{ mt: 8, textAlign: 'center' }}>
            <motion.div variants={itemVariants}>
              <StyledButton onClick={() => setIsOpen(true)}>
                How to Install
              </StyledButton>
            </motion.div>
          </Box>
        </motion.div>
      </Container>

      {/* Installation Modal */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setIsOpen(false)}
        style={StyledModal}
        contentLabel="Installation Instructions"
      >
        <Typography 
          variant="h4" 
          sx={{ 
            mb: 4,
            background: 'linear-gradient(45deg, #ffffff, #ff0000)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Installation Instructions
        </Typography>
        {[
          "Download the extension file by clicking the 'Download Extension' button.",
          "Open your browser settings and go to Extensions.",
          "Enable 'Developer Mode' and click 'Load unpacked.'",
          "Select the extracted folder to install the extension.",
          "The extension is now installed and ready to use!"
        ].map((step, index) => (
          <Typography 
            key={index}
            variant="body1" 
            sx={{ 
              mb: 2,
              color: 'rgba(255,255,255,0.7)',
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              '&::before': {
                content: '""',
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                backgroundColor: '#ff0000',
                display: 'inline-block',
                marginRight: '10px'
              }
            }}
          >
            {step}
          </Typography>
        ))}
        <StyledButton 
          onClick={() => setIsOpen(false)}
          sx={{ mt: 4 }}
        >
          Close
        </StyledButton>
      </Modal>
    </StyledContainer>
  );
};

export default ExtensionPage;
