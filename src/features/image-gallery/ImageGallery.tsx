import React, { PropsWithChildren } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    content: {}
  })
);

export default function ImageGallery(props: PropsWithChildren<{}>) {

  return (
    <main data-testid="image-gallery">
      <h1>Galeria</h1>
    </main>
  );
}
