# Aplicativo de Gerenciamento - Front-End

Este projeto foi desenvolvido como parte de um estudo prático em **desenvolvimento front-end com Next.js** para consumir uma **API RESTful** criada em PHP. O objetivo é criar uma interface de usuário intuitiva e funcional que permita interagir com as funcionalidades da API, como autenticação e gerenciamento de registros.

## **Propósito do Projeto**

O aplicativo front-end visa oferecer uma interface amigável para acessar as funcionalidades da API, incluindo:

- **Login e Autenticação:** Envio de credenciais e armazenamento seguro de tokens JWT.
- **Listagem Dinâmica de Dados:** Consumo de dados da API e exibição em tabelas dinâmicas.
- **Operações CRUD:** Adicionar, visualizar, atualizar e excluir registros diretamente pela interface.
- **Validação de Acesso:** Restrições de acesso baseadas na autenticação do usuário.

Este projeto foi criado com foco em **aprendizado e desenvolvimento de habilidades front-end** em React e Next.js, em integração com uma API PHP.

## **Tecnologias Utilizadas**

- **Next.js 14:** Framework de React para criação de aplicações web modernas.
- **TypeScript:** Superset de JavaScript para adicionar tipagem estática ao código.
- **Axios:** Biblioteca para realizar requisições HTTP.
- **Material UI:** Biblioteca de componentes React para criar interfaces responsivas.
- **MUI Data Grid:** Componente avançado para exibição de tabelas dinâmicas.
- **Tailwind CSS:** Framework utilitário para estilização rápida e eficiente.

## **Funcionalidades**

- **Autenticação com JWT:** Integração com a API para realizar login e validar tokens JWT.
- **Listagem de Dados:** Consome os dados da API e exibe-os em uma tabela com paginação e seleção.
- **Navegação Protegida:** Redireciona para a página de login se o token estiver ausente ou inválido.
- **Operações CRUD:** Interface para criar, atualizar e excluir registros da API.

## **Como Rodar o Projeto**

1. Clone o repositório:

   ```bash
   git clone https://github.com/pedrojaraujo/biblioteca-front.git

2. Navegue até o diretório do projeto:

   ```bash
   cd biblioteca-front

3. Instale as dependências:

   ```bash
   npm install

4. Inicie o servidor de desenvolvimento

   ```bash
   npm run dev

5. Acesse o aplicativo no navegador:

   ```bash
   http://localhost:3000
