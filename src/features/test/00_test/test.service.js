const { DomainService } = require('@kruzer/sdk-private');

class Service extends DomainService {
    constructor(server) {
        super('test_test', server.context.dbRepo);
    }
}

module.exports = Service;
