(function (Collection) {
    var monkeypatch = require('monkeypatch'),
        debug = require('debug')('emitter');

    debug('patching collection');
    monkeypatch(Collection.prototype, 'save', function (original, ctx, done) {
        var resourceName = this.name;
        original(ctx, function (err, data) {
            if (!err) {
                var action = ctx.req.method === 'PUT' ? 'updated' : 'created';
                debug(action, resourceName);
                ctx.session.emitToAll(action, {
                    resource: resourceName,
                    data: data
                });
                ctx.session.emitToAll(resourceName + ':' + action, data);
            }
            done(err, data);
        });
    });

    monkeypatch(Collection.prototype, 'remove', function (original, ctx, done) {
        var resourceName = this.name;
        original(ctx, function (err, data) {
            if (!err) {
                debug('deleted', resourceName);
                ctx.session.emitToAll('deleted', {
                    resource: resourceName,
                    data: data
                });
                ctx.session.emitToAll(resourceName + ':deleted', data);
            }
            done(err, data);
        });
    });
})(require('deployd/lib/resources/collection'));