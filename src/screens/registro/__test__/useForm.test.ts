import { act, renderHook } from '@testing-library/react-native';
import { FormError, useForm } from '../hooks/useForm';
import { Product } from '../../../types';

beforeAll(()=>{
  process.env = {
    NODE_ENV: 'dev',
    EXPO_PUBLIC_API_URL: "http://localhost:3002"
  }

  jest.mock('@react-navigation/native', () => {
    const actualNav = jest.requireActual('@react-navigation/native');
    return {
      ...actualNav,
      useRoute: () => ({
        params: undefined,
      }),
    };
  });

})

const FIXED_SYSTEM_TIME = '2026-02-20T17:00:00Z'; // Feb 20 2026, 12m GTM-5

beforeEach(() => {
  jest.useFakeTimers();
  jest.setSystemTime(Date.parse(FIXED_SYSTEM_TIME));
});

afterEach(() => {
  jest.useRealTimers();
});

const mockIdExist = jest.fn((id:string)=>{
  return id==="123" 
})

jest.mock('../hooks/useUniqueId', () => {
  return () => mockIdExist
});

describe("Form validator hook", ()=>{
  const input: Product = { 
    id: "",
    name:"",
    description:"",
    logo:"",
    date_release:"",
    date_revision:"",
  }
  it("should validate id constraints", async ()=>{
    const { result } = renderHook(()=>useForm(input))
    const { validate } = result.current 
    expect(await validate("ID","1") ).toBe(FormError.INVALID_ID)
    expect(await validate("ID","123456789012")).toBe(FormError.INVALID_ID)
    expect(await validate("ID","123")).toBe(FormError.DUPLICATE_ID)
    expect(await validate("ID","1234")).toBeNull()
  })
  it("should validate name constraints", async ()=>{
    const { result } = renderHook(()=>useForm(input))
    const { validate } = result.current
 
    expect(await validate("Nombre","nom") ).toBe(FormError.INVALID_NAME)
    const veryLongText = Array(60).fill("t").join("-") //~120 chars
    expect(await validate("Nombre",veryLongText)).toBe(FormError.INVALID_NAME)
    expect(await validate("Nombre","Producto 1")).toBeNull()
  })
  it("should validate description constraints", async ()=>{
    const { result } = renderHook(()=>useForm(input))
    const { validate } = result.current 
    expect(await validate("Descripción","nom") ).toBe(FormError.INVALID_DESC)
    const veryLongText = Array(105).fill("t").join("-") //~209 chars
    expect(await validate("Descripción",veryLongText)).toBe(FormError.INVALID_DESC)
    expect(await validate("Descripción","Descripción Producto 1")).toBeNull()
  })
  it("should validate logo constraints", async ()=>{
    const { result } = renderHook(()=>useForm(input))
    const { validate } = result.current

    expect(await validate("Imagen","") ).toBe(FormError.INVALID_LOGO)  
    expect(await validate("Imagen","image.png")).toBeNull()
  })

  it("should validate date_release constraints", async ()=>{
    const { result } = renderHook(()=>useForm(input))
    const { validate } = result.current

    expect(await validate("Fecha de Liberación","")).toBe(FormError.RELEASE_INVALID)  
    expect(await validate("Fecha de Liberación","2025-01-01")).toBe(FormError.RELEASE_PAST)
    
    const today = new Date()
    const [formatedToday] = today.toISOString().split("T")
    expect(await validate("Fecha de Liberación","2026-02-20")).toBeNull()
  })

  it("should validate date_revision constraints", async ()=>{
    const ONE_DAY_MS = 24*60*60*1000
    const { result } = renderHook(()=>useForm({
      ...input,
      date_release: "2026-02-20"
    }))
    const { validate } = result.current
    const today = new Date()
    //exactly 1 year
    expect(await validate("Fecha de Revisión","")).toBe(FormError.REVISION_INVALID)  
    const nextYear = today.getFullYear()+1
    const nextYearDate = new Date(today.setFullYear(nextYear));
    const [formatedNextYear] = nextYearDate.toISOString().split("T") 
    expect(await validate("Fecha de Revisión",formatedNextYear)).toBeNull()
  
    //1 day before 1 year
    const dateBefore = new Date(nextYearDate.getTime()-ONE_DAY_MS)
    const [formatedDayBefore] = dateBefore.toISOString().split("T")
    expect(await validate("Fecha de Revisión",formatedDayBefore)).toBe(FormError.REVISION_YEAR)

    //1 day after 1 year
    const dateAfter = new Date(nextYearDate.getTime()+ONE_DAY_MS)
    const [formatedDayAfter] = dateAfter.toISOString().split("T")
    expect(await validate("Fecha de Revisión",formatedDayAfter)).toBe(FormError.REVISION_YEAR)
  })

  it("should reset product state when reset() is called", async ()=>{
    const BaseProduct: Product = {
      id: "123",
      name: "producto 1",
      description: "descripcion producto 1",
      logo: "producto1.png",
      date_release: "2026-02-19",
      date_revision: "2027-02-19",
    }
    const { result } = renderHook(()=>useForm(BaseProduct))
    expect(result.current.product?.id).toBeTruthy()
    await act(()=>result.current.reset())
    expect(result.current.product?.id).toBeFalsy()

  })
})