# RAM Ranch
Projeto para a matéria **SSC0219 - Introdução ao desenvolvimento web**.

## Requisitos

1. O sistema deve ter 2 tipos de usuários:
	- Administradores:
		- Registrar/Editar/Deletar usuários.
		- Registrar/Editar/Deletar produtos.
		- O sistema, por padrão, deve ter uma conta de administrador *admin*, prédefina com senha *admin*.
	- Clientes:
		- Criar uma conta.
		- Comprar produtos.

2. Listagem de produtos: 
	- Deve ser possivel filtrar os produtos, para facilitar achar o tipo de RAM desejado:
		- *Funcionalidade específica*
		- Tipo de memória, ex: SDRAM, DRR, DDR2, DDR3, LPDDR3, DDR4, etc.
		- Formato do módulo, ex: SODIMM, DIMM.
		- Capacidade, ex: 16 GB;
		- Frequência, ex: 1866Mhz.

3. Venda de produtos:
	- Clientes podem escolher produtos, os quais são adicionados a um carrinho.
	- Clientes podem alterar a quantidade de um produto no carrinho.
	- Clientes podem remover produtos do carrinho.
	- Clientes podem esvaziar o carrinho manualmente.
	- A compra deve ser concluída usando um cartão de crédito.
	- O carrinho deve ser esvaziado depois de uma conclusão de compra.

4. Gerenciamento de produtos:
	- Administradores podem adicionar, editar e remover produtos.
	- Produtos contém os seguintes dados:
		- id
		- nome
		- descrição
		- foto
		- preço
		- quantidade estoque
		- quantidade vendida
		- tipo de memória
		- formato do módulo
		- capacidade
		- frenquencia

5. Gerenciamento de usuarios:
	- Clientes pode registrar contas.
	- Administradores podem adicionar, editar e remover usuários.
	- Todo usuário contém os seguintes dados:
		- id
		- email
		- senha
		- nome
		- telefone
	- Adicionalmente clientes tem o seguinte campo:
		- endereço 

6. O sistema deve ser acessivel e ter boa usuabilidade.
7. O sistema deve ser responsivo.

## Descrição do projeto

RAM Ranch é uma loja especializada em vender módulos de memória RAM dos mais variados tipos.


## Comentários sobre o código

O código do frontend está localizado na pasta frontend. Foi 
utilizado a api IndexedDB do browser para a persistencia dos usuários
e produtos. Existe uma conta de administrador com email *admin* e senha
*admin*, mas outras contas podem ser cadastradas. Não foi implementada
ainda a funcionalidade de filtros, devido a falta de suporte da IndexedDB
para queries complexas.

Estrutura:
- frontend/public/index.html - A página que contém o React.
- frontend/src/index.js - O script principal, inicializa a DB e transfere controle ao React.
- frontend/src/App.scss - Contém o tema do materialize, bugfixes ao materialize e estilos novos usados em todo app.
- frontend/src/components - Contém todos componentes React.
- frontend/src/model - Contém as estruturas que representam os dados da aplicação.
- frontend/src/repository - Contém as classe que permitem acesso aos modelos.

## Plano de teste

Manualmente checar utilizando um navegador que:
- Todas páginas renderizam como esperado.
- Não há erros ou avisos no console.

## Procedimento de compilação

Para compilar o projeto são necessários o npm e o yarn.
- [Instale o Node](https://nodejs.org/en/download/)
- [Instale o NPM](https://docs.npmjs.com/cli/v7/configuring-npm/install)
- [Instale o Yarn](https://yarnpkg.com/getting-started/install)

Para rodar o servidor integrado:

```
cd frontend
yarn
yarn start
firefox localhost:3000
```

## Problemas enfrentados

O materialize não é atualizado desde de 2018, o que causou dificuldades de resolver versões de dependencias, e não integra bem com o react devido ao uso de jQuery.

## Comentários

Mockups(desenho) das telas, e o diagrama de navegação podem ser encontrados no arquivo: [Mockups.pdf](Mockups.pdf)
