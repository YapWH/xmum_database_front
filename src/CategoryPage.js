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
  CircularProgress,
  Box,
} from '@mui/material';
import { useParams, Link } from 'react-router-dom';
import { useTheme, ThemeProvider } from '@mui/material/styles';

axios.defaults.baseURL = 'http://0.0.0.0:8000';

function CategoryPage() {
  const { category } = useParams();
  const theme = useTheme();
  const [datasets, setDatasets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDatasets = async () => {
      try {
        const response = await axios.get(`/V1/Getlist?category=${category}`);
        setDatasets(response.data.datasets);
      } catch (error) {
        console.error('Error fetching datasets:', error);
      }
      setLoading(false);
    };

    fetchDatasets();
  }, [category]);

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
        <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold' }}>
          {category}
        </Typography>
        <Grid container spacing={4}>
          {datasets.map((dataset, index) => (
            <Grid item key={index} xs={12} sm={6} md={4}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" component="h2" gutterBottom>
                    {dataset.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {dataset.description}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Link to={`/dataset/${dataset.title}`} style={{ textDecoration: 'none' }}>
                    <Button size="small" color="primary">View Details</Button>
                  </Link>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </ThemeProvider>
  );
}

export default CategoryPage;