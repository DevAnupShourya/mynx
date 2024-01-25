export default function autoScrollToBottom(elementId: string) {
    const chatContainer = document.getElementById(elementId);

    if (chatContainer) {
        chatContainer.scrollTop = chatContainer.scrollHeight;
    } else {
        return;
    }
}