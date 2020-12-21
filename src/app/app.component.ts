import { Component } from '@angular/core';
import { ChatService } from './providers/chat.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'firechat';

  constructor(public chatSvc: ChatService) {
  }

  logout(){
    this.chatSvc.logout();
  }

  
}
