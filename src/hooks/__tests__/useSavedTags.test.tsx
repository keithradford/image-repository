import { act } from "@testing-library/react";
import { renderHook } from "@testing-library/react-hooks";
import { useSavedTags } from "../useSavedTags";

describe("useSavedTags", () => {
  describe("addTag", () => {
    it("should add the new tag to the array", () => {
      const { result } = renderHook(() => useSavedTags());

      expect(result.current.tags).toHaveLength(0);
      act(() => {
        result.current.addTag("tag");
      });
      expect(result.current.tags).toHaveLength(1);
    });

    it("should not add the tag if it is already present", () => {
      const { result } = renderHook(() => useSavedTags());

      act(() => {
        result.current.addTag("new tag");
        result.current.addTag("new tag");
        result.current.addTag("new tag");
        result.current.addTag("new tag");
      });
      expect(result.current.tags).toHaveLength(2);
    });
  });

  describe("deleteTag", () => {
    it("should remove the given tag", () => {
      const { result } = renderHook(() => useSavedTags());

      act(() => {
        result.current.deleteTag("new tag");
      });
      expect(result.current.tags).toHaveLength(1);
    });
  });

  describe("clearTags", () => {
    it("should clear all tags", () => {
      const { result } = renderHook(() => useSavedTags());

      act(() => {
        result.current.addTag("1");
        result.current.addTag("2");
        result.current.addTag("3");
        result.current.addTag("4");
        result.current.clearTags();
      });
      expect(result.current.tags).toHaveLength(0);
    });
  });

  describe("contains", () => {
    it("should return true", () => {
      const { result } = renderHook(() => useSavedTags());

      act(() => {
        result.current.addTag("cool tag");
      });

      expect(result.current.contains("cool tag")).toBe(true);
    });

    it("should return false", () => {
      const { result } = renderHook(() => useSavedTags());

      act(() => {
        result.current.addTag("cool tag");
      });

      expect(result.current.contains("uncool tag")).toBe(false);
    });
  });
});
