/**
 * All URLs that application interacts with.
 */
export class ApiUrls {
  static readonly BASE_API_URL = 'https://api.spacetraders.io/v2';
  static readonly REGISTER_AGENT = `${ApiUrls.BASE_API_URL}/register`;
  static readonly FACTIONS = `${ApiUrls.BASE_API_URL}/factions`;
  static readonly MY_AGENT_DETAILS = `${ApiUrls.BASE_API_URL}/my/agent`;

  static readonly MY_CONTRACTS = `${ApiUrls.BASE_API_URL}/my/contracts`;
  static readonly GET_CONTRACT = `${ApiUrls.MY_CONTRACTS}/:contractId`;
  static readonly ACCEPT_CONTRACT = `${ApiUrls.MY_CONTRACTS}/:contractId/accept`;
}
