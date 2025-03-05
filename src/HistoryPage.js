// // export default HistoryPage;
// import React, { useState, useEffect } from 'react';
// import { getDocs, collection } from 'firebase/firestore';
// import { db } from './firebase';
// import { Container, Grid, Paper, Box, Typography } from '@mui/material';

// const HistoryPage = () => {
//   const [videos, setVideos] = useState([]);

//   useEffect(() => {
//     const fetchVideos = async () => {
//       try {
//         const querySnapshot = await getDocs(collection(db, 'videos'));
//         const videoData = querySnapshot.docs.map((doc) => {
//           const data = doc.data();

//           return {
//             ...data,
//             // Ensure uploadedAt is a valid Firestore Timestamp before converting it to a Date
//             uploadedAt: data.uploadedAt 
//               ? data.uploadedAt.toDate().toLocaleString('en-GB', {
//                   weekday: 'long', 
//                   year: 'numeric', 
//                   month: 'long', 
//                   day: 'numeric',
//                   hour: '2-digit', 
//                   minute: '2-digit', 
//                   second: '2-digit', 
//                   hour12: true 
//                 })
//               : null, // If no uploadedAt field, set it as null
//           };
//         });
//         setVideos(videoData);
//       } catch (error) {
//         console.error('Error fetching video history:', error);
//       }
//     };

//     fetchVideos();
//   }, []);

//   return (
//     <Container maxWidth="lg" sx={{ mt: 10, pb: 10 }}>
//       <Typography variant="h4" align="center" gutterBottom sx={{ mb: 5 }}>
//         Video Upload History
//       </Typography>

//       <Grid container spacing={4} justifyContent="center">
//         {videos.map((video, index) => (
//           <Grid item xs={12} sm={6} md={4} key={index}>
//             <Paper
//               elevation={8}
//               className="history-item"
//               sx={{
//                 display: 'flex',
//                 flexDirection: 'column',
//                 padding: 3,
//                 backgroundColor: '#2C2C2C',
//                 borderRadius: '15px',
//                 color: '#FFF',
//                 minHeight: '300px',
//                 height: 'auto',
//                 width: '100%',
//                 transition: 'transform 0.3s ease, box-shadow 0.3s ease',
//                 '&:hover': {
//                   transform: 'scale(1.05)',
//                   boxShadow: '0 15px 30px rgba(0,0,0,0.5)',
//                 },
//               }}
//             >
//               <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
//                 {/* Conditionally render the timestamp only if uploadedAt exists */}
//                 {video.uploadedAt ? (
//                   <Typography variant="caption" sx={{ fontSize: '0.9rem', color: '#888' }}>
//                     {video.uploadedAt}
//                   </Typography>
//                 ) : (
//                   <Typography variant="caption" sx={{ fontSize: '0.9rem', color: '#888' }}>
//                     No Date Available
//                   </Typography>
//                 )}
//               </Box>

//               <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
//                 <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', fontSize: '1.6rem' }}>
//                   {video.caption}
//                 </Typography>
//                 <Typography variant="body1" sx={{ mb: 2, fontSize: '1rem', color: '#ddd' }}>
//                   {video.overview}
//                 </Typography>
//                 <Typography variant="body2" sx={{ color: '#00cc88', fontSize: '0.9rem' }}>
//                   {video.tag}
//                 </Typography>
//               </Box>

//               <Box sx={{ mt: 2, textAlign: 'center' }}>
//                 <video width="100%" height="200" controls style={{ borderRadius: '10px', border: '2px solid #444' }}>
//                   <source src={video.videoURL} type="video/mp4" />
//                   Your browser does not support the video tag.
//                 </video>
//               </Box>
//             </Paper>
//           </Grid>
//         ))}
//       </Grid>
//     </Container>
//   );
// };

// export default HistoryPage;

// import React, { useState, useEffect } from 'react';
// import { getDocs, collection } from 'firebase/firestore';
// import { db } from './firebase';
// import { Container, Grid, Paper, Box, Typography, TextField, IconButton } from '@mui/material';
// import SearchIcon from '@mui/icons-material/Search';

// const HistoryPage = () => {
//   const [videos, setVideos] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filteredVideos, setFilteredVideos] = useState([]);

