# kruzer-cli

CLI para ajudar no desenvolvimento do ecossistema KRUZER.

## Instalação

```bash
npm i --save-dev kruzer-cli
```

## Comando Generate (g)

Cria estrutura básica de CRUD com a rota, controller e serviço.

Caso o arquivo de rota ja existe, apenas adiciona as novas rotas.

```bash
kz g <feature/module> [folderNumber] 
```

Caso o parâmetro opcional ```folderNumber``` não seja informado, por padrão será o último número de módulo + 1.

### Exemplos

```bash
kz g feature/module
```

ou

```bash
kz generate geocoding/addresses 5
```


