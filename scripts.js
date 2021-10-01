const Modal = {
  open() {
    document.querySelector(".modal-overlay").classList.add("active");
  },

  close() {
    document.querySelector(".modal-overlay").classList.remove("active");
  },
};

const transactions = [
  {
    id: 1,
    description: "Desenvolvimento de site",
    amount: 500000,
    date: "13/08/2021",
  },
  {
    id: 2,
    description: "Hamburguer",
    amount: -5000,
    date: "13/08/2021",
  },
  {
    id: 3,
    description: "Aluguel do apartamento",
    amount: -120000,
    date: "10/08/2021",
  },
  {
    id: 4,
    description: "Computador",
    amount: -50000,
    date: "01/08/2021",
  },
];

const Transaction = {
  // Entrada
  incomes() {},
  // Saidas
  expenses() {},
  total() {},
};

const Utils = {
  formatCurrency(value) {
    const signal = Number(value) < 0 ? " - " : "";
  },
};

const DOM = {
  transactionsContainer: document.querySelector(" #data-table tbody"),
  addTransaction(transaction, index) {
    const tr = document.createElement("tr");
    tr.innerHTML = DOM.innerHTMLTransaction(transaction);

    DOM.transactionsContainer.appendChild(tr);
  },
  innerHTMLTransaction(transaction) {
    const CSSclass = transaction.amount > 0 ? "income" : "expense";

    const amount = Utils.formatCurrency(transaction.amount);
    const html = `
    
      <td class="description">${transaction.description}</td>
      <td class="${CSSclass}">${transaction.amount}</td>
      <td class="data"${transaction.date}</td>
      <td>
          <img src="./assets/minus.svg" alt="Remover Transação">
      </td>
    `;

    return html;
  },
};

transactions.forEach(function (transaction) {
  DOM.addTransaction(transaction);
});
