/* eslint-disable max-lines-per-function */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../index';
import { constants } from '../../app/utils';
import { schObj, reviewObj } from '../fixtures/school';

const { expect } = chai;
chai.use(chaiHttp);

const { SUCCESS } = constants;
describe('School Routes', () => {
  it('should add a new school', (done) => {
    chai
      .request(app)
      .post('/api/v1/school')
      .set({ Authorization: process.env.USER_TOKEN })
      .send(schObj)
      .end((err, res) => {
        process.env.SCHOOL_ID = res.body.data.id;
        expect(res.body.status).to.equal(SUCCESS);
        expect(res.body.message).to.equal('School added successfully');
        done(err);
      });
  });
  it('should get a school by its id', (done) => {
    chai
      .request(app)
      .get(`/api/v1/school/${process.env.SCHOOL_ID}`)
      .end((err, res) => {
        expect(res.body.status).to.equal(SUCCESS);
        expect(res.body.message).to.equal('School info retrieved successfully');
        done(err);
      });
  });
  it('should get a school\'s review by its id', (done) => {
    chai
      .request(app)
      .get(`/api/v1/school/${process.env.SCHOOL_ID}/review`)
      .end((err, res) => {
        expect(res.body.status).to.equal(SUCCESS);
        expect(res.body.message).to.equal('School reviews retrieved successfully');
        done(err);
      });
  });
  it('should successfully review a school', (done) => {
    chai
      .request(app)
      .post(`/api/v1/school/${process.env.SCHOOL_ID}/review`)
      .send(reviewObj)
      .end((err, res) => {
        process.env.REVIEW_ID = res.body.data.reviewId;
        expect(res.body.status).to.equal(SUCCESS);
        expect(res.body.message).to.equal('Review created successfully');
        expect(res.body.data).to.have.property('subject').equal(reviewObj.subject);
        done(err);
      });
  });
  it('should fetch all schools', (done) => {
    chai
      .request(app)
      .get('/api/v1/school')
      .set({ Authorization: process.env.USER_TOKEN })
      .end((err, res) => {
        expect(res.body.status).to.equal(SUCCESS);
        expect(res.body.message).to.equal('Schools fetched successfully');
        expect(res.body.data).to.have.property('totalPages');
        done(err);
      });
  });
});
