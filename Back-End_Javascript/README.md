# [BEGINNER CHALLENGES] Back-End Javascript

## Installation

```
yarn install
```
## Usage
```
Retrieve information about a block from either kusama or polkadot

Options:
  -n, --network  choose the network you want to query [required] [Options: "k", "kusama", "p", "polkadot"]
  -#, --number   query this block number.                        [number]
  -x, --hash     query this block hash.                          [string]
  --help         Show help
  --version      Show version number

Examples:
  main.js -n p                show information about the latest block in the polkadot chain.
  main.js -n k -# 123         show information about block #123 in the kusama chain.
  main.js -n k -x 0x1b2fc...  show information about block with given hash in the kusama chain.
```
