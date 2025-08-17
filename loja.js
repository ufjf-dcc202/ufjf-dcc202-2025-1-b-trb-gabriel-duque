//loja.js


let saldo = 0;  //saldo inicial do jogador

export function get_saldo(){
    return saldo;
}



function adiciona_saldo(valor){
   saldo += valor;
   atualiza_tela_saldo();
}

function remove_saldo(valor){

    if(saldo >= valor){    //garante que n remove mais do que tem
     saldo -= valor;
     atualiza_tela_saldo();
     return true;
    }else{
        console.log('Saldo insuficiente!');
        return false;
    }
   
}


export function atualiza_tela_saldo(){
    const tela = document.getElementById("dinheiro");
    if(tela){
        tela.textContent = `R$: ${saldo.toFixed(2)}`;
    }
}


export function vender(preco){
   
   adiciona_saldo(preco);

}


/* export function comprar_semente(tipo, preco){

    remove_saldo(preco);
    console.log('Comprou semente de: ${tipo}');
    return {tipo, Preco_compra: preco}                  // como retorno a semente em si??????? acho que coloco o tipo e depois adiciono por fora


} */