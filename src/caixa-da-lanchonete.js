class Cardapio {
    constructor() {
        this.itens = {
            cafe: 3.00,
            chantily: 1.50,
            suco: 6.20,
            sanduiche: 6.50,
            queijo: 2.00,
            salgado: 7.25,
            combo1: 9.50,
            combo2: 7.50,
        };
    }

    verificarItem(item) {
        return this.itens.hasOwnProperty(item);
    }

    obterPreco(item) {
        return this.itens[item];
    }
}

class Pedido {
    constructor() {
        this.itens = [];
    }

    getItens() {
        return this.itens;
    }

    adicionarItem(item) {
        this.itens.push(item);
    }

    valorTotalPedido() {
        return this.itens.reduce((total, item) => total + item.preco * item.quantidade, 0);
    }
}

class CaixaDaLanchonete {
    constructor() {
        this.cardapio = new Cardapio();
        this.pedido = new Pedido();
    }

    calcularValorDaCompra(formaDePagamento, itens) {
        const formasDePagamentoValidas = ['dinheiro', 'debito', 'credito'];

        if (!formasDePagamentoValidas.includes(formaDePagamento)) {
            return "Forma de pagamento inválida!";
        }

        for (const item of itens) {
            const [nomeItem, quantidade] = item.split(',');

            if (!this.cardapio.verificarItem(nomeItem)) {
                return "Item inválido!";
            }
            if (quantidade <= 0) {
                return "Quantidade inválida!";
            }
            if (nomeItem === 'chantily') {
                if (!this.pedido.getItens().some(item => item.item === 'cafe')) {
                    return "Item extra não pode ser pedido sem o principal";
                }
            }
            if (nomeItem === 'queijo') {
                if (!this.pedido.getItens().some(item => item.item === 'sanduiche')) {
                    return "Item extra não pode ser pedido sem o principal";
                }
            }

            this.pedido.adicionarItem({
                item: nomeItem,
                quantidade: parseInt(quantidade),
                preco: this.cardapio.obterPreco(nomeItem)
            });
        }

        if (this.pedido.getItens().length === 0) {
            return "Não há itens no carrinho de compra!";
        }

        let valorTotal = this.pedido.valorTotalPedido();

        if (formaDePagamento === 'dinheiro') {
            valorTotal *= 0.95;
        } else if (formaDePagamento === 'credito') {
            valorTotal *= 1.03;
        }

        return `R$ ${valorTotal.toFixed(2).replace('.', ',')}`;
    }
}

export { CaixaDaLanchonete };
