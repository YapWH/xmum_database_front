import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container,
  Grid,
  Typography,
  CircularProgress,
  Box,
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { useTheme, ThemeProvider } from '@mui/material/styles';
import DatasetCard from './DatasetCard';
import { motion } from 'framer-motion';

axios.defaults.baseURL = 'https://dataset.mini-bocchi.top/';

function CategoryPage() {
  const { category } = useParams();
  const theme = useTheme();
  const navigate = useNavigate();
  const [datasets, setDatasets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDatasets = async () => {
      try {
        const titlesResponse = await axios.get(`/V1/Gettitles?category=${category}`);
        const titles = titlesResponse.data.titles;
        const datasetsPromises = titles.map(async (titleObj) => {
          const detailResponse = await axios.get(`/V1/Detailed?title=${titleObj.title}`);
          return detailResponse.data;
        });
        const datasets = await Promise.all(datasetsPromises);
        setDatasets(datasets);
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

  const handleCardClick = (title) => {
    navigate(`/dataset/${title}`);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold' }}>
          {category}
        </Typography>
        <Grid container spacing={4}>
          {datasets.map((dataset, index) => (
            <Grid item key={index} xs={12} sm={6} md={4}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <DatasetCard dataset={dataset} onClick={handleCardClick} />
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </ThemeProvider>
  );
}

export default CategoryPage;