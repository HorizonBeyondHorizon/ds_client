import {Vector2D} from "../types";

export const getRelativeCoordinates = (event: MouseEvent, element: HTMLElement): Vector2D => {
    const rect = element.getBoundingClientRect();
    const scrollX = window.pageXOffset || document.documentElement.scrollLeft;
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;

    const relativeX = event.pageX - (rect.left + scrollX);
    const relativeY = event.pageY - (rect.top + scrollY);

    return { x: relativeX, y: relativeY };
}