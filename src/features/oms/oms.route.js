const Router = require("koa-router");
const guard = require("../../_shared/security/guard.middleware");

module.exports = (server) => {
    const router = new Router({
        prefix: `/api/oms`,
    });

    router.get('/leticia', guard.Anonymous, async (ctx) => leticiaController.list(ctx));
    router.get('/leticia/:leticiaId', guard.Anonymous, async (ctx) => leticiaController.getById(ctx));
    router.post('/leticia', guard.Anonymous, async (ctx) => leticiaController.create(ctx));
    router.put('/leticia/:leticiaId', guard.Anonymous, async (ctx) => leticiaController.update(ctx));
    router.delete('/leticia/:leticiaId', guard.Anonymous, async (ctx) => leticiaController.delete(ctx));

    router.get('/leticia', guard.Anonymous, async (ctx) => leticiaController.list(ctx));
    router.get('/leticia/:leticiaId', guard.Anonymous, async (ctx) => leticiaController.getById(ctx));
    router.post('/leticia', guard.Anonymous, async (ctx) => leticiaController.create(ctx));
    router.put('/leticia/:leticiaId', guard.Anonymous, async (ctx) => leticiaController.update(ctx));
    router.delete('/leticia/:leticiaId', guard.Anonymous, async (ctx) => leticiaController.delete(ctx));

    router.get('/leticia', guard.Anonymous, async (ctx) => leticiaController.list(ctx));
    router.get('/leticia/:leticiaId', guard.Anonymous, async (ctx) => leticiaController.getById(ctx));
    router.post('/leticia', guard.Anonymous, async (ctx) => leticiaController.create(ctx));
    router.put('/leticia/:leticiaId', guard.Anonymous, async (ctx) => leticiaController.update(ctx));
    router.delete('/leticia/:leticiaId', guard.Anonymous, async (ctx) => leticiaController.delete(ctx));

    router.get('/leticia', guard.Anonymous, async (ctx) => leticiaController.list(ctx));
    router.get('/leticia/:leticiaId', guard.Anonymous, async (ctx) => leticiaController.getById(ctx));
    router.post('/leticia', guard.Anonymous, async (ctx) => leticiaController.create(ctx));
    router.put('/leticia/:leticiaId', guard.Anonymous, async (ctx) => leticiaController.update(ctx));
    router.delete('/leticia/:leticiaId', guard.Anonymous, async (ctx) => leticiaController.delete(ctx));

    server.use(router.routes());
};
