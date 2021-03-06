import * as TestData from '../../test-data-generator';

import {
  Extension as ExtensionTypes,
  Identity as IdentityTypes,
  RequestLogic as Types,
} from '@requestnetwork/types';

export const arbitraryTimestamp = 1544426030;

// ---------------------------------------------------------------------
export const paymentInfo = { IBAN: 'FR123456789123456789', BIC: 'CE123456789' };
export const refundInfo = { IBAN: 'FR987654321987654321', BIC: 'CE987654321' };
export const amount = '12345';
export const note = { transactionId: '123456789' };

// ---------------------------------------------------------------------
// actions
export const actionCreationWithPaymentAndRefund = {
  action: ExtensionTypes.PnAnyDeclarativeBased.ACTION.CREATE,
  id: ExtensionTypes.ID.PAYMENT_NETWORK_ANY_DECLARATIVE,
  parameters: {
    paymentInfo,
    refundInfo,
  },
  version: '0.1.0',
};
export const actionCreationOnlyPayment = {
  action: ExtensionTypes.PnAnyDeclarativeBased.ACTION.CREATE,
  id: ExtensionTypes.ID.PAYMENT_NETWORK_ANY_DECLARATIVE,
  parameters: {
    paymentInfo,
  },
  version: '0.1.0',
};
export const actionCreationOnlyRefund = {
  action: ExtensionTypes.PnAnyDeclarativeBased.ACTION.CREATE,
  id: ExtensionTypes.ID.PAYMENT_NETWORK_ANY_DECLARATIVE,
  parameters: {
    refundInfo,
  },
  version: '0.1.0',
};
export const actionCreationEmpty = {
  action: ExtensionTypes.PnAnyDeclarativeBased.ACTION.CREATE,
  id: ExtensionTypes.ID.PAYMENT_NETWORK_ANY_DECLARATIVE,
  parameters: {},
  version: '0.1.0',
};

export const actionPaymentInstruction = {
  action: ExtensionTypes.PnAnyDeclarativeBased.ACTION.ADD_PAYMENT_INSTRUCTION,
  id: ExtensionTypes.ID.PAYMENT_NETWORK_ANY_DECLARATIVE,
  parameters: {
    paymentInfo,
  },
};
export const actionRefundInstruction = {
  action: ExtensionTypes.PnAnyDeclarativeBased.ACTION.ADD_REFUND_INSTRUCTION,
  id: ExtensionTypes.ID.PAYMENT_NETWORK_ANY_DECLARATIVE,
  parameters: {
    refundInfo,
  },
};

export const actionDeclareSentPayment = {
  action: ExtensionTypes.PnAnyDeclarativeBased.ACTION.DECLARE_SENT_PAYMENT,
  id: ExtensionTypes.ID.PAYMENT_NETWORK_ANY_DECLARATIVE,
  parameters: {
    amount,
    note,
  },
};
export const actionDeclareSentRefund = {
  action: ExtensionTypes.PnAnyDeclarativeBased.ACTION.DECLARE_SENT_REFUND,
  id: ExtensionTypes.ID.PAYMENT_NETWORK_ANY_DECLARATIVE,
  parameters: {
    amount,
    note,
  },
};

export const actionDeclareReceivedPayment = {
  action: ExtensionTypes.PnAnyDeclarativeBased.ACTION.DECLARE_RECEIVED_PAYMENT,
  id: ExtensionTypes.ID.PAYMENT_NETWORK_ANY_DECLARATIVE,
  parameters: {
    amount,
    note,
  },
};
export const actionDeclareReceivedRefund = {
  action: ExtensionTypes.PnAnyDeclarativeBased.ACTION.DECLARE_RECEIVED_REFUND,
  id: ExtensionTypes.ID.PAYMENT_NETWORK_ANY_DECLARATIVE,
  parameters: {
    amount,
    note,
  },
};
// ---------------------------------------------------------------------
// extensions states
export const extensionStateWithPaymentAndRefund = {
  [ExtensionTypes.ID.PAYMENT_NETWORK_ANY_DECLARATIVE as string]: {
    events: [
      {
        name: 'create',
        parameters: {
          paymentInfo,
          refundInfo,
        },
        timestamp: arbitraryTimestamp,
      },
    ],
    id: ExtensionTypes.ID.PAYMENT_NETWORK_ANY_DECLARATIVE,
    type: ExtensionTypes.TYPE.PAYMENT_NETWORK,
    values: {
      paymentInfo,
      receivedPaymentAmount: '0',
      receivedRefundAmount: '0',
      refundInfo,
      sentPaymentAmount: '0',
      sentRefundAmount: '0',
    },
    version: '0.1.0',
  },
};
export const extensionStateCreatedEmpty = {
  [ExtensionTypes.ID.PAYMENT_NETWORK_ANY_DECLARATIVE as string]: {
    events: [
      {
        name: 'create',
        parameters: {},
        timestamp: arbitraryTimestamp,
      },
    ],
    id: ExtensionTypes.ID.PAYMENT_NETWORK_ANY_DECLARATIVE,
    type: ExtensionTypes.TYPE.PAYMENT_NETWORK,
    values: {
      receivedPaymentAmount: '0',
      receivedRefundAmount: '0',
      sentPaymentAmount: '0',
      sentRefundAmount: '0',
    },
    version: '0.1.0',
  },
};

