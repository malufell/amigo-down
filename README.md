# Site Amigo Down

http://www.amigodown.org/

## Como contribuir

- Faça o clone do projeto `git clone git@github.com:malufell/amigo-down.git`
- execute: `cd amigo-down`
- instale as dependências: `npm install`

**Importante:** Páginas que são inclusas em outras como `header` e `footer`, estão sendo ignoradas no arquivo `gulpfile.js` na função `includeHTML`.

## Como atualizar o projeto

O site é atualizado com base na branch `gh-pages` e nos arquivos da pasta `/docs` 

- realizar o checkout na branch `gh-pages`
- rodar o comando `npm run dev`, ele irá abrir o site no navegador e exibir as alterações conforme são realizadas
  - os arquivos alterados devem ser os que estão na raiz da pasta do projeto 
  - esse comando irá atualizar automaticamente a pasta `/docs`, conforme os arquivos vão sendo alterados na raiz do projeto
  - obs: se ao clicar em um link a página não aparecer, incluir `.html` no final da URL
- realizar o `push` das alterações na branch `gh-pages`
- é possível acompanhar o build na aba "Actions" do repositório:
![image](https://user-images.githubusercontent.com/62160705/199354759-381e39ee-e9ce-4a29-ae6a-3fdcf70ee8b1.png)
- após rodar o build, as alterações já devem estar refletindo em http://www.amigodown.org/atividades
