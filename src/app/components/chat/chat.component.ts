import { Component, OnInit } from '@angular/core';
import { MensajeI } from 'src/app/interface/mensaje.interface';
import { ChatService } from 'src/app/providers/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  mensaje: string = '';
  elemento: any;

  constructor(public chatSvc: ChatService) {
    this.chatSvc.cargarMensajes()
      .subscribe(() => {
        setTimeout(() => {
          this.elemento.scrollTop = this.elemento.scrollHeight;
        }, );
      });
  }

  ngOnInit(): void {
    this.elemento = document.getElementById('app-mensajes');
  }

  enviarMensaje(){
    if(this.mensaje.length === 0) {
      return;
    }

    this.chatSvc.agregarMensaje(this.mensaje)
      .then(() => {
        this.mensaje = '';
        
      }).catch((err) => {
        console.error(`Error al enviar ${err}`);
        
      })
  }

}
