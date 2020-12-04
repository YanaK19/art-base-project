import React, { useCallback, useEffect, useState } from 'react'
import FileUploadWithPreview from '../../components/FileUploadWithPreview';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { client } from '../..';
import './UploadArt.scss'
import {
    FETCH_DICTIONARY,
    FETCH_ALBUMS,
    CREATE_ART
} from '../../utils/graphql';
import { AppBar, Button, Grid, InputLabel, makeStyles, MenuItem, Select, Tab, Tabs, TextField, Tooltip } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import PublicIcon from '@material-ui/icons/Public';

function tabProps(index) {
    return {
      id: `scrollable-auto-tab-${index}`,
      'aria-controls': `scrollable-auto-tabpanel-${index}`,
    };
}

const useStyles = makeStyles({
    input: {
        '& .MuiFormLabel-root': {
            color: '#ffffff59'
        },
        '& .MuiFormLabel-root.Mui-focused': {
           color: 'rgb(19, 175, 240)'
        },
        '& .MuiInputBase-root': {
            color: 'white'
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
    },
    label: {
        '&.MuiFormLabel-root': {
            color: '#ffffff59'
        }
    },
    select: {
        '&.MuiInputBase-root': {
            color: 'white'
        },
        '&.MuiInput-underline:before': {
            borderBottom: '1px solid white'
        },
        '&.MuiInput-underline:hover:not(.Mui-disabled):before': {
            borderBottom: '2px solid rgb(19, 175, 240)'
        },
        '&.MuiInput-underline:after': {
            borderBottom: '2px solid rgb(19, 175, 240)'
        },
        '& .MuiSelect-icon': {
            color: 'white'
        }
    },
    appBar: {
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
    },
    button: {
        '&.MuiButton-root': {
            marginTop: 60,
            background: 'rgb(19, 175, 240)',
            marginLeft: '29px'
        }
    },
    buttonPublish: {
        '&.MuiButton-root': {
            marginTop: 60,
            background: '#FF8B09',
            marginLeft: '13px'
        }
    },
    gridItem: {
        '&.MuiGrid-root': {
            position: 'relative',
            minWidth: '47vw'
        },
        '&.MuiGrid-item': {
            display: 'flex',
            flexDirection: 'column',
        },
        '& .MuiFormControl-root': {
            marginBottom: '10px'
        }
    }
});

const UploadArt = props => {
    const classes = useStyles();
    const { loading: loadingDictionary, data: dataDictionary } = useQuery(FETCH_DICTIONARY);
    const { loading: loadingAlbums, data: dataAlbums } = useQuery(FETCH_ALBUMS);

    const [values, setValues] = useState({
        title: '',
        details: '',
        category: '',
        file: null,
        albumName: '',
        toPublish: false
    });
    const [error, setError] = useState();

    const [createArt, { loading: creating }] = useMutation(CREATE_ART, {
        update(proxy, result) {
            client.resetStore();
        },
        onCompleted() { props.history.push('/'); },
        onError(err) {
            setError(err.graphQLErrors[0].message)
        },
        variables : values
    });

    const savePublishedArt = () => {
        setValues({...values, toPublish: true});
    }

    const saveArt = useCallback(() => {
        createArt();
    }, [createArt]);

    useEffect(() => {
        if (values.toPublish) {
            saveArt();
        }
    }, [values, saveArt])

    const handleCategoryChange = (event, newValue) => {
        setValues({...values, category: newValue});
    };

    return (
        <div className="upload-form-container">
            {
            !loadingDictionary && !loadingAlbums && (
            <form className="upload-form">
            <Grid container>
                <Grid item lg={9} md={9} className={classes.gridItem}>
                    <div className="upload-form-fields">
                        <TextField
                            className={classes.input}
                            label="Art Title"
                            value={values.title}
                            onChange={e => setValues({...values, title: e.target.value})}
                        />                        
                        <TextField
                            multiline={true}
                            rows={5}
                            className={classes.input}
                            label="Details"
                            value={values.details}
                            onChange={e => setValues({...values, details: e.target.value})}
                        />

                        <InputLabel className={classes.label} id="album-label">Album</InputLabel>
                        <Select
                            className={classes.select}
                            labelId="album-label"
                            id="album-select"
                            value={values.albumName}
                            onChange={e => setValues({...values, albumName: e.target.value})}
                        >
                        {
                            dataAlbums.getAlbums.map(album => {
                                return <MenuItem key={album.id} value={album.name}>{album.name}</MenuItem>
                            })
                        }
                        </Select>
                    </div>

                    <div className="category-container">
                        <AppBar className={classes.appBar} position="static" color="default">
                            <Tabs className={classes.tabs} 
                                value={values.category}
                                onChange={handleCategoryChange}
                                indicatorColor="primary"
                                textColor="primary"
                                variant="scrollable"
                                scrollButtons="auto"
                                aria-label="scrollable auto tabs example"
                            >
                                <Tab value={''} label="- None -" {...tabProps(0)} />
                                {
                                dataDictionary.getDictionary.categories.map((category, i) => {
                                    return (
                                        <Tab key={category.id} 
                                            value={category.name}
                                            label={category.name}
                                            {...tabProps(i + 1)}
                                            icon={
                                                <Tooltip title={category.details} arrow>
                                                <div className="category-img-container">
                                                <img src={"/" + category.imgs[0].path} 
                                                alt={category.imgs[0].filename}/>
                                                </div>
                                                </Tooltip>
                                            }
                                        />)
                                })
                                }
                            </Tabs>
                        </AppBar>
                    </div>
                </Grid>

                <Grid item lg={3} md={3}>
                    <FileUploadWithPreview setFile={file => setValues({...values, file})}/>
                                
                    <div className="buttons-container">
                        <Button
                            onClick={saveArt}
                            className={classes.button}
                            startIcon={<SaveIcon />}
                            type="button"
                            variant="contained"
                            disabled={creating}
                        >Save</Button>
                        <Button
                            onClick={savePublishedArt}
                            className={classes.buttonPublish}
                            startIcon={<PublicIcon />}
                            type="button"
                            variant="contained"
                            disabled={creating}
                        >Publish</Button>
                    </div>
                </Grid>
            </Grid>
            </form>)
            }
        </div>
    )
}

export default UploadArt
