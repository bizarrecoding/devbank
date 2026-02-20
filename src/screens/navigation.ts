import { NavigationProp } from "@react-navigation/native"
import { Product } from "../types"

export type RootNav = NavigationProp<{
  Inicio: undefined
  Registro?: Product
  Producto: Product
}>