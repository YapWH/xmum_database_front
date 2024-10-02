import React, { useState, useEffect, useCallback } from 'react';
import { 
  List, ListItem, ListItemText, Collapse, Typography, Box, 
  Paper, Divider, ListItemIcon, CircularProgress
} from '@mui/material';
import { ExpandLess, ExpandMore, FolderOutlined, DescriptionOutlined } from '@mui/icons-material';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function Sidebar() {
    const [categories, setCategories] = useState([]);
    const [openCategory, setOpenCategory] = useState('');
    const [titles, setTitles] = useState({});
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const { id } = useParams();

    const fetchCategories = useCallback(async () => {
        try {
            const response = await axios.get('/V1/Getcategory');
            setCategories(response.data.categories);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    }, []);

    const fetchTitlesForAllCategories = useCallback(async () => {
        const titlesData = {};
        for (const category of categories) {
            try {
                const response = await axios.get(`/V1/Gettitles?category=${category}`);
                titlesData[category] = response.data.titles.map(titleObj => titleObj.title);
            } catch (error) {
                console.error(`Error fetching titles for category ${category}:`, error);
            }
        }
        setTitles(titlesData);
        
        for (const [category, categoryTitles] of Object.entries(titlesData)) {
            if (categoryTitles.includes(id)) {
                setOpenCategory(category);
                break;
            }
        }
        setLoading(false);
    }, [categories, id]);

    useEffect(() => {
        fetchCategories();
    }, [fetchCategories]);

    useEffect(() => {
        if (categories.length > 0) {
            fetchTitlesForAllCategories();
        }
    }, [categories, fetchTitlesForAllCategories]);

    const handleCategoryClick = (category) => {
        setOpenCategory(openCategory === category ? '' : category);
    };

    const handleTitleClick = (title) => {
        navigate(`/dataset/${title}`);
    };

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Paper elevation={3} sx={{ width: 280, height: '100%', overflowY: 'auto' }}>
            <Typography variant="h6" sx={{ p: 2, bgcolor: 'primary.main', color: 'primary.contrastText' }}>
                Categories
            </Typography>
            <Divider />
            <List>
                {categories.map((category) => (
                    <React.Fragment key={category}>
                        <ListItem button onClick={() => handleCategoryClick(category)}>
                            <ListItemIcon>
                                <FolderOutlined />
                            </ListItemIcon>
                            <ListItemText primary={category} />
                            {openCategory === category ? <ExpandLess /> : <ExpandMore />}
                        </ListItem>
                        <Collapse in={openCategory === category} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                {titles[category] && titles[category].map((title) => (
                                    <ListItem 
                                        button 
                                        sx={{ pl: 4 }} 
                                        key={title} 
                                        onClick={() => handleTitleClick(title)}
                                        selected={title === id}
                                    >
                                        <ListItemIcon>
                                            <DescriptionOutlined />
                                        </ListItemIcon>
                                        <ListItemText primary={title} />
                                    </ListItem>
                                ))}
                            </List>
                        </Collapse>
                        <Divider />
                    </React.Fragment>
                ))}
            </List>
        </Paper>
    );
}

export default Sidebar;
