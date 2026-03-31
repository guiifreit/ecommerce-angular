import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProdutosService } from '../../services/produtos.service';

@Component({
  selector: 'app-produtos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <section class="container py-4">
      <div class="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h1 class="mb-0">Produtos</h1>
          <small class="text-muted">Lista básica de produtos</small>
        </div>
        <button class="btn btn-primary" (click)="mostrarFormulario = !mostrarFormulario">
          {{ mostrarFormulario ? 'Cancelar' : 'Cadastrar produto' }}
        </button>
      </div>

      <div *ngIf="mostrarFormulario" class="card mb-4">
        <div class="card-body">
          <form (ngSubmit)="adicionarProduto()">
            <div class="row g-3 align-items-end">
              <div class="col-md-6">
                <label class="form-label">Nome</label>
                <input class="form-control" [(ngModel)]="form.nome" name="nome" required />
              </div>
              <div class="col-md-4">
                <label class="form-label">Preço (R$)</label>
                <input type="number" class="form-control" [(ngModel)]="form.preco" name="preco" required min="0" step="0.01" />
              </div>
              <div class="col-md-2">
                <button class="btn btn-success w-100" type="submit">{{ editarId !== null ? 'Salvar' : 'Adicionar' }}</button>
              </div>
            </div>
          </form>
        </div>
      </div>

      <div *ngIf="(produtos().length === 0)" class="alert alert-info">Nenhum produto cadastrado.</div>

      <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
        <div class="col" *ngFor="let p of produtos()">
          <div class="card h-100">
            <div class="card-body d-flex flex-column">
              <h5 class="card-title">{{ p.nome }}</h5>
              <p class="card-text text-muted mb-4">Preço: R$ {{ p.preco | number:'1.2-2' }}</p>
              <div class="mt-auto d-flex justify-content-between">
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `
})
export class ProdutosComponent {
  constructor(private readonly produtosService: ProdutosService) {}

  produtos = () => this.produtosService.produtos();

  mostrarFormulario = false;

  // quando editarId é null => modo create
  editarId: number | null = null;

  form: { nome: string; preco: number | null } = { nome: '', preco: null };

  adicionarProduto() {
    if (!this.form.nome || this.form.preco === null) return;

    this.produtosService.criarProduto({ nome: this.form.nome, preco: this.form.preco });

    this.form = { nome: '', preco: null };
    this.mostrarFormulario = false;
  }
}
