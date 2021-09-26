import { act } from "@testing-library/react";
import { renderHook } from "@testing-library/react-hooks";
import { useSavedPhotos } from "../useSavedPhotos";

describe("useSavedPhotos", () => {
  describe("addPhoto", () => {
    it("should add the new photo to the array", () => {
      const { result } = renderHook(() => useSavedPhotos());

      expect(result.current.photos).toHaveLength(0);
      act(() => {
        result.current.addPhoto("new photo" as any);
      });
      expect(result.current.photos).toHaveLength(1);
    });

    it("should not add the photo if it is already present", () => {
      const { result } = renderHook(() => useSavedPhotos());

      act(() => {
        result.current.addPhoto("new photo" as any);
        result.current.addPhoto("new photo" as any);
        result.current.addPhoto("new photo" as any);
        result.current.addPhoto("new photo" as any);
      });
      expect(result.current.photos).toHaveLength(1);
    });
  });

  describe("deletePhoto", () => {
    it("should remove the given photo", () => {
      const { result } = renderHook(() => useSavedPhotos());

      act(() => {
        result.current.addPhoto("new photo" as any);
        expect(result.current.photos).toHaveLength(1);

        result.current.deletePhoto("new photo" as any);
      });
      expect(result.current.photos).toHaveLength(0);
    });
  });

  describe("clearPhotos", () => {
    it("should clear all photos", () => {
      const { result } = renderHook(() => useSavedPhotos());

      act(() => {
        result.current.addPhoto({ id: "new photo" } as any);
        result.current.addPhoto({ id: "new photo1" } as any);
        result.current.addPhoto({ id: "new phot2" } as any);
        result.current.addPhoto({ id: "new photo3" } as any);
        result.current.clearPhotos();
      });

      expect(result.current.photos).toHaveLength(0);
    });
  });

  describe("contains", () => {
    it("should return true", () => {
      const { result } = renderHook(() => useSavedPhotos());

      act(() => {
        result.current.addPhoto({ id: "new photo" } as any);
      });

      expect(result.current.contains("new photo" as any)).toBe(true);
    });

    it("should return false", () => {
      const { result } = renderHook(() => useSavedPhotos());

      act(() => {
        result.current.addPhoto({ id: "new photo" } as any);
      });

      expect(result.current.contains("new photo but not saved" as any)).toBe(
        false
      );
    });
  });
});
