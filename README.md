
## Informações do Projeto

- **Nome**: gestedu-frontend
- **Versão**: 0.1.0
- **Privado**: Sim

## As novas composições devem ser
**Courses** | **Cursos**
**Suppliers** | **Fornecedor**
Seguindo a logica de rotas e componentes ja existentes no projeto!

Você pode consultar interfaces e logica da Api via
```
https://gestedu-api.creativecode.dev.br/docs/
```
## Iniciando projeto

Instale as dependencias utilizando 
```bash
yarn Install
```
Após a instalação das dependencias, rode o projeto com ...
```bash
yarn run dev
```
## Uso do `.env`

Crie um arquivo `.env` na raiz do projeto para configurar variáveis de ambiente. Exemplo:
para o 

```bash
NEXT_PUBLIC_API=
NEXT_PUBLIC_FILES=
```

Vamos utilizar a api de teste da gestedu ↓

```bash
NEXT_PUBLIC_API=https://gestedu-api.creativecode.dev.br
NEXT_PUBLIC_FILES=https://gestedu-api.creativecode.dev.br/files
```

Abra em  [http://localhost:3000](http://localhost:3000) com seu navegador.

Para acessar.. utilize:
**email**: teste@verticalmkt.com.br	
**senha**: teste@123

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Estrutura do Projeto (Onde devem ser criado as funcionalidades)

A estrutura segue uma organização modular para facilitar rotas e escalabilidade:
```
📂 src
├── 📂 app                            # Módulos da aplicação
│    ├── 📂 dashboard                 # Area de acesso do usuario
│    │   ├── 📂 configuracoes
│    │   │   └── 📂 aluno             
│    │   │         ├── page.tsx       
│    │   │         └── 📂 [id]
│    │   │              └── 📂 [id]  
│    │   │                   └── 📂 Editar
│    │   │                        └── page.tsx

A estrutura padrão para criarmos componentes:
|                                         
│    ├── 📂 components                 
│    │   ├── 📂 Students
│    │   │    ├── 📂 Create
│    │   │    |       └── index.tsx
│    │   │    ├── 📂 Edit
│    │   │    |       └── index.tsx
│    │   │    ├── 📂 Form
│    │   │    |       └── index.tsx
│    │   │    └── 📂 List
│    │   │    |       ├── column.tsx
│    │   │    |       └── index.tsx

Exemplo: ALUNOS
![Listar alunos](https://github.com/user-attachments/assets/raw/main/f1e1786e-6b81-4e0b-af46-7b53e32db23c)
![Editar/Criar alunos](https://github.com/user-attachments/assets/dc9fb2b5-e943-436a-9426-d957bd451030)

Exemplo: Colaboradores
![Listar Colaboradores](https://github.com/user-attachments/assets/ea9ad8f5-5f41-41c6-b22a-304fb61665c8)