export const extensionStateCreatedEmptyPaymentInstructionAdded = {
  [ExtensionTypes.ID.PAYMENT_NETWORK_ANY_DECLARATIVE as string]: {
    events: [
      {
        name: ExtensionTypes.PnAnyDeclarativeBased.ACTION.CREATE,
        parameters: {},
        timestamp: arbitraryTimestamp,
      },
      {
        name: ExtensionTypes.PnAnyDeclarativeBased.ACTION.ADD_PAYMENT_INSTRUCTION,
        parameters: {
          paymentInfo,
        },
        timestamp: arbitraryTimestamp,
      },
    ],
    id: ExtensionTypes.ID.PAYMENT_NETWORK_ANY_DECLARATIVE,
    type: ExtensionTypes.TYPE.PAYMENT_NETWORK,
    values: {
      paymentInfo,
      receivedPaymentAmount: '0',
      receivedRefundAmount: '0',
      sentPaymentAmount: '0',
      sentRefundAmount: '0',
    },
    version: '0.1.0',
  },
};
export const extensionStateCreatedEmptyRefundInstructionAdded = {
  [ExtensionTypes.ID.PAYMENT_NETWORK_ANY_DECLARATIVE as string]: {
    events: [
      {
        name: ExtensionTypes.PnAnyDeclarativeBased.ACTION.CREATE,
        parameters: {},
        timestamp: arbitraryTimestamp,
      },
      {
        name: ExtensionTypes.PnAnyDeclarativeBased.ACTION.ADD_REFUND_INSTRUCTION,
        parameters: {
          refundInfo,
        },
        timestamp: arbitraryTimestamp,
      },
    ],
    id: ExtensionTypes.ID.PAYMENT_NETWORK_ANY_DECLARATIVE,
    type: ExtensionTypes.TYPE.PAYMENT_NETWORK,
    values: {
      receivedPaymentAmount: '0',
      receivedRefundAmount: '0',
      refundInfo,
      sentPaymentAmount: '0',
      sentRefundAmount: '0',
    },
    version: '0.1.0',
  },
};

export const extensionStateCreatedEmptySentPayment = {
  [ExtensionTypes.ID.PAYMENT_NETWORK_ANY_DECLARATIVE as string]: {
    events: [
      {
        name: ExtensionTypes.PnAnyDeclarativeBased.ACTION.CREATE,
        parameters: {},
        timestamp: arbitraryTimestamp,
      },
      {
        name: ExtensionTypes.PnAnyDeclarativeBased.ACTION.DECLARE_SENT_PAYMENT,
        parameters: {
          amount,
          note,
        },
        timestamp: arbitraryTimestamp,
      },
    ],
    id: ExtensionTypes.ID.PAYMENT_NETWORK_ANY_DECLARATIVE,
    type: ExtensionTypes.TYPE.PAYMENT_NETWORK,
    values: {
      receivedPaymentAmount: '0',
      receivedRefundAmount: '0',
      sentPaymentAmount: amount,
      sentRefundAmount: '0',
    },
    version: '0.1.0',
  },
};
export const extensionStateCreatedEmptyReceivedRefund = {
  [ExtensionTypes.ID.PAYMENT_NETWORK_ANY_DECLARATIVE as string]: {
    events: [
      {
        name: ExtensionTypes.PnAnyDeclarativeBased.ACTION.CREATE,
        parameters: {},
        timestamp: arbitraryTimestamp,
      },
      {
        name: ExtensionTypes.PnAnyDeclarativeBased.ACTION.DECLARE_RECEIVED_REFUND,
        parameters: {
          amount,
          note,
        },
        timestamp: arbitraryTimestamp,
      },
    ],
    id: ExtensionTypes.ID.PAYMENT_NETWORK_ANY_DECLARATIVE,
    type: ExtensionTypes.TYPE.PAYMENT_NETWORK,
    values: {
      receivedPaymentAmount: '0',
      receivedRefundAmount: amount,
      sentPaymentAmount: '0',
      sentRefundAmount: '0',
    },
    version: '0.1.0',
  },
};
export const extensionStateCreatedEmptySentRefund = {
  [ExtensionTypes.ID.PAYMENT_NETWORK_ANY_DECLARATIVE as string]: {
    events: [
      {
        name: ExtensionTypes.PnAnyDeclarativeBased.ACTION.CREATE,
        parameters: {},
        timestamp: arbitraryTimestamp,
      },
      {
        name: ExtensionTypes.PnAnyDeclarativeBased.ACTION.DECLARE_SENT_REFUND,
        parameters: {
          amount,
          note,
        },
        timestamp: arbitraryTimestamp,
      },
    ],
    id: ExtensionTypes.ID.PAYMENT_NETWORK_ANY_DECLARATIVE,
    type: ExtensionTypes.TYPE.PAYMENT_NETWORK,
    values: {
      receivedPaymentAmount: '0',
      receivedRefundAmount: '0',
      sentPaymentAmount: '0',
      sentRefundAmount: amount,
    },
    version: '0.1.0',
  },
};
export const extensionStateCreatedEmptyReceivedPayment = {
  [ExtensionTypes.ID.PAYMENT_NETWORK_ANY_DECLARATIVE as string]: {
    events: [
      {
        name: ExtensionTypes.PnAnyDeclarativeBased.ACTION.CREATE,
        parameters: {},
        timestamp: arbitraryTimestamp,
      },
      {
        name: ExtensionTypes.PnAnyDeclarativeBased.ACTION.DECLARE_RECEIVED_PAYMENT,
        parameters: {
          amount,
          note,
        },
        timestamp: arbitraryTimestamp,
      },
    ],
    id: ExtensionTypes.ID.PAYMENT_NETWORK_ANY_DECLARATIVE,
    type: ExtensionTypes.TYPE.PAYMENT_NETWORK,
    values: {
      receivedPaymentAmount: amount,
      receivedRefundAmount: '0',
      sentPaymentAmount: '0',
      sentRefundAmount: '0',
    },
    version: '0.1.0',
  },
};

