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
} from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import { ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

axios.defaults.baseURL = 'http://0.0.0.0:8000';

function HomePage() {
  const navigate = useNavigate();
  const theme = useTheme();

  const [categories, setCategories] = useState([]);
  const [datasets, setDatasets] = useState({});
  const [loading, setLoading] = useState(true);

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
    navigate('/search');
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
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Box sx={{ mb: 6, textAlign: 'center' }}>
          <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
            Data Catalog
          </Typography>
          <Typography variant="h5" sx={{ mb: 4, color: 'text.secondary' }}>
            Discover and explore our vast collection of datasets
          </Typography>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search datasets..."
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
              endAdornment: (
                <Button variant="contained" color="primary" onClick={handleSearch}>
                  Search
                </Button>
              ),
            }}
            sx={{ maxWidth: 600, margin: 'auto' }}
          />
        </Box>

        <Box sx={{ mb: 6 }}>
          <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold' }}>
            Categories
          </Typography>
          <Grid container spacing={2} justifyContent="center">
            {categories.map((category) => (
              <Grid item key={category}>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => handleCategoryClick(category)}
                  sx={{ borderRadius: '20px', textTransform: 'none' }}
                >
                  {category}
                </Button>
              </Grid>
            ))}
          </Grid>
        </Box>

        {Object.entries(datasets).map(([category, datasets]) => (
          <Box key={category} sx={{ mb: 6 }}>
            <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold' }}>
              {category}
            </Typography>
            <Grid container spacing={3}>
              {datasets.slice(0, 3).map((dataset, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography gutterBottom variant="h6" component="h2">
                        {dataset.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {dataset.description}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small" color="primary">View Details</Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
            <Box sx={{ mt: 2, textAlign: 'right' }}>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => handleCategoryClick(category)}
                sx={{ borderRadius: '20px', textTransform: 'none' }}
              >
                View More
              </Button>
            </Box>
          </Box>
        ))}
      </Container>
    </ThemeProvider>
  );
}

export default HomePage;