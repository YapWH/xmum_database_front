import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom';
import { Container, IconButton, AppBar, Toolbar, Typography, CssBaseline } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import UploadIcon from '@mui/icons-material/Upload';
import DatasetCatalog from './DatasetCatalog';
import DatasetDetail from './DatasetDetail';
import CreateDataset from './CreateDataset';
import { ThemeProviderComponent, useTheme } from './ThemeContext';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

function AppContent() {
  const location = useLocation();
  const { mode, toggleTheme } = useTheme();

  const getTitle = () => {
    switch (location.pathname) {
      case '/':
        return 'XMUM Dataset';
      case '/create':
        return 'Create A New Dataset';
      default:
        if (location.pathname.startsWith('/dataset/')) {
          return 'Dataset Detail';
        }
        return '';
    }
  };

  return (
    <>
      <CssBaseline />
      <AppBar position="fixed" sx={{ backgroundColor: 'primary', color: '#F5EFE6', mb: 1, boxShadow: 1 }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Typography variant="h6" component="div">
            {getTitle()}
          </Typography>
          <div>
            <IconButton color="inherit" component={Link} to="/" sx={{ fontSize: '1.2rem' }}>
              <HomeIcon fontSize="small" />
              <Typography variant="caption" sx={{ ml: 1 }}>Home</Typography>
            </IconButton>
            <IconButton color="inherit" component={Link} to="/create" sx={{ fontSize: '1.2rem' }}>
              <UploadIcon fontSize="small" />
              <Typography variant="caption" sx={{ ml: 1 }}>Upload</Typography>
            </IconButton>
            <IconButton color="inherit" onClick={toggleTheme} sx={{ fontSize: '1.2rem' }}>
              {mode === 'light' ? <Brightness4Icon /> : <Brightness7Icon />}
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      <Toolbar /> {/* This is to offset the fixed AppBar */}
      <Container>
        <Routes>
          <Route path="/" element={<DatasetCatalog />} />
          <Route path="/dataset/:id" element={<DatasetDetail />} />
          <Route path="/create" element={<CreateDataset />} />
        </Routes>
      </Container>
    </>
  );
}

function App() {
  return (
    <ThemeProviderComponent>
      <Router>
        <AppContent />
      </Router>
    </ThemeProviderComponent>
  );
}

export default App;
