const vm = new Vue({
  el: '#app',
  data: {
    produtos: [],
    produto: false,
  },
  filters: {},
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
  },
  created() {
    this.fetchProdutos();
  },
});
