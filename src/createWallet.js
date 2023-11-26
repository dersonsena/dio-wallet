const bip32 = require('bip32')
const bip39 = require('bip39')
const bitcoin = require('bitcoinjs-lib')

// const mainNetNetwork = bitcoin.networks.testnet
const testNetNetwork = bitcoin.networks.testnet

// Derivacao da carteira HD
// const pathMainNet = `m/49'/0'/0'/0`
const pathTestNet = `m/49'/1'/0'/0`

// Criando a mnemonic (palavras chave para senha) para a seed
let mnemonic = bip39.generateMnemonic()
const seed = bip39.mnemonicToSeedSync(mnemonic)

// Criando a raiz da carteira HD
let root = bip32.fromSeed(seed, testNetNetwork)

// Criando uma conta (par chaves pub e priv)
let account = root.derivePath(pathTestNet)
let node = account.derive(0).derive(0)

let btcAddress = bitcoin.payments.p2pkh({
    pubkey: node.publicKey,
    network: testNetNetwork
}).address

console.log('Carteira gerada!');
console.log('Endereço:', btcAddress)

// WIF = Wallet Import Format
// Formato de chave para serem importadas nos softwares de gerenciamento de carteiras
console.log('Chave Privada:', node.toWIF())
console.log('Seed (palavras chave):', mnemonic)