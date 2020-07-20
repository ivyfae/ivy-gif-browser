import { GiphyGif } from "./giphy-gif";
import { GiphyMeta } from "./giphy-meta";

export interface GiphyDetailsResponse {
  data: GiphyGif,
  meta: GiphyMeta
}
