import React from 'react';
import ErrorPage from './ErrorPage';
import InvalidPageImage from './Images/generic_404.svg';

export default function InvalidPage() {
  return (
    <ErrorPage
      errorImage={InvalidPageImage}
      message={'This doesn\'t seem to be a valid page.'}
    />
  );
}
