const expect = require('chai').expect;
const rp = require('request-promise');

describe('API', () => {
  const createdBody = { text: 'Learn Serverless' };
  const updatedBody = { text: 'Test Serverless' };
  const uri = `${process.env.TODOS_ENDPOINT}/todos`;
  let id;

  //beforeEach(() => {
  //  createdBody =
  //});

  describe('#create', () => {
    it('should create a new Todo', () => {
      const options = {
        method: 'POST',
        uri,
        body: createdBody,
        json: true,
        resolveWithFullResponse: true,
      };

      return rp(options)
        .then((response) => {
          expect(response.statusCode).to.equal(200);
          id = response.body.id;
        })
        .catch((err) => {
          throw new Error(`Create call failed: ${err}`);
        });
    });
  });

  describe('#get', () => {
    it('should get a new Todo', () => {
      const options = {
        method: 'GET',
        uri: `${uri}/${id}`,
        json: true,
        resolveWithFullResponse: true,
      };

      return rp(options)
        .then((response) => {
          expect(response.statusCode).to.equal(200);
          expect(response.body).to.have.property('text');
          expect(response.body.text).to.equal(createdBody.text);
        })
        .catch((err) => {
          throw new Error(`Read call failed: ${err}`);
        });
    });
  });

  describe('#update', () => {
    it('should update a new Todo', () => {
      const options = {
        method: 'PUT',
        uri: `${uri}/${id}`,
        body: updatedBody,
        json: true,
        resolveWithFullResponse: true,
      };

      return rp(options)
        .then((response) => {
          expect(response.statusCode).to.equal(200);
          expect(response.body).to.have.property('text');
          expect(response.body.text).to.equal(updatedBody.text);
        })
        .catch((err) => {
          throw new Error(`Update call failed: ${err}`);
        });
    });
  });

  describe('#list', () => {
    it('should list new Todos', () => {
      const options = {
        method: 'GET',
        uri,
        json: true,
        resolveWithFullResponse: true,
      };

      return rp(options)
        .then((response) => {
          expect(response.statusCode).to.equal(200);
          expect(response.body[0]).to.have.property('text');
          expect(response.body[0].text).to.equal(updatedBody.text);
        })
        .catch((err) => {
          throw new Error(`List call failed: ${err}`);
        });
    });
  });

  describe('#delete', () => {
    it('should delete a new Todo', () => {
      const options = {
        method: 'DELETE',
        uri: `${uri}/${id}`,
        resolveWithFullResponse: true,
      };

      return rp(options)
        .then((response) => {
          expect(response.statusCode).to.equal(200);
        })
        .catch((err) => {
          throw new Error(`Delete call failed: ${err}`);
        });
    });
  });
});
