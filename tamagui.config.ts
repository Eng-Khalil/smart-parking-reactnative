// import { config } from '@tamagui/config/v3'
// import { createTamagui } from '@tamagui/core'

// const tamaguiConfig = createTamagui(config)

// export default tamaguiConfig

// export type Conf = typeof tamaguiConfig

// declare module '@tamagui/core' {
//   interface TamaguiCustomConfig extends Conf {}
// }


import { createTamagui } from '@tamagui/core'
import { config } from '@tamagui/config'

const tamaguiConfig = createTamagui(config)

export default tamaguiConfig

export type Conf = typeof tamaguiConfig

declare module '@tamagui/core' {
  interface TamaguiCustomConfig extends Conf {}
}