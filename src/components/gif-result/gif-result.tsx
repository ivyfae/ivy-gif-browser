import React from 'react';
import { NavLink } from 'react-router-dom';
import { GiphyGif } from '../../models';

import './gif-result.css';

export interface GifResultProps {
  gif: GiphyGif
}

export const GifResult = (props: GifResultProps) => {
  return (
      <NavLink
        to={{ pathname: `/details/${props.gif.id}` }}
        className="gif"
        key={props.gif.id}>
        <video autoPlay loop muted playsInline>
          <source src={props.gif.images.fixed_height.mp4} type="video/mp4" />
        </video>

      </NavLink>
  )
}
