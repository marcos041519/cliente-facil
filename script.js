document.getElementById('form-cadastro').addEventListener('submit', function (event) {
    event.preventDefault();

    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const telefone = document.getElementById('telefone').value;

    const cliente = { nome, email, telefone };
    salvarCliente(cliente);
    this.reset();
    mostrarClientes();
});

function salvarCliente(cliente) {
    let clientes = JSON.parse(localStorage.getItem('clientes')) || [];
    clientes.push(cliente);
    localStorage.setItem('clientes', JSON.stringify(clientes));
}

function excluirCliente(index) {
    let clientes = JSON.parse(localStorage.getItem('clientes')) || [];
    clientes.splice(index, 1);
    localStorage.setItem('clientes', JSON.stringify(clientes));
    mostrarClientes();
}

function mostrarClientes(filtro = '') {
    const lista = document.getElementById('lista-clientes');
    let clientes = JSON.parse(localStorage.getItem('clientes')) || [];

    lista.innerHTML = '';

    clientes.forEach((cliente, index) => {
        if (
            cliente.nome.toLowerCase().includes(filtro.toLowerCase()) ||
            cliente.email.toLowerCase().includes(filtro.toLowerCase())
        ) {
            const item = document.createElement('li');
            item.innerHTML = `
                <strong>${cliente.nome}</strong> - ${cliente.email} - ${cliente.telefone}
                <button onclick="excluirCliente(${index})">Excluir</button>
            `;
            lista.appendChild(item);
        }
    });
}

document.getElementById('filtro').addEventListener('input', function () {
    mostrarClientes(this.value);
});

mostrarClientes();
