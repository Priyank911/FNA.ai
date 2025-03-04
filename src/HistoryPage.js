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
import { Container, Grid, Paper, Box, Typography, TextField, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import DownloadIcon from '@mui/icons-material/Download';
import Avatar from '@mui/material/Avatar';

const HistoryPage = () => {
  const [videos, setVideos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredVideos, setFilteredVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
            uploadedAt: data.timestamp // Changed uploadedAt to timestamp based on screenshot shared
              ? new Date(data.timestamp).toLocaleString('en-GB', { // converting timestamp data to Date object
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
        backgroundColor: '#000',
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
        }}
      >
        <Typography
          variant="h3"
          align="center"
          gutterBottom
          sx={{
            mb: 2,
            fontWeight: 'bold',
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)',
            fontSize: {
              xs: '2rem',
              md: '2.5rem'
            },
            textAlign: 'center',
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

      <Container maxWidth="lg" sx={{ flex: 1, py: 2 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {filteredVideos.map((video, index) => {
            // 1. Remove "ipfs://" prefix from videoHash
            const ipfsHashWithoutPrefix = video.videoHash ? video.videoHash.replace("ipfs://", "") : null;

            // 2. Construct the video URL correctly.
            const videoUrl = ipfsHashWithoutPrefix ? `https://brown-passive-cattle-71.mypinata.cloud/ipfs/${ipfsHashWithoutPrefix}` : null;

            console.log(`Video Index: ${index}`);
            console.log("Video Object:", video);
            console.log("IPFS Hash (Corrected):", ipfsHashWithoutPrefix); // Log corrected hash
            console.log("Video URL:", videoUrl);

            return (
              <Paper
                key={index}
                elevation={10}
                className="history-item"
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  background: 'rgba(50, 50, 50, 0.8)',
                  borderRadius: '10px',
                  color: '#FFF',
                  overflow: 'hidden',
                  transition: 'transform 0.6s ease-out, box-shadow 0.4s ease',
                  '&:hover': {
                    transform: 'scale(1.02)',
                    boxShadow: '0 15px 30px rgba(0, 0, 0, 0.5)',
                  },
                }}
              >
                <Box
                  sx={{
                    width: '180px',
                    height: '140px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRight: '1px solid #444',
                    padding: 2,
                    overflow: 'hidden',
                  }}
                >
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
                </Box>

                <Box
                  sx={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    padding: 2,
                    justifyContent: 'center'
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 'bold',
                      fontSize: '1.2rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                    }}
                  >
                    {video.caption || "UPLOADER NAME"}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      mb: 1,
                      fontSize: '0.9rem',
                      color: '#bbb',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}
                  >
                    {video.overview || "Overview Not Available"}
                  </Typography>

                  <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                      <Avatar sx={{ width: 24, height: 24, mr: 1, bgcolor: 'secondary.main' }}>
                          {video.uploader ? video.uploader.charAt(0).toUpperCase() : '?'} 
                      </Avatar>
                      <Typography
                          variant="caption"
                          sx={{
                              color: '#aaa',
                              fontSize: '0.75rem',
                              fontStyle: 'italic'
                          }}
                      >
                          Uploaded by {video.uploader || 'Unknown'} 
                      </Typography>
                  </Box>
                </Box>

                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 2
                  }}
                >
                  <IconButton
                    onClick={() => handleDownload(ipfsHashWithoutPrefix)}
                    sx={{
                      backgroundColor: 'rgba(255, 255, 255, 0.9)',
                      borderRadius: '50px',
                      color: '#000',
                      padding: '8px 16px',
                      '&:hover': {
                        backgroundColor: '#fff',
                      },
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                    }}
                  >
                    <DownloadIcon />
                    <Typography
                      component="span"
                      sx={{
                        display: { xs: 'none', sm: 'block' },
                        fontWeight: 'bold'
                      }}
                    >
                      DOWNLOAD
                    </Typography>
                  </IconButton>
                </Box>
              </Paper>
            );
          })}
        </Box>
      </Container>
    </Box>
  );
};

export default HistoryPage;