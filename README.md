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


## Plano de teste

Manualmente checar utilizando um navegador que:
- Todas páginas renderizam como esperado.
- Não há erros ou avisos no console.

## Procedimento de compilação

```
firefox index.html
```

## Problemas enfrentados

## Comentários

Mockups(desenho) das telas, e o diagrama de navegação podem ser encontrados no arquivo: [Mockups.pdf](Mockups.pdf)