//   useEffect(() => {
//     const fetchVideos = async () => {
//       try {
//         const querySnapshot = await getDocs(collection(db, 'videos'));
//         const videoData = querySnapshot.docs.map((doc) => {
//           const data = doc.data();
//           return {
//             ...data,
//             uploadedAt: data.uploadedAt
//               ? data.uploadedAt.toDate().toLocaleString('en-GB', {
//                   weekday: 'long',
//                   year: 'numeric',
//                   month: 'long',
//                   day: 'numeric',
//                   hour: '2-digit',
//                   minute: '2-digit',
//                   second: '2-digit',
//                   hour12: true,
//                 })
//               : null,
//           };
//         });
//         setVideos(videoData);
//         setFilteredVideos(videoData);
//       } catch (error) {
//         console.error('Error fetching video history:', error);
//       }
//     };

//     fetchVideos();
//   }, []);

//   const handleSearch = (event) => {
//     const value = event.target.value.toLowerCase();
//     setSearchTerm(value);

//     const filtered = videos.filter((video) =>
//       video.caption?.toLowerCase().includes(value)
//     );
//     setFilteredVideos(filtered);
//   };

//   return (
//     <Box
//       sx={{
//         display: 'flex',
//         flexDirection: 'column',
//         minHeight: '100vh',
//       }}
//     >
//       {/* Title and Search */}
//       <Box
//         sx={{
//           display: 'flex',
//           justifyContent: 'space-between',
//           alignItems: 'center',
//           mt: 10,
//           mb: 4,
//           px: 2,
//         }}
//       >
//         <Typography
//   variant="h3"
//   align="center"
//   gutterBottom
//   sx={{
//     mb: 2,
//     fontWeight: 'bold',
//     textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)',
//     fontSize: {
//       xs: '2rem', 
//       md: '2.5rem', 
//       textAlign: 'center',
//             flex: 1,
//     },
//     fontFamily: "'Gantari', sans-serif", // or "'Rowdies', cursive"
//     color: '#FFF',
//   }}
// >
//   Video Upload History
// </Typography>
//         <TextField
//           placeholder="Search by caption..."
//           value={searchTerm}
//           onChange={handleSearch}
//           variant="outlined"
//           size="small"
//           sx={{
//             backgroundColor: '#333',
//             borderRadius: '20px',
//             width: '100%',
//             maxWidth: '300px',
//             input: { color: '#fff' },
//           }}
//           InputProps={{
//             endAdornment: (
//               <IconButton>
//                 <SearchIcon sx={{ color: '#fff' }} />
//               </IconButton>
//             ),
//           }}
//         />
//       </Box>

//       {/* Videos Grid */}
//       <Container maxWidth="lg" sx={{ flex: 1, py: 2 }}>
//         <Grid container spacing={4}>
//           {filteredVideos.map((video, index) => (
//             <Grid item xs={12} sm={6} md={4} key={index}>
//               <Paper
//                 elevation={10}
//                 sx={{
//                   display: 'flex',
//                   flexDirection: 'column',
//                   padding: 2,
//                   background: 'linear-gradient(135deg, #1E1E1E, #2A2A2A)',
//                   borderRadius: '16px',
//                   color: '#FFF',
//                   minHeight: '150px',
//                   transition: 'transform 0.3s ease, box-shadow 0.3s ease',
//                   '&:hover': {
//                     transform: 'translateY(-8px)',
//                     boxShadow: '0 20px 40px rgba(0,0,0,0.6)',
//                   },
//                 }}
//               >
//                 <Typography
//                   variant="h6"
//                   gutterBottom
//                   sx={{
//                     fontWeight: 'bold',
//                     fontSize: '1.2rem',
//                     overflow: 'hidden',
//                     textOverflow: 'ellipsis',
//                     whiteSpace: 'nowrap',
//                   }}
//                 >
//                   {video.caption}
//                 </Typography>
//                 <Typography
//                   variant="body2"
//                   sx={{
//                     mb: 1,
//                     fontSize: '0.85rem',
//                     color: '#bbb',
//                     overflow: 'hidden',
//                     textOverflow: 'ellipsis',
//                     whiteSpace: 'nowrap',
//                   }}
//                 >
//                   {video.overview}
//                 </Typography>
//                 <Typography variant="body2" sx={{ color: '#00cc88', fontSize: '0.8rem' }}>
//                   {video.tag}
//                 </Typography>
//               </Paper>
//             </Grid>
//           ))}
//         </Grid>
//       </Container>


//     </Box>
//   );
// };

// export default HistoryPage;

