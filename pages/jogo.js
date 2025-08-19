let vidaJogador = 100;
let vidaBot = 100;
let round = 0;

function rolarDado() {
  return Math.floor(Math.random() * 6) + 1;
}

function atualizarVida() {
  document.getElementById('vidaJogador').textContent = vidaJogador;
  document.getElementById('vidaBot').textContent = vidaBot;
  document.getElementById('barraVidaJogador').style.width = vidaJogador + '%';
  document.getElementById('barraVidaBot').style.width = vidaBot + '%';
}

function recuperarVida() {
  if (round % 3 === 0 && round !== 0) {
    vidaJogador = Math.min(vidaJogador + 10, 100);
    vidaBot = Math.min(vidaBot + 10, 100);
  }
}

function turno(acao) {
  round++; // Incrementa o número de rodadas
  recuperarVida(); // Verifica se é hora de recuperar vida

  let resultado = `🌀 Rodada ${round}\n`;

  // Ação do jogador
  const dadoJogador = rolarDado();
  resultado += `🎲 Você rolou ${dadoJogador}. `;

  if (acao === 'atacar') {
    if (dadoJogador > 3) {
      vidaBot -= 15;
      resultado += "Você causou 15 de dano ao bot. ";
    } else if (dadoJogador === 1) {
      vidaJogador -= 15;
      resultado += "Falha crítica! Você tomou 15 de dano. ";
    } else {
      resultado += "Ataque falhou. Nenhum dano causado. ";
    }
  }

  if (acao === 'defender') {
    if (dadoJogador > 4) {
      vidaBot -= 15;
      resultado += "Defesa perfeita! Você causou 15 de dano. ";
    } else if (dadoJogador > 2) {
      resultado += "Defesa bem-sucedida! Nenhum dano recebido. ";
    } else {
      vidaJogador -= 15;
      resultado += "Defesa falhou. Você tomou 15 de dano. ";
    }
  }

  if (acao === 'esquivar') {
    if (dadoJogador > 4) {
      vidaBot -= 30;
      resultado += "Esquiva perfeita! Você causou 30 de dano. ";
    } else {
      vidaJogador -= 45;
      resultado += "Esquiva falhou. Você tomou 45 de dano. ";
    }
  }

  // Ação do bot
  const acoesBot = ['atacar', 'defender', 'esquivar'];
  const acaoBot = acoesBot[Math.floor(Math.random() * acoesBot.length)];
  const dadoBot = rolarDado();
  resultado += `\n🤖 Bot escolheu ${acaoBot} e rolou ${dadoBot}. `;

  if (acaoBot === 'atacar') {
    if (dadoBot > 3) {
      vidaJogador -= 15;
      resultado += "Bot causou 15 de dano a você.";
    } else if (dadoBot === 1) {
      vidaBot -= 15;
      resultado += "Bot falhou e tomou 15 de dano.";
    } else {
      resultado += "Bot errou o ataque.";
    }
  }

  if (acaoBot === 'defender') {
    if (dadoBot > 4) {
      vidaJogador -= 15;
      resultado += "Bot defendeu e contra-atacou com 15 de dano.";
    } else if (dadoBot > 2) {
      resultado += "Bot defendeu com sucesso.";
    } else {
      vidaBot -= 15;
      resultado += "Bot falhou na defesa e tomou 15 de dano.";
    }
  }

  if (acaoBot === 'esquivar') {
    if (dadoBot > 4) {
      vidaJogador -= 30;
      resultado += "Bot esquivou e causou 30 de dano.";
    } else {
      vidaBot -= 45;
      resultado += "Bot falhou na esquiva e tomou 45 de dano.";
    }
  }

  // Limites
  vidaJogador = Math.max(0, Math.min(vidaJogador, 100));
  vidaBot = Math.max(0, Math.min(vidaBot, 100));

  atualizarVida();
  document.getElementById('resultado').textContent = resultado;

  // Fim de jogo
  if (vidaJogador === 0 || vidaBot === 0) {
    setTimeout(() => {
      alert(vidaJogador === 0 ? "💀 Você perdeu!" : "🏆 Você venceu!");
      window.location.href="../index.html";
    }, 500);
  }
}