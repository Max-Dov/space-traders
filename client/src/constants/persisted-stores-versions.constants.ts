/**
 * Purpose of this document is to keep version control of persisted stores in one place.
 * For rolling out big features, it is good idea to update all store versions to avoid bugs.
 *
 * How changing versions works: if zustand sees different store version in browser storage than what is declared in
 * store declaration file, then it would not load whatever stored in browser storage, making "clean restart".
 */

/**
 * DANGER: changing that parameter will erase all agents' data.
 * Make sure to avoid changing that variable unless necessary.
 */
export const AGENTS_TOKENS_STORE_VERSION = 1;

export const PANELS_STORE_VERSION = 4;
export const SERVER_STATUS_STORE = 1;
export const MARKETS_STORE_VERSION = 2;
export const TRANSACTIONS_STORE_VERSION = 2;
export const SHIPS_STORE_VERSION = 1;
