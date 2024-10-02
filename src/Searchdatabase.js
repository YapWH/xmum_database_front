import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Container,
  Typography,
  Grid,
  CircularProgress,
  Box,
  TextField,
  Button,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import { motion } from 'framer-motion';
import DatasetCard from './DatasetCard';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function SearchResults() {
  const query = useQuery();
  const navigate = useNavigate();
  const initialSearchQuery = query.get('query') || '';
  const initialSearchField = query.get('field') || 'title';

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [searchField, setSearchField] = useState(initialSearchField);
  const [displayedQuery, setDisplayedQuery] = useState(initialSearchQuery);

  useEffect(() => {
    if (initialSearchQuery) {
      performSearch(initialSearchQuery, initialSearchField);
    }
  }, [initialSearchQuery, initialSearchField]);

  const performSearch = async (query, field) => {
    setLoading(true);
    try {
      const response = await axios.get(`/V1/Search?query=${query}&field=${field}`);
      setResults(response.data.datasets);
    } catch (error) {
      console.error('Error fetching search results:', error);
      setResults([]);
    }
    setLoading(false);
  };

  const handleSearch = () => {
    if (!searchQuery) {
      alert('Please enter a search query');
      return;
    }
    setDisplayedQuery(searchQuery);
    navigate(`/search?query=${searchQuery}&field=${searchField}`);
    performSearch(searchQuery, searchField);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const handleDatasetClick = (title) => {
    navigate(`/dataset/${title}`);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Box sx={{ mb: 4 }}>
          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12} sm={8}>
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Search datasets..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleKeyPress}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </motion.div>
            </Grid>
            <Grid item xs={12} sm={2}>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <FormControl fullWidth variant="outlined">
                  <InputLabel>Field</InputLabel>
                  <Select
                    value={searchField}
                    onChange={(e) => setSearchField(e.target.value)}
                    label="Field"
                  >
                    <MenuItem value="title">Title</MenuItem>
                    <MenuItem value="author">Author</MenuItem>
                    <MenuItem value="description">Description</MenuItem>
                  </Select>
                </FormControl>
              </motion.div>
            </Grid>
            <Grid item xs={12} sm={2}>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  onClick={handleSearch}
                  sx={{ height: '56px' }}
                >
                  Search
                </Button>
              </motion.div>
            </Grid>
          </Grid>
        </Box>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <CircularProgress color="secondary" />
          </Box>
        ) : (
          <>
            {displayedQuery && (
              <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold' }}>
                Search Results for "{displayedQuery}"
              </Typography>
            )}
            {results.length > 0 ? (
              <Grid container spacing={3}>
                {results.map((dataset, index) => (
                  <Grid item xs={12} sm={6} md={4} key={index}>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <DatasetCard dataset={dataset} onClick={handleDatasetClick} />
                    </motion.div>
                  </Grid>
                ))}
              </Grid>
            ) : (
              displayedQuery && (
                <Typography variant="h6" sx={{ mt: 4, textAlign: 'center' }}>
                  No results found for "{displayedQuery}"
                </Typography>
              )
            )}
          </>
        )}
      </motion.div>
    </Container>
  );
}

export default SearchResults;