import { computed, Injectable, signal } from '@angular/core';

export interface ItemCarrinho {
  id: number;
  nome: string;
  preco: number;
  quantidade: number;
}

export interface ItemRecomendado {
  id: number;
  nome: string;
  preco: number;
}

@Injectable({
  providedIn: 'root'
})
export class CarrinhoService {

  private readonly itensSignal = signal<ItemCarrinho[]>([
    { id: 1, nome: 'Camiseta', preco: 59.9, quantidade: 2 },
    { id: 2, nome: 'Caneca', preco: 29.5, quantidade: 1 },
    { id: 3, nome: 'Livro', preco: 89.0, quantidade: 1 }
  ]);

  readonly itens = this.itensSignal.asReadonly();

  readonly total = computed(() => {
    const lista = this.itensSignal();
    let soma = 0;

    for (const item of lista) {
      soma += item.preco * item.quantidade;
    }

    return soma;
  });

  readonly recomendados: ItemRecomendado[] = [
    { id: 10, nome: 'Fone Bluetooth', preco: 149.9 },
    { id: 11, nome: 'Mochila', preco: 179.0 },
    { id: 12, nome: 'Garrafa Térmica', preco: 69.9 }
  ];


  criarItem(item: ItemRecomendado): void {
    this.itensSignal.update((itensAtuais: ItemCarrinho[]) => {
      const copiaItens = [...itensAtuais];
      const indiceExistente = copiaItens.findIndex((i: ItemCarrinho) => i.id === item.id);

      if (indiceExistente >= 0) {
        const itemAtual = copiaItens[indiceExistente];
        copiaItens[indiceExistente] = {
          ...itemAtual,
          quantidade: itemAtual.quantidade + 1
        };

        return copiaItens;
      }

      const novoItem: ItemCarrinho = {
        id: item.id,
        nome: item.nome,
        preco: item.preco,
        quantidade: 1
      };

      return [...copiaItens, novoItem];
    });
  }

  removerItem(id: number): void {
    this.itensSignal.update((itensAtuais: ItemCarrinho[]) =>
      itensAtuais.filter((item: ItemCarrinho) => item.id !== id)
    );
  }
}