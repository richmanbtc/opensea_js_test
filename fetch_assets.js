
const Web3 = require('web3')
const OpenSea = require('opensea-js')
const PrismaClientRoot = require('@prisma/client')
const _ = require('lodash')

const prisma = new PrismaClientRoot.PrismaClient()

const func = async () => {
    // This example provider won't let you make transactions, only read-only calls:
    const provider = new Web3.providers.HttpProvider('https://mainnet.infura.io')

    const seaport = new OpenSea.OpenSeaPort(provider, {
        networkName: OpenSea.Network.Main
    })

    const assets = await seaport.api.getAssets(
        {
            order_direction: 'asc',
            limit: 50,
        },
        1
    )

    console.log(assets)

    for (let i = 0; i < assets.assets.length; i++) {
        const asset = assets.assets[i]
        const result = await prisma.asset.upsert({
            where: {
                assetContractAddress_tokenId: {
                    assetContractAddress: asset.assetContract.address,
                    tokenId: asset.tokenId,
                }
            },
            update: {
                name: asset.name,
                imageUrl: asset.imageUrl,
            },
            create: {
                assetContractAddress: asset.assetContract.address,
                tokenId: asset.tokenId,
                name: asset.name,
                imageUrl: asset.imageUrl,
            }
        })
        console.log(result)
    }

    const allAssets = await prisma.asset.findMany()
    console.log(allAssets)
}

func()
