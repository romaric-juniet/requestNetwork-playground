import {
  Extension as ExtensionTypes,
  Identity as IdentityTypes,
  RequestLogic as RequestLogicTypes,
} from '@requestnetwork/types';

// Export all the types to avoid the users to import them beside the present module
export * from '@requestnetwork/types';

/** Restrict research to two timestamp */
export interface ITimestampBoundaries {
  from?: number;
  to?: number;
}

/** Interface request data */
export interface IRequestData extends RequestLogicTypes.IRequest {
  meta: RequestLogicTypes.IReturnMeta | null;
  balance: IBalanceWithEvents | null;
  contentData: any;
}

/** Create request parameters */
export interface ICreateRequestParameters {
  requestInfo: RequestLogicTypes.ICreateParameters;
  signer: IdentityTypes.IIdentity;
  paymentNetwork?: IPaymentNetworkCreateParameters;
  topics?: string[];
  contentData?: any;
}

/** Object interface to list the payment network id and its module by currency */
export interface ISupportedPaymentNetworkByCurrency {
  [currency: string]: IPaymentNetworkModuleByType;
}

/** Object interface to list the payment network module by id */
export interface IPaymentNetworkModuleByType {
  [type: string]: any;
}

/** Interface to create a payment network  */
export interface IPaymentNetworkCreateParameters {
  id: PAYMENT_NETWORK_ID;
  parameters: any;
}

/** Interface of the class to manage a payment network  */
export interface IPaymentNetwork {
  createExtensionsDataForCreation: (paymentNetworkCreationParameters: any) => any;
  createExtensionsDataForAddRefundInformation: (parameters: any) => any;
  createExtensionsDataForAddPaymentInformation: (parameters: any) => any;
  getBalance(request: RequestLogicTypes.IRequest): Promise<IBalanceWithEvents>;
}

/** Interface for balances and the events link to the payments and refund */
export interface IBalanceWithEvents {
  balance: string;
  events: IPaymentNetworkEvent[];
}

/** payment network event */
export interface IPaymentNetworkEvent {
  name: EVENTS_NAMES;
  parameters?: any;
}

/** payment network event names */
export enum EVENTS_NAMES {
  PAYMENT = 'payment',
  REFUND = 'refund',
}

/** List of payment networks available (abstract the extensions type) */
export enum PAYMENT_NETWORK_ID {
  BITCOIN_ADDRESS_BASED = ExtensionTypes.ID.PAYMENT_NETWORK_BITCOIN_ADDRESS_BASED,
  TESTNET_BITCOIN_ADDRESS_BASED = ExtensionTypes.ID.PAYMENT_NETWORK_TESTNET_BITCOIN_ADDRESS_BASED,
}
