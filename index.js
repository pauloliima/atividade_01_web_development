function Pessoa(altura, peso) {
    if (!altura || !peso) {
        throw new Error("Altura e peso são obrigatórios");
    }

    this.altura = altura;
    this.peso = peso;
}

function formatarValor(input) {
    let numeros = input.value.replace(/\D/g, '');
    if (!numeros || numeros.length === 0) {
        input.value = '';
        return;
    }
    let valorNumerico = parseInt(numeros) / 100;
    input.value = valorNumerico.toFixed(2);
}


function TabelaIMC(altura, peso) {
    Pessoa.call(this, altura, peso);
    this.imc = function () {
        return this.peso / (this.altura * this.altura);
    };

    this.classificaIMC = function () {
        var imc = this.imc();
        if (imc < 18.5) {
            return "Abaixo do peso";
        }
        if (imc >= 18.5 && imc < 24.9) {
            return "Peso normal";
        }
        if (imc >= 25 && imc < 29.9) {
            return "Sobrepeso";
        }

        return "Obesidade";
    };

    this.limpaDestaques = function() {
        var linhas = document.querySelectorAll("#tabela-imc tbody tr");
        for (var i = 0; i < linhas.length; i++) {
            linhas[i].className = "";
        }
    };

    this.destacaClassificacao = function(classificacao) {
        this.limpaDestaques();
        var linhaAtual = document.querySelector("#tabela-imc tbody tr[data-classificacao='" + classificacao + "']");
        if (linhaAtual) {
            linhaAtual.className = "destaque";
        }
    };
}
TabelaIMC.prototype = Object.create(Pessoa.prototype);
TabelaIMC.prototype.constructor = TabelaIMC;

function renderizaResultadoIMC(tabelaIMC) {
    var classificacao = tabelaIMC.classificaIMC();
    document.getElementById("imc").innerText =
        tabelaIMC.imc().toFixed(2) + " - " + classificacao;
    
    tabelaIMC.destacaClassificacao(classificacao);
}

function actionCalcularIMCBuilder() {
    var alturaEl = document.getElementById("altura");
    var pesoEl = document.getElementById("peso");

    return function actionCalcularIMC(evt) {
        evt.preventDefault();

        var tabelaIMC = new TabelaIMC(
            parseFloat(alturaEl.value),
            parseFloat(pesoEl.value)
        );
        console.log(TabelaIMC.prototype.constructor);
        console.log(tabelaIMC instanceof Pessoa);

        renderizaResultadoIMC(tabelaIMC);
    }
}

window.onload = function () {
    document
        .getElementById("calcular")
        .addEventListener("click", actionCalcularIMCBuilder());
};
