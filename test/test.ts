import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import server from "../src/server"

chai.use(chaiHttp)

it('check root path', function (done) {
    chai.request(server)
        .get('/')
        .end(function (err, res) {
            expect(err).to.be.null;
            expect(res).to.be.json;
            done();
        });
});