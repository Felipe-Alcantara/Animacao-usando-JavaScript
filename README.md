# 🏀 Animação de Bola Quicando em JavaScript

<div align="center">

[![Demo](https://img.shields.io/badge/Demo-Live-success?style=for-the-badge)](https://felipe-alcantara.github.io/Animacao-usando-JavaScript/)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/pt-BR/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/pt-BR/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)

*Uma simulação interativa de física com Canvas API*

</div>

---

## 📋 Sobre o Projeto

Este projeto demonstra uma animação interativa de uma bola quicando usando **HTML5 Canvas** e **JavaScript puro**. A aplicação simula física realista incluindo gravidade, colisões com bordas, atrito e permite interação através do mouse.

### ✨ Funcionalidades

- 🎯 **Física Realista**: Simulação de gravidade e colisões
- 🖱️ **Interação com Mouse**: Clique e arraste a bola pela tela
- 💨 **Sistema de Atrito**: A bola desacelera gradualmente ao tocar o chão
- 🔄 **Design Responsivo**: Adapta-se automaticamente ao tamanho da janela
- 🎨 **Interface Minimalista**: Visual limpo e moderno

---

## 🚀 Demonstração

Acesse a demonstração ao vivo: [**Ver Demo**](https://felipe-alcantara.github.io/Animacao-usando-JavaScript/)

### Como Usar:
1. **Clique** na bola para segurá-la
2. **Arraste** para movê-la pela tela
3. **Solte** para arremessá-la com impulso baseado no movimento do mouse

---

## 🛠️ Tecnologias Utilizadas

| Tecnologia | Descrição |
|------------|-----------|
| **HTML5 Canvas** | Elemento para desenho e renderização 2D |
| **JavaScript ES6+** | Lógica de animação e física |
| **CSS3** | Estilização e layout responsivo |

---

## 📂 Estrutura do Projeto

```
Animacao-usando-JavaScript/
│
├── docs/                          # Pasta para GitHub Pages
│   ├── index.html                 # Página principal
│   ├── css/
│   │   └── style.css             # Estilos da aplicação
│   └── js/
│       └── script.js             # Lógica da animação
│
├── css/
│   └── style.css                 # Versão de desenvolvimento
├── js/
│   └── Animação de Bola...js     # Versão de desenvolvimento
│
├── index.html                     # HTML de desenvolvimento
├── LICENSE                        # Licença do projeto
└── README.md                      # Documentação
```

---

## 🎓 Conceitos Implementados

### 1. **Canvas API**
- Renderização 2D em tempo real
- Manipulação de contexto gráfico
- Loop de animação com `requestAnimationFrame`

### 2. **Simulação de Física**
```javascript
// Gravidade
this.vy += 0.5;

// Colisão com amortecimento
this.vy *= -0.8;

// Atrito no chão
this.vx *= 0.98;
```

### 3. **Detecção de Colisão**
- Verificação circular (raio da bola)
- Cálculo de distância euclidiana
- Tratamento de bordas da tela

### 4. **Interatividade**
- Eventos de mouse (`mousedown`, `mousemove`, `mouseup`)
- Sistema de arrasto com cálculo de velocidade
- Impulso baseado no movimento do cursor

---

## 💻 Como Executar Localmente

### Pré-requisitos
- Navegador web moderno (Chrome, Firefox, Safari, Edge)
- Servidor local (opcional, mas recomendado)

### Opção 1: Abrir Diretamente
```bash
# Clone o repositório
git clone https://github.com/Felipe-Alcantara/Animacao-usando-JavaScript.git

# Entre na pasta do projeto
cd Animacao-usando-JavaScript

# Abra o index.html no navegador
start index.html  # Windows
open index.html   # macOS
xdg-open index.html  # Linux
```

### Opção 2: Com Servidor Local
```bash
# Usando Python 3
python -m http.server 8000

# Usando Node.js (http-server)
npx http-server

# Acesse http://localhost:8000
```

---

## 🎯 Casos de Uso e Aplicações

Este projeto pode servir como base para:

- 🎮 **Jogos 2D**: Mecânicas de física e colisão
- 📊 **Visualizações**: Animações de dados interativas
- 🔬 **Simulações**: Experimentos de física
- 📚 **Educação**: Aprendizado de Canvas API e animações
- 🧪 **Protótipos**: Testes rápidos de conceitos visuais

---

## 📝 Funcionalidades Futuras

- [ ] Múltiplas bolas com colisão entre elas
- [ ] Seleção de cores e tamanhos
- [ ] Diferentes formas geométricas
- [ ] Controle de gravidade via interface
- [ ] Sistema de partículas
- [ ] Efeitos sonoros

---

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para:

1. Fork o projeto
2. Criar uma branch (`git checkout -b feature/MinhaFuncionalidade`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/MinhaFuncionalidade`)
5. Abrir um Pull Request

---

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## 👨‍💻 Autor

**Felipe Alcantara**

[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Felipe-Alcantara)

---

<div align="center">

**Feito com ❤️ e JavaScript**

⭐ Se este projeto te ajudou, considere dar uma estrela!

</div>
