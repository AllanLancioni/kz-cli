const Router = require("koa-router");
const guard = require("../../_shared/security/guard.middleware");

module.exports = (server) => {
    const router = new Router({
        prefix: `/api/test`,
    });

    router.get('/test', guard.Anonymous, async (ctx) => testController.list(ctx));
    router.get('/test/:testId', guard.Anonymous, async (ctx) => testController.getById(ctx));
    router.post('/test', guard.Anonymous, async (ctx) => testController.create(ctx));
    router.put('/test/:testId', guard.Anonymous, async (ctx) => testController.update(ctx));
    router.delete('/test/:testId', guard.Anonymous, async (ctx) => testController.delete(ctx));

    router.get('/test', guard.Anonymous, async (ctx) => testController.list(ctx));
    router.get('/test/:testId', guard.Anonymous, async (ctx) => testController.getById(ctx));
    router.post('/test', guard.Anonymous, async (ctx) => testController.create(ctx));
    router.put('/test/:testId', guard.Anonymous, async (ctx) => testController.update(ctx));
    router.delete('/test/:testId', guard.Anonymous, async (ctx) => testController.delete(ctx));

    server.use(router.routes());
};
