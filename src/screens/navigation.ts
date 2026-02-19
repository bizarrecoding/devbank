import { NavigationProp } from "@react-navigation/native"

export type RootNav = NavigationProp<{
  Inicio: undefined
  Registro: undefined
  Producto: { id: string }
}>