const vm = new Vue({
  el: '#app',
  data: {
    produtos: [],
    produto: false,
    carrinho: [],
    mensagemAlerta: 'Item adicionado',
    alertaAtivo: false,
    // carrinhoAtivo: true,
  },
  computed: {
    carrinhoTotal() {
      let total = 0;
      if (this.carrinho.length) {
        this.carrinho.forEach((item) => {
          total += item.preco;
        });
      }
      return total;
    },
  },
  methods: {
    fetchProdutos() {
      fetch('./api/produtos.json')
        .then((r) => r.json())
        .then((r) => {
          this.produtos = r;
        });
    },
    numeroPreco(value) {
      return value.TolocaleString('pt-br', {
        style: 'currency',
        currency: 'BRL',
      });
    },
    fetchProduto(id) {
      fetch(`./api/produtos/${id}/dados.json`)
        .then((res) => res.json())
        .then((r) => {
          this.produto = r;
        });
    },
    abrirModal(id) {
      this.fetchProduto(id);
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    },
    fechar_modal({ target, currentTarget }) {
      if (target === currentTarget) {
        this.produto = false;
      }
    },
    clickForaCarrinho({ target, currentTarget }) {
      if (target === currentTarget) {
        this.carrinhoAtivo = false;
      }
    },
    adicionarItem() {
      const { id, nome, preco } = this.produto;
      this.carrinho.push({ id, nome, preco });
      this.produto.estoque--;
      this.alerta(`${nome} foi adicionado ao carrinho`);
    },
    removerItem(index) {
      this.carrinho.splice(index, 1);
    },
    checarLocalStorage() {
      if (window.localStorage.carrinho) {
        this.carrinho = JSON.parse(window.localStorage.carrinho);
      }
    },
    alerta(mensagem) {
      this.mensagemAlerta = mensagem;
      this.alertaAtivo = true;
      setTimeout(() => {
        this.alertaAtivo = false;
      }, 1500);
    },
    // router() {
    //   const hash = document.location.hash;
    //   if (hash) {
    //     this.fetchProduto(hash);
    //   }
    // },
  },
  watch: {
    produto() {
      document.title = `${this.produto.nome} - Techno` || 'Techno';
      const hash = this.produto.id || '';
      history.pushState(null, null, hash);
    },
    carrinho() {
      window.localStorage.carrinho = JSON.stringify(this.carrinho);
    },
  },
  created() {
    this.fetchProdutos();
    this.checarLocalStorage();
    // this.router();
  },
});
