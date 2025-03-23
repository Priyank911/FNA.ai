import React, { useState, useEffect, useRef, useCallback } from 'react';
import { getDocs, collection, onSnapshot, query, orderBy, limit, where } from 'firebase/firestore';
import { db } from './firebase';
import { Container, Box, Typography, TextField, IconButton, Paper, Grid, ButtonGroup, Button, CircularProgress } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import DownloadIcon from '@mui/icons-material/Download';
import StorageIcon from '@mui/icons-material/Storage';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PersonIcon from '@mui/icons-material/Person';
import { styled } from '@mui/material/styles';
import { motion, AnimatePresence } from 'framer-motion';
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
  flexDirection: 'column',
  background: 'linear-gradient(135deg, rgba(17, 25, 40, 0.9) 0%, rgba(15, 23, 42, 0.8) 100%)',
  backdropFilter: 'blur(16px) saturate(180%)',
  borderRadius: '16px',
  color: '#FFF',
  overflow: 'hidden',
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  position: 'relative',
  height: '100%',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
    '&::before': {
      opacity: 1,
    },
    '& .thumbnail-overlay': {
      opacity: 1,
    }
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: '16px',
    border: '2px solid transparent',
    background: 'linear-gradient(135deg, #3B82F6, #8B5CF6) border-box',
    WebkitMask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
    WebkitMaskComposite: 'destination-out',
    maskComposite: 'exclude',
    opacity: 0,
    transition: 'opacity 0.4s ease',
  },
}));

const ThumbnailBox = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '220px',
  position: 'relative',
  overflow: 'hidden',
  borderRadius: '12px 12px 0 0',
  '& img, & video': {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 0.6s ease',
  },
  '&:hover': {
    '& img, & video': {
      transform: 'scale(1.1)',
    },
    '& .thumbnail-overlay': {
      opacity: 1,
    }
  },
  '& .thumbnail-overlay': {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0) 100%)',
    opacity: 0,
    transition: 'opacity 0.3s ease',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    padding: '16px',
  },
}));

const ContentBox = styled(Box)(({ theme }) => ({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  padding: theme.spacing(3),
  justifyContent: 'space-between',
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: '50%',
    left: 0,
    width: '3px',
    height: '40%',
    background: 'linear-gradient(to bottom, #3B82F6, #8B5CF6)',
    transform: 'translateY(-50%)',
    borderRadius: '4px',
  },
}));

const VideoTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  fontSize: '1.25rem',
  background: 'linear-gradient(135deg, #fff 0%, #94A3B8 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  marginBottom: theme.spacing(1),
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
}));

const VideoDescription = styled(Typography)(({ theme }) => ({
  fontSize: '0.9rem',
  color: '#94A3B8',
  lineHeight: 1.6,
  marginBottom: theme.spacing(2),
}));

const DownloadButton = styled(Button)(({ theme }) => ({
  backgroundColor: 'rgba(59, 130, 246, 0.15)',
  color: '#fff',
  borderRadius: '12px',
  padding: '8px 16px',
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  fontSize: '0.875rem',
  fontWeight: 600,
  textTransform: 'none',
  border: '1px solid rgba(59, 130, 246, 0.3)',
  backdropFilter: 'blur(8px)',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  '&:hover': {
    backgroundColor: 'rgba(59, 130, 246, 0.25)',
    transform: 'translateY(-2px)',
    boxShadow: '0 8px 16px rgba(59, 130, 246, 0.2)',
    border: '1px solid rgba(59, 130, 246, 0.5)',
    '& .download-icon': {
      transform: 'translateY(2px)',
    }
  },
  '& .download-icon': {
    transition: 'transform 0.3s ease',
    fontSize: '20px'
  },
  [theme.breakpoints.down('sm')]: {
    padding: '6px 12px',
    '& .button-text': {
      display: 'none'
    }
  }
}));

const VideoMetadata = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
  color: '#64748B',
  fontSize: '0.85rem',
  marginTop: theme.spacing(2),
  '& > div': {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(0.5),
  },
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

const VideoCard = styled(motion.div)(({ theme }) => ({
  background: 'linear-gradient(135deg, rgba(17, 25, 40, 0.9) 0%, rgba(15, 23, 42, 0.8) 100%)',
  backdropFilter: 'blur(16px) saturate(180%)',
  borderRadius: '16px',
  overflow: 'hidden',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  height: '100%',
  position: 'relative',
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '4px',
    background: 'linear-gradient(90deg, #3B82F6, #8B5CF6)',
    opacity: 0,
    transition: 'opacity 0.3s ease',
  },
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
    '&::before': {
      opacity: 1,
    },
    '& .video-overlay': {
      opacity: 1,
    },
    '& .video-info': {
      transform: 'translateX(0)',
      opacity: 1,
    }
  }
}));

const VideoContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: '100%',
  height: '240px',
  overflow: 'hidden',
  borderRadius: '12px 12px 0 0',
  '&::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(to right, rgba(0,0,0,0.2), transparent)',
    pointerEvents: 'none',
  },
  '& video': {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  }
}));

const VideoOverlay = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.2) 100%)',
  opacity: 0,
  transition: 'opacity 0.3s ease',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-end',
  padding: '16px',
  zIndex: 2,
}));

const VideoInfo = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  right: 0,
  width: '200px',
  height: '100%',
  background: 'linear-gradient(to left, rgba(0,0,0,0.95), rgba(0,0,0,0.8))',
  padding: theme.spacing(2),
  transform: 'translateX(100%)',
  opacity: 0,
  transition: 'all 0.3s ease',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  zIndex: 3,
}));

const TimeStamp = styled(Typography)(({ theme }) => ({
  color: 'rgba(255,255,255,0.7)',
  fontSize: '0.75rem',
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(0.5),
  '&::before': {
    content: '""',
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    backgroundColor: '#10B981',
    display: 'inline-block',
  }
}));

const VideoControls = styled(Box)(({ theme }) => ({
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  padding: '16px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
  opacity: 0,
  transform: 'translateY(20px)',
  transition: 'all 0.3s ease',
  zIndex: 3,
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
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef();
  const VIDEOS_PER_PAGE = 10;

  const lastVideoElementRef = useCallback(node => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPage(prevPage => prevPage + 1);
      }
    });
    if (node) observer.current.observe(node);
  }, [loading, hasMore]);

  useEffect(() => {
    const fetchVideos = async () => {
      setLoading(true);
      setError(null);

      try {
        const videosRef = collection(db, 'videos');
        const q = query(
          videosRef,
          orderBy('timestamp', 'desc'),
          limit(page * VIDEOS_PER_PAGE)
        );
        const querySnapshot = await getDocs(q);
        const videoData = querySnapshot.docs.map(doc => ({
            id: doc.id,
          ...doc.data(),
          timestamp: doc.data().timestamp?.toDate() || new Date()
        }));
        setVideos(videoData);
        setFilteredVideos(videoData);
        setHasMore(videoData.length === page * VIDEOS_PER_PAGE);
        
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
  }, [page]);

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
        const videosRef = collection(db, 'videos');
        let queryConstraints = [orderBy('timestamp', 'desc')];
        
        // Adjust query based on selected period
        switch(selectedPeriod) {
          case 'daily':
            // Last 24 hours
            queryConstraints.push(
              where('timestamp', '>=', new Date(Date.now() - 24 * 60 * 60 * 1000))
            );
            break;
          case 'weekly':
            // Last 7 days
            queryConstraints.push(
              where('timestamp', '>=', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000))
            );
            break;
          case 'monthly':
            // Current month
            const firstDayOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
            queryConstraints.push(
              where('timestamp', '>=', firstDayOfMonth)
            );
            break;
        }

        const q = query(videosRef, ...queryConstraints);
        const querySnapshot = await getDocs(q);
        
        const videoData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          timestamp: doc.data().timestamp?.toDate() || new Date()
        }));

        setVideos(videoData);
        setFilteredVideos(videoData);
        
        // Process data based on selected period
        let processedData;
        switch(selectedPeriod) {
          case 'daily':
            processedData = processHourlyData(videoData, new Date());
            break;
          case 'weekly':
            processedData = processWeeklyData(videoData, new Date());
            break;
          case 'monthly':
            processedData = processMonthlyData(videoData, new Date());
            break;
        }
        
        setMonthlyData(processedData);
        setLastUpdate(new Date());
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAndProcessData();

    // Set up real-time listener
    const videosRef = collection(db, 'videos');
    const recentVideosQuery = query(
      videosRef,
      orderBy('timestamp', 'desc'),
      limit(100)
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
        const allVideos = [...changes, ...videos].slice(0, 100);
        processAndUpdateChartData(allVideos);
        setLastUpdate(new Date());
        
        setAnimationConfig({
          duration: 750,
          easing: 'easeInOutQuart',
        });
      }
    });

    return () => unsubscribe();
  }, [selectedPeriod]);

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

  const createDataset = (label, color, data) => ({
    label,
    data,
    borderColor: color,
    backgroundColor: `${color}15`,
    borderWidth: 2,
    tension: 0.4,
    fill: true,
    pointRadius: 0,
    pointHoverRadius: 4,
    pointBackgroundColor: color,
    pointBorderColor: '#fff',
    pointBorderWidth: 1,
    pointHoverBorderWidth: 2,
    pointHoverBackgroundColor: color,
    pointHoverBorderColor: '#fff',
  });

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
        createDataset('New Uploads', '#3B82F6', new Array(24).fill(0)),
        createDataset('Report Uploads', '#8B5CF6', new Array(24).fill(0))
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
    // Generate labels for last 7 days
    const days = Array.from({length: 7}, (_, i) => {
      const date = new Date(now);
      date.setDate(now.getDate() - (6 - i));
      return {
        label: date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }),
        timestamp: date,
        startOfDay: new Date(date.setHours(0, 0, 0, 0)),
        endOfDay: new Date(date.setHours(23, 59, 59, 999))
      };
    });

    const data = {
      labels: days.map(d => d.label),
      datasets: [
        createDataset('New Uploads', '#3B82F6', new Array(7).fill(0)),
        createDataset('Report Uploads', '#8B5CF6', new Array(7).fill(0))
      ]
    };

    // Process videos for each day
    videos.forEach(video => {
      if (video.timestamp) {
        const uploadTime = new Date(video.timestamp);
        
        // Find matching day
        const dayIndex = days.findIndex(day => 
          uploadTime >= day.startOfDay && uploadTime <= day.endOfDay
        );

        if (dayIndex !== -1) {
          if (video.type === 'report') {
            data.datasets[1].data[dayIndex]++;
          } else {
            data.datasets[0].data[dayIndex]++;
          }
        }
      }
    });

    return data;
  };

  const processMonthlyData = (videos, now) => {
    // Get the first day of current month
    const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
    // Get the last day of current month
    const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    // Number of days in current month
    const daysInMonth = lastDay.getDate();

    // Generate labels for each day of the month
    const days = Array.from({length: daysInMonth}, (_, i) => {
      const date = new Date(firstDay);
      date.setDate(i + 1);
      return {
        label: date.toLocaleDateString('en-US', { day: 'numeric', month: 'short' }),
        timestamp: date,
        startOfDay: new Date(date.setHours(0, 0, 0, 0)),
        endOfDay: new Date(date.setHours(23, 59, 59, 999))
      };
    });

    const data = {
      labels: days.map(d => d.label),
      datasets: [
        createDataset('New Uploads', '#3B82F6', new Array(daysInMonth).fill(0)),
        createDataset('Report Uploads', '#8B5CF6', new Array(daysInMonth).fill(0))
      ]
    };

    // Process videos for each day
    videos.forEach(video => {
      if (video.timestamp) {
        const uploadTime = new Date(video.timestamp);
        
        // Check if upload is within current month
        if (uploadTime >= firstDay && uploadTime <= lastDay) {
          const dayIndex = uploadTime.getDate() - 1; // -1 because array is 0-based
          
          if (video.type === 'report') {
            data.datasets[1].data[dayIndex]++;
          } else {
            data.datasets[0].data[dayIndex]++;
          }
        }
      }
    });

    return data;
  };

  const handleVideoPlay = (videoElement) => {
    // Pause all other videos
    document.querySelectorAll('video').forEach(video => {
      if (video !== videoElement) {
        video.pause();
      }
    });
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
      mode: 'nearest',
      axis: 'x',
      intersect: false,
    },
    animation: {
      duration: animationConfig.duration,
      easing: animationConfig.easing,
    },
    layout: {
      padding: {
        left: 10,
        right: 20,
        top: 20,
        bottom: 10
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(255, 255, 255, 0.03)',
          drawBorder: false,
          drawTicks: false,
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.4)',
          font: {
            size: 10,
            family: "'Inter', sans-serif",
          },
          padding: 15,
          maxTicksLimit: 5,
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
          color: 'rgba(255, 255, 255, 0.4)',
          font: {
            size: 10,
            family: "'Inter', sans-serif",
          },
          maxRotation: 0,
          maxTicksLimit: 8,
          padding: 8,
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
          color: 'rgba(255, 255, 255, 0.6)',
          font: {
            size: 11,
            family: "'Inter', sans-serif",
            weight: '500',
          },
          boxWidth: 8,
          usePointStyle: true,
          pointStyle: 'circle',
          padding: 15,
        },
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        titleFont: {
          size: 12,
          family: "'Inter', sans-serif",
          weight: '600',
        },
        bodyFont: {
          size: 11,
          family: "'Inter', sans-serif",
        },
        padding: 10,
        cornerRadius: 4,
        displayColors: true,
        usePointStyle: true,
        borderColor: 'rgba(255, 255, 255, 0.1)',
        borderWidth: 1,
        callbacks: {
          label: function(context) {
            const label = context.dataset.label || '';
            const value = context.parsed.y;
            return ` ${label}: ${value}`;
          },
          title: function(context) {
            return context[0].label;
          }
        },
      },
    },
  };

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      sx={{
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
          component={motion.div}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
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
          sx={{
              color: '#fff',
              fontWeight: 600,
              fontSize: { xs: '1.5rem', sm: '2rem' },
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)',
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
            maxWidth: '300px',
              '& .MuiOutlinedInput-root': {
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '12px',
                '& fieldset': {
                  borderColor: 'rgba(255, 255, 255, 0.1)',
                },
                '&:hover fieldset': {
                  borderColor: 'rgba(255, 255, 255, 0.2)',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#3B82F6',
                },
              },
              '& input': {
                color: '#fff',
              },
          }}
          InputProps={{
            endAdornment: (
                <IconButton sx={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                  <SearchIcon />
              </IconButton>
            ),
          }}
        />
      </Box>

        {/* Video Grid */}
        <AnimatePresence>
          <Grid container spacing={3}>
          {filteredVideos.map((video, index) => {
              const ipfsHash = video.videoHash?.split('/').pop() || '';
              const videoUrl = `https://jade-quick-haddock-516.mypinata.cloud/ipfs/${ipfsHash}`;

            return (
                <Grid 
                  item 
                  xs={12} 
                  sm={6} 
                  md={4} 
                  key={video.id}
                  ref={index === filteredVideos.length - 1 ? lastVideoElementRef : null}
                >
                  <VideoCard
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <VideoContainer>
                    <video
                      src={videoUrl}
                        controls
                        preload="metadata"
                        onPlay={(e) => handleVideoPlay(e.target)}
                      />
                      <VideoOverlay className="video-overlay">
                        <Typography variant="h6" sx={{ 
                          color: '#fff', 
                          mb: 1,
                          fontWeight: 600,
                          textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
                        }}>
                          {video.caption || "Untitled Video"}
                    </Typography>
                        <TimeStamp>
                          {new Date(video.timestamp).toLocaleString()}
                        </TimeStamp>
                      </VideoOverlay>
                      <VideoInfo className="video-info">
                        <Box>
                          <Typography variant="subtitle2" sx={{ 
                            color: '#fff',
                            mb: 1,
                            fontWeight: 600,
                            borderBottom: '2px solid rgba(59, 130, 246, 0.5)',
                            pb: 1
                          }}>
                            Video Details
                    </Typography>
                          <Typography variant="body2" sx={{ 
                            color: '#94A3B8',
                            mb: 2,
                            fontSize: '0.85rem'
                          }}>
                            {video.overview || "No description available"}
                          </Typography>
                          <Box sx={{ 
                    display: 'flex',
                    alignItems: 'center',
                            gap: 1,
                            mb: 2
                          }}>
                            <PersonIcon sx={{ fontSize: 14, color: 'rgba(255,255,255,0.7)' }} />
                            <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                              {video.uploader || "Anonymous"}
                            </Typography>
                          </Box>
                        </Box>
                  <DownloadButton
                          onClick={() => handleDownload(video.videoHash)}
                          startIcon={<DownloadIcon className="download-icon" />}
                          fullWidth
                        >
                          <span className="button-text">Download Now</span>
                  </DownloadButton>
                      </VideoInfo>
                    </VideoContainer>
                  </VideoCard>
                </Grid>
            );
          })}
          </Grid>
        </AnimatePresence>

        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <CircularProgress sx={{ color: '#3B82F6' }} />
        </Box>
        )}

        {error && (
          <Typography sx={{ color: '#EF4444', textAlign: 'center', mt: 4 }}>
            Error: {error}
          </Typography>
        )}
      </Container>
    </Box>
  );
};

export default HistoryPage;