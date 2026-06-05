import { createElement, type ComponentType, type ReactElement, type ReactNode } from "react";
import { AnimatePresence as FramerAnimatePresence, type AnimatePresenceProps } from "framer-motion";

export type SafeAnimatePresenceProps = AnimatePresenceProps & {
  children?: ReactNode;
};

/**
 * Framer Motion's `AnimatePresence` return type conflicts with React 18 + TS 4.9 JSX.
 * `createElement` + a widened component type preserves behavior and satisfies the compiler.
 */
const FramerPresence = FramerAnimatePresence as unknown as ComponentType<SafeAnimatePresenceProps>;

export function AnimatePresence(props: SafeAnimatePresenceProps): ReactElement | null {
  return createElement(FramerPresence, props) as ReactElement;
}
