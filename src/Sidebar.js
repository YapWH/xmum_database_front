import React, { useState, useEffect, useCallback } from 'react';
import {
    List, ListItem, ListItemText, Collapse, Typography, Box,
    Paper, ListItemIcon, CircularProgress, ThemeProvider, Drawer, IconButton
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
    overflowX: 'hidden',
    backgroundColor: theme.palette.background.default,
    boxShadow: 'none',
    borderRight: `1px solid ${theme.palette.divider}`,
    borderRadius: 0,
}));

const StyledListItem = styled(ListItem)(({ theme }) => ({
    borderRadius: theme.shape.borderRadius,
    margin: '4px 8px',
    transition: theme.transitions.create(['background-color', 'padding-left'], {
        duration: theme.transitions.duration.shortest,
    }),
    '&:hover': {
        backgroundColor: theme.palette.action.hover,
    },
    '&.Mui-selected': {
        backgroundColor: theme.palette.primary.light,
        '&:hover': {
            backgroundColor: theme.palette.primary.light,
        },
    },
}));

const StyledListItemIcon = styled(ListItemIcon)({
    minWidth: 36,
});

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
            <List sx={{ pt: 1 }}>
                {categories.map((category) => (
                    <React.Fragment key={category}>
                        <StyledListItem button onClick={() => handleCategoryClick(category)}>
                            <StyledListItemIcon>
                                <FolderOutlined color="primary" />
                            </StyledListItemIcon>
                            <ListItemText 
                                primary={category} 
                                primaryTypographyProps={{ 
                                    fontWeight: 'medium',
                                    fontSize: '0.95rem',
                                }} 
                            />
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
                                        <StyledListItemIcon>
                                            <DescriptionOutlined color="secondary" />
                                        </StyledListItemIcon>
                                        <ListItemText 
                                            primary={title} 
                                            primaryTypographyProps={{ 
                                                fontSize: '0.9rem',
                                            }}
                                        />
                                    </StyledListItem>
                                ))}
                            </List>
                        </Collapse>
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