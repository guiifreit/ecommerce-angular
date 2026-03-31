import { Injectable, signal } from '@angular/core';

export interface Produto {
  id: number;
  nome: string;
  preco: number;
}

@Injectable({ providedIn: 'root' })
export class ProdutosService {
  private readonly produtosSignal = signal<Produto[]>([
    { id: 1, nome: 'Camiseta', preco: 59.9 },
    { id: 2, nome: 'Caneca', preco: 29.5 },
    { id: 3, nome: 'Livro', preco: 89.0 }
  ]);

  private nextId = 4;

  readonly produtos = this.produtosSignal.asReadonly();

  criarProduto(data: { nome: string; preco: number }): void {
    const novo: Produto = { id: this.nextId++, nome: data.nome.trim(), preco: Number(data.preco) };
    this.produtosSignal.update((lista) => [...lista, novo]);
  }
}
