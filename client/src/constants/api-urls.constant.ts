/**
 * All URLs that application interacts with.
 */
export class ApiUrls {
  static readonly BASE_API_URL = 'https://api.spacetraders.io/v2';
  static readonly REGISTER_AGENT = `${ApiUrls.BASE_API_URL}/register`;
  static readonly MY_AGENT_DETAILS = `${ApiUrls.BASE_API_URL}/my/agent`;
}