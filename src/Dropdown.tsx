import React from "react";
import {
    Modal,
    Pressable,
    StyleSheet,
    View,
} from "react-native";
import { useDropdown } from "./useDropdown";
import type { DropdownProps } from "./types";

export function Dropdown({
    renderTrigger,
    renderContent,
    containerStyle,
    maxHeight,
    placement,
    gap,
}: DropdownProps) {
    const {
        triggerRef,
        isVisible,
        coords,
        isAbove,
        onDropdownLayout,
        close,
        toggle,
    } = useDropdown({ maxHeight, gap, placement });

    return (
        <>
            {renderTrigger({ ref: triggerRef, onPress: toggle, isOpen: isVisible })}
            <Modal
                transparent
                visible={isVisible}
                animationType="fade"
                onRequestClose={close}
            >
                <Pressable style={StyleSheet.absoluteFill} onPress={close}>
                    <View
                        onLayout={onDropdownLayout}
                        style={[styles.container, coords, containerStyle]}
                    >
                        {renderContent({ close, isAbove })}
                    </View>
                </Pressable>
            </Modal>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        position: "absolute",
    },
});