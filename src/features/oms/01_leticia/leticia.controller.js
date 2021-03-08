const { DictionaryController } = require('@kruzer/sdk-private');

class Controller extends DictionaryController {
    async list(ctx) {
        await this.ok(ctx, async () => await ctx.services.leticia.list(ctx));
    }

    async getById(ctx) {
        ctx.asserts = [
            { parent: ctx.params, field: 'leticiaId', _id: 400 }
        ]
        await this.ok(ctx, async () => await ctx.services.leticia.getById(ctx, ctx.params.leticiaId));
    }

    async create(ctx) {
        ctx.asserts = [
        ]
        await this.created(ctx, async () => await ctx.services.leticia.insertOne(ctx));
    }

    async update(ctx) {
        ctx.asserts = [
            { parent: ctx.params, field: 'leticiaId', _id: 400 }
        ]

        await this.noContent(ctx, async () => await ctx.services.leticia.updateOne(ctx, {
            query: { _id: ctx.params.leticiaId },
            body: ctx.request.body
        }));
    }

    async delete(ctx) {
        ctx.asserts = [
            { parent: ctx.params, field: 'leticiaId', _id: 400 }
        ]

        await this.noContent(ctx, async () => await ctx.services.leticia.deleteOneLogic(ctx, { _id: ctx.params.leticiaId }));
    }
}

module.exports = new Controller();
