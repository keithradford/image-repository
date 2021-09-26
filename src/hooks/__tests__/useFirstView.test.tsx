import { act } from "@testing-library/react";
import { renderHook } from "@testing-library/react-hooks";
import { useFirstVisit } from "../useFirstVists";

describe("useFirstVisit", () => {
  describe("changeFirstVisit", () => {
    it("should flip the firstVisit boolean", () => {
      const { result } = renderHook(() => useFirstVisit());

      expect(result.current.firstVisit).toBe(true);
      act(() => {
        result.current.changeFirstVisit();
      });
      expect(result.current.firstVisit).toBe(false);
    });
  });
});
