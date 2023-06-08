/**
 * Model that is returned from space-traders API for list requests.
 */
export interface ApiListResponse<ListItemType> {
  data: Array<ListItemType>
  meta: {
    total: number;
    page: number; // starts with 1
    limit: number;
  }
}