function creditos() {
    window.location.href = "./pages/creditos.html";
}

function iniciarJogo() {
    window.location.href = "./pages/jogo.html";
}

function fecharJogo() {
    if (confirm("Tem certeza que deseja fechar o jogo?")) {
        window.close();
    }
}

function voltarMenu() {
    window.location.href = "../index.html";
}

function desistirJogo() {
    if (confirm("Tem certeza que deseja desistir do jogo?")) {
        window.location.href = "../index.html";
    } else {
        alert("Você pode continuar jogando!");
    }
}