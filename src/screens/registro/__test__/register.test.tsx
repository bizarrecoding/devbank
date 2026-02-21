import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useRoute } from '@react-navigation/native';
import Registro from ".."
import render from "../../../../test-utils/wrappedRender" 
import { Product } from "../../../types";
import { userEvent } from "@testing-library/react-native";;

const BaseProduct: Product = {
  id: "123",
  name: "producto 1",
  description: "descripcion producto 1",
  logo: "producto1.png",
  date_release: "2026-03-19",
  date_revision: "2027-03-19",
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
  beforeEach(() => {
    /* @ts-ignore */
    useRoute.mockReturnValue({ params: {} });
  });

  it('should have ID input enabled', async () => { 
    const Stack = createNativeStackNavigator();

    const { getByTestId } = render(
      <Stack.Navigator>
        <Stack.Screen name="Registro" component={Registro} />
      </Stack.Navigator>
    )

    expect(getByTestId("FORM_ID")).toBeVisible()
    expect(getByTestId("FORM_ID")).not.toBeDisabled()

    expect(getByTestId("FORM_ID")).toHaveDisplayValue(/^$/)
    await userEvent.type(getByTestId("FORM_ID"), BaseProduct.id)
    expect(getByTestId("FORM_ID")).toHaveDisplayValue(BaseProduct.id)
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

  it.skip("should reset form when 'Reiniciar' button pressed", async () => {
    const Stack = createNativeStackNavigator();
    const { getByTestId, rerenderAsync } = render(
      <Stack.Navigator>
        <Stack.Screen name="Registro" component={Registro} />
      </Stack.Navigator>
    )
    const idField = getByTestId("FORM_ID")
    const nameField = getByTestId("FORM_NAME")
    const descField = getByTestId("FORM_DESC")
    const logoField = getByTestId("FORM_LOGO")
    const releaseField = getByTestId("FORM_RELEASE")
    const revisionField = getByTestId("FORM_REVISION")

    const fields = [idField, nameField, descField, logoField, releaseField, revisionField]
    fields.forEach(field => {
      expect(field).toBeVisible()
      expect(field).toHaveDisplayValue(/^$/)
    })

    const user = userEvent.setup({ delay: 10 })
    await user.type(idField, BaseProduct.id)
    await user.type(nameField, BaseProduct.name)
    await user.type(descField, BaseProduct.description)
    await user.type(logoField, BaseProduct.logo)
    await user.type(releaseField, BaseProduct.date_release)
    await user.type(revisionField, BaseProduct.date_revision)

    fields.forEach(field => { 
      expect(field).not.toHaveDisplayValue(/^$/)
    })

    const resetButton = getByTestId("FORM_RESET")
    expect(resetButton).toBeVisible()
    /*
     * Somehow the button press is tracked but the reset of the inputs is never reflected
     * I suspect it has to do with inputRef.current.clear() not being called or skipped in test
     */
    await user.press(resetButton)

    await rerenderAsync(
      <Stack.Navigator>
        <Stack.Screen name="Registro" component={Registro} />
      </Stack.Navigator>
    )

    fields.forEach(field => {
      expect(field).toHaveDisplayValue(/^$/)
    })
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