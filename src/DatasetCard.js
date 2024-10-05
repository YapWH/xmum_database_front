import React from 'react';
import { Card, CardContent, CardActions, Button, Typography, Grid, Box, useTheme } from '@mui/material';
import { ThumbUp, ThumbDown, CalendarToday, GetApp } from '@mui/icons-material';

const DatasetCard = ({ dataset, onClick }) => {
    const theme = useTheme();
    const isDarkMode = theme.palette.mode === 'dark';

    return (
        <Card sx={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            borderRadius: 4,
            overflow: 'hidden',
            transition: 'all 0.3s ease-in-out',
            '&:hover': {
                transform: 'translateY(-8px)',
                boxShadow: '0 12px 20px rgba(0,0,0,0.1)',
            },
            background: isDarkMode ? '#424242' : '#f0f0f0',
        }}>
            <Box sx={{ 
                background: '#003b88',
                py: 2, 
                px: 3,
                display: 'flex',
                alignItems: 'center'
            }}>
                <Typography variant="h6" component="h2" sx={{ color: 'white', fontWeight: 'bold' }}>
                    {dataset.title}
                </Typography>
            </Box>
            <CardContent sx={{ flexGrow: 1, padding: 3 }}>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {dataset.description}
                </Typography>
                <Typography variant="body2" color="text.primary" gutterBottom>
                    <strong>Author:</strong> {dataset.author}
                </Typography>
                <Grid container spacing={2} sx={{ mt: 2 }}>
                    <Grid item xs={6}>
                        <Box display="flex" alignItems="center">
                            <GetApp fontSize="small" sx={{ mr: 1, color: '#060136' }} />
                            <Typography variant="body2" color="text.secondary">
                                {dataset.download}
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={6}>
                        <Box display="flex" alignItems="center">
                            <CalendarToday fontSize="small" sx={{ mr: 1, color: '#060136' }} />
                            <Typography variant="body2" color="text.secondary">
                                {new Date(dataset.time).toLocaleDateString()}
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={6}>
                        <Box display="flex" alignItems="center">
                            <ThumbUp fontSize="small" sx={{ mr: 1, color: '#4CAF50' }} />
                            <Typography variant="body2" color="text.secondary">
                                {dataset.likes}
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={6}>
                        <Box display="flex" alignItems="center">
                            <ThumbDown fontSize="small" sx={{ mr: 1, color: '#F44336' }} />
                            <Typography variant="body2" color="text.secondary">
                                {dataset.unlikes}
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </CardContent>
            <CardActions sx={{ justifyContent: 'flex-end', padding: 2 }}>
                <Button
                    size="medium"
                    color="primary"
                    variant="contained"
                    onClick={() => onClick(dataset.title)}
                    sx={{ 
                        textTransform: 'none',
                        borderRadius: 20,
                        px: 3,
                        background: 'primary.main',
                        '&:hover': {
                            background: '#1976D2',
                        }
                    }}
                >
                    View Details
                </Button>
            </CardActions>
        </Card>
    );
};

export default DatasetCard;