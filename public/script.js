tabela = document.getElementById("table-body");

document.forms["form-evento"].addEventListener("submit", criarEvento);
document.forms["form-consumo"].addEventListener("submit", atualizarConsumo);
document.getElementById("load-table").addEventListener("click", gerarTabela);

async function criarEvento(e) {
    e.preventDefault();
    let date = document.forms["form-evento"]["data-hora"].value;
    let pessoas = document.forms["form-evento"]["pessoas"].value;
    if (date !== "" && pessoas !== "") {
        date = date.replace('T', ' ');
        pessoas = parseInt(pessoas);
        const resultado = await sendRequest('novoevento', { datehour: date, people: pessoas })
        console.log(resultado);
        document.getElementById("previsao").innerText = "É previsto serem necessários " + resultado.prediction + " kg de arroz";
    }
}


async function atualizarConsumo(e) {
    e.preventDefault();
    const id = document.forms["form-consumo"]["id-evento"].value;
    const consumo = document.forms["form-consumo"]["consumo"].value;
    if (id !== "" && consumo !== "") {
        await sendRequest('consumo', { id: parseInt(id), consumo: parseFloat(consumo) });
        alert("Sucesso");
        //document.location.reload(true);
    }
}


async function gerarTabela() {
    try {
        const resultado = await axios.get("http://localhost:8100/listaeventos");
        tabela.innerHTML = "";
        for (let i = 0; i < resultado.data.length; i++) {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${resultado.data[i].idEvent}</td>
                <td>${resultado.data[i].dateHour}</td>
                <td>${resultado.data[i].numPeople}</td>
                <td>${resultado.data[i].prediction}</td>
                <td>${resultado.data[i].consumption}</td>
            `;
            tabela.appendChild(row);
        }
        document.getElementById("spinner").style.display = "none";
    } catch (err) {
        console.log(err);
    }
}


async function sendRequest(route, data) {
    try {
        const res = await axios.post("http://localhost:8100/"+route, data);
        return res.data;
    } catch (err) {
        console.log(err);
    }
}