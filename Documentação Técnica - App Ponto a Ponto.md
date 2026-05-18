# **Documentação do Projeto: Ponto a Ponto \- Armarinho Digital**

## **1\. Visão Geral**

O **Ponto a Ponto** é um protótipo de aplicativo de e-commerce focado no nicho de armarinhos (linhas, agulhas, tecidos e acessórios de costura). O diferencial competitivo é o foco na experiência de vendas delivery, proporcionando agilidade para artesãos e hobbistas que precisam de materiais com urgência.

## **2\. Público-Alvo**

* Artesãos profissionais e autônomos.  
* Entusiastas de DIY (Do It Yourself \- Faça Você Mesmo).  
* Costureiras e alfaiates locais.

## **3\. Arquitetura de Telas**

O aplicativo foi estruturado para garantir uma navegação fluida em 7 telas principais:

| Tela | Descrição das Funcionalidades   |
| :---- | :---- |
| **1\. Login & Boas-Vindas** | Autenticação via e-mail, redes sociais e recuperação de senha.(Google/Apple). |
| **2\. Cadastro** | Coleta de dados pessoais e endereço geolocalizado para entrega. |
| **3\. Home (Início)** | Banner de promoções, categorias rápidas (ícones) e vitrine de "Mais Vendidos", carrossel de ofertas, busca global e acesso rápido por categorias. |
| **4\. Detalhes do Produto** | Seleção de cores por código de fábrica, especificações técnicas e botão de compra. |
| **5\. Carrinho** | Edição de quantidades, inserção de cupons e cálculo de frete em tempo real. |
| **6\. Lista de Produtos** | Filtros avançados (marca, material, espessura) e visualização em grade. |
| **7\. Checkout** | Seleção de método de pagamento (Pix, Cartão, Dinheiro) e resumo do pedido. |
| **8\. Status do Pedido** | Linha do tempo de processamento e mapa com rastreio do entregador. |

## 

## **4\. Requisitos Funcionais (RF)**

* **RF01:** O sistema deve permitir a busca de produtos por nome ou categoria.  
* **RF02:** O sistema deve calcular o frete automaticamente com base na localização do usuário.  
* **RF03:** O usuário deve poder filtrar linhas por marca e numeração de cor.  
* **RF04:** O app deve enviar notificações push sobre o status da entrega.

## **5\. Requisitos Não Funcionais e Suporte**

* **Acessibilidade:** Alto contraste (Terracota vs. Creme) e suporte a leitores de tela para usuários com deficiência visual.  
* **Desempenho:** Tempo de carregamento inferior a 2 segundos para a home em redes 4G.  
* **Suporte Integrado:** Chat direto com especialistas da loja para dúvidas sobre compatibilidade de agulhas e fios.

## **6\. Funcionalidades Secundárias e Retenção**

* **Calculadora de Projetos:** Ferramenta integrada que auxilia o usuário a estimar a quantidade de material baseada nas medidas da peça.  
* **Histórico de Cores:** Registro automático dos códigos de cores comprados para facilitar a reposição exata em projetos de longo prazo.  
* **Lista de Desejos (Favoritos):** Organização de materiais por projetos futuros (ex: "Projeto Inverno").  
* **Avaliações com Foto:** Galeria de clientes mostrando o resultado final das peças produzidas com os materiais.

## **7\. Detalhes de Microinterações e Interface (UI)**

* **Feedback Visual de Estoque:** Indicação dinâmica de disponibilidade para evitar compras de produtos esgotados.  
* **Modo de Visualização Tátil:** Implementação de zoom de alta definição para inspeção de tramas e texturas de fios.  
* **Estados de Carregamento:** Uso de "Skeleton Screens" na cor creme para manter a percepção de velocidade do app.  
* **Transições Suaves:** Animações sutis entre telas inspiradas no movimento de costura.

## **8\. Identidade Visual e UI/UX**

A interface utiliza uma paleta de cores **terracota (\#B35D3D)** e **creme (\#F5F0E1)** para transmitir uma sensação de conforto e artesanato manual. A tipografia é a *Montserrat*, pela legibilidade em dispositivos móveis.

## **9\. Prototipagem de Telas**

* Modelo de Baixa Fidelidade

	![][image1]

* Modelo de Alta Fidelidade

![][image2]

## **10\. Stack Tecnológica**

`- Frontend: Flutter (Android/iOS) ou React Native.`  
`- Backend: Node.js com Framework NestJS.`  
`- Banco de Dados: PostgreSQL (dados relacionais) e Redis (cache de carrinho).`  
`- Infraestrutura: Integração com API ou Cloud.`

Documentação gerada como guia inicial para desenvolvimento e apresentação do MVP (Produto Mínimo Viável).
