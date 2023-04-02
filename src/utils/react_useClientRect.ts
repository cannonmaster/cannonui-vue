export const isWindow = (element: unknown): element is Window =>
  element === window;

export const getRect = (element: Element | undefined | Window) => {
  if (isWindow(element)) {
    const height = element.innerHeight;
    const width = element.innerWidth;
    return {
      height,
      width,
      bottom: height,
      right: width,
      top: 0,
      left: 0,
    };
  }

  if (element && element.getBoundingClientRect) {
    return element.getBoundingClientRect();
  }

  return {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    height: 0,
    width: 0,
  };
};
