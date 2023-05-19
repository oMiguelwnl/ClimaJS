document.querySelector(".busca").addEventListener("submit", async (event) => {
  event.preventDefault(); // Previne que o formulário seja enviado.

  let input = document.querySelector("#searchInput").value; // Pega o que o usuário digitou.

  if (input !== "") {
    clearInfo();
    showWarning("Carregando...");

    // Api da OpenWeather
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(
      input
    )}&units=metric&lang=pt_br&appid=9fe52c242f057ee280e483f2f432ee99`;
    // Faz a requisição e guarda os resultados.
    let results = await fetch(url);

    // Transforma os resultados em objetos.
    let json = await results.json();

    // Objeto que será enviado para a função "showInfo".
    if (json.cod === 200) {
      showInfo({
        name: json.name,
        country: json.sys.country,
        temp: json.main.temp,
        tempIcon: json.weather[0].icon,
        windSpeed: json.wind.speed,
        windAngle: json.wind.deg,
      });
    } else {
      clearInfo();
      showWarning("Não encontramos esta localização.");
    }
  } else {
    clearInfo();
  }
});

// Função que exibe as informações na tela.
function showInfo(json) {
  showWarning("");

  // Adicionando as informações :
  document.querySelector(".titulo").innerHTML = `${json.name}, ${json.country}`; // Nome do lugar e país.
  document.querySelector(".tempInfo").innerHTML = `${json.temp} <sup>°C</sup> `; // Temperatura.
  document.querySelector(
    ".ventoInfo"
  ).innerHTML = `${json.windSpeed} <span>km/h</span>`; // Ventos.
  document
    .querySelector(".temp img")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`
    ); // Imagem
  document
    .querySelector(".temp img")
    .setAttribute("alt", `${json.weatherName}`);
  document.querySelector(".ventoPonto").style.transform = `rotate(${
    json.windAngle - 90
  }deg)`; // Direção do vento.

  document.querySelector(".resultado").style.display = "block";
}

// Limpa o warning e oculta o resultado.
function clearInfo() {
  showWarning("");
  document.querySelector(".resultado").style.display = "none";
}

// Mostra uma menssagem
function showWarning(msg) {
  document.querySelector(".aviso").innerHTML = msg;
}
