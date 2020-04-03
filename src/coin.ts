export interface IUnpricedCoin {
  name: string
  id: string
}

export interface ICoin extends IUnpricedCoin {price: number}

const MIN_PRICE = 40
const MAX_PRICE = 60

const getRandomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min)) + min

const getPrice = () => getRandomInt(MIN_PRICE, MAX_PRICE)

const unpricedCoins: IUnpricedCoin[] = [
  {
    name: 'BTC',
    id: '1',
  },
  {
    name: 'ETH',
    id: '2',
  },
  {
    name: 'ALT',
    id: '3',
  },
  {
    name: 'SNE',
    id: '4',
  }
]

export const coinSnaphots = (): ICoin[] => unpricedCoins.map(c => ({
  ...c,
  price: getPrice()
}))