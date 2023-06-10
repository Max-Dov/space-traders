export enum ContractTypes {
  PROCUREMENT = 'PROCUREMENT',
  TRANSPORT = 'TRANSPORT',
  SHUTTLE = 'SHUTTLE'
}

export interface Contract {
  id: string;
  /**
   * The symbol of the faction that this contract is for.
   */
  factionSymbol: string;
  type: ContractTypes;
  /**
   * Whether the contract has been accepted by the agent.
   */
  accepted: boolean;
  fulfilled: boolean;
  /**
   * The time at which the contract is no longer available to be accepted.
   */
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