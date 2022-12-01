import { Observable, Observer } from 'rxjs';

export const ProtoSubject = new Observable((observer: Observer<any>) => {
  const ws = new WebSocket('wss://vernite.dev/api/ws');

  ws.onmessage = (event) => {
    observer.next(event.data);
  };

  ws.onerror = (event) => {
    observer.error(event);
  };

  ws.onclose = (event) => {
    observer.complete();
  };

  return () => {
    ws.close();
  };
});
