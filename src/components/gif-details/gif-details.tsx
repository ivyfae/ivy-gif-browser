import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router"
import { CopyableText } from "../copyable-text/copyable-text";
import { GiphyGif } from '../../models';
import { getDetails, GifState } from '../../reducers/gif-reducer';

import './gif-details.css';

export const GifDetails = connect(
  (state: GifState) => ({
    id: state.id,
    gifs: state.gifs
  }), {
  getDetails
})((props: any, state: any) => {

  let params: { id: string } = useParams();

  useEffect(() => {
    props.getDetails(params.id);
    return () => {} // this unmounts for some reason?
  }, []);

  const gif: GiphyGif = (props.gifs && props.gifs.length) ? props.gifs[0] : null;

  return (
    <div className="gif-details">
      <div className="header">
        <a className="back" onClick={() => window.history.back()}>{`← Back to Search`}</a>
      </div>
      <img src={gif?.images.original.webp} alt={gif?.slug} />
      <CopyableText label="Short URL" value={gif?.bitly_url} />
      <CopyableText label="Embed URL" value={`<iframe src="${gif?.embed_url}"></iframe>`} />
      <CopyableText label="GIF URL" value={gif?.url} />
    </div>
  )
})
