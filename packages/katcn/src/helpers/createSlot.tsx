import {
  Children,
  type ComponentPropsWithRef,
  type ComponentType,
  cloneElement,
  isValidElement,
  type ReactElement,
  type ReactNode,
  type Ref,
  type RefObject,
} from 'react';

type PossibleRef<T> = Ref<T> | undefined;

/**
 * Set a given ref to a given value
 * This utility takes care of different types of refs: callback refs and RefObject(s)
 */
function setRef<T>(ref: PossibleRef<T>, value: T) {
  if (typeof ref === 'function') {
    ref(value);
  } else if (ref !== null && ref !== undefined) {
    (ref as RefObject<T>).current = value;
  }
}

/**
 * A utility to compose multiple refs together
 * Accepts callback refs and RefObject(s)
 */
function composeRefs<T>(...refs: PossibleRef<T>[]) {
  return (node: T) => {
    for (const ref of refs) {
      setRef(ref, node);
    }
  };
}

export function createSlot<
  T extends ComponentType<{ children?: ReactNode }>,
>(): T {
  type SlotProps = ComponentPropsWithRef<T> & { ref?: RefObject<unknown> };

  const Slot = ({ ref, ...props }: SlotProps) => {
    const { children, ...slotProps } = props;
    const childrenArray = Children.toArray(children);
    const slottable = childrenArray.find(isSlottable);

    if (slottable) {
      // the new element to render is the one passed as a child of `Slottable`
      const newElement = slottable.props.children;
      const hasChildren = isValidElement<{ children?: ReactNode }>(newElement);

      const newChildren =
        hasChildren &&
        childrenArray.map((child) => {
          if (child === slottable) {
            // because the new element will be the one rendered, we are only interested
            // in grabbing its children (`newElement.props.children`)
            if (Children.count(newElement) > 1) {
              return Children.only(null);
            }
            if (isValidElement<{ children?: ReactNode }>(newElement)) {
              return newElement.props.children;
            }
            return null;
          }
          return child;
        });

      return (
        <SlotClone {...slotProps} ref={ref}>
          {hasChildren
            ? cloneElement(newElement, undefined, newChildren)
            : null}
        </SlotClone>
      );
    }

    return (
      <SlotClone {...slotProps} ref={ref}>
        {children}
      </SlotClone>
    );
  };

  Slot.displayName = 'Slot';

  /* -------------------------------------------------------------------------------------------------
   * SlotClone
   * -----------------------------------------------------------------------------------------------*/

  interface SlotCloneProps {
    ref?: RefObject<unknown>;
    children: ReactNode;
  }
  const SlotClone = ({ ref, ...props }: SlotCloneProps) => {
    const { children, ...slotProps } = props;
    const hasChildren = isValidElement<{ children?: ReactNode }>(children);

    if (hasChildren) {
      return cloneElement(children, {
        ...mergeProps(slotProps, children.props),
        // @ts-expect-error this is fine
        ref: ref
          ? // biome-ignore lint/suspicious/noExplicitAny: this is fine
            composeRefs(ref, (children as any).props?.ref)
          : // biome-ignore lint/suspicious/noExplicitAny: this is fine
            (children as any).props?.ref,
      });
    }

    return Children.count(children) > 1 ? Children.only(null) : null;
  };

  SlotClone.displayName = 'SlotClone';

  /* -------------------------------------------------------------------------------------------------
   * Slottable
   * -----------------------------------------------------------------------------------------------*/

  const Slottable = ({ children }: { children: ReactNode }) => {
    return children;
  };

  /* ---------------------------------------------------------------------------------------------- */

  // biome-ignore lint/suspicious/noExplicitAny: this is fine
  type AnyProps = Record<string, any>;

  function isSlottable(
    child: ReactNode,
  ): child is ReactElement<{ children?: ReactNode }> {
    return isValidElement(child) && child.type === Slottable;
  }

  function mergeProps(slotProps: AnyProps, childProps: AnyProps) {
    // all child props should override
    const overrideProps = { ...childProps };

    for (const propName in childProps) {
      const slotPropValue = slotProps[propName];
      const childPropValue = childProps[propName];

      const isHandler = /^on[A-Z]/.test(propName);
      if (isHandler) {
        // if the handler exists on both, we compose them
        if (slotPropValue && childPropValue) {
          overrideProps[propName] = (...args: unknown[]) => {
            childPropValue(...args);
            slotPropValue(...args);
          };
        }
        // but if it exists only on the slot, we use only this one
        else if (slotPropValue) {
          overrideProps[propName] = slotPropValue;
        }
      }
      // if it's `style`, we merge them
      else if (propName === 'style') {
        overrideProps[propName] = { ...slotPropValue, ...childPropValue };
      }
    }

    return { ...slotProps, ...overrideProps };
  }

  return Slot as unknown as T;
}
