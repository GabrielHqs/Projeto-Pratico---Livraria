document.addEventListener('DOMContentLoaded', () => {
  const listaLivros = document.getElementById('lista-livros');
  const inputBusca = document.getElementById('busca');
  const selectOrdenar = document.getElementById('ordenar');
  const botoesCategoria = document.querySelectorAll('.categorias a');
  const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

  // livros
  const livros = [
    { titulo: "Harry Potter e a Pedra Filosofal", autor: "J.K. Rowling", ano: 1997, preco: 30, categoria: "fantasia", img: "img/Harry01english.webp" },
    { titulo: "O Hobbit", autor: "J.R.R. Tolkien", ano: 1937, preco: 30, categoria: "fantasia", img: "img/O Hobbit.jpg" },
    { titulo: "O Senhor dos Anéis: A Sociedade do Anel", autor: "J.R.R. Tolkien", ano: 1954, preco: 30, categoria: "fantasia", img: "img/O Senhor dos Anéis A Sociedade do Anel.jpg" },
    { titulo: "Dom Casmurro", autor: "Machado de Assis", ano: 1899, preco: 30, categoria: "classicos", img: "img/DOM CASMURRO - 1899.jpg" },
    { titulo: "O Grande Gatsby", autor: "F. Scott Fitzgerald", ano: 1925, preco: 30, categoria: "classicos", img: "img/O grande Gatsby.jpg" },
    { titulo: "1984", autor: "George Orwell", ano: 1949, preco: 30, categoria: "ficcao", img: "img/1984.jpg" },
    { titulo: "Duna: Livro 1", autor: "Frank Herbert", ano: 1965, preco: 30, categoria: "ficcao", img: "img/Duna.jpg" },
    { titulo: "Fundação: 1", autor: "Isaac Asimov", ano: 1951, preco: 20, categoria: "ficcao", img: "img/Fundaçao.jpg" },
    { titulo: "O Iluminado", autor: "Stephen King", ano: 1980, preco: 50, categoria: "suspense", img: "img/O Iluminado.jpg" },
    { titulo: "O Mestre das Armas", autor: "Xavier Dorison", ano: 2010, preco: 39.99, categoria: "biografias", img: "img/MestradasAsrmas.jpg" },
    { titulo: "Superman: Paz na Terra", autor: "Paul Dini", ano: 2000, preco: 20.90, categoria: "ficcao", img: "img/Superman.jpg" },
    { titulo: "Star Wars: Irmandade", autor: "Mike Chen", ano: 2020, preco: 29.90, categoria: "ficcao", img: "img/StarWars.jpg" }
  ];

  // Renderiza os livros na tela
  function renderizarLivros(lista) {
    listaLivros.innerHTML = '';
    lista.forEach(livro => {
      const card = document.createElement('div');
      card.classList.add('card');
      card.style.width = '18rem';
      card.dataset.categoria = livro.categoria;

      card.innerHTML = `<img src="${livro.img}" class="card-img-top" alt="${livro.titulo}">
        <div class="card-body">
          <h5 class="card-title">${livro.titulo}</h5>
          <p class="card-text">${livro.autor} (${livro.ano}).</p>
          <button 
            class="btn btn-primary add-cart"
            data-title="${livro.titulo}"
            data-price="${livro.preco.toFixed(2)}"
            data-img="${livro.img}">
            🛒 R$ ${livro.preco.toFixed(2)} - Adicionar
          </button>
        </div>`;

    
      listaLivros.appendChild(card);
    });
  }
function adicionarListenersCarrinho() {
      const buttons = document.querySelectorAll("#lista-livros .add-cart");
      buttons.forEach(button => {
          button.addEventListener("click", (event) => {
              event.preventDefault();
              
              const title = button.getAttribute("data-title");
              const price = button.getAttribute("data-price");
              const img = button.getAttribute("data-img");
              
              // Chama a função global addToCart (que deve ser definida em Carrinho.js)
              if (typeof addToCart === 'function') {
                  addToCart({ title, price, img });
              } else {
                  console.error("Função addToCart não está definida. Certifique-se de que Carrinho.js está carregado.");
              }
          });
      });
  }
  
  // Busca
  inputBusca.addEventListener('input', e => {
    const termo = e.target.value.toLowerCase();
    const filtrados = livros.filter(l => l.titulo.toLowerCase().includes(termo));
    renderizarLivros(filtrados);
  });

  // Filtro de categoria
  botoesCategoria.forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      const categoria = btn.dataset.categoria;
      if (categoria === 'todas') return renderizarLivros(livros);
      const filtrados = livros.filter(l => l.categoria === categoria);
      renderizarLivros(filtrados);
    });
  });

  // Ordenar
  selectOrdenar.addEventListener('change', e => {
    const tipo = e.target.value;
    const ordenados = [...livros].sort((a, b) => {
      if (tipo === 'titulo') return a.titulo.localeCompare(b.titulo);
      if (tipo === 'preco') return a.preco - b.preco;
    });
    renderizarLivros(ordenados);
  });

  renderizarLivros(livros);
});
