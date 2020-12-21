import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/providers/chat.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private chatSvc: ChatService) { }

  ngOnInit(): void {
  }

  ingresar(proveedor: string) {
    this.chatSvc.login(proveedor);
  }

}
