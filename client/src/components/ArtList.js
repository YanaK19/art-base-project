import { GridList, GridListTile, makeStyles } from '@material-ui/core';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';
import React from 'react'
import { useHistory } from 'react-router-dom';
import DeleteArtButton from './DeleteArtButton'

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
          return props.isPortfolio ? 4 : 5;
        }
    
        if (isWidthUp('md', props.width)) {
          return 3;
        }
    
        return 2;
    }

    return (
        <div>
            <GridList cellHeight={props.isPortfolio ? 250 : 300} className={classes.gridList} cols={getGridListCols()}>
                {props.arts.map(art => (
                    <GridListTile key={art.id} cols={1}>
                        <img onClick={() => history.push(`art/${art.id}`)} src={`/${art.img.path}`} alt={art.img.filename} />
                        { props.isPortfolio && (
                          <div className="shadow"
                            style={{position: 'absolute',
                                top: 0,
                                left: 0,
                                height: '35px',
                                background: '#101010bf',
                                width: '100%'
                              }}>
                            <DeleteArtButton onDelete={props.onArtDelete} artId={art.id} albumId={props.albumId}/>
                          </div>
                        )}
                    </GridListTile>
                ))}
            </GridList>
        </div>
    )
}

export default withWidth()(ArtList)