// ---------------------------------------------------------------------
// request states
export const requestStateNoExtensions: Types.IRequest = {
  creator: {
    type: IdentityTypes.TYPE.ETHEREUM_ADDRESS,
    value: TestData.payeeRaw.address,
  },
  currency: Types.CURRENCY.EUR,
  events: [
    {
      actionSigner: {
        type: IdentityTypes.TYPE.ETHEREUM_ADDRESS,
        value: TestData.payeeRaw.address,
      },
      name: Types.ACTION_NAME.CREATE,
      parameters: {
        expectedAmount: '123400000000000000',
        extensionsDataLength: 0,
        isSignedRequest: false,
      },
      timestamp: arbitraryTimestamp,
    },
  ],
  expectedAmount: TestData.arbitraryExpectedAmount,
  extensions: {},
  extensionsData: [],
  payee: {
    type: IdentityTypes.TYPE.ETHEREUM_ADDRESS,
    value: TestData.payeeRaw.address,
  },
  payer: {
    type: IdentityTypes.TYPE.ETHEREUM_ADDRESS,
    value: TestData.payerRaw.address,
  },
  requestId: TestData.requestIdMock,
  state: Types.STATE.CREATED,
  timestamp: TestData.arbitraryTimestamp,
  version: '0.1.0',
};

export const requestStateCreatedWithPaymentAndRefund: Types.IRequest = {
  creator: {
    type: IdentityTypes.TYPE.ETHEREUM_ADDRESS,
    value: TestData.payeeRaw.address,
  },
  currency: Types.CURRENCY.EUR,
  events: [
    {
      actionSigner: {
        type: IdentityTypes.TYPE.ETHEREUM_ADDRESS,
        value: TestData.payeeRaw.address,
      },
      name: Types.ACTION_NAME.CREATE,
      parameters: {
        expectedAmount: '123400000000000000',
        extensionsDataLength: 1,
        isSignedRequest: false,
      },
      timestamp: arbitraryTimestamp,
    },
  ],
  expectedAmount: TestData.arbitraryExpectedAmount,
  extensions: extensionStateWithPaymentAndRefund,
  extensionsData: [actionCreationWithPaymentAndRefund],
  payee: {
    type: IdentityTypes.TYPE.ETHEREUM_ADDRESS,
    value: TestData.payeeRaw.address,
  },
  payer: {
    type: IdentityTypes.TYPE.ETHEREUM_ADDRESS,
    value: TestData.payerRaw.address,
  },
  requestId: TestData.requestIdMock,
  state: Types.STATE.CREATED,
  timestamp: TestData.arbitraryTimestamp,
  version: '0.1.0',
};

export const requestStateCreatedEmpty: Types.IRequest = {
  creator: {
    type: IdentityTypes.TYPE.ETHEREUM_ADDRESS,
    value: TestData.payeeRaw.address,
  },
  currency: Types.CURRENCY.EUR,
  events: [
    {
      actionSigner: {
        type: IdentityTypes.TYPE.ETHEREUM_ADDRESS,
        value: TestData.payeeRaw.address,
      },
      name: Types.ACTION_NAME.CREATE,
      parameters: {
        expectedAmount: '123400000000000000',
        extensionsDataLength: 1,
        isSignedRequest: false,
      },
      timestamp: arbitraryTimestamp,
    },
  ],
  expectedAmount: TestData.arbitraryExpectedAmount,
  extensions: extensionStateCreatedEmpty,
  extensionsData: [actionCreationEmpty],
  payee: {
    type: IdentityTypes.TYPE.ETHEREUM_ADDRESS,
    value: TestData.payeeRaw.address,
  },
  payer: {
    type: IdentityTypes.TYPE.ETHEREUM_ADDRESS,
    value: TestData.payerRaw.address,
  },
  requestId: TestData.requestIdMock,
  state: Types.STATE.CREATED,
  timestamp: TestData.arbitraryTimestamp,
  version: '0.1.0',
};
