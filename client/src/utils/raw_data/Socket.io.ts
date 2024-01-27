const Socket_Events = {
    SOCKET_CONNECT: 'connection',
    SOCKET_DISCONNECT: 'disconnect',
    SOCKET_ERROR_CONNECT: 'connect_error',
    SOCKET_ERROR_FAILED: 'connect_failed',
    JOIN_CHAT : 'chat:join',
    LEAVE_CHAT : 'chat:leave',
    MESSAGE_RECEIVE : 'chat:message:receive',
    MESSAGE_SEND : 'chat:message:send',
    TYPING_START : 'chat:typing:start',
    TYPING_STOP : 'chat:typing:stop',
    USER_ONLINE : 'chat:online',
    USER_OFFLINE : 'chat:offline',
}

export default Socket_Events;