//loja.js


let saldo = 10.00;  //saldo inicial do jogador

export function get_saldo() {
    return saldo;
}



export function adiciona_saldo(valor) {
    saldo += valor;
    atualiza_tela_saldo();
}

export function remove_saldo(valor) {

    if (saldo >= valor) {    //garante que n remove mais do que tem
        saldo -= valor;
        atualiza_tela_saldo();
        return true;
    } else {
        console.log('Saldo insuficiente!');
        return false;
    }

}


export function atualiza_tela_saldo() {
    const tela = document.getElementById("dinheiro");
    if (tela) {
        tela.textContent = `SALDO: ${saldo.toFixed(2)}`;
    }
}


export function vender(preco) {

    adiciona_saldo(preco);

}


export function comprar_semente(tipo, preco) {

    remove_saldo(preco);
    console.log('Comprou semente de: ${tipo}');
    return { tipo, Preco_compra: preco }


}