// import React, { useState, useEffect } from 'react';
// import { getDocs, collection } from 'firebase/firestore';
// import { db } from './firebase';
// import { Container, Grid, Paper, Box, Typography, TextField, IconButton } from '@mui/material';
// import SearchIcon from '@mui/icons-material/Search';
// import DownloadIcon from '@mui/icons-material/Download';

// const HistoryPage = () => {
//   const [videos, setVideos] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filteredVideos, setFilteredVideos] = useState([]);

//   useEffect(() => {
//     const fetchVideos = async () => {
//       try {
//         const querySnapshot = await getDocs(collection(db, 'videos'));
//         const videoData = querySnapshot.docs.map((doc) => {
//           const data = doc.data();
//           return {
//             id: doc.id,
//             ...data,
//             uploadedAt: data.uploadedAt
//               ? data.uploadedAt.toDate().toLocaleString('en-GB', {
//                   weekday: 'long',
//                   year: 'numeric',
//                   month: 'long',
//                   day: 'numeric',
//                   hour: '2-digit',
//                   minute: '2-digit',
//                   second: '2-digit',
//                   hour12: true,
//                 })
//               : null,
//           };
//         });
//         setVideos(videoData);
//         setFilteredVideos(videoData);
//       } catch (error) {
//         console.error('Error fetching video history:', error);
//       }
//     };

//     fetchVideos();
//   }, []);

//   const handleSearch = (event) => {
//     const value = event.target.value.toLowerCase();
//     setSearchTerm(value);

//     const filtered = videos.filter((video) =>
//       video.caption?.toLowerCase().includes(value)
//     );
//     setFilteredVideos(filtered);
//   };

//   const handleDownload = (videoHash) => {
//     if (videoHash) {
//       // IPFS gateway URL
//       const ipfsGateway = 'https://brown-passive-cattle-71.mypinata.cloud/ipfs/';
//       const downloadUrl = `${ipfsGateway}${videoHash.split('/').pop()}`;
      
//       // Create a temporary anchor element to trigger download
//       const a = document.createElement('a');
//       a.href = downloadUrl;
//       a.download = 'video.mp4'; // Default filename
//       document.body.appendChild(a);
//       a.click();
//       document.body.removeChild(a);
//     } else {
//       console.error('No video hash available for download');
//     }
//   };

//   return (
//     <Box
//       sx={{
//         display: 'flex',
//         flexDirection: 'column',
//         minHeight: '100vh',
//         backgroundColor: '#000',
//         backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.9) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 0, 0, 0.9) 1px, transparent 1px)',
//         backgroundSize: '20px 20px',
//       }}
//     >
//       {/* Title and Search */}
//       <Box
//         sx={{
//           display: 'flex',
//           justifyContent: 'space-between',
//           alignItems: 'center',
//           mt: 10,
//           mb: 4,
//           px: 2,
//         }}
//       >
//         <Typography
//           variant="h3"
//           align="center"
//           gutterBottom
//           sx={{
//             mb: 2,
//             fontWeight: 'bold',
//             textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)',
//             fontSize: {
//               xs: '2rem', 
//               md: '2.5rem'
//             },
//             textAlign: 'center',
//             flex: 1,
//             fontFamily: "'Gantari', sans-serif",
//             color: '#FFF',
//           }}
//         >
//           Video Upload History
//         </Typography>
//         <TextField
//           placeholder="Search by caption..."
//           value={searchTerm}
//           onChange={handleSearch}
//           variant="outlined"
//           size="small"
//           sx={{
//             backgroundColor: '#333',
//             borderRadius: '20px',
//             width: '100%',
//             maxWidth: '300px',
//             input: { color: '#fff' },
//           }}
//           InputProps={{
//             endAdornment: (
//               <IconButton>
//                 <SearchIcon sx={{ color: '#fff' }} />
//               </IconButton>
//             ),
//           }}
//         />
//       </Box>

