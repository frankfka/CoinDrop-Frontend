import React from 'react';
import { CircularProgress, makeStyles } from '@material-ui/core';

// Regular loading component
const useStylesLoading = makeStyles(() => ({
  loadingIndicator: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
}));

export function Loading() {
  const classes = useStylesLoading();

  return (
    <div className={classes.loadingIndicator}>
      <CircularProgress color="secondary" />
    </div>
  );
}

// Full screen loading component
const useStylesFullScreen = makeStyles(() => ({
  fullScreen: {
    position: 'absolute',
    top: '50%',
    left: '50%',
  },
}));
export function FullScreenLoading() {
  const classes = useStylesFullScreen();

  return (
    <div className={classes.fullScreen}>
      <Loading />
    </div>
  );
}
