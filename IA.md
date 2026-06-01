# 🤖 CONTEXTO OPERACIONAL — Animação de Bola Quicando

> **O que é**: Memória técnica do projeto para retomada rápida por IA ou por uma nova sessão.
> Baseado no template `IA.md` do **Felixo System Design**.
>
> **Regra**: Todo contexto relevante deve estar **neste único arquivo**. Atualize ao tomar decisões, resolver bugs, mudar stack ou atingir milestones.

---

## 🎯 OBJETIVO DO PROJETO

[2024-04] Demonstração didática de **animação programática com a Canvas API**: uma bola que quica simulando gravidade, atrito e colisões, incluindo colisão com o texto do título.
Público: educacional / portfólio. Deploy: GitHub Pages (branch `main`, pasta `/docs`). Prioridade: clareza e simplicidade > performance.

---

## 🏁 METAS & MILESTONES

- [2024-04] ✅ Versão inicial da animação (HTML/CSS/JS puro)
- [2025-10] ✅ Resgate e polimento: interação por mouse/touch, atrito, texto como obstáculo
- [2026-06-01] ✅ Adequação ao padrão **felixo-standards**: refatoração do JS, correção de bug de colisão, reescrita do README e criação deste `IA.md`

---

## 🛠️ STACK & DEPENDÊNCIAS

[2024-04] Front-end puro: **HTML5 + CSS3 + JavaScript (Canvas API)**. Sem build, sem dependências, sem framework.
[—] Hospedagem: **GitHub Pages** servindo a pasta `/docs`.

---

## 📐 DECISÕES DE ARQUITETURA

[2026-06-01] **`textBox` é a única fonte de verdade** para posição/tamanho do título. Tanto `drawText()` quanto a colisão (`ballHitsText` / `resolveTextCollision`) leem os mesmos valores, garantindo que a caixa de colisão coincida com o texto visível.
[2026-06-01] Constantes de física e layout centralizadas em `CONFIG` no topo de `script.js` — facilita ajuste e uma futura UI de controle.
[2026-06-01] Entrada de mouse e touch unificada nas funções `startDrag` / `moveDrag` / `endDrag` (DRY), eliminando os dois blocos de handlers quase idênticos.

---

## 🎨 DECISÕES DE DESIGN & CONVENÇÕES

[—] Código e comentários em **português**. Tudo serve a fim didático, então os comentários explicam o "porquê".
[—] Site publicado a partir de `/docs` (requisito do GitHub Pages para este projeto).
[2026-06-01] Documentação (README) segue o `DESIGN_SYSTEM_README.md` do felixo-standards.
[—] Autor assinado como **Felipe Alcantara** (handle GitHub `@Felipe-Alcantara`).

---

## 🧪 TESTES IMPORTANTES

[2026-06-01] ✅ `node --check docs/js/script.js` — sintaxe válida após a refatoração.
[—] Não há suíte automatizada (projeto visual). Verificação é **manual**: abrir a demo, arrastar/soltar a bola, checar colisão com bordas, topo, chão e título, e redimensionar a janela.

---

## 🐛 BUGS & FIXES RELEVANTES

[2026-06-01] BUG: A caixa de colisão do título **não coincidia com o texto desenhado**.
CAUSA: `updateTextBox()` calculava a `textBox` com um espaçamento (`fontSize*0.3`) e sem o deslocamento horizontal da 2ª linha, enquanto `draw()` desenhava o texto com `spacing = fontSize*0` (sempre 0) e com a 2ª linha deslocada `-fontSize`. As duas lógicas divergiam, então a bola colidia com uma área "fantasma".
FIX: Unificada a geometria em `updateTextBox()` (considerando o deslocamento da 2ª linha no cálculo de largura/posição) e `drawText()` passou a desenhar usando exatamente `textBox` + `lineSpacing`. Removido o `spacing = fontSize*0` morto.

[2026-06-01] FIX menor: funções e listeners que dependiam de `canvas`/`ctx` estavam declarados **antes** das constantes. Reordenado para canvas/ctx primeiro, evitando fragilidade de ordem de inicialização.

---

## 🔗 INTEGRAÇÕES & SERVIÇOS EXTERNOS

[—] GitHub Pages — deploy automático a partir de `main` → `/docs`. URL: https://felipe-alcantara.github.io/Animacao-usando-JavaScript/
Sem APIs, credenciais ou serviços externos.

---

## 📝 NOTAS GERAIS

[—] A pasta `felixo-standards/` é uma **cópia de referência** dos padrões e está no `.gitignore` (não é versionada neste repositório).
[2026-06-01] `docs/css/style.css`: adicionado `display:block` no canvas (evita gap/scroll) e `touch-action:none` (evita gestos do navegador durante o arraste no mobile).
[—] Para ajustar a sensação física, edite os valores em `CONFIG` (gravidade, bounce, atrito, impulso ao soltar).

---

> **Origem do template**: `IA.md` do **Felixo System Design** — https://github.com/Felipe-Alcantara/Felixo-System-Design
