import * as React from "react";
import {ICoin, coinSnaphots} from './coin'
import "./styles.css";

enum Direction {
  up = 'up',
  none = 'none',
  down = 'down'
}

interface ICoinWithDirection extends ICoin {direction: Direction}

interface ICoinMap {
  [id: string]: ICoinWithDirection
}

const firstCoinIteration = coinSnaphots()
  .map(coin => ({...coin, direction: Direction.none}))

const toCoinMap = (coins: ICoin[]): ICoinMap => coins.reduce((acc, coin) => ({...acc, [coin.id]: coin}), {})

const computeDirection = (prev: number, current: number): Direction => {
  switch (true) {
    case prev < current:
      return Direction.up
    case prev > current:
      return Direction.down
    default:
      return Direction.none
  }
}

export default function App() {
  const [currentCoins, setCoins] = React.useState<ICoinWithDirection[]>(firstCoinIteration)

  React.useEffect(() => {
    const interval = setInterval(() => {
      
      const currentCoinMap = toCoinMap(currentCoins)
      const newPartOfCoins = coinSnaphots()
      const newCoinMap = toCoinMap(newPartOfCoins)

      const newSnapshots = Object
        .keys(newCoinMap)
        .map(id => ({...newCoinMap[id], direction: computeDirection(currentCoinMap[id].price, newCoinMap[id].price)}))

      setCoins(newSnapshots)

    }, 1000)

    return () => {clearInterval(interval)}
  }, [currentCoins])

  return (
    <div className="root">
      {currentCoins.map(({direction, ...coin}) => <Item coin={coin} direction={direction} />)}
    </div>
  );
}

interface IProps {
  coin: ICoin
  direction: Direction
}

const colorMap = {
  [Direction.down]: 'red',
  [Direction.up]: 'lightgreen',
  [Direction.none]: 'unset'
}

const Item = ({coin: {name, price}, direction}: IProps) => {
  const color = colorMap[direction]

  return <div className="coin-block" style={{ backgroundColor: color}}>
    <i>{name}</i>
    <i>{price}</i>
  </div>
}