import { NavigationProp } from "@react-navigation/native"
import { Product } from "../types"

export type RootNav = NavigationProp<{
  Inicio: undefined
  Registro: undefined
  Producto: Product
  Edicion: Product
}>