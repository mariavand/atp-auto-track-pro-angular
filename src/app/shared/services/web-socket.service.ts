import { Injectable } from "@angular/core";
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { environment } from "../../environments/environment";

interface wsResponse {
  message: null | string;
  type: string;
}

@Injectable({ providedIn: 'root' })
export class WebSocketService {

  subject!: WebSocketSubject<any>;
  msg = '';

  connect(msg: { email: string, locked: boolean }){
    this.subject = webSocket<wsResponse>(environment.webSocketUrl);
    this.sendToServer(msg);
  }

  sendToServer(msg: { email: string, locked: boolean }){
    return this.subject.next(msg);
  }

  close(){
    this.subject.complete();
  }

}
