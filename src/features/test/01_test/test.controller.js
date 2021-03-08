const { DictionaryController } = require('@kruzer/sdk-private');

class Controller extends DictionaryController {
    async list(ctx) {
        await this.ok(ctx, async () => await ctx.services.test.list(ctx));
    }

    async getById(ctx) {
        ctx.asserts = [
            { parent: ctx.params, field: 'testId', _id: 400 }
        ]
        await this.ok(ctx, async () => await ctx.services.test.getById(ctx, ctx.params.testId));
    }

    async create(ctx) {
        ctx.asserts = [
        ]
        await this.created(ctx, async () => await ctx.services.test.insertOne(ctx));
    }

    async update(ctx) {
        ctx.asserts = [
            { parent: ctx.params, field: 'testId', _id: 400 }
        ]

        await this.noContent(ctx, async () => await ctx.services.test.updateOne(ctx, {
            query: { _id: ctx.params.testId },
            body: ctx.request.body
        }));
    }

    async delete(ctx) {
        ctx.asserts = [
            { parent: ctx.params, field: 'testId', _id: 400 }
        ]

        await this.noContent(ctx, async () => await ctx.services.test.deleteOneLogic(ctx, { _id: ctx.params.testId }));
    }
}

module.exports = new Controller();
