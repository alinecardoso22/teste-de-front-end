# Ecoverse - Desafio Projeto Frontend Estagio

Projeto de e-commerce desenvolvido com **React**, **TypeScript** e **Vite**. Inclui gerenciamento de produtos, carrossel interativo, modal de produtos e sistema de compras.

## Pré-requisitos

- **Node.js** (versão 16 ou superior)
- **npm** ou **yarn**

## Instalação

1. **Clone ou entre no diretório do projeto:**
   ```bash
   cd vite-project
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

## Executar o Projeto

### Modo de Desenvolvimento
Para executar o projeto em modo de desenvolvimento com HMR (Hot Module Replacement):

```bash
npm run dev
```

O projeto será executado em `http://localhost:5173` (ou outra porta se a 5173 estiver em uso).

## Estrutura do Projeto

```
vite-project/
├── src/
│   ├── App.tsx         # Componente principal
│   ├── App.css         # Estilos globais
│   ├── main.tsx        # Ponto de entrada
│   └── index.css       # Estilos padrão
├── public/
│   └── img/            # Imagens do projeto
├── index.html          # Arquivo HTML principal
├── script.js           # Gerenciador de produtos
├── produtos.json       # Banco de dados de produtos
├── package.json        # Dependências
├── vite.config.ts      # Configuração Vite
└── tsconfig.json       # Configuração TypeScript
```

## Principais Funcionalidades

- **Carrossel de Produtos** - Sistema de navegação entre carrosséis
- **Modal de Produtos** - Visualização detalhada com seletor de quantidade
- **Formatação de Preços** - Valores em Real (R$)
- **Design Responsivo** - Adaptado para mobile e desktop
- **Font Poppins** - Tipografia moderna importada do Google Fonts

## Dependências Principais

- **react** (^19.2.0) - Biblioteca UI
- **react-dom** (^19.2.0) - Renderização React
- **vite** (^7.2.4) - Build tool
- **typescript** (~5.9.3) - Linguagem tipada
- **eslint** (^9.39.1) - Verificação de código

## API de Produtos

O arquivo `produtos.json` contém a estrutura de produtos com:
- `productName` - Nome do produto
- `descriptionShort` - Descrição curta
- `price` - Preço do produto
- `photo` - URL da imagem

## Responsividade

O projeto é responsivo e se adapta para:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (até 767px)

## Tecnologias Utilizadas

- React 19
- TypeScript
- Vite
- CSS3
- JavaScript Vanilla (ProductManager)
- ESLint

## Sobre o projeto

De acordo com as instruções enviadas, seria necessário realizar o código em React e TypeScript com HTML semântico, mas desenvolvi o projeto conforme o meu aprendizado e conhecimento, ficaria agradecida em receber feedbacks de como melhorar o código e estudos necessários para realiza-lo de maneira adequada.

Desde já, agradeço a atenção e fico no aguardo!!