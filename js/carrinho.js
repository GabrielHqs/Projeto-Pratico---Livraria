// ======== CARRINHO DE COMPRAS ========

// Adiciona evento aos botões
document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".add-cart");

  buttons.forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();

      const title = button.getAttribute("data-title");
      const price = button.getAttribute("data-price");
      const img = button.getAttribute("data-img");

      addToCart({ title, price, img });
    });
  });
});

function addToCart(book) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Verifica se o livro já está no carrinho
  const existing = cart.find((item) => item.title === book.title);

  if (existing) {
    alert("📚 Este livro já está no carrinho!");
    return;
  }

  cart.push(book);
  localStorage.setItem("cart", JSON.stringify(cart));

  alert(`✅ "${book.title}" foi adicionado ao carrinho!`);
}
