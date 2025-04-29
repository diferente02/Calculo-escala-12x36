const form = document.querySelector("form");
const log = document.querySelector("#log");

form.addEventListener(
  "submit",
  (event) => {
    event.preventDefault(); // Primeiro: prevenir o envio padrão do formulário

    const data = new FormData(form);
    let output = "";
    let valor = ""; // vamos guardar o valor do input aqui

    for (const entry of data) {
      valor = entry[1]; // Pegamos o valor (não a chave)
      output += `${entry[1]}\r\n`; // Acumular os valores no output
      // Se quiser mostrar também a chave, descomenta essa linha:
      // output += `${entry[0]}=${entry[1]}\r\n`;
    }

    console.log(valor); // valor do último input processado

    // Aqui: você quer comparar texto, então deveria fazer:
    if (valor == "1") {
      console.log("trabalhou hoje");
    } else {
      console.log("não trabalhou hoje");
    }

    log.innerText = output; // mostra o resultado na página
  },
  false,
);