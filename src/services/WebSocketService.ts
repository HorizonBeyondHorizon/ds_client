export class WebSocketService{
    private static instance: WebSocket;

    static getInstance(url: string): WebSocket {
        if (!WebSocketService.instance) {
            WebSocketService.instance = new WebSocket(url);
        }
        return WebSocketService.instance;
    }
}
