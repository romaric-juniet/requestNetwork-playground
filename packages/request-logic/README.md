# @requestnetwork/request-logic

`@requestnetwork/request-logic` is a typescript library part of the [Request Network protocol](https://github.com/RequestNetwork/requestNetwork).
It is the default implementation of the Request Logic layer. This layer is responsible for the business logic: properties and actions of requests.

Request logic creates actions, that are signed and sends them to the layer below, Transaction.

## Installation

```bash
npm install @requestnetwork/request-logic
```

## Usage

```javascript
import {
  RequestLogic as Types,
  SignatureProvider as SignatureProviderTypes,
  Transaction as TransactionTypes,
} from '@requestnetwork/types';
import { RequestLogic } from '@requestnetwork/request-logic';

const createParams = {
  currency: Types.REQUEST_LOGIC_CURRENCY.ETH,
  expectedAmount: '170000000000',
  payee: {
    type: IdentityTypes.REQUEST_IDENTITY_TYPE.ETHEREUM_ADDRESS,
    value: '0xAf083f77F1fFd54218d91491AFD06c9296EaC3ce',
  },
  payer: {
    type: IdentityTypes.REQUEST_IDENTITY_TYPE.ETHEREUM_ADDRESS,
    value: '0x740fc87Bd3f41d07d23A01DEc90623eBC5fed9D6',
  },
  timestamp: 1544426030,
};

const signatureProvider: SignatureProviderTypes.ISignatureProvider // A signature provider, for example @requestnetwork/epk-signature

const transactionManager: TransactionTypes.ITransactionManager; // A transaction manager, for example @requestnetwork/transaction-manager

const requestLogic = new RequestLogic(transactionManager, signatureProvider);
const { result } = await requestLogic.createRequest(createParams, {
  type: IdentityTypes.REQUEST_IDENTITY_TYPE.ETHEREUM_ADDRESS,
  value: '0x740fc87Bd3f41d07d23A01DEc90623eBC5fed9D6',
});
```

## Features

- `createRequest` : create a request
- `acceptRequest` : accept a request
- `cancelRequest` : cancel a request
- `increaseExpectedAmountRequest` : increase the amount of a request
- `reduceExpectedAmountRequest` : reduce the amount of a request
- `getFirstRequestFromTopic` : get the first request from the actions indexed by a topic (should be used with requestId)
- `getRequestsByTopic` : get all the requests for a topic

## Action topics

When an action is sent to the Transaction layer, strings named topics can be attached to it. These topics are used to index the action and, therefore, allow to retrieve it later in order to reconstruct the request.

Every action has at least its request id as a topic.

When creating a request, arbitrary topics can be attached to the `createRequest` action to index the request. For example, it can be the identity of the request creator in order to be able, later, to retrieve every request created by a user. Other actions than `createRequest` doesn't need additional topics since it contains the request id that can be linked to the corresponding `createRequest` action of the request.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
[Read the contributing guide](/CONTRIBUTING.md)

## License

[MIT](/LICENSE)
