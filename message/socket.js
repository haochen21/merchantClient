var messageSubscribers = {};

exports.initialize = function (io) {

    io.on('connection', function (socket) {

        socket.on('disconnect', function () {
            messageSubscribers[socket.merchant.id].logNum = messageSubscribers[socket.merchant.id].logNum - 1;
            if (messageSubscribers[socket.merchant.id].logNum === 0) {
                delete messageSubscribers[socket.merchant.id];
                console.log('client disconnect,id is: ' + socket.merchant.id + ',name is: ' + socket.merchant.loginName + ',time is: 0 ');
            } else {
                console.log('client disconnect,id is: ' + socket.merchant.id + ',name is: ' + socket.merchant.loginName + ',time is: ' + messageSubscribers[socket.merchant.id].logNum);
            }
        });

        socket.on("set_merchant", function (data) {
            socket.merchant = data;
            if (messageSubscribers[socket.merchant.id]) {
                messageSubscribers[socket.merchant.id].logNum = messageSubscribers[socket.merchant.id].logNum + 1;
            } else {
                data.logNum = 1;
                messageSubscribers[socket.merchant.id] = data;
            }
            // one room per user
            socket.join('ticket-message-' + socket.merchant.id);
            console.log('client join,id is: ' + data.id + ',loginName is: ' + data.loginName + ',time is: ' + messageSubscribers[socket.merchant.id].logNum);
        });
    });
};

exports.getCartSubscribers = function () {
    var subscribers = [];
    for (var merchantId in messageSubscribers) {
        if (messageSubscribers.hasOwnProperty(merchantId)) {
            var merchant = messageSubscribers[merchantId];
            subscribers.push(merchant);
        }
    }
    return subscribers;
};