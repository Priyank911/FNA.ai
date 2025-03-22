import React, { useState } from 'react';
import { Container, Box, Typography, Grid, Paper, Avatar } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { styled } from '@mui/material/styles';

const StyledContainer = styled(Box)(({ theme }) => ({
  color: '#fff',
  minHeight: '100vh',
  position: 'relative',
  overflow: 'hidden',
  paddingTop: '20px',
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

const GlowingText = styled(motion.div)(({ theme }) => ({
  position: 'relative',
  display: 'inline-block',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: '-2px',
    left: '-2px',
    right: '-2px',
    bottom: '-2px',
    background: 'linear-gradient(45deg, #ff0000, #8B0000)',
    borderRadius: '4px',
    zIndex: -1,
    opacity: 0,
    transition: 'opacity 0.3s ease',
  },
  '&:hover::before': {
    opacity: 0.5,
  }
}));

const FloatingCard = styled(motion.div)(({ theme }) => ({
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    inset: '-2px',
    background: 'linear-gradient(45deg, #ff0000, #8B0000)',
    borderRadius: '20px',
    zIndex: -1,
    opacity: 0.5,
  }
}));

const TeamMemberCard = styled(motion.div)(({ theme }) => ({
  position: 'relative',
  borderRadius: '20px',
  overflow: 'hidden',
  aspectRatio: '1',
  cursor: 'pointer',
  background: '#0A0A0A',
  '&::before': {
    content: '""',
    position: 'absolute',
    inset: 0,
    background: 'linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.8) 100%)',
    opacity: 0,
    transition: 'opacity 0.4s ease',
    zIndex: 1
  },
  '&:hover::before': {
    opacity: 1
  },
  '&:hover .member-details': {
    opacity: 1,
    transform: 'translateY(0)'
  },
  '&:hover .member-image': {
    transform: 'scale(1.05)'
  },
  '&:hover .member-tag': {
    transform: 'translateY(-2px)',
    boxShadow: '0 8px 25px rgba(255, 0, 0, 0.3)',
    background: 'rgba(0,0,0,0.95)',
  }
}));

const MemberImage = styled('img')({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  transition: 'transform 0.7s ease',
});

const MemberTag = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '1rem',
  right: '1rem',
  padding: '0.4rem 0.8rem',
  background: 'rgba(0,0,0,0.85)',
  color: '#fff',
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  zIndex: 2,
  backdropFilter: 'blur(8px)',
  borderRadius: '3px',
  boxShadow: '0 4px 15px rgba(255, 0, 0, 0.2)',
  border: '1px solid rgba(255,255,255,0.1)',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '2px',
    height: '100%',
    background: '#ff0000',
    boxShadow: '0 0 10px #ff0000',
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    inset: 0,
    background: 'linear-gradient(125deg, rgba(255,0,0,0.1) 0%, transparent 70%)',
    opacity: 0.5,
  },
  '.tag-content': {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    gap: '0.3rem',
  },
  '.tag-icon': {
    width: '4px',
    height: '4px',
    background: '#ff0000',
    borderRadius: '50%',
    boxShadow: '0 0 8px #ff0000',
    animation: 'tagPulse 2s infinite',
  },
  '@keyframes tagPulse': {
    '0%': {
      transform: 'scale(1)',
      opacity: 1,
    },
    '50%': {
      transform: 'scale(1.5)',
      opacity: 0.5,
    },
    '100%': {
      transform: 'scale(1)',
      opacity: 1,
    }
  }
}));

const TagText = styled(Typography)({
  fontWeight: 700,
  textTransform: 'uppercase',
  letterSpacing: '1px',
  fontSize: '0.65rem',
  background: 'linear-gradient(90deg, #fff, #ff9999)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  textShadow: '0 0 15px rgba(255,255,255,0.2)',
});

const MemberDetails = styled(Box)({
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  padding: '2rem',
  color: '#fff',
  zIndex: 2,
  opacity: 0,
  transform: 'translateY(20px)',
  transition: 'all 0.4s ease',
  background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.7) 70%, transparent 100%)',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '100%',
    background: 'linear-gradient(45deg, #ff0000 0%, transparent 100%)',
    opacity: 0.1,
    zIndex: -1
  }
});

