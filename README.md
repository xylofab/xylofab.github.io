# XyloFab — site

O site da XyloFab (impressão 3D por encomenda), publicado em **https://xylofab.github.io**.

## O que tem

- `index.html`: a página inicial em scroll (abertura, manifesto, amostra da loja, Custom, Lab, opiniões).
- `loja.html`: a loja com cartões, pesquisa, categorias, favoritos e a janela de cada produto (cor e nome).
- `carrinho.html`: carrinho, comprar com ou sem conta, morada, país, portes dos CTT e forma de pagamento.
- `conta.html`: entrar e criar conta, e a área de cliente (encomendas, moradas, nomes e favoritos, Lab, opiniões, definições).
- `quem-somos.html`, `envios.html`, `termos.html`, `privacidade.html`.
- `assets/site.js`: o código partilhado (línguas, cabeçalho, rodapé, carrinho, conta e tabela de portes).
- `assets/site.css`: os estilos partilhados.

## Línguas

Português e inglês completos. As 24 línguas oficiais da União Europeia têm os textos principais traduzidos; o resto aparece em inglês. A língua escolhida fica guardada no browser.

## Modo de teste (fase 1)

Nada é cobrado nem enviado. As contas, o carrinho e as encomendas ficam guardados só no browser de quem testa. Na conta, o botão "Teste: avançar fase" simula a encomenda a passar pela fila, impressão, envio e entrega.

## Fase 2

O site passa a falar com a app fab3d (repositório `skydoy/fab3d-gestao`) através do túnel Cloudflare: contas reais, encomendas na fila das impressoras, catálogo e stock de cores vindos da app, e pagamentos pelo Stripe (MB WAY, Multibanco e cartão). Basta preencher `XF.API` em `assets/site.js`.

## Portes

Preços de balcão dos CTT em 2026 (Encomenda Postal para Portugal, Correio Azul Internacional para o estrangeiro), por peso: peças + a maior embalagem do carrinho. Mais de 2 kg: a combinar por email.


## Logótipos de pagamento

`assets/pay/visa.svg`, `mastercard.svg` e `mbway.svg` vêm de [activemerchant/payment_icons](https://github.com/activemerchant/payment_icons) (licença MIT). `multibanco.svg` foi feito a partir do ícone da [PaymentFont](https://github.com/AlexanderPoellmann/PaymentFont) (licença SIL OFL 1.1). As marcas pertencem aos seus donos e aparecem só para mostrar os meios de pagamento aceites.
