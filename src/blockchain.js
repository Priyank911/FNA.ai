import React, { useState } from 'react';
import { Container, Typography, Box, Button, Modal } from '@mui/material';
import { motion } from 'framer-motion';
import Countdown from 'react-countdown';

// Styles
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#141010',
    color: '#ffffff',
    textAlign: 'center',
  },
  header: {
    fontSize: '3.5rem',
    fontWeight: 'bold',
    marginBottom: '20px',
    color: '#76ff03',
  },
  subheader: {
    fontSize: '1.5rem',
    color: '#cccccc',
    marginBottom: '30px',
  },
  countdown: {
    fontSize: '2.5rem',
    marginBottom: '20px',
    color: '#76ff03',
  },
  button: {
    padding: '10px 20px',
    fontSize: '1.2rem',
    fontWeight: 'bold',
    color: '#000',
    backgroundColor: '#76ff03',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    '&:hover': {
      backgroundColor: '#64dd17',
    },
  },
  featureBox: {
    marginTop: '60px',
    padding: '20px',
    backgroundColor: '#282828',
    borderRadius: '10px',
    maxWidth: '600px',
    width: '100%',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  featureTitle: {
    fontSize: '1.8rem',
    color: '#76ff03',
    marginBottom: '15px',
    textAlign: 'center',
  },
  featureList: {
    textAlign: 'left',
    paddingLeft: '20px',
    color: '#eeeeee',
  },
  featuresDisplay: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '20px',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '10px',
    padding: '20px',
    transition: 'opacity 0.5s ease',
  },
};

const CountdownRenderer = ({ days, hours, minutes, seconds }) => {
  return (
    <span>
      {days}d {hours}h {minutes}m {seconds}s
    </span>
  );
};

const Blockchain = () => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [showFeatures, setShowFeatures] = useState(false);
  const launchDate = new Date('2024-12-31T00:00:00');

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  const toggleFeatures = () => setShowFeatures((prev) => !prev);

  return (
    <Container style={styles.container}>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <Typography variant="h1" style={styles.header}>
          Blockchain Features Coming Soon!
        </Typography>
        <Typography variant="subtitle1" style={styles.subheader}>
          Get ready for an innovative blockchain experience with new features and tools.
        </Typography>
        <Typography variant="h4" style={styles.countdown}>
          <Countdown date={launchDate} renderer={CountdownRenderer} />
        </Typography>
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Button
            variant="contained"
            style={styles.button}
            onClick={toggleFeatures}
          >
            Upcoming Features
          </Button>
        </motion.div>
        {showFeatures && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            style={styles.featuresDisplay}
          >
            <Typography variant="h5" style={styles.featureTitle}>
              🚀 Upcoming Features:
            </Typography>
            <ul style={styles.featureList}>
              <li>🔗 Real-Time Blockchain Explorer</li>
              <li>📝 Smart Contract Deployment Tools</li>
              <li>🔒 Secure Transaction Verification</li>
              <li>⚡ Lightning Fast Node Synchronization</li>
              <li>🛡️ Advanced Security Protocols</li>
            </ul>
          </motion.div>
        )}
      </motion.div>

      {/* Modal for upcoming features */}
      <Modal
        open={modalIsOpen}
        onClose={closeModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <div style={{ padding: '20px' }}>
          <Typography variant="h4" gutterBottom>
            Upcoming Features
          </Typography>
          <Typography variant="body1" gutterBottom>
            Stay tuned for these exciting features coming soon to our blockchain platform!
          </Typography>
          <Button
            variant="contained"
            onClick={closeModal}
            style={{
              padding: '10px 20px',
              fontSize: '1rem',
              fontWeight: 'bold',
              borderRadius: '5px',
              backgroundColor: '#76ff03',
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
          © 2024 Blockchain Project. All rights reserved.
        </Typography>
      </div>
    </Container>
  );
};

export default Blockchain;
