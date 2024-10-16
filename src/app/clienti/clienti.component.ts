import { Component, OnInit } from '@angular/core';
import { Client, ClientService } from '../client.service';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-clienti',
  templateUrl: './clienti.component.html',
  styleUrl: './clienti.component.css',
})
export class ClientiComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'codiceFiscale',
    'nome',
    'cognome',
    'dataNascita',
    'edit',
    'delete',
  ];
  customers: Client[] = [];

  selectedClientId: number | null = null;

  userForm: FormGroup;
  constructor(private clientService: ClientService, private fb: FormBuilder) {
    this.userForm = this.fb.group({
      codiceFiscale: ['', Validators.required],
      nome: ['', Validators.required],
      cognome: ['', Validators.required],
      dataNascita: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.getClient();
  }

  getClient(): void {
    let id = sessionStorage.getItem('userId');
    this.clientService.getById(parseInt(id as string)).subscribe({
      next: (client) => {
        this.customers = client;
      },
      error: (err) => {
        console.error('Errore del server', err);
      },
    });
  }
  onEdit(customer: Client): void {
    this.userForm.patchValue({
      codiceFiscale: customer.codiceFiscale,
      nome: customer.nome,
      cognome: customer.cognome,
      dataNascita: customer.dataNascita,
    });
    this.selectedClientId = customer.id !== undefined ? customer.id : null;
  }

  onsubmit(): void {
    let id = sessionStorage.getItem('userId');
    if (this.userForm.valid) {
      if (this.selectedClientId !== null) {
        let id = sessionStorage.getItem('userId');
        const cliente = { ...this.userForm.value, userId: id };
        this.clientService.addClient(cliente).subscribe({
          next: (response) => {
            this.getClient();
          },
          error: (error) => {
            console.error("Errore durante l'aggiunta del cliente", error);
          },
        });
      } else {
        let userId = sessionStorage.getItem('userId');
        const cliente = {
          ...this.userForm.value,
          userId: userId,
          id: this.selectedClientId,
        };
        this.clientService.updateClient(cliente).subscribe({
          next: (response) => {
            this.getClient();
            this.selectedClientId = null;
          },
        });
      }
    }
  }
}


