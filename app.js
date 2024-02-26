const vm = new Vue({
  el: '#app',
  data: {
    produtos: [],
    produto: false,
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
  },
  created() {
    this.fetchProdutos();
  },
});
