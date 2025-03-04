import React, { useState } from "react";
import { TextField, Button, Box, Typography, CircularProgress } from "@mui/material";
import { VideoLibrary, Summarize } from "@mui/icons-material";

function VideoSummarizer() {
  const [videoURL, setVideoURL] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSummarize = async () => {
    if (!videoURL) {
      alert("Please provide a valid video URL!");
      return;
    }
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/summarize-video", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ videoURL }),
      });

      const data = await response.json();
      if (data.summary) {
        setSummary(data.summary);
      } else {
        setSummary("Failed to generate a summary.");
      }
    } catch (error) {
      setSummary("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        p: 4,
        backgroundColor: "#1e1e2f",
        color: "#f0f0f0",
        borderRadius: "16px",
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.5)",
        maxWidth: "600px",
        mx: "auto",
        mt: 5,
      }}
    >
      <Typography variant="h5" sx={{ textAlign: "center", mb: 2, color: "#4caf50", fontWeight: "bold" }}>
        Video Summarizer
      </Typography>
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <VideoLibrary sx={{ color: "#4caf50", fontSize: 40 }} />
        <TextField
          variant="outlined"
          label="Enter Video URL"
          fullWidth
          value={videoURL}
          onChange={(e) => setVideoURL(e.target.value)}
          sx={{ input: { color: "#fff" }, label: { color: "#ccc" } }}
        />
      </Box>
      <Button
        variant="contained"
        fullWidth
        sx={{
          mt: 3,
          backgroundColor: "#4caf50",
          "&:hover": { backgroundColor: "#45a049" },
        }}
        onClick={handleSummarize}
        startIcon={<Summarize />}
        disabled={loading}
      >
        Summarize
      </Button>

      {loading && <CircularProgress sx={{ display: "block", mx: "auto", mt: 3 }} />}

      {summary && (
        <Box
          sx={{
            mt: 3,
            p: 2,
            border: "1px solid #4caf50",
            borderRadius: "8px",
            backgroundColor: "#2a2a3d",
          }}
        >
          <Typography variant="h6" sx={{ mb: 1, color: "#4caf50" }}>
            Summary:
          </Typography>
          <Typography variant="body1" sx={{ color: "#f0f0f0", whiteSpace: "pre-wrap" }}>
            {summary}
          </Typography>
        </Box>
      )}
    </Box>
  );
}

export default VideoSummarizer;
