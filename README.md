```bash
# E-banking avec blockchain

## Getting Started

### Blockchain Setup

Cette DApp utilise la blockchain, vous devez donc configurer Truffle et Ganache.

#### Truffle

Assurez-vous d'avoir Truffle installé globalement :

```bash
npm install -g truffle
# ou
yarn global add truffle
# ou
pnpm install -g truffle
```

Consultez la documentation de Truffle : [Truffle Documentation](https://www.trufflesuite.com/docs/truffle/overview)

#### Ganache

Installez Ganache, un environnement de blockchain personnel, en suivant les instructions sur [le site officiel de Ganache](https://www.trufflesuite.com/ganache).

Consultez la documentation de Ganache : [Ganache Documentation](https://www.trufflesuite.com/docs/ganache/quickstart)

### Metamask

Assurez-vous d'installer Metamask, une extension de portefeuille Ethereum, dans votre navigateur : [Metamask](https://metamask.io/)

Consultez la documentation de Metamask : [Metamask Documentation](https://docs.metamask.io/)

## Development

Développez vos contrats intelligents, mettez à jour le front-end, et interagissez avec la blockchain à l'aide de Truffle, Ganache, et Metamask.

### Compilateur et Migration des Contrats

Pour compiler vos contrats intelligents et les migrer vers la blockchain, utilisez Truffle :

```bash
truffle compile
truffle migrate
```

### Tests

Exécutez les tests pour vous assurer que vos contrats fonctionnent correctement :

```bash
truffle test
```

## Deployment

Lorsque vous êtes prêt à déployer votre DApp, suivez les meilleures pratiques de Truffle pour le déploiement sur la blockchain de votre choix dans notre Ganache.


## Lancer le serveur

exécutez le serveur de développement avec l'une des commandes suivantes :

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```
Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur pour voir le résultat.

## License

Ce projet est sous licence [MIT License](LICENSE).
