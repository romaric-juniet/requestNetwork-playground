import 'mocha';

import { expect } from 'chai';
import * as httpStatus from 'http-status-codes';
import * as request from 'supertest';
import requestNode from '../src/requestNode';

const channelId = '0xchannelId';
const anotherChannelId = '0xanotherChannelId';
const commonTopic = ['0xbbbbbb'];
const topics = ['0xaaaaaa'].concat(commonTopic);
const otherTopics = ['0xcccccc'].concat(commonTopic);
const nonExistentTopic = 'NonExistentTopic';
const transactionData = {
  data: 'this is sample data for a transaction to test getTransactionsByTopic',
};
const otherTransactionData = {
  data: 'this is other sample data for a transaction to test getTransactionsByTopic',
};

let requestNodeInstance;
let server: any;

// tslint:disable:no-magic-numbers
// tslint:disable:no-unused-expression
describe('getTransactionsByTopic', () => {
  before(async () => {
    requestNodeInstance = new requestNode();
    await requestNodeInstance.initialize();

    // Any port number can be used since we use supertest
    server = requestNodeInstance.listen(3000, () => 0);
  });

  after(() => {
    server.close();
  });

  it('responds with the correct transactions to requests with an existing topic', async () => {
    await request(server)
      .post('/persistTransaction')
      .send({
        channelId,
        topics,
        transactionData,
      })
      .set('Accept', 'application/json')
      .expect(httpStatus.OK);

    let serverResponse = await request(server)
      .get('/getTransactionsByTopic')
      .query({ topic: topics[0] })
      .set('Accept', 'application/json')
      .expect(httpStatus.OK);

    expect(serverResponse.body.result.transactions).to.have.lengthOf(1);
    expect(serverResponse.body.result.transactions[0].transaction).to.deep.equal(transactionData);

    await request(server)
      .post('/persistTransaction')
      .send({
        channelId: anotherChannelId,
        topics: otherTopics,
        transactionData: otherTransactionData,
      })
      .set('Accept', 'application/json')
      .expect(httpStatus.OK);

    serverResponse = await request(server)
      .get('/getTransactionsByTopic')
      .query({ topic: otherTopics[0] })
      .set('Accept', 'application/json')
      .expect(httpStatus.OK);

    expect(serverResponse.body.result.transactions).to.have.lengthOf(1);
    expect(serverResponse.body.result.transactions[0].transaction).to.deep.equal(
      otherTransactionData,
    );

    // If we search for the common topic, there should be two transaction
    serverResponse = await request(server)
      .get('/getTransactionsByTopic')
      .query({ topic: commonTopic })
      .set('Accept', 'application/json')
      .expect(httpStatus.OK);

    expect(serverResponse.body.result.transactions).to.have.lengthOf(2);
  });

  it('responds with no transaction to requests with a non-existent topic', async () => {
    const serverResponse = await request(server)
      .get('/getTransactionsByTopic')
      .query({ topic: { nonExistentTopic } })
      .set('Accept', 'application/json')
      .expect(httpStatus.OK);

    expect(serverResponse.body.result.transactions).to.be.empty;
  });

  it('responds with status 422 to requests with no value', async () => {
    await request(server)
      .get('/getTransactionsByTopic')
      .set('Accept', 'application/json')
      .expect(httpStatus.UNPROCESSABLE_ENTITY);
  });
});
