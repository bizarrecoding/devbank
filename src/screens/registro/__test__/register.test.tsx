import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useRoute } from '@react-navigation/native';
import Registro from ".."
import render from "../../../../test-utils/wrappedRender" 
import { Product } from "../../../types";
import { userEvent } from "@testing-library/react-native"; ;

const BaseProduct: Product = {
  id: "123",
  name: "producto 1",
  description: "descripcion producto 1",
  logo: "producto1.png",
  date_release: "2026-02-19",
  date_revision: "2027-02-19",
}

jest.mock('@react-navigation/native', () => {      
  return {
    ...jest.requireActual('@react-navigation/native'),
    useRoute: jest.fn()
  };
});
 
const mockCreate = jest.fn()
jest.mock('../hooks/useRegisterProduct', () => {
  return ()=>({ onSubmit: mockCreate })
});
const mockUpdate = jest.fn()
jest.mock('../hooks/useUpdateProduct', () => {
  return ()=>({ onSubmitUpdate: mockUpdate })
});

describe('Register Product', () => { 
  it('should have ID input enabled', () => { 
    const Stack = createNativeStackNavigator();

    const { getByTestId } = render(
      <Stack.Navigator>
        <Stack.Screen name="Registro" component={Registro} />
      </Stack.Navigator>
    )

    expect(getByTestId("FORM_ID")).toBeVisible()
    expect(getByTestId("FORM_ID")).not.toBeDisabled()
  })  

  it("should toggle error modal if submit error", async ()=>{
    const Stack = createNativeStackNavigator();
    const { getByText } = render(
      <Stack.Navigator>
        <Stack.Screen name="Registro" component={Registro} />
      </Stack.Navigator>
    )
  
    const submit = getByText("Enviar")

    await userEvent.press(submit)
    expect(getByText("Hubo un error al registrar el producto, por favor inténtelo de nuevo.")).toBeVisible()
  })
})
 
describe('Edit Product', () => { 
  it('should disable ID input while editing a product', async () => { 
    /* @ts-ignore - useRoute is the mocked implementation at this point */
    useRoute.mockReturnValue({ params: BaseProduct });
    const Stack = createNativeStackNavigator();
    const { getByTestId } = render(
      <Stack.Navigator>
        <Stack.Screen name="Registro" component={Registro} />
      </Stack.Navigator>
    )
 
    expect(getByTestId("FORM_ID")).toBeVisible()
    expect(getByTestId("FORM_ID")).toBeDisabled()
  })

  it("should call onSubmitUpdate when updating a product", async ()=>{
    /* @ts-ignore - useRoute is the mocked implementation at this point */
    useRoute.mockReturnValue({ params: BaseProduct });
    const Stack = createNativeStackNavigator();
    const { getByText } = render(
      <Stack.Navigator>
        <Stack.Screen name="Registro" component={Registro} />
      </Stack.Navigator>
    )
  
    const submit = getByText("Enviar")

    await userEvent.press(submit)

    expect(mockCreate).not.toHaveBeenCalled()
    expect(mockUpdate).toHaveBeenCalled()
  })

  it("should toggle error modal if submit error", async ()=>{
    /* @ts-ignore - useRoute is the mocked implementation at this point */
    useRoute.mockReturnValue({ params: BaseProduct });
    mockUpdate.mockResolvedValue({ ok: false})
    const Stack = createNativeStackNavigator();
    const { getByText } = render(
      <Stack.Navigator>
        <Stack.Screen name="Registro" component={Registro} />
      </Stack.Navigator>
    )
  
    const submit = getByText("Enviar")

    await userEvent.press(submit)
    expect(getByText("Hubo un error al registrar el producto, por favor inténtelo de nuevo.")).toBeVisible()
  })
})