import { Component, OnInit } from '@angular/core';
import { Estado } from '../../../models/estado.model';
import { EstadoService } from '../../../services/estado.service';
import { NgFor } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-estado-list',
  standalone: true,
  imports: [NgFor, MatTableModule, MatToolbarModule, MatIconModule
  , MatButtonModule, RouterModule],
  templateUrl: './estado-list.component.html',
  styleUrl: './estado-list.component.css'
})
export class EstadoListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nome', 'sigla', 'acao'];
  estados: Estado[] = [];

  constructor(private estadoService: EstadoService) {

  }

  ngOnInit(): void {
    this.carregaListaEstados();
  }

  carregaListaEstados(){
    this.estadoService.findAll().subscribe(data => {
      this.estados = data;
    }, error => {
      console.log(error);
    })
  }
  excluir(estadoId: number) {
    //cria a instância de Estado
    const estado = new Estado();
    //seta o id do estado
    estado.id = estadoId;
    this.estadoService.delete(estado).subscribe({
    next: () => {

      //se deu certo, recarrega a lista chamando novamente a função para carregar a lista de estados
      this.carregaListaEstados();
    },
    error: (err) => {
      console.log('Erro ao Excluir' + JSON.stringify(err));
    }
  });
  

  }

}