const MemberRole = styled(Typography)({
  color: '#ff0000',
  fontSize: '0.9rem',
  fontWeight: 600,
  letterSpacing: '1px',
  marginBottom: '0.5rem',
  textTransform: 'uppercase',
  textShadow: '0 2px 4px rgba(0,0,0,0.5)'
});

const MemberDescription = styled(Typography)({
  fontSize: '0.85rem',
  color: 'rgba(255,255,255,0.9)',
  lineHeight: 1.6,
  textShadow: '0 2px 4px rgba(0,0,0,0.5)'
});

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: 150,
  height: 150,
  margin: '0 auto 20px',
  border: '4px solid rgba(139,0,0,0.3)',
  transition: 'all 0.5s ease',
  position: 'relative',
  '&::after': {
    content: '""',
    position: 'absolute',
    top: '-10px',
    left: '-10px',
    right: '-10px',
    bottom: '-10px',
    border: '2px solid rgba(139,0,0,0.5)',
    borderRadius: '50%',
    animation: 'pulse 2s infinite',
  },
  '@keyframes pulse': {
    '0%': { transform: 'scale(1)', opacity: 1 },
    '50%': { transform: 'scale(1.1)', opacity: 0.5 },
    '100%': { transform: 'scale(1)', opacity: 1 }
  }
}));

const FeatureCard = styled(motion.div)(({ theme }) => ({
  padding: theme.spacing(4),
  background: 'rgba(20,20,20,0.8)',
  backdropFilter: 'blur(10px)',
  borderRadius: '20px',
  position: 'relative',
  overflow: 'hidden',
  border: '1px solid rgba(139,0,0,0.1)',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-10px)',
    '& .card-glow': {
      opacity: 1,
      transform: 'scale(1.5)',
    }
  },
  '& .card-glow': {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: '150%',
    height: '150%',
    background: 'radial-gradient(circle, rgba(139,0,0,0.2) 0%, rgba(139,0,0,0) 70%)',
    transform: 'translate(-50%, -50%) scale(0.8)',
    opacity: 0,
    transition: 'all 0.5s ease',
    pointerEvents: 'none',
  }
}));

