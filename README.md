# react-native-anchor-dropdown

A lightweight, headless hook and component for anchor-positioned dropdowns in React Native.

Automatically flips above or below the trigger based on available screen space, with dynamic height — no fixed sizes needed.

## Features

- 📐 **Dynamic height** — content-driven, no hardcoded heights
- 🔄 **Auto-flip** — opens above the trigger if there's no space below
- 🎯 **Headless hook** — bring your own markup and styles
- 📦 **Plug-and-play component** — for when you just want it to work
- 🦺 **Full TypeScript support**
- 0️⃣ **Zero dependencies** beyond `react-native` and `react-native-safe-area-context`

## Installation

```sh
npm install react-native-anchor-dropdown
```

Make sure you have the peer dependency installed:

```sh
npm install react-native-safe-area-context
```

---

## Usage

### Option A — Hook (headless, full control)

Use this when you want complete control over your markup and styles.

```tsx
import { useDropdown } from "react-native-anchor-dropdown";
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
  FlatList,
} from "react-native";

const options = ["Apple", "Banana", "Cherry"];

export function MyDropdown() {
  const {
    triggerRef,
    coords,
    isVisible,
    isAbove,
    onDropdownLayout,
    open,
    close,
    toggle,
  } = useDropdown({ maxHeight: 300, gap: 8, placement: "auto" });

  return (
    <>
      <Pressable ref={triggerRef} onPress={toggle} style={styles.trigger}>
        <Text>Open dropdown</Text>
      </Pressable>

      <Modal
        transparent
        visible={isVisible}
        animationType="fade"
        onRequestClose={close}
      >
        <Pressable style={StyleSheet.absoluteFill} onPress={close}>
          <View onLayout={onDropdownLayout} style={[styles.dropdown, coords]}>
            <FlatList
              data={options}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <Pressable onPress={close} style={styles.item}>
                  <Text>{item}</Text>
                </Pressable>
              )}
            />
          </View>
        </Pressable>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  trigger: {
    padding: 12,
    backgroundColor: "#eee",
    borderRadius: 8,
  },
  dropdown: {
    position: "absolute",
    backgroundColor: "white",
    borderRadius: 12,
    padding: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  item: {
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
});
```

---

### Option B — Component (plug-and-play)

Use this when you want the modal and positioning handled for you.

```tsx
import { Dropdown } from "react-native-anchor-dropdown";
import { Pressable, Text, StyleSheet, View } from "react-native";

const options = ["Apple", "Banana", "Cherry"];

export function MyDropdown() {
  return (
    <Dropdown
      placement="auto"
      maxHeight={300}
      containerStyle={styles.dropdown}
      renderTrigger={({ ref, onPress, isOpen }) => (
        <Pressable ref={ref} onPress={onPress} style={styles.trigger}>
          <Text>{isOpen ? "Close ▲" : "Open ▼"}</Text>
        </Pressable>
      )}
      renderContent={({ close }) =>
        options.map((option) => (
          <Pressable key={option} onPress={close} style={styles.item}>
            <Text>{option}</Text>
          </Pressable>
        ))
      }
    />
  );
}

const styles = StyleSheet.create({
  trigger: {
    padding: 12,
    backgroundColor: "#eee",
    borderRadius: 8,
  },
  dropdown: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  item: {
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
});
```

---

## API

### `useDropdown(options?)`

| Option      | Type                          | Default  | Description                              |
| ----------- | ----------------------------- | -------- | ---------------------------------------- |
| `maxHeight` | `number`                      | `320`    | Maximum height the dropdown can grow to  |
| `gap`       | `number`                      | `8`      | Space between trigger and dropdown       |
| `placement` | `"auto" \| "top" \| "bottom"` | `"auto"` | Force a direction or let the hook decide |

Returns:

| Property           | Type                             | Description                                      |
| ------------------ | -------------------------------- | ------------------------------------------------ |
| `triggerRef`       | `RefObject<View>`                | Attach to your trigger element                   |
| `isVisible`        | `boolean`                        | Whether the dropdown is open                     |
| `coords`           | `DropdownCoords`                 | Position styles — spread onto your dropdown View |
| `isAbove`          | `boolean`                        | Whether the dropdown opened above the trigger    |
| `onDropdownLayout` | `(e: LayoutChangeEvent) => void` | Attach to your dropdown View's `onLayout`        |
| `open`             | `() => void`                     | Open the dropdown                                |
| `close`            | `() => void`                     | Close the dropdown                               |
| `toggle`           | `() => void`                     | Toggle open/closed                               |

### `<Dropdown />`

| Prop             | Type                   | Required | Description                                             |
| ---------------- | ---------------------- | -------- | ------------------------------------------------------- |
| `renderTrigger`  | `(props) => ReactNode` | ✅       | Render the trigger. Receives `ref`, `onPress`, `isOpen` |
| `renderContent`  | `(props) => ReactNode` | ✅       | Render the content. Receives `close`, `isAbove`         |
| `containerStyle` | `StyleProp<ViewStyle>` | —        | Style for the dropdown container                        |
| `maxHeight`      | `number`               | —        | See hook options                                        |
| `gap`            | `number`               | —        | See hook options                                        |
| `placement`      | `DropdownPlacement`    | —        | See hook options                                        |

---

## License

MIT
