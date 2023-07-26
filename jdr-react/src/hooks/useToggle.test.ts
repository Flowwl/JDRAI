import { renderHook, act as actHook } from "@testing-library/react-hooks";
import { useToggle } from "./useToggle";

describe("useToggle", () => {
  it("should setTrue", async () => {
    const { result } = await renderHook(() => {
      return useToggle(false);
    });

    actHook(() => {
      result.current.setTrue();
    });

    expect(result.current.state).toEqual(true);
  });
  it("should setFalse", async () => {
    const { result } = await renderHook(() => {
      return useToggle(true);
    });

    actHook(() => {
      result.current.setFalse();
    });

    expect(result.current.state).toEqual(false);
  });
  it("should toggle", async () => {
    const initialState = true;
    const { result } = await renderHook(() => {
      return useToggle(initialState);
    });

    actHook(() => {
      result.current.toggle();
    });

    expect(result.current.state).toEqual(!initialState);
  });
});
