import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { TextField, Button, Alert, Container, Typography, Box, Input } from '@mui/material';

axios.defaults.baseURL = "http://0.0.0.0:8000";

const CreateDataset = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [author, setAuthor] = useState('');
  const [tags, setTags] = useState('');
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!title || !description || !author || !tags || !file) {
      setError('Please provide all required fields.');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('example', description); // example is synchronized with description
    formData.append('author', author);
    formData.append('tags', tags);
    formData.append('file', file);

    try {
      await axios.post('/V1/Create', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setSuccess('Dataset uploaded successfully!');
      setTimeout(() => navigate('/'), 2000); // Redirect to home page after 2 seconds
    } catch (error) {
      const errorMessage = error.response?.data?.detail || 'An error occurred while uploading the dataset.';
      setError(errorMessage);
    }
  };

  return (
    <Container maxWidth="sm">
      {error && <Alert severity="error">{error}</Alert>}
      {success && <Alert severity="success">{success}</Alert>}
      <form onSubmit={handleSubmit}>
        <TextField
          label="Title"
          fullWidth
          margin="normal"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          label="Description"
          fullWidth
          margin="normal"
          multiline
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <TextField
          label="Author"
          fullWidth
          margin="normal"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <TextField
          label="Tags"
          fullWidth
          margin="normal"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
        <Box display="flex" alignItems="center" margin="normal">
          <Input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            inputProps={{ accept: 'application/pdf' }}
            style={{ display: 'none' }}
            id="file-input"
          />
          <label htmlFor="file-input">
            <Button variant="contained" component="span">
              Choose File
            </Button>
          </label>
          {file && <Typography variant="body1" style={{ marginLeft: '10px' }}>{file.name}</Typography>}
        </Box>
        <Box height="15px" />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Submit
        </Button>
      </form>
    </Container>
  );
};

export default CreateDataset;
