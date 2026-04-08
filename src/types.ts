import type { RefObject } from "react";
import type { View, StyleProp, ViewStyle } from "react-native";

export type DropdownPlacement = "auto" | "top" | "bottom";

export interface DropdownCoords {
  left: number;
  width: number;
  maxHeight: number;
  opacity: 0 | 1;
  top?: number;
  bottom?: number;
}

export interface UseDropdownOptions {
  /** Maximum height the dropdown can grow to. Default: 320 */
  maxHeight?: number;
  /** Gap between the trigger and the dropdown. Default: 8 */
  gap?: number;
  /** Force a placement direction, or let the hook decide. Default: "auto" */
  placement?: DropdownPlacement;
}

export interface UseDropdownReturn {
  /** Attach this to your trigger View/Pressable via ref */
  triggerRef: RefObject<View>;
  isVisible: boolean;
  /** Position styles — spread directly onto your dropdown View */
  coords: DropdownCoords;
  /** Whether the dropdown is opening above the trigger */
  isAbove: boolean;
  onDropdownLayout: (e: import("react-native").LayoutChangeEvent) => void;
  open: () => void;
  close: () => void;
  toggle: () => void;
}

export interface DropdownProps extends UseDropdownOptions {
  /** The trigger element — receives ref, onPress, and isOpen */
  renderTrigger: (props: {
    ref: RefObject<View>;
    onPress: () => void;
    isOpen: boolean;
  }) => React.ReactNode;
  /** The dropdown content — receives close and isAbove */
  renderContent: (props: {
    close: () => void;
    isAbove: boolean;
  }) => React.ReactNode;
  /** Style applied to the dropdown container View */
  containerStyle?: StyleProp<ViewStyle>;
}
