// ========== CADASTRO ==========
function cadastrarUsuario(nome, email, senha) {
  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

  // Verifica se já existe usuário com o mesmo e-mail
  if (usuarios.some((u) => u.email === email)) {
    alert("E-mail já cadastrado!");
    return false;
  }

  // Adiciona novo usuário
  usuarios.push({ nome, email, senha });
  localStorage.setItem("usuarios", JSON.stringify(usuarios));

  alert("Cadastro realizado com sucesso!");
  // Redireciona corretamente para a tela de login
  window.location.href = "/login/login.html";
}

// ========== LOGIN ==========
function loginUsuario(email, senha) {
  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  const usuario = usuarios.find((u) => u.email === email && u.senha === senha);

  if (usuario) {
    localStorage.setItem("usuarioLogado", JSON.stringify(usuario));
    alert(`Bem-vindo(a), ${usuario.nome.split(" ")[0]}!`);
    // Redireciona para a página inicial
    window.location.href = "/index.html";
  } else {
    alert("E-mail ou senha incorretos!");
  }
}

// ========== LOGOUT ==========
function logoutUsuario() {
  localStorage.removeItem("usuarioLogado");
  alert("Você saiu da sua conta.");
  window.location.href = "/login/login.html";
}

// ========== VERIFICAR LOGIN GLOBAL ==========
function verificarLogin() {
  const usuario = JSON.parse(localStorage.getItem("usuarioLogado"));
  const loginBtn = document.querySelector(".btn-entrar"); // <a class="btn-entrar">...</a>

  if (!loginBtn) return;

  if (usuario) {
    // Mostra nome e opção de sair
    loginBtn.innerHTML = `👤 ${usuario.nome.split(" ")[0]}`;
    loginBtn.href = "#";
    loginBtn.classList.add("btn-usuario");

    loginBtn.addEventListener("click", (e) => {
      e.preventDefault();
      if (confirm("Deseja sair da conta?")) {
        logoutUsuario(); // A chamada está aqui.
      }
    });
  } else {
    // Mostra botão "Entrar"
    loginBtn.textContent = "Entrar";
    loginBtn.href = "/login/login.html";
    loginBtn.classList.remove("btn-usuario");
  }
}

// ========== AUTOEXECUÇÃO OPCIONAL ==========
document.addEventListener("DOMContentLoaded", () => {
  if (typeof verificarLogin === "function") {
    verificarLogin();
  }
});
