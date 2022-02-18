tabela = document.getElementById("table-body");

document.forms["form-evento"].addEventListener("submit", criarEvento);
document.forms["form-consumo"].addEventListener("submit", atualizarConsumo);
document.getElementById("load-table").addEventListener("click", gerarTabela);

async function criarEvento(e) {
    e.preventDefault();
    let date = document.forms["form-evento"]["data-hora"].value;
    let pessoas = document.forms["form-evento"]["pessoas"].value;
    if (date !== "" && pessoas !== "") {
        date.replace('T', ' ');
        pessoas = parseInt(pessoas);
        const resultado = await sendRequest('novoevento', { datehour: date, people: pessoas })
        document.getElementById("previsao").innerText = "É previsto serem necessários " + resultado + " kg de arroz";
    }
}


async function atualizarConsumo(e) {
    e.preventDefault();
    const id = document.forms["form-consumo"]["id-evento"].value;
    const consumo = document.forms["form-consumo"]["consumo"].value;
    if (id !== "" && consumo !== "") {
        await sendRequest('consumo', { datehour: date, people: pessoas });
        alert("Sucesso");
        document.location.reload(true);
    }
}


async function gerarTabela() {
    
    try {
        const resultado = await axios.get("http://localhost:3000/listaeventos");
        console.log(resultado.data);
        for (linha in resultado.data) {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${linha.idEvent}</td>
                <td>${linha.dateHour}</td>
                <td>${linha.numPeople}</td>
                <td>${linha.prediction}</td>
                <td>${linha.consumption}</td>
            `;
            tabela.appendChild(row);
        }
        document.getElementById("spinner").style.display = none;
    } catch (err) {
        console.log(err);
    }
}


async function sendRequest(route, data) {
    try {
        const res = await axios.post("http://localhost:3000/"+route, data);
        return res.data;
    } catch (err) {
        console.error(err);
    }
}