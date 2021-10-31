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
  all: transactions,

  add(transaction) {
    Transaction.all.push(transaction);

    App.reload();
  },
  // Entrada
  incomes() {
    let income = 0;

    Transaction.all.forEach((transaction) => {
      if (transaction.amount > 0) {
        income = income + transaction.amount;
      }
    });

    return income;
  },

  // Saidas
  expenses() {
    let expenses = 0;

    Transaction.all.forEach((transaction) => {
      if (transaction.amount < 0) {
        expenses = expenses + transaction.amount;
      }
    });
    return expenses;
  },

  // Total
  total() {
    return Transaction.incomes() + Transaction.expenses();
  },
};

const Utils = {
  formatCurrency(value) {
    const signal = Number(value) < 0 ? " - " : "";

    value = String(value).replace(/\D/g, "");

    value = Number(value) / 100;

    value = value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

    return signal + value;
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
      <td class="${CSSclass}">${amount}</td>
      <td class="date">${transaction.date}</td>
      <td>
          <img src="./assets/minus.svg" alt="Remover Transação">
      </td>
    `;

    return html;
  },

  updateBalance() {
    document.getElementById("incomeDisplay").innerHTML = Utils.formatCurrency(
      Transaction.incomes()
    );
    document.getElementById("expenseDisplay").innerHTML = Utils.formatCurrency(
      Transaction.expenses()
    );
    document.getElementById("totalDisplay").innerHTML = Utils.formatCurrency(
      Transaction.total()
    );
  },

  clearTransactions() {
    DOM.transactionsContainer.innerHTML = "";
  },
};

const App = {
  init() {
    Transaction.all.forEach((transaction) => {
      DOM.addTransaction(transaction);
    });

    DOM.updateBalance();
  },

  reload() {
    DOM.clearTransactions();
    App.init();
  },
};

App.init();

Transaction.add({
  id: 50,
  description: "Droga é o brain",
  amount: 200,
  date: "25/04/1998",
});
