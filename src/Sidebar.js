import React, { useState, useEffect, useCallback } from 'react';
import {
    List, ListItem, ListItemText, Collapse, Typography, Box,
    Paper, Divider, ListItemIcon, CircularProgress, ThemeProvider, Drawer, IconButton
} from '@mui/material';
import { ExpandLess, ExpandMore, FolderOutlined, DescriptionOutlined, Menu as MenuIcon } from '@mui/icons-material';
import { styled } from '@mui/system';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const StyledPaper = styled(Paper)(({ theme }) => ({
    width: 280,
    height: '100%',
    overflowY: 'auto',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    transition: theme.transitions.create(['box-shadow'], {
        duration: theme.transitions.duration.short,
    }),
    '&:hover': {
        boxShadow: theme.shadows[10],
    },
}));

const StyledListItem = styled(ListItem)(({ theme }) => ({
    transition: theme.transitions.create(['background-color', 'padding-left'], {
        duration: theme.transitions.duration.shortest,
    }),
    '&:hover': {
        backgroundColor: theme.palette.action.hover,
        paddingLeft: theme.spacing(3),
    },
}));

function Sidebar() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('1100'));
    const [categories, setCategories] = useState([]);
    const [openCategory, setOpenCategory] = useState('');
    const [titles, setTitles] = useState({});
    const [loading, setLoading] = useState(true);
    const [drawerOpen, setDrawerOpen] = useState(false);
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

    const toggleDrawer = () => {
        setDrawerOpen(!drawerOpen);
    };

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                <CircularProgress color="secondary" />
            </Box>
        );
    }

    const sidebarContent = (
        <StyledPaper>
            <Typography variant="h6" sx={{ p: 2, bgcolor: 'primary.main', color: 'primary.contrastText', fontWeight: 'bold' }}>
                Categories
            </Typography>
            <Divider />
            <List>
                {categories.map((category) => (
                    <React.Fragment key={category}>
                        <StyledListItem button onClick={() => handleCategoryClick(category)}>
                            <ListItemIcon>
                                <FolderOutlined color="primary" />
                            </ListItemIcon>
                            <ListItemText primary={category} primaryTypographyProps={{ fontWeight: 'medium' }} />
                            {openCategory === category ? <ExpandLess color="action" /> : <ExpandMore color="action" />}
                        </StyledListItem>
                        <Collapse in={openCategory === category} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                {titles[category] && titles[category].map((title) => (
                                    <StyledListItem
                                        button
                                        sx={{ pl: 4 }}
                                        key={title}
                                        onClick={() => handleTitleClick(title)}
                                        selected={title === id}
                                    >
                                        <ListItemIcon>
                                            <DescriptionOutlined color="secondary" />
                                        </ListItemIcon>
                                        <ListItemText primary={title} />
                                    </StyledListItem>
                                ))}
                            </List>
                        </Collapse>
                        <Divider variant="middle" />
                    </React.Fragment>
                ))}
            </List>
        </StyledPaper>
    );

    return (
        <ThemeProvider theme={theme}>
            {isMobile ? (
                <>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={toggleDrawer}
                        sx={{ ml: 2, mt: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Drawer
                        anchor="left"
                        open={drawerOpen}
                        onClose={toggleDrawer}
                    >
                        {sidebarContent}
                    </Drawer>
                </>
            ) : (
                sidebarContent
            )}
        </ThemeProvider>
    );
}

export default Sidebar;