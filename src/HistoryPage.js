import React, { useState, useEffect } from 'react';
import { getDocs, collection, onSnapshot, query, orderBy, limit } from 'firebase/firestore';
import { db } from './firebase';
import { Container, Box, Typography, TextField, IconButton, Paper, Grid, ButtonGroup, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import DownloadIcon from '@mui/icons-material/Download';
import StorageIcon from '@mui/icons-material/Storage';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import { styled } from '@mui/material/styles';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const StyledPaper = styled(Paper)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  background: 'rgba(17, 25, 40, 0.75)',
  backdropFilter: 'blur(16px) saturate(180%)',
  borderRadius: '10px',
  color: '#FFF',
  overflow: 'hidden',
  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
  border: '1px solid rgba(255, 255, 255, 0.125)',
  '&:hover': {
    transform: 'scale(1.03)',
    boxShadow: '0 8px 15px rgba(0, 0, 0, 0.2)',
  },
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
  },
}));

const ThumbnailBox = styled(Box)(({ theme }) => ({
  width: '180px',
  height: '140px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRight: '1px solid #444',
  padding: theme.spacing(2),
  overflow: 'hidden',
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    height: '120px',
    borderRight: 'none',
    borderBottom: '1px solid #444',
  },
}));

const ContentBox = styled(Box)(({ theme }) => ({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  padding: theme.spacing(2),
  justifyContent: 'space-between',
}));

const DownloadButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: 'rgba(255, 255, 255, 0.9)',
  borderRadius: '50px',
  color: '#000',
  padding: theme.spacing(1, 2),
  '&:hover': {
    backgroundColor: '#fff',
  },
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
}));

const StatCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  background: 'rgba(17, 25, 40, 0.75)',
  backdropFilter: 'blur(16px) saturate(180%)',
  borderRadius: '16px',
  color: '#FFF',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'all 0.3s ease',
  position: 'relative',
  overflow: 'hidden',
  border: '1px solid rgba(255, 255, 255, 0.125)',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 8px 25px rgba(0, 0, 0, 0.2)',
    '&::before': {
      transform: 'translateX(100%)',
    }
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: '-100%',
    width: '100%',
    height: '100%',
    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)',
    transition: 'transform 0.5s ease',
  }
}));

const ChartContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  background: 'rgba(17, 25, 40, 0.75)',
  backdropFilter: 'blur(16px) saturate(180%)',
  borderRadius: '20px',
  height: '100%',
  minHeight: '450px',
  position: 'relative',
  overflow: 'hidden',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
  border: '1px solid rgba(255, 255, 255, 0.125)',
  [theme.breakpoints.down('sm')]: {
    minHeight: '350px',
    padding: theme.spacing(2),
  }
}));

const StatValue = styled(Typography)(({ theme }) => ({
  fontSize: '2.5rem',
  fontWeight: 'bold',
  background: 'linear-gradient(45deg, #8B5CF6, #3B82F6)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  marginBottom: theme.spacing(1),
}));

const StatLabel = styled(Typography)(({ theme }) => ({
  fontSize: '0.9rem',
  color: 'rgba(255,255,255,0.7)',
  textTransform: 'uppercase',
  letterSpacing: '1px',
}));

const StatBox = styled(Paper)(({ theme, isActive }) => ({
  background: isActive ? 
    'rgba(59, 130, 246, 0.15)' : 
    'rgba(17, 25, 40, 0.75)',
  backdropFilter: 'blur(16px) saturate(180%)',
  borderRadius: '20px',
  padding: theme.spacing(3),
  color: '#FFF',
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  border: '1px solid rgba(255, 255, 255, 0.125)',
  transition: 'all 0.3s ease',
  cursor: 'pointer',
  position: 'relative',
  overflow: 'hidden',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 8px 25px rgba(0, 0, 0, 0.2)',
    '&::after': {
      transform: 'translateX(100%)',
    }
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: '-100%',
    width: '100%',
    height: '2px',
    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
    transition: 'transform 0.5s ease',
  }
}));

const StatIcon = styled(Box)(({ theme }) => ({
  width: '40px',
  height: '40px',
  borderRadius: '12px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: theme.spacing(2),
  background: 'rgba(255, 255, 255, 0.1)',
  '& svg': {
    fontSize: '24px',
    color: '#fff',
  }
}));