const About = () => {
  const [hoveredCard, setHoveredCard] = useState(null);

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
      <Container 
        maxWidth="lg" 
        sx={{ 
          pt: { xs: 4, md: 12 }, 
          pb: 8,
          px: { xs: 2, sm: 3, md: 4 },
          overflow: 'hidden',
          '@media (max-width: 370px)': {
            px: 1.5,
          }
        }}
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{ width: '100%' }}
        >
          {/* Hero Section */}
          <motion.div variants={itemVariants} style={{ width: '100%' }}>
            <Typography 
              variant="overline" 
              component={motion.div}
              sx={{ 
                color: '#ff0000', 
                letterSpacing: 4,
                mb: 2,
                display: 'block',
                '@media (max-width: 370px)': {
                  fontSize: '0.7rem',
                  letterSpacing: 3,
                }
              }}
            >
              ABOUT US
            </Typography>
            <Typography 
              variant="h2" 
              component={GlowingText}
              sx={{
                fontWeight: 300,
                mb: 3,
                background: 'linear-gradient(45deg, #ffffff, #ff0000)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                '@media (max-width: 370px)': {
                  fontSize: '1.8rem',
                  lineHeight: 1.3,
                }
              }}
            >
              FNA.ai<br />
              Premier platform<br />
              Authenticating digital content
            </Typography>
            <Typography 
              variant="body1" 
              sx={{
                color: 'rgba(255,255,255,0.7)',
                maxWidth: '600px',
                mb: 8,
                lineHeight: 1.8,
                fontSize: { xs: '0.9rem', sm: '1rem' },
                '@media (max-width: 370px)': {
                  fontSize: '0.85rem',
                  lineHeight: 1.6,
                  mb: 4,
                }
              }}
            >
              Founded to combat misinformation, FNA.ai specializes in AI-powered deepfake detection, content summarization, and blockchain-based verification. The platform offers a full-service solution, including media analysis, decentralized storage, NFT creation, and immutable proof of authenticity. With FNA.ai, users can trust the credibility of news content through transparent and verifiable validation.
            </Typography>
          </motion.div>

          {/* Features Section */}
          <Grid container spacing={4} sx={{ mb: 12 }}>
            {[
              {
                title: "Video Upload",
                description: "Upload and verify videos with ease, ensuring authenticity through blockchain."
              },
              {
                title: "Article Credibility Checker",
                description: "Evaluate the trustworthiness of news articles in real-time with our browser extension."
              },
              {
                title: "Video Verification System",
                description: "Detect tampering and deepfakes in video content to maintain integrity and truthfulness."
              },
              {
                title: "Blockchain Integration",
                description: "Leverage an immutable blockchain to secure and authenticate video content."
              }
            ].map((feature, index) => (
              <Grid item xs={12} md={6} key={index}>
          <motion.div
                  variants={itemVariants}
            whileHover={{ scale: 1.05 }}
                  onHoverStart={() => setHoveredCard(index)}
                  onHoverEnd={() => setHoveredCard(null)}
                >
                  <FeatureCard>
                    <div className="card-glow" />
                    <Typography 
                      variant="h5" 
              sx={{
                        mb: 2,
                        fontWeight: 'bold',
                        color: hoveredCard === index ? '#ff0000' : '#fff',
                        transition: 'color 0.3s ease'
                      }}
                    >
                      {feature.title}
              </Typography>
                    <Typography 
                      variant="body1" 
                      sx={{ 
                        color: 'rgba(255,255,255,0.7)',
                        lineHeight: 1.8
                      }}
                    >
                      {feature.description}
              </Typography>
                  </FeatureCard>
          </motion.div>
              </Grid>
            ))}
        </Grid>

          {/* Team Section */}
          <motion.div variants={itemVariants}>
            <Typography 
              variant="h3" 
              sx={{
                mb: 6,
                fontWeight: 300,
                textAlign: 'center',
                background: 'linear-gradient(45deg, #ffffff, #ff0000)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Building the future together
              </Typography>
            <Grid container spacing={4}>
              {[
                {
                  name: "Priyank",
                  role: "Team Leader and Developer",
                  shortRole: "Team Lead",
                  image: "/avatar/Priyank.jpg",
                  description: "Work on Backend, Blockchain, and Frontend."
                },
                {
                  name: "Prayers",
                  role: "AI Model Developer",
                  shortRole: "AI Dev",
                  image: "./avatar/Prayers.jpg",
                  description: "Works on AI Model Development, Training."
                },
                {
                  name: "Harshil",
                  role: "Frontend Developer and Designer",
                  shortRole: "Frontend Dev",
                  image: "/avatar/Harshil.jpg",
                  description: "Focuses on Frontend Development and Design."
                },
                {
                  name: "Pushti",
                  role: "UI/UX Designer",
                  shortRole: "UI/UX",
                  image: "/avatar/Pushti.jpg",
                  description: "Specializes in UI/UX and Frontend Design."
                }
              ].map((member, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <motion.div
                    variants={itemVariants}
                    whileHover={{ scale: 1.02 }}
                  >
                    <TeamMemberCard>
                      <MemberImage 
                        src={member.image} 
                        alt={member.name}
                        className="member-image"
                      />
                      <MemberTag className="member-tag">
                        <div className="tag-content">
                          <span className="tag-icon" />
                          <TagText>
                            {member.shortRole}
                          </TagText>
                        </div>
                      </MemberTag>
                      <MemberDetails className="member-details">
                        <Typography 
                          variant="h6" 
                          sx={{ 
                            mb: 1, 
                            fontWeight: 'bold',
                            textShadow: '0 2px 4px rgba(0,0,0,0.5)'
                          }}
                        >
                          {member.name}
              </Typography>
                        <MemberRole>
                          {member.role}
                        </MemberRole>
                        <MemberDescription>
                          {member.description}
                        </MemberDescription>
                      </MemberDetails>
                    </TeamMemberCard>
          </motion.div>
        </Grid>
              ))}
        </Grid>
          </motion.div>
      </motion.div>
    </Container>
    </StyledContainer>
  );
};

export default About;
