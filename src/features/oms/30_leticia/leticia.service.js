const { DomainService } = require('@kruzer/sdk-private');

class Service extends DomainService {
    constructor(server) {
        super('oms_leticia', server.context.dbRepo);
    }
}

module.exports = Service;
