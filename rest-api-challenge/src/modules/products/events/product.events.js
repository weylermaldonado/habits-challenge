

function onCreated(payload, socketServer) {
    socketServer.emit('product-created', payload);
}

function onDeleted(payload, socketServer) {
    socketServer.emit('product-deleted', payload);
}


module.exports = { onCreated, onDeleted };