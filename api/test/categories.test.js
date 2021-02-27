const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../index')

chai.should()
chai.use(chaiHttp)


describe('Category API', () => {

    // test the get route
    describe('GET ', () => {
        if ('it should GET all the tasks', (done) => {
            chai.request(server)
                .get('/')
                .end((err, response) => {
                    response.should.have.status(200)
                })
                .done()
        });
    })

})

