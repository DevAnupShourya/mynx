const Socket_Events = {
    socket_connect: 'connection',
    socket_disconnect: 'disconnect',
    socket_error_connect: 'connect_error',
    socket_error_failed: 'connect_failed',
    join_personal_chat: 'chat:personal',
    leave_personal_chat: 'chat:personal:leave',
    send_message_personal_chat: 'chat:personal:message:send',
    receive_message_personal_chat: 'chat:personal:message:receive',
    personal_chat_typing: 'chat:personal:typing',
    personal_chat_online: 'chat:personal:online',
}

export default Socket_Events;