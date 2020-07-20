import { GiphyImage } from "./giphy-image";

export interface GiphyGif {
  id: string;
  slug: string;
  url: string;
  bitly_url: string;
  embed_url: string;
  images: GiphyImage
}
