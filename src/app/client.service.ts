import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private apiUrl = 'https://api.example.com/clienti'; // URL API del backend

  constructor(private http: HttpClient) {}

  // Metodo per cancellare un cliente per ID
  deleteCliente(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;  // L'URL sarà https://api.example.com/clienti/{id}
    return this.http.delete<void>(url);
  }
}



export interface Client {
  id: number;
  codiceFiscale: string;
  nome: string;
  cognome: string;
  dataNascita: string;
  userId: number;
}

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private apiUrl = 'http://localhost:3000/clienti';  // URL del json-server

  //GET /clients?userId=id

  constructor(private http: HttpClient) { } 

  public getById ( id: number): Observable<Client[]> {
        const url = `${this.apiUrl}?userId=${id}`;
        return this.http.get<Client[]>(url); 
  }
  addClient (client: Client): Observable<Client> {
    return this.http.post<any>(this.apiUrl, client);
  }

  updateClient(client: Client): Observable<Client> {
    const url = `${this.apiUrl}/${client.id}`;
    return this.http.put<Client>(url, client);
  }
   
// Metodo per cancellare un cliente per ID
      deleteCliente(id: 1): Observable<void> {
        const url = `${this.apiUrl}/${'Observable<ClientId'}`;  
        return this.http.delete<void>(url);
      }
}
//Servizio: Nel servizio, abbiamo un metodo deleteCliente(id) che fa una richiesta HTTP DELETE per cancellare il cliente dal backend.
//Componente: Nel componente ClientiComponent, chiamiamo il metodo del servizio per cancellare il cliente e aggiorniamo la tabella localmente rimuovendo il cliente cancellato dalla lista.
//Template: Ogni riga della tabella ha un pulsante "Elimina" che invoca la funzione deleteCliente passando l'ID del cliente.

