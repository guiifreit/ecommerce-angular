import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProdutosService } from '../../services/produtos.service';

@Component({
  selector: 'app-produtos',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './produtos.component.html'
})
export class ProdutosComponent {
  form: FormGroup;
  mostrarFormulario = false;
  editarId: number | null = null;

  constructor(private readonly produtosService: ProdutosService, private readonly fb: FormBuilder) {
    this.form = this.fb.group({
      nome: ['', Validators.required],
      preco: [null, [Validators.required, Validators.min(0)]]
    });
  }

  produtos = () => this.produtosService.produtos();

  adicionarProduto() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { nome, preco } = this.form.value;

    if (this.editarId !== null) {
      this.produtosService.update(this.editarId, { nome, preco });
      this.editarId = null;
    } else {
      this.produtosService.criarProduto({ nome, preco });
    }

    this.form.reset({ nome: '', preco: null });
    this.mostrarFormulario = false;
  }

  iniciarEdicao(id: number) {
    const p = this.produtosService.produtos().find(x => x.id === id);
    if (!p) return;
    this.form.patchValue({ nome: p.nome, preco: p.preco });
    this.editarId = id;
    this.mostrarFormulario = true;
  }

  removerProduto(id: number) {
    this.produtosService.delete(id);
  }
}

