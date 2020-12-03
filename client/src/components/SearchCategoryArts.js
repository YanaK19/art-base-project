import React, { useState } from 'react'
import { AppBar, makeStyles, Tab, Tabs } from '@material-ui/core';

function tabProps(index) {
    return {
      id: `scrollable-auto-tab-${index}`,
      'aria-controls': `scrollable-auto-tabpanel-${index}`,
    };
  }
  
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      width: '100%',
      backgroundColor: '#101010bf',
      paddingTop: 5,
      paddingBottom: 5
    },
    tabs: {
        '& .MuiTab-textColorPrimary': {
            color: 'white'
        },
        '& .MuiTab-textColorPrimary.Mui-selected': {
            color: 'rgb(19, 175, 240)'
        },
        '& .MuiTabs-indicator': {
            backgroundColor: 'rgb(19, 175, 240)'
        },
        '& .MuiTabScrollButton-root': {
            color: 'white'
        }
    }
}));

const SearchCategoryArts = ({ data, categories, setFilteredData }) => {
    const classes = useStyles();
    const [value, setValue] = useState(categories[0].name);

    const handleChange = (event, newValue) => {
        setValue(newValue);
        const categoryFilter = newValue.toLowerCase();

        if (categoryFilter === 'all') {
            setFilteredData(data);
        } else {
            const filteredData = data.filter(item => item.category.toLowerCase().includes(categoryFilter));
            setFilteredData(filteredData);
        }
    };

    return (
        <div>
            <AppBar className={classes.root} position="static" color="default">
                <Tabs className={classes.tabs} 
                value={value}
                onChange={handleChange}
                indicatorColor="primary"
                textColor="primary"
                variant="scrollable"
                scrollButtons="auto"
                aria-label="scrollable auto tabs example"
                >
                    {
                        categories.map((category, i) => {
                            return <Tab key={category.id} value={category.name} label={category.name} {...tabProps(i)} />
                        })
                    }
                </Tabs>
            </AppBar>
        </div>
    )
}

export default SearchCategoryArts
