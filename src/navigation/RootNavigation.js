import React from 'react';

export const isReadyRef = React.createRef();

export const navigationRef = React.createRef();

export function reset(name, params) {
  if (isReadyRef.current && navigationRef.current) {
    navigationRef.current.reset(name, params);
  }
}
