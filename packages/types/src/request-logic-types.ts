import * as Extension from './extension-types';
import * as Identity from './identity-types';
import * as Signature from './signature-types';

const bigNumber: any = require('bn.js');

/** Request Logic layer */
export interface IRequestLogic {
  createRequest: (
    requestParameters: ICreateParameters,
    signerIdentity: Identity.IIdentity,
    indexes: string[],
  ) => Promise<IReturnCreateRequest>;
  acceptRequest: (
    requestParameters: IAcceptParameters,
    signerIdentity: Identity.IIdentity,
  ) => Promise<IRequestLogicReturn>;
  cancelRequest: (
    requestParameters: ICancelParameters,
    signerIdentity: Identity.IIdentity,
  ) => Promise<IRequestLogicReturn>;
  increaseExpectedAmountRequest: (
    requestParameters: IIncreaseExpectedAmountParameters,
    signerIdentity: Identity.IIdentity,
  ) => Promise<IRequestLogicReturn>;
  reduceExpectedAmountRequest: (
    requestParameters: IReduceExpectedAmountParameters,
    signerIdentity: Identity.IIdentity,
  ) => Promise<IRequestLogicReturn>;
  addExtensionsDataRequest: (
    requestParameters: IAddExtensionsDataParameters,
    signerIdentity: Identity.IIdentity,
  ) => Promise<IRequestLogicReturn>;
  getRequestFromId: (topic: string) => Promise<IReturnGetRequestFromId>;
  getRequestsByTopic: (
    topic: string,
    updatedBetween?: ITimestampBoundaries,
  ) => Promise<IReturnGetRequestsByTopic>;
}

/** Restrict research to two timestamp */
export interface ITimestampBoundaries {
  from?: number;
  to?: number;
}

/** return of IRequestLogic functions */
export interface IRequestLogicReturn {
  /** result of the execution */
  result?: any;
  /** meta information */
  meta: IReturnMeta;
}

/** meta data given by the layer below (transaction manager) */
export interface IReturnMeta {
  transactionManagerMeta: any;
  ignoredTransactions?: any[];
}

/** return of the function createRequest */
export interface IReturnCreateRequest extends IRequestLogicReturn {
  result: { requestId: RequestId };
}

/** return of the function getFirstRequestFromTopic */
export interface IReturnGetRequestFromId extends IRequestLogicReturn {
  result: { request: IRequest | null };
}

/** return of the function getRequestsByTopic */
export interface IReturnGetRequestsByTopic extends IRequestLogicReturn {
  result: { requests: IRequest[] };
}

/** Interface of a request logic action */
export interface IAction {
  data: IUnsignedAction;
  signature: Signature.ISignature;
}

/** Interface of a request logic action confirmed */
export interface IConfirmedAction {
  action: IAction;
  timestamp: number;
}

/** Interface of a request logic unsigned action */
export interface IUnsignedAction {
  name: ACTION_NAME;
  version: string;
  parameters: any;
}

/** Request in request logic */
export interface IRequest {
  version: string;
  /** request identifier */
  requestId: RequestId;
  /** identity of the request creator (the one who initiates it) */
  creator: Identity.IIdentity;
  currency: CURRENCY;
  state: STATE;
  expectedAmount: Amount;
  payee?: Identity.IIdentity;
  payer?: Identity.IIdentity;
  /** Extensions states */
  extensions: IExtensionStates;
  /** Extensions raw data */
  extensionsData: any[];
  events: IEvent[];
  /** timestamp of the request creation in seconds
   * Note: this precision is enough in a blockchain context
   * Note: as it is a user given parameter, the only consensus on this date it between the payer and payee
   * Note: The timestamp is used also do differentiate two identical requests (because the requestId is the hash of the creation action)
   */
  timestamp: number;
  /** arbitrary number to differentiate several identical requests with the same timestamp */
  nonce?: number;
}

/** Extensions state indexed by their Id */
export interface IExtensionStates {
  [key: string]: Extension.IState;
}

/** Amounts in request logic */
export type Amount = number | string | typeof bigNumber;

/** RequestId */
export type RequestId = string;

/** Configuration for the versioning */
export interface IVersionSupportConfig {
  /**
   * current version of the specifications supported by this implementation
   * will be used to check if the implementation can handle action with different specs version
   */
  current: string;
  /** list of versions not supported in any case */
  exceptions: string[];
}

/** Parameters to create a request */
export interface ICreateParameters {
  currency: CURRENCY;
  expectedAmount: Amount;
  payee?: Identity.IIdentity;
  payer?: Identity.IIdentity;
  extensionsData?: any[];
  /** timestamp of the request creation in seconds
   * Note: this precision is enough in a blockchain context
   * Note: as it is a user given parameter, the only consensus on this date it between the payer and payee
   */
  timestamp?: number;
  /** number to differentiate several identical requests with the timestamp is not enough */
  nonce?: number;
}

/** Parameters to accept a request */
export interface IAcceptParameters {
  requestId: RequestId;
  extensionsData?: any[];
}

/** Parameters to cancel a request */
export interface ICancelParameters {
  requestId: RequestId;
  extensionsData?: any[];
}

/** Parameters to increase amount of a request */
export interface IIncreaseExpectedAmountParameters {
  deltaAmount: Amount;
  requestId: RequestId;
  extensionsData?: any[];
  /** arbitrary number to differentiate several identical transaction */
  nonce?: number;
}

/** Parameters to reduce amount of a request */
export interface IReduceExpectedAmountParameters {
  deltaAmount: Amount;
  requestId: RequestId;
  extensionsData?: any[];
  /** arbitrary number to differentiate several identical transaction */
  nonce?: number;
}

/** Parameters to add extensions data to a request */
export interface IAddExtensionsDataParameters {
  requestId: RequestId;
  extensionsData: any[];
  /** arbitrary number to differentiate several identical transaction */
  nonce?: number;
}

/** Event */
export interface IEvent {
  /** Name of this event is actually an action */
  name: ACTION_NAME;
  /** the information given in the event */
  parameters?: any;
  actionSigner: Identity.IIdentity;
  timestamp: number;
}

/** Enum of name possible in a action */
export enum ACTION_NAME {
  CREATE = 'create',
  BROADCAST = 'broadcastSignedRequest',
  ACCEPT = 'accept',
  CANCEL = 'cancel',
  REDUCE_EXPECTED_AMOUNT = 'reduceExpectedAmount',
  INCREASE_EXPECTED_AMOUNT = 'increaseExpectedAmount',
  ADD_EXTENSIONS_DATA = 'addExtensionsData',
}

/** Supported currencies */
export enum CURRENCY {
  ETH = 'ETH',
  BTC = 'BTC',
  EUR = 'EUR',
  USD = 'USD',
}

/** States of a request */
export enum STATE {
  CREATED = 'created',
  ACCEPTED = 'accepted',
  CANCELED = 'canceled',
}

/** Identity roles */
export enum ROLE {
  PAYEE = 'payee',
  PAYER = 'payer',
  THIRD_PARTY = 'third-party',
}