//       {/* Videos List */}
//       <Container maxWidth="lg" sx={{ flex: 1, py: 2 }}>
//         <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
//           {filteredVideos.map((video, index) => (
//             <Paper
//               key={index}
//               elevation={10}
//               className="history-item"
//               sx={{
//                 display: 'flex',
//                 flexDirection: 'row',
//                 background: 'rgba(50, 50, 50, 0.8)',
//                 borderRadius: '10px',
//                 color: '#FFF',
//                 overflow: 'hidden',
//                 transition: 'transform 0.6s ease-out, box-shadow 0.4s ease',
//                 '&:hover': {
//                   transform: 'scale(1.02)',
//                   boxShadow: '0 15px 30px rgba(0, 0, 0, 0.5)',
//                 },
//               }}
//             >
//               {/* Video Thumbnail/Player from IPFS */}
//               <Box 
//                 sx={{ 
//                   width: '180px',
//                   height: '140px',
//                   display: 'flex',
//                   justifyContent: 'center',
//                   alignItems: 'center',
//                   borderRight: '1px solid #444',
//                   padding: 2,
//                   overflow: 'hidden',
//                 }}
//               >
//                 {video.ipfsHash ? (
//                   <video
//                   src={`https://brown-passive-cattle-71.mypinata.cloud/ipfs/${video.ipfsHash.split('/').pop()}`}
//                   poster={video.thumbnailUrl || "/api/placeholder/150/100"}                  
//                     controls={false}
//                     muted
//                     autoPlay={false}
//                     style={{
//                       width: '100%',
//                       height: '100%',
//                       objectFit: 'cover',
//                       borderRadius: '8px',
//                       border: '1px solid #444'
//                     }}
//                   />
//                 ) : (
//                   <Box 
//                     component="img" 
//                     src={video.thumbnailUrl || "/api/placeholder/150/100"} 
//                     alt={video.caption}
//                     sx={{
//                       width: '100%',
//                       height: '100%',
//                       objectFit: 'cover',
//                       borderRadius: '8px',
//                       border: '1px solid #444'
//                     }}
//                   />
//                 )}
//               </Box>
              
//               {/* Content */}
//               <Box 
//                 sx={{ 
//                   flex: 1, 
//                   display: 'flex', 
//                   flexDirection: 'column',
//                   padding: 2,
//                   justifyContent: 'center'
//                 }}
//               >
//                 <Typography
//                   variant="h6"
//                   sx={{
//                     fontWeight: 'bold',
//                     fontSize: '1.2rem',
//                     textTransform: 'uppercase',
//                     letterSpacing: '0.5px',
//                   }}
//                 >
//                   {video.uploaderName || video.caption || "UPLOADER NAME"}
//                 </Typography>
//                 <Typography
//                   variant="body2"
//                   sx={{
//                     mb: 1,
//                     fontSize: '0.9rem',
//                     color: '#bbb',
//                     display: '-webkit-box',
//                     WebkitLineClamp: 2,
//                     WebkitBoxOrient: 'vertical',
//                     overflow: 'hidden',
//                   }}
//                 >
//                   {video.overview || "Overview Not Available"}
//                 </Typography>
//                 <Typography 
//                   variant="body2" 
//                   sx={{ 
//                     color: '#aaa', 
//                     fontSize: '0.8rem',
//                     mt: 1
//                   }}
//                 >
//                   {video.uploadedAt || ".".repeat(20)}
//                 </Typography>
//               </Box>
              
//               {/* Download Button */}
//               <Box 
//                 sx={{ 
//                   display: 'flex', 
//                   alignItems: 'center',
//                   justifyContent: 'center',
//                   padding: 2
//                 }}
//               >
//                 <IconButton
//                   onClick={() => handleDownload(video.ipfsHash)}
//                   sx={{
//                     backgroundColor: 'rgba(255, 255, 255, 0.9)',
//                     borderRadius: '50px',
//                     color: '#000',
//                     padding: '8px 16px',
//                     '&:hover': {
//                       backgroundColor: '#fff',
//                     },
//                     display: 'flex',
//                     alignItems: 'center',
//                     gap: 1,
//                   }}
//                 >
//                   <DownloadIcon />
//                   <Typography 
//                     component="span" 
//                     sx={{ 
//                       display: { xs: 'none', sm: 'block' },
//                       fontWeight: 'bold'
//                     }}
//                   >
//                     DOWNLOAD
//                   </Typography>
//                 </IconButton>
//               </Box>
//             </Paper>
//           ))}
//         </Box>
//       </Container>
//     </Box>
//   );
// };

// export default HistoryPage;

import React, { useState, useEffect } from 'react';
import { getDocs, collection } from 'firebase/firestore';
import { db } from './firebase';
import { Container, Box, Typography, TextField, IconButton, Paper, styled, useTheme, Tooltip } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import DownloadIcon from '@mui/icons-material/Download';
import Avatar from '@mui/material/Avatar';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import VisibilityIcon from '@mui/icons-material/Visibility';

