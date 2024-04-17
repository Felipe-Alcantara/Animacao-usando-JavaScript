# Animacao-usando-JavaScript
 Este algoritmo JavaScript cria uma animação de uma bola quicando em uma tela. Ele começa selecionando o elemento canvas na página e obtendo seu contexto de desenho 2D. Em seguida, define a largura e a altura do canvas para corresponder à largura e à altura da janela do navegador.

# Animação de Bola Quicando em JavaScript

Este repositório contém um script JavaScript que cria uma animação de uma bola quicando em uma tela. O script demonstra como usar o elemento `<canvas>` e sua API para criar animações 2D no navegador.

## Descrição

O script começa selecionando o elemento `<canvas>` na página e obtendo o contexto de desenho 2D. Ele então define a largura e a altura do canvas para corresponder à largura e à altura da janela do navegador.

O script cria uma bola com uma posição inicial, velocidades iniciais e um método para atualizar sua posição a cada quadro de animação. A bola quica nas bordas do canvas, invertendo sua direção e diminuindo um pouco sua velocidade para simular um efeito de quique.

A animação é realizada por meio de um loop de animação que atualiza a posição da bola e redesenha a cena a cada quadro de animação.

## Utilidade

Este script é útil para entender como criar animações 2D em JavaScript usando a API do `<canvas>`. Ele fornece um exemplo prático de como manipular o posicionamento e a velocidade de um objeto ao longo do tempo para criar a ilusão de movimento.

Além disso, este script pode ser adaptado para uma variedade de aplicações onde a animação é necessária. Por exemplo, ele pode ser usado como base para criar jogos 2D, simulações físicas, visualizações de dados animadas e muito mais.

Estudar este script pode ajudar a construir uma compreensão sólida de como trabalhar com animações em JavaScript, que é uma habilidade fundamental para muitos desenvolvedores web.

# Animação de Bola Quicando em JavaScript

Este código JavaScript cria uma animação de uma bola quicando em uma tela. Aqui está o que cada parte do código faz:

1. **Seleção do Elemento Canvas**: Primeiro, ele seleciona o elemento `<canvas>` na página e obtém o contexto de desenho 2D (`ctx`).

2. **Definição da Largura e Altura do Canvas**: Em seguida, define a largura e a altura do canvas para corresponder à largura e à altura da janela do navegador.

3. **Adição de Ouvinte de Evento**: Adiciona um ouvinte de evento para redimensionar a janela. Quando a janela é redimensionada, a largura e a altura do canvas são atualizadas e a função `draw()` é chamada para redesenhar a cena.

4. **Criação de Lista de Bolas**: Cria uma lista vazia chamada `balls` para armazenar todas as bolas que serão animadas.

5. **Definição da Função createBall()**: Define uma função `createBall()` que cria uma nova bola com uma posição (`x`, `y`), um raio e velocidades iniciais (`vx`, `vy`). A bola também tem um método `update()` que atualiza sua posição com base em suas velocidades e aplica alguma gravidade à velocidade vertical. Se a bola atingir a borda do canvas, ela inverte sua direção horizontal ou vertical e diminui um pouco sua velocidade para simular um efeito de quique.

6. **Criação de Bola Inicial**: Cria uma bola inicial no meio da tela.

7. **Definição da Função update()**: Define uma função `update()` que atualiza todas as bolas na lista `balls`.

8. **Definição da Função fillCircle()**: Define uma função `fillCircle()` que desenha um círculo preenchido em uma posição especificada.

9. **Definição da Função draw()**: Define uma função `draw()` que limpa a tela e desenha todas as bolas na lista `balls`.

10. **Definição da Função animate() e Início da Animação**: Por fim, define uma função `animate()` que atualiza a cena e a desenha novamente a cada quadro de animação. A função `animate()` é chamada para iniciar a animação.
