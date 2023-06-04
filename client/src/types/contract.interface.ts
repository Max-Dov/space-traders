export enum ContractTypes {
  PROCUREMENT = 'PROCUREMENT',
  TRANSPORT = 'TRANSPORT',
  SHUTTLE = 'SHUTTLE'
}

export interface Contract {
  id: string;
  factionSymbol: string;
  type: ContractTypes;
  accepted: boolean;
  fulfilled: boolean;
  expiration: string; // Date
  deadlineToAccept: string; // Date
  terms: {
    deadline: string; // Date
    payment: {
      /**
       * The amount of credits received up front for accepting the contract.
       */
      onAccepted: number;
      /**
       * The amount of credits received when the contract is fulfilled.
       */
      onFulfilled: number;
    }
    deliver: Array<{
      /**
       * The symbol of the trade good to deliver.
       */
      tradeSymbol: string;
      destinationSymbol: string;
      unitsRequired: number;
      unitsFulfilled: number;
    }>
  }
}