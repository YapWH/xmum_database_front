import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
  TextField,
  InputAdornment,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  CircularProgress,
} from '@mui/material';
import { Search as SearchIcon, ThumbUp, ThumbDown, CalendarToday, GetApp } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';

axios.defaults.baseURL = 'https://dataset.mini-bocchi.top/';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#f0f2f5',
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.09)',
          transition: 'transform 0.3s, box-shadow 0.3s',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
          }
        }
      }
    }
  }
});

function DatasetCatalog() {
  const [datasets, setDatasets] = useState([]);
  const [filterMode, setFilterMode] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchField, setSearchField] = useState('title');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchDatasets = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`/V1/Getlist?mode=${filterMode}`);
        if (Array.isArray(response.data.datasets)) {
          setDatasets(response.data.datasets);
        } else {
          setDatasets([]);
        }
      } catch (error) {
        console.error('Error fetching datasets:', error);
        setDatasets([]);
      }
      setIsLoading(false);
    };

    fetchDatasets();
  }, [filterMode]);

  const searchDatasets = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`/V1/Search?query=${searchQuery}&field=${searchField}`);
      if (Array.isArray(response.data.datasets)) {
        setDatasets(response.data.datasets);
      } else {
        setDatasets([]);
      }
    } catch (error) {
      console.error('Error searching datasets:', error);
      setDatasets([]);
    }
    setIsLoading(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container 
        sx={{ mt: 4, mb: 4, backgroundColor: 'background.default', padding: { xs: 2, md: 3 }, borderRadius: 2 }}
      >
        <Grid container spacing={2} alignItems="center" justifyContent="center" sx={{ mb: 2 }}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
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
          </Grid>
          <Grid item xs={12} sm={3}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={searchDatasets}
              sx={{ height: '56px' }}
            >
              Search
            </Button>
          </Grid>
        </Grid>
        <Grid container spacing={1} justifyContent="center" sx={{ mb: 2 }}>
          <Button
            variant={filterMode === 'reviewed' ? 'contained' : 'outlined'}
            color="primary"
            onClick={() => setFilterMode('reviewed')}
            sx={{ mr: 1 }}
          >
            Reviewed
          </Button>
          <Button
            variant={filterMode === 'unreviewed' ? 'contained' : 'outlined'}
            color="primary"
            onClick={() => setFilterMode('unreviewed')}
            sx={{ mr: 1 }}
          >
            Unreviewed
          </Button>
          <Button
            variant={filterMode === 'all' ? 'contained' : 'outlined'}
            color="primary"
            onClick={() => setFilterMode('all')}
          >
            All
          </Button>
        </Grid>
        <Grid container spacing={4}>
          {isLoading ? (
            <Grid container justifyContent="center" alignItems="center">
              <CircularProgress />
            </Grid>
          ) : (
            datasets.map((dataset, index) => (
              <Grid item key={index} xs={12} sm={6} md={4}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" component="h2" gutterBottom noWrap>
                      {dataset.title}
                    </Typography>
                    <Typography 
                      variant="body2" 
                      color="text.secondary" 
                      sx={{ 
                        mb: 2, 
                        overflow: 'hidden', 
                        textOverflow: 'ellipsis', 
                        display: '-webkit-box', 
                        WebkitLineClamp: 3, 
                        WebkitBoxOrient: 'vertical' 
                      }}
                    >
                      {dataset.description}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      <strong>Status:</strong> {dataset.review === 'true' ? 'Reviewed' : 'Unreviewed'}
                    </Typography>
                    <Grid container spacing={1} sx={{ mt: 2 }}>
                      <Grid item xs={6}>
                        <Typography variant="body2" color="text.secondary" display="flex" alignItems="center">
                          <GetApp fontSize="small" sx={{ mr: 0.5 }} /> {dataset.download}
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body2" color="text.secondary" display="flex" alignItems="center">
                          <CalendarToday fontSize="small" sx={{ mr: 0.5 }} /> {new Date(dataset.time).toLocaleDateString()}
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body2" color="text.secondary" display="flex" alignItems="center">
                          <ThumbUp fontSize="small" sx={{ mr: 0.5 }} /> {dataset.likes}
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body2" color="text.secondary" display="flex" alignItems="center">
                          <ThumbDown fontSize="small" sx={{ mr: 0.5 }} /> {dataset.unlikes}
                        </Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                  <CardActions sx={{ justifyContent: 'center', pb: 2 }}>
                    <Link to={`/dataset/${dataset.title}`} style={{ textDecoration: 'none' }}>
                      <Button
                        size="small"
                        color="primary"
                        variant="contained"
                        sx={{ 
                          backgroundColor: 'primary.main', 
                          color: 'common.white',
                          '&:hover': {
                            backgroundColor: 'primary.dark',
                          }
                        }}
                      >
                        View Details
                      </Button>
                    </Link>
                  </CardActions>
                </Card>
              </Grid>
            ))
          )}
        </Grid>
      </Container>
    </ThemeProvider>
  );
}

export default DatasetCatalog;