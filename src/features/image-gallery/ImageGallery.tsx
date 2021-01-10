import React, { PropsWithChildren, useEffect } from 'react';
import { useHistory } from 'react-router';
import { useSelector } from 'react-redux';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { selectAuthExpires } from '../auth/authSlice';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    content: {}
  })
);

export default function ImageGallery(props: PropsWithChildren<{}>) {
  const classes = useStyles();
  const history = useHistory();
  const authExpires = useSelector(selectAuthExpires);

  useEffect(() => {
    if (!authExpires) {
      history.push('/sign-in');
    }
  }, [authExpires, history]);

  return (
    <main>
      <h1>Galeria</h1>
    </main>
  );
}
