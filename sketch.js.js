//variáveis da bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 20;
let raio = diametro/2;

//velocidade da bolinha
let velocidadexBolinha = 6;
let velocidadeyBolinha = 6;

//variáveis da raquete
let xRaquete = 5;
let yRaquete = 150;
let comprimentoRaquete = 10;
let alturaRaquete = 90;

let colidiu = false;

//placar do jogo
let meusPontos = 0;
let pontosOponente = 0;

//sons do jogo
let raquetada;
let ponto;
let trilha;

let chanceDeErrar = 0;

function preload(){
  trilha = loadSound("trilha.mp3");
  ponto = loadSound("ponto.mp3");
  raquetada = loadSound("raquetada.mp3");
}

//variáveis do oponente
let xRaqueteOponente = 585;
let yRaqueteOponente = 150;
let velocidadeYOponente;

function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

function draw() {
  background(0);
  mostraBolinha();
  movimentaBolinha();
  colisaoBorda();
  mostraRaquete(xRaquete, yRaquete);
  movimentaRaquete();
  //colisaoRaquete();
  colisaoRaqueteBiblio(xRaquete, yRaquete);
  mostraRaquete(xRaqueteOponente, yRaqueteOponente);
  movimentaRaqueteOponente();
  colisaoRaqueteBiblio(xRaqueteOponente, yRaqueteOponente);
  incluiPlacar();
  marcaPonto();
  calculaChanceDeErrar();
    
     
}
function mostraBolinha(){
  circle(xBolinha, yBolinha, diametro);
}
function movimentaBolinha(){
  xBolinha += velocidadexBolinha;
  yBolinha += velocidadeyBolinha;
}
function colisaoBorda(){
  if (xBolinha + raio > width || xBolinha - raio < 0 ){
   velocidadexBolinha *= -1;   
 }
 if (yBolinha + raio > height || yBolinha - raio < 0){
   velocidadeyBolinha *= -1;
 }
}
function mostraRaquete(x,y){
  rect(x, y, comprimentoRaquete, alturaRaquete);
}
function movimentaRaquete(){
  if (keyIsDown(UP_ARROW)){
    yRaquete -= 10;
  }
  if (keyIsDown(DOWN_ARROW)){
    yRaquete += 10;
  }
}
function colisaoRaquete(){
    if (xBolinha - raio < xRaquete + comprimentoRaquete && yBolinha - raio < yRaquete + alturaRaquete && yBolinha + raio > yRaquete){
    velocidadexBolinha *= -1;
    raquetada.play();
  }
 }
function colisaoRaqueteBiblio(x,y){
  colidiu = 
  collideRectCircle(x, y, comprimentoRaquete, alturaRaquete,xBolinha, yBolinha, raio);
  if (colidiu){
    velocidadexBolinha *= -1;
    raquetada.play();
  }
  }
function movimentaRaqueteOponente(){
  velocidadeYOponente = yBolinha - yRaqueteOponente - comprimentoRaquete / 2 - 30;
  yRaqueteOponente += velocidadeYOponente + chanceDeErrar;
  calculaChanceDeErrar();
}
function incluiPlacar(){
  stroke (255)
  textAlign (CENTER);
  textSize(16);
  fill(color(255, 140, 0));
  rect(130, 10, 30, 20);
  fill(255);
  text(meusPontos, 145, 25);
  fill (color(255, 140, 0));
  rect(470, 10, 30, 20);
  fill(255);
  text(pontosOponente, 485, 25);
}
function marcaPonto(){
  if (xBolinha > 590){
    meusPontos += 1;
    ponto.play();
  }
  if (xBolinha < 10){
    pontosOponente += 1;
    ponto.play();
  }
}
function calculaChanceDeErrar(){
  if (pontosOponente >= meusPontos)
    { chanceDeErrar += 1;
      if (chanceDeErrar >= 39){
        chanceDeErrar = 40
      }
    } else {
      chanceDeErrar -= 1
      if (chanceDeErrar <= 35){
        chanceDeErrar = 35
      }
    }
}



  
  
  
  
  
  
  