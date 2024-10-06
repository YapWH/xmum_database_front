import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {
    Container,
    Grid,
    Button,
    TextField,
    Checkbox,
    FormControlLabel,
    CircularProgress,
    Typography,
    Box,
    Divider,
    Chip,
    Paper,
    Stack,
} from '@mui/material';
import { Download, Edit, Person, Description, Label, CheckCircle, CloudDownload, ThumbUp, ThumbDown, CalendarToday } from '@mui/icons-material';
import { styled } from '@mui/system';
import Sidebar from './Sidebar';

const themeColor = '#1976d2'; // Primary color (blue)

const AnimatedPaper = styled(Paper)({
    transition: 'transform 0.3s',
    '&:hover': {
        transform: 'scale(1.05)',
    },
});

const AnimatedButton = styled(Button)({
    transition: 'transform 0.2s',
    '&:active': {
        transform: 'scale(0.95)',
    },
});

const FadeInContainer = styled(Container)({
    opacity: 0,
    animation: 'fadeIn 1s forwards',
    '@keyframes fadeIn': {
        to: {
            opacity: 1,
        },
    },
});

function DatasetDetail() {
    const { id } = useParams();
    const [dataset, setDataset] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDataset = async () => {
            try {
                const response = await axios.get(`/V1/Detailed?title=${id}`);
                setDataset(response.data);
                setFormData(response.data); // Initialize form data
                setLoading(false);
            } catch (error) {
                console.error('Error fetching dataset:', error);
                setLoading(false);
            }
        };

        fetchDataset();
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSave = async () => {
        try {
            const keys = Object.keys(formData);
            const skipKeys = ["title", "time", "total_downloads", "likes", "unlikes" ,"total_views"];

            for (const key of keys) {
                if (skipKeys.includes(key)) {
                    continue;
                }
                const value = formData[key];
                await axios.post('/V1/Edit', {
                    title: id,
                    key: key,
                    value: value
                });
            }
            setDataset(formData);
            setIsEditing(false);
        } catch (error) {
            console.error('Error updating dataset:', error);
        }
    };

    const downloadDataset = () => {
        axios.get(`/V1/Download?title=${dataset.title}`)
            .then(response => {
                const downloadLinks = response.data;
                downloadLinks.forEach(link => {
                    window.open(link, '_blank');
                });
            })
            .catch(error => {
                console.error('Error getting download link:', error);
            });
    };

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
                <CircularProgress />
            </Box>
        );
    }

    return (
        <FadeInContainer maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={3}>
                    <Sidebar />
                </Grid>
                <Grid item xs={12} md={9}>
                    <Paper elevation={3} sx={{ p: 4 }}>
                        <Typography variant="h4" sx={{ color: themeColor, fontWeight: 'bold', mb: 3 }}>{dataset.title}</Typography>
                        {isEditing ? (
                            <form>
                                <Stack spacing={3}>
                                    <TextField
                                        label="Description"
                                        multiline
                                        rows={3}
                                        name="description"
                                        value={formData.description}
                                        onChange={handleInputChange}
                                        fullWidth
                                        variant="outlined"
                                    />
                                    <TextField
                                        label="Example"
                                        name="example"
                                        value={formData.example}
                                        onChange={handleInputChange}
                                        fullWidth
                                        variant="outlined"
                                    />
                                    <TextField
                                        label="Author"
                                        name="author"
                                        value={formData.author}
                                        onChange={handleInputChange}
                                        fullWidth
                                        variant="outlined"
                                    />
                                    <TextField
                                        label="Tags"
                                        name="tags"
                                        value={formData.tags}
                                        onChange={handleInputChange}
                                        fullWidth
                                        variant="outlined"
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={formData.review === 'true'}
                                                onChange={(e) =>
                                                    handleInputChange({
                                                        target: { name: 'review', value: e.target.checked ? 'true' : 'false' }
                                                    })
                                                }
                                                name="review"
                                            />
                                        }
                                        label="Reviewed"
                                    />
                                    <AnimatedButton variant="contained" color="primary" onClick={handleSave}>
                                        Save
                                    </AnimatedButton>
                                </Stack>
                            </form>
                        ) : (
                            <>
                                <Grid container spacing={2} sx={{ mt: 2, mb: 2 }}>
                                    <Grid item xs={3}>
                                        <AnimatedPaper elevation={1} sx={{ p: 1, textAlign: 'center' }}>
                                            <CloudDownload sx={{ color: themeColor, fontSize: 40 }} />
                                            <Typography variant="h6" sx={{ color: themeColor }}>{dataset.total_downloads}</Typography>
                                            <Typography variant="body2">Downloads</Typography>
                                        </AnimatedPaper>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <AnimatedPaper elevation={1} sx={{ p: 1, textAlign: 'center' }}>
                                            <CalendarToday sx={{ color: themeColor, fontSize: 40 }} />
                                            <Typography variant="h6" sx={{ color: themeColor }}>{new Date(dataset.time).toLocaleDateString()}</Typography>
                                            <Typography variant="body2">Date</Typography>
                                        </AnimatedPaper>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <AnimatedPaper elevation={1} sx={{ p: 1, textAlign: 'center' }}>
                                            <ThumbUp sx={{ color: themeColor, fontSize: 40 }} />
                                            <Typography variant="h6" sx={{ color: themeColor }}>{dataset.likes}</Typography>
                                            <Typography variant="body2">Likes</Typography>
                                        </AnimatedPaper>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <AnimatedPaper elevation={1} sx={{ p: 1, textAlign: 'center' }}>
                                            <ThumbDown sx={{ color: themeColor, fontSize: 40 }} />
                                            <Typography variant="h6" sx={{ color: themeColor }}>{dataset.unlikes}</Typography>
                                            <Typography variant="body2">Unlikes</Typography>
                                        </AnimatedPaper>
                                    </Grid>
                                </Grid>
                                <Stack spacing={4}>
                                    <Box>
                                        <Typography variant="h6" sx={{ color: themeColor, fontWeight: 'bold', display: 'flex', alignItems: 'center', mb: 2 }}>
                                            <Person sx={{ mr: 1 }} /> Author
                                        </Typography>
                                        <Typography variant="body1">{dataset.author}</Typography>
                                    </Box>
                                    <Divider />
                                    <Box>
                                        <Typography variant="h6" sx={{ color: themeColor, fontWeight: 'bold', display: 'flex', alignItems: 'center', mb: 2 }}>
                                            <Label sx={{ mr: 1 }} /> Tags
                                        </Typography>
                                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                            {dataset.tags.split(',').map((tag, index) => (
                                                <Chip key={index} label={tag.trim()} color="primary" />
                                            ))}
                                        </Box>
                                    </Box>
                                    <Divider />
                                    <Box>
                                        <Typography variant="h6" sx={{ color: themeColor, fontWeight: 'bold', display: 'flex', alignItems: 'center', mb: 2 }}>
                                            <Description sx={{ mr: 1 }} /> Description
                                        </Typography>
                                        <Typography variant="body1">{dataset.description}</Typography>
                                    </Box>
                                    <Divider />
                                    <Box>
                                        <Typography variant="h6" sx={{ color: themeColor, fontWeight: 'bold', display: 'flex', alignItems: 'center', mb: 2 }}>
                                            <CheckCircle sx={{ mr: 1 }} /> Review Status
                                        </Typography>
                                        <Chip
                                            label={dataset.review === 'true' ? 'Reviewed' : 'Unreviewed'}
                                            color={dataset.review === 'true' ? 'success' : 'warning'}
                                        />
                                    </Box>
                                    <Divider />
                                    <Box>
                                        <Typography variant="h6" sx={{ color: themeColor, fontWeight: 'bold', display: 'flex', alignItems: 'center', mb: 2 }}>
                                            <Description sx={{ mr: 1 }} /> Example
                                        </Typography>
                                        <Typography variant="body1">{dataset.example}</Typography>
                                    </Box>
                                </Stack>
                            </>
                        )}
                        <Box sx={{ mt: 4 }}>
                            <AnimatedButton
                                variant="contained"
                                color="primary"
                                startIcon={<Download />}
                                onClick={downloadDataset}
                                fullWidth
                                sx={{ mb: 2 }}
                            >
                                Download Dataset
                            </AnimatedButton>
                            <AnimatedButton
                                variant="outlined"
                                color="primary"
                                startIcon={<Edit />}
                                onClick={() => setIsEditing(!isEditing)}
                                fullWidth
                            >
                                {isEditing ? 'Cancel' : 'Edit'}
                            </AnimatedButton>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </FadeInContainer>
    );
}

export default DatasetDetail;