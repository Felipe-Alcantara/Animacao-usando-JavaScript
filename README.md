# 🏀 Animação de Bola Quicando em JavaScript

<div align="center">

[![Demo](https://img.shields.io/badge/Demo-Live-success?style=for-the-badge)](https://felipe-alcantara.github.io/Animacao-usando-JavaScript/)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/pt-BR/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/pt-BR/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

**Simulação interativa de física com a Canvas API — código aberto e didático.**

[🌐 Demo Online](https://felipe-alcantara.github.io/Animacao-usando-JavaScript/) • [📋 Sobre](#-sobre-o-projeto) • [💻 Como Usar](#-como-executar-localmente) • [🎓 Conceitos](#-conceitos-e-trechos-relevantes)

</div>

---

## 📋 Índice

- [🌐 **Demonstração**](#-demonstração) ⭐ **DESTAQUE**
- [📋 Sobre o Projeto](#-sobre-o-projeto)
- [📂 Estrutura do Projeto](#-estrutura-do-projeto)
- [🛠️ Arquivos Principais](#️-arquivos-principais)
- [🎓 Conceitos e Trechos Relevantes](#-conceitos-e-trechos-relevantes)
- [💻 Como Executar Localmente](#-como-executar-localmente)
- [🔭 Possíveis Extensões](#-possíveis-extensões)
- [🤝 Contribuições](#-contribuições)
- [📄 Licença](#-licença)
- [👨‍💻 Autor](#-autor)

---

## 🌐 Demonstração ⭐

> **🚀 VEJA RODANDO AGORA, DIRETO NO NAVEGADOR**
>
> **[👉 Abrir a demo ao vivo 👈](https://felipe-alcantara.github.io/Animacao-usando-JavaScript/)**

### Como interagir

1. 🤏 Toque ou clique na bola para segurá-la
2. ✋ Arraste para movê-la pela tela
3. 💥 Solte para arremessá-la — o impulso é proporcional ao movimento

### 💡 Por que vale a pena ver?

- **🎯 Física Realista**: Gravidade, amortecimento e colisões com as bordas
- **🖱️ / 🤏 Multi-input**: Mouse no desktop e toque no mobile, com a mesma lógica
- **🧱 Texto como Obstáculo**: O título é desenhado no canvas e colide com a bola

---

## 📋 Sobre o Projeto

Este projeto nasceu em **abril de 2024**, quando eu estava começando a aprender **HTML**, **CSS** e **JavaScript**. Algumas ideias ficaram salvas e, em **outubro de 2025**, resolvi resgatar e aprimorar o código — o resultado é esta versão mais polida e interativa.

O objetivo é simples: mostrar como criar **animações programáticas** usando o elemento `<canvas>`. A aplicação simula **gravidade**, **colisões**, **atrito** e permite interação do usuário via **mouse** e **toque** (mobile).

### ✨ Funcionalidades

- 🎯 **Física Realista**: Gravidade, amortecimento e colisões com as bordas
- 🖱️ / 🤏 **Interação**: Mouse (desktop) e touch (mobile) — clique/toque, arraste e solte
- 💨 **Atrito**: A bola desacelera ao rolar no chão e entra em repouso
- 🧱 **Texto como Obstáculo**: O título (duas linhas) é desenhado no canvas e atua como obstáculo com colisão
- 🔄 **Responsivo**: Texto e layout se adaptam ao tamanho da janela

---

## 📂 Estrutura do Projeto

```
Animacao-usando-JavaScript/
│
├── 📁 docs/                   # Pasta servida pelo GitHub Pages
│   ├── index.html             # Página principal (carrega CSS e JS)
│   ├── 📁 css/
│   │   └── style.css          # Estilos mínimos para full-screen
│   └── 📁 js/
│       └── script.js          # Lógica da animação (Canvas, física, mouse/touch)
│
├── README.md                  # Este arquivo
└── LICENSE                    # Licença MIT
```

> **Nota:** o site é publicado pelo GitHub Pages a partir da branch `main`, pasta `/docs`.

---

## 🛠️ Arquivos Principais

| Arquivo | Função |
|---------|--------|
| **`docs/index.html`** | Página servida pelo GitHub Pages; monta o `<canvas>` e carrega os assets |
| **`docs/js/script.js`** | Lógica da animação — Canvas, física, colisões e entrada por mouse/touch |
| **`docs/css/style.css`** | Estilos mínimos para o canvas ocupar a tela inteira |

---

## 🎓 Conceitos e Trechos Relevantes

- Loop de animação com `requestAnimationFrame`
- Simulação de **gravidade** (incremento em `vy`) e **amortecimento** no contato com as bordas
- **Atrito** aplicado a `vx` quando a bola toca uma superfície, até entrar em repouso
- **Colisão bola × retângulo** (bounding box) usada para o título desenhado no canvas
- `textBox` como **única fonte de verdade** da posição/tamanho do texto: o desenho e a colisão usam os mesmos valores, então a caixa de colisão coincide com o texto visível
- Entrada unificada de **mouse** e **touch** sobre as mesmas funções `startDrag` / `moveDrag` / `endDrag`

Exemplo (simplificado):

```javascript
// Gravidade
this.vy += CONFIG.gravity;        // 0.5

// Colisão com amortecimento
this.vy *= CONFIG.bounce;         // -0.8

// Atrito no contato com o chão (quando y + radius >= canvas.height)
this.vx *= CONFIG.friction;       // 0.98
```

---

## 💻 Como Executar Localmente

### Opção 1: Forma mais fácil (Recomendado!) 🌐

**🚀 Link direto:** [felipe-alcantara.github.io/Animacao-usando-JavaScript](https://felipe-alcantara.github.io/Animacao-usando-JavaScript/)

### Opção 2: Abrir o arquivo local

```bash
# Clone o repositório
git clone https://github.com/Felipe-Alcantara/Animacao-usando-JavaScript.git

# Entre na pasta
cd Animacao-usando-JavaScript

# Abra a página no navegador
start docs/index.html      # Windows
# xdg-open docs/index.html # Linux
# open docs/index.html     # macOS
```

### Opção 3: Com servidor local

```bash
# Python 3
python -m http.server 8000

# Node.js (http-server)
npx http-server

# Depois acesse http://localhost:8000/docs
```

---

## 🔭 Possíveis Extensões

- Múltiplas bolas com colisão entre si
- UI para controlar gravidade, atrito e cores (os valores já vivem em `CONFIG`)
- Efeitos sonoros e partículas
- Exportar/compartilhar configurações

---

## 🤝 Contribuições

Contribuições são bem-vindas! Sinta-se à vontade para:

- Reportar bugs
- Sugerir novas funcionalidades
- Melhorar a documentação

Todo o código da animação está em **`docs/js/script.js`**.

---

## 📄 Licença

Este projeto está sob a licença MIT — veja o arquivo `LICENSE`.

## 👨‍💻 Autor

**Felipe Alcantara**
- GitHub: [@Felipe-Alcantara](https://github.com/Felipe-Alcantara)
- Repositório: [Animacao-usando-JavaScript](https://github.com/Felipe-Alcantara/Animacao-usando-JavaScript)

---

⭐ Se este projeto foi útil ou te ensinou algo, considere deixar uma estrela no GitHub!

Feito com ❤️ e JavaScript
