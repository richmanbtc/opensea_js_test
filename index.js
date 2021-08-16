
const Web3 = require('web3')
const OpenSea = require('opensea-js')

const func = async () => {
    // This example provider won't let you make transactions, only read-only calls:
    const provider = new Web3.providers.HttpProvider('https://mainnet.infura.io')

    const seaport = new OpenSea.OpenSeaPort(provider, {
        networkName: OpenSea.Network.Main
    })

    const tokenAddress = '0x495f947276749ce646f68ac8c248420045cb7b5e'
    const tokenId = '43358497655067275319427597413006691813878612283136951478021412104055507910657'

    const asset = await seaport.api.getAsset({
        tokenAddress, // string
        tokenId, // string | number | null
    })

    console.log(asset)

    const assets = await seaport.api.getAssets(
        {
            order_direction: 'asc',
            limit: 1,
        },
        1
    )

    console.log(assets)

}

func()
