import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  CardActions,
  InputAdornment,
  Box,
  useTheme,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Avatar,
  Divider,
  Paper,
} from '@mui/material';
import { Search as SearchIcon, Category as CategoryIcon } from '@mui/icons-material';
import { ThemeProvider, alpha, createTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

axios.defaults.baseURL = 'http://0.0.0.0:8000';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '20px',
          textTransform: 'none',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          padding: '20px',
          borderRadius: '15px',
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: '20px',
          },
        },
      },
    },
  },
});

function HomePage() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [datasets, setDatasets] = useState({});
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchField, setSearchField] = useState('title');

  useEffect(() => {
    const fetchCategoriesAndDatasets = async () => {
      try {
        const categoriesResponse = await axios.get('/V1/Getcategory');
        const categories = categoriesResponse.data.categories;
        setCategories(categories);

        const datasetsResponse = await axios.get('/V1/Getlist?mode=all');
        const datasets = datasetsResponse.data.datasets.reduce((acc, dataset) => {
          const category = dataset.category;
          if (!acc[category]) {
            acc[category] = [];
          }
          acc[category].push(dataset);
          return acc;
        }, {});
        setDatasets(datasets);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
      setLoading(false);
    };

    fetchCategoriesAndDatasets();
  }, []);

  const handleSearch = () => {
    navigate(`/search?query=${searchQuery}&field=${searchField}`);
  };

  const handleCategoryClick = (category) => {
    navigate(`/category/${category}`);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress color="secondary" />
      </Box>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ minHeight: '100vh', pt: 8, pb: 8, backgroundColor: theme.palette.background.default }}>
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Paper elevation={3} sx={{ p: 4, mb: 8, borderRadius: 4, backgroundColor: alpha(theme.palette.background.paper, 0.9) }}>
              <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main', textAlign: 'center' }}>
                Data Catalog
              </Typography>
              <Typography variant="h5" sx={{ mb: 6, color: 'text.secondary', textAlign: 'center' }}>
                Discover and explore our vast collection of datasets
              </Typography>
              <Grid container spacing={2} justifyContent="center">
                <Grid item xs={12} sm={8}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Search datasets..."
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
                <Grid item xs={12} sm={2}>
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
                <Grid item xs={12} sm={2}>
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={handleSearch}
                    sx={{ height: '56px' }}
                  >
                    Search
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Paper elevation={3} sx={{ p: 4, mb: 8, borderRadius: 4, backgroundColor: alpha(theme.palette.background.paper, 0.9) }}>
              <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
                <CategoryIcon sx={{ mr: 1 }} /> Categories
              </Typography>
              <Grid container spacing={2} justifyContent="center">
                {categories.map((category) => (
                  <Grid item key={category}>
                    <Chip
                      label={category}
                      onClick={() => handleCategoryClick(category)}
                      color="secondary"
                      sx={{ 
                        borderRadius: '20px', 
                        fontWeight: 'bold',
                        '&:hover': {
                          backgroundColor: alpha(theme.palette.secondary.main, 0.8),
                        },
                      }}
                    />
                  </Grid>
                ))}
              </Grid>
            </Paper>
          </motion.div>

          <Grid container spacing={4}>
            <Grid item xs={12} md={12}>
              {Object.entries(datasets).map(([category, datasets], index) => (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.8 + index * 0.2 }}
                >
                  <Paper elevation={3} sx={{ p: 3, mb: 4, borderRadius: 4, backgroundColor: alpha(theme.palette.background.paper, 0.9) }}>
                    <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
                      <Avatar sx={{ bgcolor: theme.palette.primary.main, mr: 2 }}>{category[0].toUpperCase()}</Avatar>
                      {category}
                    </Typography>
                    <Grid container spacing={3}>
                      {datasets.slice(0, 3).map((dataset, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                          <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', boxShadow: 3, '&:hover': { boxShadow: 6 } }}>
                            <CardContent sx={{ flexGrow: 1 }}>
                              <Typography gutterBottom variant="h6" component="h2" sx={{ fontWeight: 'bold' }}>
                                {dataset.title}
                              </Typography>
                              <Divider sx={{ my: 1 }} />
                              <Typography variant="body2" color="text.secondary">
                                {dataset.description}
                              </Typography>
                            </CardContent>
                            <CardActions>
                              <Button size="small" color="primary" variant="outlined">View Details</Button>
                            </CardActions>
                          </Card>
                        </Grid>
                      ))}
                    </Grid>
                    <Box sx={{ mt: 3, textAlign: 'right' }}>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleCategoryClick(category)}
                        sx={{ borderRadius: '20px', textTransform: 'none', boxShadow: 2 }}
                      >
                        View More
                      </Button>
                    </Box>
                  </Paper>
                </motion.div>
              ))}
            </Grid>
          </Grid>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default HomePage;