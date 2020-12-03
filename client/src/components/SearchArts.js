import React, { useState } from 'react'
import { makeStyles, Tab, Tabs, TextField } from '@material-ui/core';
import '../styles/searchArtsStyles.scss'
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles({
    tabs: {
      '& .MuiTab-textColorPrimary': {
          color: 'white'
      }
    },
    searchIcon: {
        '&.MuiSvgIcon-root': {
            fontSize: '2.5rem',
        }
    },
    input: {
        '& .MuiFormLabel-root': {
            fontSize: '1.5rem',
            color: '#ffffff59'
        },
        '& .MuiFormLabel-root.Mui-focused': {
           color: 'rgb(19, 175, 240)'
        },
        '& .MuiInputBase-root': {
            color: 'white'
        },
        '& .MuiInputBase-input': {
            fontSize: '2.2rem'
        },
        '& .MuiInput-underline:before': {
            borderBottom: '1px solid white'
        },
        '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
            borderBottom: '2px solid rgb(19, 175, 240)'
        },
        '& .MuiInput-underline:after': {
            borderBottom: '2px solid rgb(19, 175, 240)'
        }
    }
});

const SearchArts = ({ data, setFilteredData }) => {
    const classes = useStyles();
    const [searchBy, setSearchBy] = useState('artwork');
    const [value, setValue] = useState('');

    const onSearchByChanged = (event, searchBy) => {
        setSearchBy(searchBy);
        setValue('');
        setFilteredData(data);
    };

    const getFilteredDate = () => {
        if (searchBy === 'artwork') {
            return data.filter(item => item.title.toLowerCase().includes(value.toLowerCase()));
        } else {
            return data.filter(item => item.user.username.toLowerCase().includes(value.toLowerCase()));
        }
    };

    const onSubmit = event => {
        if (event.key !== 'Enter') {
          return;
        }

        if (value.trim()) {
            const filteredData = getFilteredDate();
            setFilteredData(filteredData);
        } else {
            setFilteredData(data);
        }
    }

    return (
        <div>
            <div className="filters-container">
                <span className="label">Search By: </span>
                <Tabs
                    value={searchBy}
                    onChange={onSearchByChanged}
                    indicatorColor="primary"
                    textColor="primary"
                    centered
                    className={classes.tabs}
                    TabIndicatorProps={{style: {background:'white'}}}
                >
                    <Tab value='artwork' label="Artworks" />
                    <Tab value='author' label="Authors" />
                </Tabs>  
            </div>
            <div className="input-container">
                <div className="icon" >
                    <SearchIcon className={classes.searchIcon} />
                </div>
                <TextField
                    className={classes.input}
                    label="Search arts ..."
                    value={value}
                    onChange={event => setValue(event.target.value)}
                    onKeyPress={onSubmit}
                />
            </div>
        </div>
    )
}

export default SearchArts
