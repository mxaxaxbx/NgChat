import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { MensajeI } from '../interface/mensaje.interface';

import {map} from 'rxjs/operators'

import {AngularFireAuth} from '@angular/fire/auth';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private itemsCollection: AngularFirestoreCollection<MensajeI>;

  public chats: MensajeI[] = [];
  public usuario: any = {};

  constructor(
    private afs: AngularFirestore,
    public afAuth: AngularFireAuth
  ) {
    this.afAuth.authState
      .subscribe(user => {
        if(!user) {
          return;
        }

        this.usuario.nombre = user.displayName;
        this.usuario.uid = user.uid;
        
      })
  }

  login(proveedor: string) {
    if(proveedor === 'google') {
      this.afAuth.signInWithPopup(new firebase.default.auth.GoogleAuthProvider() );

    } else {
      this.afAuth.signInWithPopup(new firebase.default.auth.TwitterAuthProvider() );
    }
  }

  logout() {
    this.usuario = {};
    this.afAuth.signOut();
  }

  cargarMensajes() {
    this.itemsCollection = this.afs.collection<MensajeI>(
      'chats',
      ref=> ref.orderBy('fecha', 'desc')
        .limit(5)
    );

    return this.itemsCollection.valueChanges()
      .pipe(
        map((mensajes: MensajeI[]) => {
          this.chats = [];

          for(let mensaje of mensajes) {
            this.chats.unshift(mensaje);
          }

          return this.chats

        })
      )
  }

  agregarMensaje(texto: string) {
    let mensaje: MensajeI = {
      nombre: this.usuario.nombre,
      mensaje: texto,
      fecha: new Date().getTime(),
      uid: this.usuario.uid,
    }

    return this.itemsCollection.add(mensaje);
  }
}
