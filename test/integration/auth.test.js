/* eslint-disable max-lines-per-function */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../index';
import { constants } from '../../app/utils';
import {
  invalidSignUpObj,
  rightSignUpObj,
  duplicateSignUpObj,
  rightLoginObj
} from '../fixtures/auth';

const { expect } = chai;
chai.use(chaiHttp);

const {
  DB_UNIQUE_CONSTRAINTS: { user_info_email_key },
  SUCCESS,
  FAIL,
  SIGNUP_SUCCESSFUL,
} = constants;

describe('Auth Routes', () => {
  it('should fail to sign up a user, BAD INPUT', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send(invalidSignUpObj)
      .end((err, res) => {
        expect(res.body.status).to.equal(FAIL);
        expect(res.body.message).to.equal('Last name is a required field');
        done(err);
      });
  });
  it('should sign up user properly', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send(rightSignUpObj)
      .end((err, res) => {
        expect(res.body.status).to.equal(SUCCESS);
        expect(res.body.message).to.equal(SIGNUP_SUCCESSFUL);
        done(err);
      });
  });
  it('should fail to sign up user, DUPLICATED ENTITY', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send(duplicateSignUpObj)
      .end((err, res) => {
        expect(res.body.status).to.equal(FAIL);
        expect(res.body.message).to.equal(user_info_email_key);
        done(err);
      });
  });
  it('should login user properly', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signin')
      .send(rightLoginObj)
      .end((err, res) => {
        process.env.USER_TOKEN = `Bearer ${res.body.data.token}`;
        expect(res.body.status).to.equal(SUCCESS);
        done(err);
      });
  });
});
