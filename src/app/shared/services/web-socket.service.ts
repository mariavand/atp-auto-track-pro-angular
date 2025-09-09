import { inject, Injectable, Signal } from "@angular/core";
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { environment } from "../../environments/environment";
import { wsResponse } from '../models/web-socket.model';
import { AuthService, User } from "@auth0/auth0-angular";
import { takeUntilDestroyed, toSignal } from "@angular/core/rxjs-interop";
import { filter, first, tap } from "rxjs";

@Injectable({ providedIn: 'root' })
export class WebSocketService {

  authService = inject(AuthService);
  subject!: WebSocketSubject<any>;
  msg = '';

  user: Signal<User | null | undefined> = toSignal(this.authService.user$.pipe(
    filter(user => user !== undefined),
    takeUntilDestroyed(),
    tap((user) => {
      if(!!user?.email){
        this.connect({ email: user?.email });
      }
    })
  ));

  connect(msg: { email: string }){
    this.subject = webSocket<wsResponse>(environment.webSocketUrl);
    return this.subject.next(msg);
  }

  sendToServer(type: 'CAR_LOCKED' | 'CAR_UNLOCKED', carId: number){
    console.log(this.user()?.email);
    return this.subject.next({
      type,
      email: this.user()?.email,
      carId
    });
  }

  close(){
    this.subject.complete();
  }

}
