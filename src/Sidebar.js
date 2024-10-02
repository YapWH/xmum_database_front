import React, { useState, useEffect } from 'react';
import { List, ListItem, ListItemText, Collapse, Typography, Box } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function Sidebar() {
    const [categories, setCategories] = useState([]);
    const [openCategory, setOpenCategory] = useState('');
    const [titles, setTitles] = useState({});
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        fetchCategories();
    }, []);

    useEffect(() => {
        if (categories.length > 0) {
            fetchTitlesForAllCategories();
        }
    }, [categories]);

    const fetchCategories = async () => {
        try {
            const response = await axios.get('/V1/Getcategory');
            setCategories(response.data.categories);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const fetchTitlesForAllCategories = async () => {
        const titlesData = {};
        for (const category of categories) {
            try {
                const response = await axios.get(`/V1/Gettitles?category=${category}`);
                // Assuming response.data.titles is an array of objects with a 'title' key
                titlesData[category] = response.data.titles.map(titleObj => titleObj.title);
            } catch (error) {
                console.error(`Error fetching titles for category ${category}:`, error);
            }
        }
        setTitles(titlesData);
        
        // Find the category of the current dataset and open it
        for (const [category, categoryTitles] of Object.entries(titlesData)) {
            if (categoryTitles.includes(id)) {
                setOpenCategory(category);
                break;
            }
        }
    };

    const handleCategoryClick = (category) => {
        setOpenCategory(openCategory === category ? '' : category);
    };

    const handleTitleClick = (title) => {
        navigate(`/dataset/${title}`);
    };

    return (
        <Box sx={{ width: 250, bgcolor: 'background.paper' }}>
            <Typography variant="h6" sx={{ p: 2 }}>Categories</Typography>
            <List>
                {categories.map((category) => (
                    <React.Fragment key={category}>
                        <ListItem button onClick={() => handleCategoryClick(category)}>
                            <ListItemText primary={category} />
                            {openCategory === category ? <ExpandLess /> : <ExpandMore />}
                        </ListItem>
                        <Collapse in={openCategory === category} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                {titles[category] && titles[category].map((title) => (
                                    <ListItem button sx={{ pl: 4 }} key={title} onClick={() => handleTitleClick(title)}>
                                        <ListItemText primary={title} />
                                    </ListItem>
                                ))}
                            </List>
                        </Collapse>
                    </React.Fragment>
                ))}
            </List>
        </Box>
    );
}

export default Sidebar;