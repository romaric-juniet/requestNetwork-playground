import 'mocha';

const chai = require('chai');
const spies = require('chai-spies');
const expect = chai.expect;
chai.use(spies);

import { DataAccess as DataAccessTypes } from '@requestnetwork/types';

import { TransactionManager } from '../src/index';
import TransactionCore from '../src/transaction';

const channelId = 'channelId';
const extraTopics = ['topic1', 'topic2'];
const fakeTxHash = '0xaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa';

const data = '{ what: "ever", it: "is,", this: "must", work: true }';
const data2 = '{or: "can", be:false}';

const tx: DataAccessTypes.IConfirmedTransaction = { transaction: { data }, timestamp: 1 };
const tx2: DataAccessTypes.IConfirmedTransaction = { transaction: { data: data2 }, timestamp: 1 };

const fakeMetaDataAccessPersistReturn: DataAccessTypes.IReturnPersistTransaction = {
  meta: { transactionStorageLocation: 'fakeDataId', topics: extraTopics },
  result: { topics: [fakeTxHash] },
};

const fakeMetaDataAccessGetReturn: DataAccessTypes.IReturnGetTransactions = {
  meta: { transactionsStorageLocation: ['fakeDataId1', 'fakeDataId2'] },
  result: { transactions: [tx, tx2] },
};

const fakeMetaDataAccessGetChannelsReturn: DataAccessTypes.IReturnGetChannelsByTopic = {
  meta: { transactionsStorageLocation: { [channelId]: ['fakeDataId1', 'fakeDataId2'] } },
  result: { transactions: { [channelId]: [tx, tx2] } },
};

const fakeDataAccess: DataAccessTypes.IDataAccess = {
  getChannelsByTopic: chai.spy.returns(fakeMetaDataAccessGetChannelsReturn),
  getTransactionsByChannelId: chai.spy.returns(fakeMetaDataAccessGetReturn),
  initialize: chai.spy(),
  persistTransaction: chai.spy.returns(fakeMetaDataAccessPersistReturn),
};

/* tslint:disable:no-unused-expression */
describe('index', () => {
  it('can persist a transaction', async () => {
    const transactionManager = new TransactionManager(fakeDataAccess);

    const ret = await transactionManager.persistTransaction(data, channelId, extraTopics);

    expect(ret.result, 'ret.result is wrong').to.be.deep.equal({});
    expect(ret.meta, 'ret.meta is wrong').to.be.deep.equal({
      dataAccessMeta: fakeMetaDataAccessPersistReturn.meta,
    });
    expect(fakeDataAccess.persistTransaction).to.have.been.called.with(
      TransactionCore.createTransaction(data),
      extraTopics,
    );
  });

  it('can get transactions by channel id', async () => {
    const transactionManager = new TransactionManager(fakeDataAccess);

    const ret = await transactionManager.getTransactionsByChannelId(channelId);

    expect(ret.result, 'ret.result is wrong').to.be.deep.equal(fakeMetaDataAccessGetReturn.result);
    expect(ret.meta, 'ret.meta is wrong').to.be.deep.equal({
      dataAccessMeta: fakeMetaDataAccessGetReturn.meta,
    });
    expect(fakeDataAccess.getTransactionsByChannelId).to.have.been.called.with(channelId);
  });

  it('can get channels indexed by topics', async () => {
    const transactionManager = new TransactionManager(fakeDataAccess);

    const ret = await transactionManager.getChannelsByTopic(extraTopics[0]);

    expect(ret.result, 'ret.result is wrong').to.be.deep.equal(
      fakeMetaDataAccessGetChannelsReturn.result,
    );
    expect(ret.meta, 'ret.meta is wrong').to.be.deep.equal({
      dataAccessMeta: fakeMetaDataAccessGetChannelsReturn.meta,
    });
    expect(fakeDataAccess.getChannelsByTopic).to.have.been.called.with(extraTopics[0]);
  });
});
