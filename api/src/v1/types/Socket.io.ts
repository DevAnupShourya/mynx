const Socket_Events = {
    SOCKET_CONNECT: 'connect',
    SOCKET_DISCONNECT: 'disconnect',
    SOCKET_ERROR_CONNECT: 'connect_error',
    SOCKET_ERROR_FAILED: 'connect_failed',
    JOIN_CHAT: 'chat:join',
    LEAVE_CHAT: 'chat:leave',
    MESSAGE_RECEIVE: 'chat:message:receive',
    MESSAGE_SEND: 'chat:message:send', 
    USER_ONLINE: 'chat:user:online',
    USER_OFFLINE: 'chat:user:offline',
    USER_TYPING_START: 'chat:user:typing:start',
    USER_TYPING_STOP: 'chat:user:typing:stop',
};

export default Socket_Events;