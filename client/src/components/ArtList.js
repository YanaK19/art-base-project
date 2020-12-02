import { GridList, GridListTile, makeStyles } from '@material-ui/core';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';
import React from 'react'
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles(() => ({
    gridList: {
      width: '100%'
    },
}));

const ArtList = props => {
    const classes = useStyles();
    const history = useHistory();

    const getGridListCols = () => {
        if (isWidthUp('xl', props.width)) {
          return 8;
        }
    
        if (isWidthUp('lg', props.width)) {
          return 5;
        }
    
        if (isWidthUp('md', props.width)) {
          return 3;
        }
    
        return 2;
    }

    return (
        <div>
            <GridList cellHeight={300} className={classes.gridList} cols={getGridListCols()}>
                {props.arts.map(art => (
                    <GridListTile key={art.id} cols={1} onClick={() => history.push(`art/${art.id}`)}>
                        <img src={`/${art.img.path}`} alt={art.img.filename} />
                    </GridListTile>
                ))}
            </GridList>
        </div>
    )
}

export default withWidth()(ArtList)
