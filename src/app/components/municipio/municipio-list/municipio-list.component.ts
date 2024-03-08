import { Component, OnInit } from '@angular/core';
import { Municipio } from '../../../models/municipio.model';
import { MunicipioService } from '../../../services/municipio.service';
import { NgFor } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-municipio-list',
  standalone: true,
  imports: [NgFor, MatTableModule, MatToolbarModule, MatIconModule
  , MatButtonModule, RouterModule],
  templateUrl: './municipio-list.component.html',
  styleUrl: './municipio-list.component.css'
})
export class MunicipioListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nome', 'estado', 'acao'];
  municipios: Municipio[] = [];

  constructor(private municipioService: MunicipioService,
    private router: Router) {

  }

  ngOnInit(): void {
    //chama função para carregar a lista de municipios
    this.carregaListaMunicipios();
    
  }

  //função para carregar a lista de municipios
  carregaListaMunicipios() {
    this.municipioService.findAll().subscribe(data => {
      this.municipios = data;
    });
  }

  excluir(municipioId: number) {
    //cria a instância de municipio
    const municipio = new Municipio();
    //seta o id do municipio
    municipio.id = municipioId;
    this.municipioService.delete(municipio).subscribe({
    next: () => {

      //se deu certo, recarrega a lista chamando novamente a função para carregar a lista de municipios
      this.carregaListaMunicipios();
    },
    error: (err) => {
      console.log('Erro ao Excluir' + JSON.stringify(err));
    }
  });
  

  }

}