const HistoryPage = () => {
  const [videos, setVideos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredVideos, setFilteredVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [monthlyData, setMonthlyData] = useState({
    labels: [],
    datasets: [],
  });
  const [selectedPeriod, setSelectedPeriod] = useState('daily');
  const [selectedStat, setSelectedStat] = useState('news');
  const [realtimeData, setRealtimeData] = useState([]);
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [realtimeUploads, setRealtimeUploads] = useState([]);
  const [animationConfig, setAnimationConfig] = useState({
    duration: 750,
    easing: 'easeInOutQuart',
  });

  useEffect(() => {
    const fetchVideos = async () => {
      setLoading(true);
      setError(null);

      try {
        const querySnapshot = await getDocs(collection(db, 'videos'));
        const videoData = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            ...data,
            uploadedAt: data.timestamp
              ? new Date(data.timestamp).toLocaleString('en-GB', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                  second: '2-digit',
                  hour12: true,
                })
              : null,
            timestamp: data.timestamp,
          };
        });
        setVideos(videoData);
        setFilteredVideos(videoData);
        
        const dailyStats = processMonthlyStats(videoData);
        setMonthlyData({
          labels: dailyStats.labels,
          datasets: [
            {
              label: 'New uploads',
              data: dailyStats.newUploads,
              borderColor: '#8B5CF6',
              backgroundColor: 'rgba(139, 92, 246, 0.1)',
              tension: 0.4,
              fill: true,
              pointRadius: 4,
              pointHoverRadius: 6,
              pointBackgroundColor: '#8B5CF6',
              pointBorderColor: '#fff',
              pointBorderWidth: 2,
            },
            {
              label: 'Report uploads',
              data: dailyStats.reportUploads,
              borderColor: '#3B82F6',
              backgroundColor: 'rgba(59, 130, 246, 0.1)',
              tension: 0.4,
              fill: true,
              pointRadius: 4,
              pointHoverRadius: 6,
              pointBackgroundColor: '#3B82F6',
              pointBorderColor: '#fff',
              pointBorderWidth: 2,
            },
          ],
        });
      } catch (err) {
        console.error('Error fetching video history:', err);
        setError(err.message || 'Failed to fetch video history.');
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  const processMonthlyStats = (videos) => {
    // Get current date and last 30 days
    const today = new Date();
    const last30Days = Array.from({length: 30}, (_, i) => {
      const date = new Date();
      date.setDate(today.getDate() - (29 - i));
      return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' });
    });

    const dailyUploads = new Array(30).fill(0);
    const dailyReports = new Array(30).fill(0);

    videos.forEach(video => {
      if (video.timestamp) {
        const uploadDate = new Date(video.timestamp);
        const dayDiff = Math.floor((today - uploadDate) / (1000 * 60 * 60 * 24));
        
        if (dayDiff >= 0 && dayDiff < 30) {
          const index = 29 - dayDiff;
          if (video.type === 'report') {
            dailyReports[index]++;
          } else {
            dailyUploads[index]++;
          }
        }
      }
    });

    return {
      labels: last30Days,
      newUploads: dailyUploads,
      reportUploads: dailyReports,
    };
  };

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);

    const filtered = videos.filter((video) =>
      video.caption?.toLowerCase().includes(value)
    );
    setFilteredVideos(filtered);
  };

  const handleDownload = (videoHash) => {
    if (videoHash) {
      const ipfsGateway = 'https://jade-quick-haddock-516.mypinata.cloud/ipfs/';
      const downloadUrl = `${ipfsGateway}${videoHash.split('/').pop()}`;

      const a = document.createElement('a');
      a.href = downloadUrl;
      a.download = 'video.mp4';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } else {
      console.error('No video hash available for download');
      alert('Video hash not available. Cannot download.');
    }
  };

  const getStatData = () => ({
    news: {
      icon: <NewspaperIcon />,
      title: 'Total News',
      value: videos.length,
      change: '+12.5%',
      color: '#3B82F6'
    },
    storage: {
      icon: <StorageIcon />,
      title: 'Storage Used',
      value: `${(videos.length * 0.5).toFixed(1)} GB`,
      change: '+5.2%',
      color: '#10B981'
    },
    polygon: {
      icon: <AccountBalanceWalletIcon />,
      title: 'Polygon Network',
      value: '2.5K MATIC',
      change: '+8.1%',
      color: '#8B5CF6'
    }
  });

  const processRealtimeData = (videos, period) => {
    const now = new Date();
    let labels = [];
    let newUploads = [];
    let reportUploads = [];

    switch(period) {
      case 'daily':
        // Generate hourly labels for the last 24 hours
        labels = Array.from({length: 24}, (_, i) => {
          const date = new Date(now);
          date.setHours(now.getHours() - (23 - i));
          return date.toLocaleTimeString('en-US', { hour: '2-digit', hour12: false });
        });

        // Initialize arrays for uploads
        newUploads = new Array(24).fill(0);
        reportUploads = new Array(24).fill(0);

        // Process videos for the last 24 hours
        videos.forEach(video => {
          if (video.timestamp) {
            const uploadTime = new Date(video.timestamp);
            const hourDiff = Math.floor((now - uploadTime) / (1000 * 60 * 60));
            
            if (hourDiff >= 0 && hourDiff < 24) {
              const index = 23 - hourDiff;
              if (video.type === 'report') {
                reportUploads[index]++;
              } else {
                newUploads[index]++;
              }
            }
          }
        });
        break;

      case 'weekly':
        // Generate daily labels for the last 7 days
        labels = Array.from({length: 7}, (_, i) => {
          const date = new Date(now);
          date.setDate(now.getDate() - (6 - i));
          return date.toLocaleDateString('en-US', { weekday: 'short' });
        });

        newUploads = new Array(7).fill(0);
        reportUploads = new Array(7).fill(0);

        videos.forEach(video => {
          if (video.timestamp) {
            const uploadDate = new Date(video.timestamp);
            const dayDiff = Math.floor((now - uploadDate) / (1000 * 60 * 60 * 24));
            
            if (dayDiff >= 0 && dayDiff < 7) {
              const index = 6 - dayDiff;
              if (video.type === 'report') {
                reportUploads[index]++;
              } else {
                newUploads[index]++;
              }
            }
          }
        });
        break;

      case 'monthly':
        // Generate daily labels for the last 30 days
        labels = Array.from({length: 30}, (_, i) => {
          const date = new Date(now);
          date.setDate(now.getDate() - (29 - i));
          return date.toLocaleDateString('en-US', { day: '2-digit', month: 'short' });
        });

        newUploads = new Array(30).fill(0);
        reportUploads = new Array(30).fill(0);

        videos.forEach(video => {
          if (video.timestamp) {
            const uploadDate = new Date(video.timestamp);
            const dayDiff = Math.floor((now - uploadDate) / (1000 * 60 * 60 * 24));
            
            if (dayDiff >= 0 && dayDiff < 30) {
              const index = 29 - dayDiff;
              if (video.type === 'report') {
                reportUploads[index]++;
              } else {
                newUploads[index]++;
              }
            }
          }
        });
        break;
    }

    return {
      labels,
      datasets: [
        {
          label: 'New Uploads',
          data: newUploads,
          borderColor: '#8B5CF6',
          backgroundColor: 'rgba(139, 92, 246, 0.1)',
          tension: 0.4,
          fill: true,
          pointRadius: 4,
          pointHoverRadius: 6,
          pointBackgroundColor: '#8B5CF6',
          pointBorderColor: '#fff',
          pointBorderWidth: 2,
        },
        {
          label: 'Report Uploads',
          data: reportUploads,
          borderColor: '#3B82F6',
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          tension: 0.4,
          fill: true,
          pointRadius: 4,
          pointHoverRadius: 6,
          pointBackgroundColor: '#3B82F6',
          pointBorderColor: '#fff',
          pointBorderWidth: 2,
        }
      ]
    };
  };

  useEffect(() => {
    const fetchAndProcessData = async () => {
      setLoading(true);
      try {
        const querySnapshot = await getDocs(collection(db, 'videos'));
        const videoData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setVideos(videoData);
        setFilteredVideos(videoData);
        const processedData = processRealtimeData(videoData, selectedPeriod);
        setMonthlyData(processedData);
        setLastUpdate(new Date());
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAndProcessData();

    // Set up interval for real-time updates
    const interval = setInterval(fetchAndProcessData, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, [selectedPeriod]);

  useEffect(() => {
    // Initial data fetch
    const fetchInitialData = async () => {
      setLoading(true);
      try {
        const querySnapshot = await getDocs(collection(db, 'videos'));
        const videoData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          timestamp: doc.data().timestamp?.toDate() || new Date()
        }));
        setVideos(videoData);
        setFilteredVideos(videoData);
        processAndUpdateChartData(videoData);
      } catch (err) {
        console.error('Error fetching initial data:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    // Set up real-time listener
    const setupRealtimeListener = () => {
      const videosRef = collection(db, 'videos');
      const recentVideosQuery = query(
        videosRef,
        orderBy('timestamp', 'desc'),
        limit(100) // Limit to last 100 videos for performance
      );

      const unsubscribe = onSnapshot(recentVideosQuery, (snapshot) => {
        const changes = [];
        snapshot.docChanges().forEach((change) => {
          if (change.type === "added" || change.type === "modified") {
            changes.push({
              id: change.doc.id,
              ...change.doc.data(),
              timestamp: change.doc.data().timestamp?.toDate() || new Date()
            });
          }
        });

        if (changes.length > 0) {
          setRealtimeUploads(prev => [...changes, ...prev].slice(0, 100));
          // Update the chart with new data
          const allVideos = [...changes, ...videos].slice(0, 100);
          processAndUpdateChartData(allVideos);
          setLastUpdate(new Date());
          
          // Trigger animation effect
          setAnimationConfig({
            duration: 750,
            easing: 'easeInOutQuart',
          });
        }
      }, (error) => {
        console.error("Error in real-time listener:", error);
        setError(error.message);
      });

      return unsubscribe;
    };

    fetchInitialData();
    const unsubscribe = setupRealtimeListener();

    return () => {
      unsubscribe();
    };
  }, []);

  const processAndUpdateChartData = (videos) => {
    const now = new Date();
    let chartData = {};

    switch(selectedPeriod) {
      case 'daily':
        chartData = processHourlyData(videos, now);
        break;
      case 'weekly':
        chartData = processWeeklyData(videos, now);
        break;
      case 'monthly':
        chartData = processMonthlyData(videos, now);
        break;
    }

    setMonthlyData(chartData);
  };

  const processHourlyData = (videos, now) => {
    const hours = Array.from({length: 24}, (_, i) => {
      const date = new Date(now);
      date.setHours(now.getHours() - (23 - i));
      return {
        label: date.toLocaleTimeString('en-US', { hour: '2-digit', hour12: false }),
        timestamp: date
      };
    });

    const data = {
      labels: hours.map(h => h.label),
      datasets: [
        {
          label: 'New Uploads',
          data: new Array(24).fill(0),
          borderColor: '#8B5CF6',
          backgroundColor: 'rgba(139, 92, 246, 0.1)',
          tension: 0.4,
          fill: true,
          pointRadius: 4,
          pointHoverRadius: 6,
          pointBackgroundColor: '#8B5CF6',
          pointBorderColor: '#fff',
          pointBorderWidth: 2,
        },
        {
          label: 'Report Uploads',
          data: new Array(24).fill(0),
          borderColor: '#3B82F6',
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          tension: 0.4,
          fill: true,
          pointRadius: 4,
          pointHoverRadius: 6,
          pointBackgroundColor: '#3B82F6',
          pointBorderColor: '#fff',
          pointBorderWidth: 2,
        }
      ]
    };

    videos.forEach(video => {
      if (video.timestamp) {
        const uploadTime = new Date(video.timestamp);
        const hourDiff = Math.floor((now - uploadTime) / (1000 * 60 * 60));
        
        if (hourDiff >= 0 && hourDiff < 24) {
          const index = 23 - hourDiff;
          if (video.type === 'report') {
            data.datasets[1].data[index]++;
          } else {
            data.datasets[0].data[index]++;
          }
        }
      }
    });

    return data;
  };

  const processWeeklyData = (videos, now) => {
    // Implementation for weekly data processing
    // This function should return the processed data
    return {};
  };

  const processMonthlyData = (videos, now) => {
    // Implementation for monthly data processing
    // This function should return the processed data
    return {};
  };

  if (loading) {
    return (
      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        color: '#FFF',
        backgroundColor: '#000'
      }}>
        <Typography variant="h6">Loading video history...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        color: '#FFF',
        backgroundColor: '#000'
      }}>
        <Typography variant="h6">Error: {error}</Typography>
      </Box>
    );
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    animation: {
      duration: animationConfig.duration,
      easing: animationConfig.easing,
      onProgress: (animation) => {
        if (animation.currentStep === animation.numSteps) {
          // Reset animation config after completion
          setAnimationConfig({
            duration: 750,
            easing: 'easeInOutQuart',
          });
        }
      }
    },
    transitions: {
      active: {
        animation: {
          duration: 300
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(255, 255, 255, 0.05)',
          drawBorder: false,
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.7)',
          font: {
            size: 11,
            family: "'Inter', sans-serif",
          },
          padding: 10,
          callback: function(value) {
            return value % 1 === 0 ? value : '';
          }
        },
        border: {
          display: false,
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.7)',
          font: {
            size: 11,
            family: "'Inter', sans-serif",
          },
          maxRotation: selectedPeriod === 'daily' ? 0 : 45,
          minRotation: selectedPeriod === 'daily' ? 0 : 45,
        },
        border: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: 'top',
        align: 'end',
        labels: {
          color: 'rgba(255, 255, 255, 0.7)',
          font: {
            size: 12,
            family: "'Inter', sans-serif",
          },
          boxWidth: 12,
          usePointStyle: true,
          pointStyle: 'circle',
        },
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleFont: {
          size: 13,
          family: "'Inter', sans-serif",
        },
        bodyFont: {
          size: 12,
          family: "'Inter', sans-serif",
        },
        padding: 12,
        borderColor: 'rgba(255, 255, 255, 0.1)',
        borderWidth: 1,
        callbacks: {
          label: function(context) {
            const label = context.dataset.label || '';
            const value = context.parsed.y;
            return `${label}: ${value} uploads`;
          },
          title: function(context) {
            const title = context[0].label;
            return `Time: ${title}`;
          }
        },
        animation: {
          duration: 200
        }
      },
    },
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        background: 'transparent',
        pt: 10,
        pb: 10,
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ mb: 6 }}>
          {/* Header */}
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            mb: 4,
            flexWrap: 'wrap',
            gap: 2
          }}>
            <Typography variant="h5" sx={{ 
              color: '#fff',
              fontWeight: 600,
              letterSpacing: '0.5px',
            }}>
              Statistics
            </Typography>
            <ButtonGroup 
              variant="outlined" 
              size="small"
              sx={{
                '& .MuiButton-root': {
                  color: 'rgba(255, 255, 255, 0.7)',
                  borderColor: 'rgba(255, 255, 255, 0.2)',
                  '&.active': {
                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                    borderColor: '#3B82F6',
                    color: '#fff',
                  },
                },
              }}
            >
              {['daily', 'weekly', 'monthly'].map((period) => (
                <Button
                  key={period}
                  className={selectedPeriod === period ? 'active' : ''}
                  onClick={() => setSelectedPeriod(period)}
                >
                  {period.charAt(0).toUpperCase() + period.slice(1)}
                </Button>
              ))}
            </ButtonGroup>
          </Box>

          {/* Main content */}
          <Grid container spacing={3}>
            {/* Left side - Graph */}
            <Grid item xs={12} md={8} sx={{ height: '100%' }}>
              <ChartContainer>
                <Box sx={{ 
                  height: '100%', 
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column'
                }}>
                  <Box sx={{ 
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: 2
                  }}>
                    <Box>
                      <Typography variant="h4" sx={{ 
                        color: '#fff',
                        fontWeight: 'bold',
                      }}>
                        {videos.length}
                      </Typography>
                      <Typography variant="body2" sx={{ 
                        color: 'rgba(255,255,255,0.7)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1
                      }}>
                        total uploads
                        <Box
                          component="span"
                          sx={{
                            width: 8,
                            height: 8,
                            borderRadius: '50%',
                            backgroundColor: '#10B981',
                            animation: 'pulse 2s infinite'
                          }}
                        />
                      </Typography>
                    </Box>
                    <Box sx={{ textAlign: 'right' }}>
                      <Typography variant="caption" sx={{ 
                        color: 'rgba(255,255,255,0.5)',
                        display: 'block'
                      }}>
                        Last updated: {lastUpdate.toLocaleTimeString()}
                      </Typography>
                      <Typography variant="caption" sx={{ 
                        color: '#10B981',
                        display: 'block',
                        mt: 0.5
                      }}>
                        Live updates enabled
                      </Typography>
                    </Box>
                  </Box>
                  <Box sx={{ flex: 1, minHeight: 0 }}>
                    <Line options={chartOptions} data={monthlyData} />
                  </Box>
                </Box>
              </ChartContainer>
            </Grid>

            {/* Right side - Stats */}
            <Grid item xs={12} md={4}>
              <Grid container spacing={2}>
                {Object.entries(getStatData()).map(([key, stat]) => (
                  <Grid item xs={12} key={key}>
                    <StatBox 
                      isActive={selectedStat === key}
                      onClick={() => setSelectedStat(key)}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <StatIcon>
                          {stat.icon}
                        </StatIcon>
                        <Typography
                          variant="caption"
                          sx={{
                            color: stat.change.startsWith('+') ? '#10B981' : '#EF4444',
                            backgroundColor: stat.change.startsWith('+') ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                            padding: '4px 8px',
                            borderRadius: '12px',
                            fontSize: '0.75rem',
                          }}
                        >
                          {stat.change}
                        </Typography>
                      </Box>
                      <Typography variant="h4" sx={{ 
                        fontWeight: 'bold',
                        fontSize: '1.75rem',
                        mb: 1,
                        mt: 2
                      }}>
                        {stat.value}
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                        {stat.title}
                      </Typography>
                    </StatBox>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Box>

        {/* Search Section */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 4,
          px: 2,
        }}
      >
        <Typography
          variant="h5"
          align="left"
          gutterBottom
          sx={{
            mb: { xs: 2, sm: 0 },
            fontWeight: 'bold',
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)',
            fontSize: {
              xs: '1.5rem',
              sm: '2rem',
            },
            textAlign: 'left',
            flex: 1,
            fontFamily: "'Gantari', sans-serif",
            color: '#FFF',
          }}
        >
          Video Upload History
        </Typography>
        <TextField
          placeholder="Search by caption..."
          value={searchTerm}
          onChange={handleSearch}
          variant="outlined"
          size="small"
          sx={{
            backgroundColor: '#333',
            borderRadius: '20px',
            width: '100%',
            maxWidth: '300px',
            input: { color: '#fff' },
          }}
          InputProps={{
            endAdornment: (
              <IconButton>
                <SearchIcon sx={{ color: '#fff' }} />
              </IconButton>
            ),
          }}
        />
      </Box>

        {/* Video List */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {filteredVideos.map((video, index) => {
            const ipfsHashWithoutPrefix = video.videoHash ? video.videoHash.replace("ipfs://", "") : null;
            const videoUrl = ipfsHashWithoutPrefix ? `https://brown-passive-cattle-71.mypinata.cloud/ipfs/${ipfsHashWithoutPrefix}` : null;

            return (
              <StyledPaper key={index}>
                <ThumbnailBox>
                  {videoUrl ? (
                    <video
                      src={videoUrl}
                      controls={false}
                      muted
                      autoPlay={false}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        borderRadius: '8px',
                        border: '1px solid #444'
                      }}
                    />
                  ) : (
                    <Box
                      component="img"
                      src={video.thumbnailUrl || "/api/placeholder/150/100"}
                      alt={video.caption}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        borderRadius: '8px',
                        border: '1px solid #444'
                      }}
                    />
                  )}
                </ThumbnailBox>

                <ContentBox>
                  <div>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 'bold',
                        fontSize: '1rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                      }}
                    >
                      {video.caption || "UPLOADER NAME"}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        fontSize: '0.8rem',
                        color: '#bbb',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                      }}
                    >
                      {video.overview || "Overview Not Available"}
                    </Typography>
                  </div>
                </ContentBox>

                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 2,
                  }}
                >
                  <DownloadButton
                    onClick={() => handleDownload(ipfsHashWithoutPrefix)}
                    aria-label="download"
                  >
                    <DownloadIcon sx={{ fontSize: '1.2rem' }} />
                    <Typography
                      component="span"
                      sx={{
                        display: { xs: 'none', sm: 'block' },
                        fontWeight: 'bold',
                        fontSize: '0.8rem',
                      }}
                    >
                      DOWNLOAD
                    </Typography>
                  </DownloadButton>
                </Box>
              </StyledPaper>
            );
          })}
        </Box>
      </Container>
    </Box>
  );
};

export default HistoryPage;