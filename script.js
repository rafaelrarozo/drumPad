"use strict";
///construção dinamica automatica
const sounds = {
  A: "boom.wav",
  S: "clap.wav",
  D: "hihat.wav",
  J: "kick.wav",
  K: "openhat.wav",
  L: "ride.wav",
  U: "snare.wav",
  I: "tink.wav",
  O: "tom.wav",
};

const criarDiv = (texto) => {
  //estrutura do div
  const minhadiv = document.createElement("div"); //criacao de div dentro da variavel
  minhadiv.classList.add("key"); //adicionando a classe a variavel
  minhadiv.textContent = texto; //adicionando texto no conteudo
  minhadiv.id = texto; //adicionando texto no id
  document.getElementById("container").appendChild(minhadiv); //pegamgos o pai('container') e a funçao minha div ira adicionar o restante acima dentro do html com o .appendChild
};

const exibir = (sounds) => {
  //buscando somente as chaves dos objetos
  //object.keys(nomeDoObjeto);
  //isso retorna um array com as chaves
  //Object.keys(sounds);
  Object.keys(sounds).forEach(criarDiv);
};

/**
 * como as divs não sao criadas no html e tbm não sabemos quantas serão, iremos capturar o click pelo pai das div's, a classe 'container'.
 * pegamos o id do evento pelo target.id
 */

// 38:00
const tocaSom = (letra) => {
  const audio = new Audio(`./assets/${sounds[letra]}`);
  audio.play();
};
/**
 * pegando a lista de classes e adicionando a active do css
 */
const adicionarEfeito = (letra) => {
  document.getElementById(letra).classList.toggle("active");
};

const removerEfeito = (letra) => {
  const div = document.getElementById(letra);
  const removerActive = () => {
    div.classList.remove("active");
  };
  div.addEventListener("transitionend", removerActive);
};

const ativarDiv = (evento) => {
  const letra = evento.type == "click" ? evento.target.id : evento.key.toUpperCase();
  //validação - quando clicamos entre os botoes a div é mandada para impressão porque usamos o pai, mas ela não é um som, somente o container dos botoes, metodo hasOwnProperty(letra)
  const letraPermitida = sounds.hasOwnProperty(letra);
  if (letraPermitida) {
    adicionarEfeito(letra);
    tocaSom(letra);
    removerEfeito(letra);
  }
};

exibir(sounds);
document.getElementById("container").addEventListener("click", ativarDiv);

window.addEventListener("keydown", ativarDiv);
