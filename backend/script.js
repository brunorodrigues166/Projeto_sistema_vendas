// Base de Dados dos 4 Produtos do Lar e Patas
const produtos = JSON.parse(localStorage.getItem("produtos_petshop")) || [
  {
    id: 1,
    nome: "Ração para Cachorro (15kg)",
    descricao: "Ração Premium Nutritiva",
    custo: 80.00,
    preco: 150.00,
    estoque: 20,
    vendas: 5,
    imagem: "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=300"
  },
  {
    id: 2,
    nome: "Ração para Gato (10kg)",
    descricao: "Ração Sabor Peixe e Frango",
    custo: 60.00,
    preco: 120.00,
    estoque: 15,
    vendas: 3,
    imagem: "https://images.unsplash.com/photo-1568640347023-a616a30bc3bd?w=300"
  },
  {
    id: 3,
    nome: "Brinquedos para Pets",
    descricao: "Kit com 3 brinquedos interativos",
    custo: 15.00,
    preco: 45.00,
    estoque: 30,
    vendas: 12,
    imagem: "https://images.unsplash.com/photo-1535294435445-d7249524ef2e?w=300"
  },
  {
    id: 4,
    nome: "Caminha Confortável",
    descricao: "Caminha macia tamanho M/G",
    custo: 40.00,
    preco: 95.00,
    estoque: 10,
    vendas: 2,
    imagem: "https://images.unsplash.com/photo-1541599540903-216a46ca1dc0?w=300"
  }
];

function salvarDados() {
  localStorage.setItem("produtos_petshop", JSON.stringify(produtos));
}

// Renderizar produtos na página index.html
function renderizarProdutos() {
  const catalogoEl = document.getElementById("catalogo");
  const selectEl = document.getElementById("produto-select");

  if (!catalogoEl || !selectEl) return;

  catalogoEl.innerHTML = "";
  selectEl.innerHTML = "";

  produtos.forEach((prod) => {
    catalogoEl.innerHTML += `
      <div class="card-produto">
        <img src="${prod.imagem}" alt="${prod.nome}">
        <h3>${prod.nome}</h3>
        <p>${prod.descricao}</p>
        <p class="preco">R$ ${prod.preco.toFixed(2)}</p>
        <p class="estoque">Estoque: <strong>${prod.estoque} un.</strong></p>
      </div>
    `;

    selectEl.innerHTML += `<option value="${prod.id}">${prod.nome} (R$ ${prod.preco.toFixed(2)})</option>`;
  });
}

// Lógica do Formulário de Vendas (index.html)
const formVenda = document.getElementById("form-venda");
if (formVenda) {
  formVenda.addEventListener("submit", function (e) {
    e.preventDefault();

    const idProduto = parseInt(document.getElementById("produto-select").value);
    const quantidade = parseInt(document.getElementById("quantidade-input").value);
    const msgEl = document.getElementById("mensagem-venda");

    const produto = produtos.find(p => p.id === idProduto);

    if (produto) {
      if (produto.estoque >= quantidade) {
        // Baixa no Estoque e soma de Vendas
        produto.estoque -= quantidade;
        produto.vendas += quantidade;

        salvarDados();

        msgEl.style.color = "green";
        msgEl.textContent = `Venda realizada com sucesso! ${quantidade}x ${produto.nome}.`;

        renderizarProdutos();
      } else {
        msgEl.style.color = "red";
        msgEl.textContent = `Estoque insuficiente! Restam apenas ${produto.estoque} unidades.`;
      }
    }
  });
}

// Renderizar Gráfico no admin.html
function criarGrafico() {
  const canvasEl = document.getElementById('graficoVendas');
  if (!canvasEl) return;

  const ctx = canvasEl.getContext('2d');
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: produtos.map(p => p.nome),
      datasets: [{
        label: 'Unidades Vendidas',
        data: produtos.map(p => p.vendas),
        backgroundColor: '#f36b08',
        borderColor: '#d85700',
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: { beginAtZero: true, precision: 0 }
      }
    }
  });
}

window.onload = function() {
  renderizarProdutos();
  criarGrafico();
};