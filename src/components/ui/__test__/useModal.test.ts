import { act, renderHook } from "@testing-library/react-native";
import useModal from "../hooks/useModal";

describe("Modal control hook", ()=>{
 
  it("should validate id constraints", async ()=>{
    const { result } = renderHook(()=>useModal())
 
    expect(result.current.visible).toBe(false)
    act(()=>result.current.toggle())
    expect(result.current.visible).toBe(true) 
  })
});