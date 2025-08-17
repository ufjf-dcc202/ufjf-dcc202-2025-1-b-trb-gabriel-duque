//loja.js


const saldo = 0;  //saldo inicial do jogador


function adiciona_saldo(valor){
   saldo += valor;
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


function atualiza_tela_saldo(){
    
}


export function vender(){

}