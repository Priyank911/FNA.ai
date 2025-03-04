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

import React, { useState, useEffect } from 'react';
import { getDocs, collection } from 'firebase/firestore';
import { db } from './firebase';
import { Container, Grid, Paper, Box, Typography, TextField, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const HistoryPage = () => {
  const [videos, setVideos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredVideos, setFilteredVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'videos'));
        const videoData = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            ...data,
            uploadedAt: data.uploadedAt
              ? data.uploadedAt.toDate().toLocaleString('en-GB', {
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
      } catch (error) {
        console.error('Error fetching video history:', error);
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

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      {/* Title and Search */}
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
      md: '2.5rem', 
      textAlign: 'center',
            flex: 1,
    },
    fontFamily: "'Gantari', sans-serif", // or "'Rowdies', cursive"
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

      {/* Videos Grid */}
      <Container maxWidth="lg" sx={{ flex: 1, py: 2 }}>
        <Grid container spacing={4}>
          {filteredVideos.map((video, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Paper
                elevation={10}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  padding: 2,
                  background: 'linear-gradient(135deg, #1E1E1E, #2A2A2A)',
                  borderRadius: '16px',
                  color: '#FFF',
                  minHeight: '150px',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.6)',
                  },
                }}
              >
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{
                    fontWeight: 'bold',
                    fontSize: '1.2rem',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {video.caption}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    mb: 1,
                    fontSize: '0.85rem',
                    color: '#bbb',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {video.overview}
                </Typography>
                <Typography variant="body2" sx={{ color: '#00cc88', fontSize: '0.8rem' }}>
                  {video.tag}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>


    </Box>
  );
};

export default HistoryPage;