const StyledPaper = styled(Paper)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'row',
    background: 'rgba(50, 50, 50, 0.8)',
    borderRadius: '10px',
    color: '#FFF',
    overflow: 'hidden',
    transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
    '&:hover': {
        transform: 'scale(1.03)',
        boxShadow: '0 8px 15px rgba(0, 0, 0, 0.5)',
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

const UploaderBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(1),
    gap: theme.spacing(0.5),
    color: '#fff',
    fontSize: '0.8rem',
    fontWeight: 500,
    [theme.breakpoints.down('sm')]: {
        fontSize: '0.9rem',
    },
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

const MetaInfoBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1),
    color: '#aaa',
    fontSize: '0.75rem',
    marginTop: theme.spacing(0.5),
}));

const HistoryPage = () => {
    const [videos, setVideos] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredVideos, setFilteredVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const theme = useTheme();

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
                        // Add likeCount and viewCount; ensure these exist in your Firestore data!
                        likeCount: data.likeCount || 0, // Default to 0 if it doesn't exist
                        viewCount: data.viewCount || 0,
                    };
                });
                setVideos(videoData);
                setFilteredVideos(videoData);
            } catch (err) {
                console.error('Error fetching video history:', err);
                setError(err.message || 'Failed to fetch video history.');
            } finally {
                setLoading(false);
            }
        };

        fetchVideos();
    }, []);

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
            const ipfsGateway = 'https://brown-passive-cattle-71.mypinata.cloud/ipfs/';
            const downloadUrl = `${ipfsGateway}${videoHash.split('/').pop()}`;

            const a = document.createElement('a');
            a.href = downloadUrl;
            a.download = 'video.mp4';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        } else {
            console.error('No video hash available for download');
            alert('Video hash not available.  Cannot download.');
        }
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

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100vh',
                // backgroundColor: '#000',
                backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.9) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 0, 0, 0.9) 1px, transparent 1px)',
                backgroundSize: '20px 20px',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mt: 10,
                    mb: 4,
                    px: 2,
                    [theme.breakpoints.down('sm')]: {
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                    },
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
                        [theme.breakpoints.down('sm')]: {
                            width: '100%',
                            maxWidth: 'none',
                        },
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

            <Container maxWidth="lg" sx={{ flex: 1, py: 2 }}>
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
                                            onError={(e) => {
                                                console.error("Video Error:", e);
                                                alert(`Error loading video: ${e.target.src}.  See console for details.`);
                                            }}
                                            onCanPlay={() => console.log("Video Can Play")}
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
                                            onError={(e) => console.error("Image Error:", e)}
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
                                                [theme.breakpoints.down('sm')]: {
                                                    fontSize: '1.2rem',
                                                },
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
                                                [theme.breakpoints.down('sm')]: {
                                                    fontSize: '0.9rem',
                                                },
                                            }}
                                        >
                                            {video.overview || "Overview Not Available"}
                                        </Typography>
                                    </div>

                                    <div>
                                        <MetaInfoBox>
                                            {video.tag && <span>{video.tag}</span>}
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.3 }}>
                                                <ThumbUpIcon sx={{ fontSize: '1rem' }} />
                                                <span>{video.likeCount}</span>
                                            </Box>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.3 }}>
                                                <VisibilityIcon sx={{ fontSize: '1rem' }} />
                                                <span>{video.viewCount}</span>
                                            </Box>
                                        </MetaInfoBox>

                                        <UploaderBox>
                                            <Avatar sx={{ width: 28, height: 28, bgcolor: 'primary.main', fontSize: '0.9rem' }}>
                                                {video.uploader ? video.uploader.charAt(0).toUpperCase() : '?'}
                                            </Avatar>
                                            <Typography variant="body2" sx={{ ml: 0.5, color: '#fff' }}>
                                                {video.uploader}
                                            </Typography>
                                            <Tooltip title="Verified Uploader">
                                                <VerifiedUserIcon sx={{ color: 'lightgreen', ml: 0.5, fontSize: '1.1rem' }} />
                                            </Tooltip>
                                        </UploaderBox>
                                    </div>
                                </ContentBox>

                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        padding: 2,
                                        [theme.breakpoints.down('sm')]: {
                                            padding: theme.spacing(1),
                                        },
                                    }}
                                >
                                    <DownloadButton
                                        onClick={() => handleDownload(ipfsHashWithoutPrefix)}
                                        aria-label="download"
                                        sx={{
                                            [theme.breakpoints.down('sm')]: {
                                                padding: theme.spacing(0.5, 1),
                                            },
                                        }}
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