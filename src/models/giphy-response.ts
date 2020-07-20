import { GiphyGif } from './giphy-gif';
import { GiphyMeta } from './giphy-meta';
import { GiphyPagination } from './giphy-pagination';

export interface GiphyResponse {
  data: Array<GiphyGif>,
  pagination: GiphyPagination,
  meta: GiphyMeta
}
