import { useCallback, useRef, useState } from "react";
import { Dimensions, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import type {
  DropdownCoords,
  DropdownPlacement,
  UseDropdownOptions,
  UseDropdownReturn,
} from "./types";

const DEFAULT_MAX_HEIGHT = 320;
const DEFAULT_GAP = 8;

interface TriggerLayout {
  pageY: number;
  pageX: number;
  width: number;
  height: number;
}

function resolvePlacement(
  placement: DropdownPlacement,
  spaceBelow: number,
  spaceAbove: number,
  dropdownHeight: number,
): "top" | "bottom" {
  if (placement === "bottom") return "bottom";
  if (placement === "top") return "top";
  // "auto": prefer below, flip up only if it doesn't fit below but fits above
  return spaceBelow < dropdownHeight && spaceAbove > spaceBelow
    ? "top"
    : "bottom";
}

export function useDropdown(
  options: UseDropdownOptions = {},
): UseDropdownReturn {
  const {
    maxHeight = DEFAULT_MAX_HEIGHT,
    gap = DEFAULT_GAP,
    placement = "auto",
  } = options;

  const triggerRef = useRef<View>(null);
  const { bottom: safeBottom } = useSafeAreaInsets();

  const [isVisible, setIsVisible] = useState(false);
  const [isPositioned, setIsPositioned] = useState(false);
  const [triggerLayout, setTriggerLayout] = useState<TriggerLayout>({
    pageY: 0,
    pageX: 0,
    width: 0,
    height: 0,
  });
  const [dropdownHeight, setDropdownHeight] = useState(0);

  const open = useCallback(() => {
    triggerRef.current?.measure((_x, _y, width, height, pageX, pageY) => {
      setTriggerLayout({ pageY, pageX, width, height });
      setDropdownHeight(0);
      setIsPositioned(false);
      setIsVisible(true);
    });
  }, []);

  const close = useCallback(() => {
    setIsVisible(false);
    setIsPositioned(false);
  }, []);

  const toggle = useCallback(() => {
    isVisible ? close() : open();
  }, [isVisible, open, close]);

  const onDropdownLayout = useCallback(
    (e: import("react-native").LayoutChangeEvent) => {
      if (isPositioned) return;
      setDropdownHeight(e.nativeEvent.layout.height);
      setIsPositioned(true);
    },
    [isPositioned],
  );

  // Derive position — runs on every render, always in sync
  const screenHeight = Dimensions.get("window").height;
  const spaceBelow =
    screenHeight - (triggerLayout.pageY + triggerLayout.height) - gap;
  const spaceAbove = triggerLayout.pageY - gap;
  const resolvedPlacement = resolvePlacement(
    placement,
    spaceBelow,
    spaceAbove,
    dropdownHeight,
  );
  const isAbove = resolvedPlacement === "top";

  const coords: DropdownCoords = {
    left: triggerLayout.pageX,
    width: triggerLayout.width,
    maxHeight,
    opacity: isPositioned ? 1 : 0,
    ...(isAbove
      ? { bottom: screenHeight - triggerLayout.pageY + gap + safeBottom }
      : { top: triggerLayout.pageY + triggerLayout.height + gap }),
  };

  return {
    triggerRef,
    isVisible,
    coords,
    isAbove,
    onDropdownLayout,
    open,
    close,
    toggle,
  };
}
