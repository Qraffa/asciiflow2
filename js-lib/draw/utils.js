import { SPECIAL_VALUE } from '../constants';
import { Box } from '../common';
import State from '../state';
import Vector from '../vector';

/**
 * Draws a line on the diagram state.
 *
 * @param {State} state
 * @param {Vector} startPosition
 * @param {Vector} endPosition
 * @param {boolean} clockwise
 * @param {string=} value
 */
export function drawLine(
    state, startPosition, endPosition, clockwise, value = SPECIAL_VALUE) {

  var box = new Box(startPosition, endPosition);
  var startX = box.startX;
  var startY = box.startY;
  var endX = box.endX;
  var endY = box.endY;

  var midX = clockwise ? endPosition.x : startPosition.x;
  var midY = clockwise ? startPosition.y : endPosition.y;

  while (startX++ < endX) {
    var position = new Vector(startX, midY);
    var context = state.getContext(new Vector(startX, midY));
    // Don't erase any lines that we cross.
    if (value != ' ' || context.up + context.down != 2) {
      state.drawValueIncremental(position, value);
    }
  }
  while (startY++ < endY) {
    var position = new Vector(midX, startY);
    var context = state.getContext(new Vector(midX, startY));
    // Don't erase any lines that we cross.
    if (value != ' ' || context.left + context.right != 2) {
      state.drawValueIncremental(position, value);
    }
  }

  state.drawValue(startPosition, value);
  state.drawValue(endPosition, value);
  state.drawValueIncremental(new Vector(midX, midY), value);
}

/**
 * Sets the cells scratch (uncommitted) values to the given text.
 * Handles newlines appropriately.
 * @param {State} state
 * @param {Vector} position
 * @param {string} text
 */
export function drawText(state, position, text) {
  let x = 0, y = 0;
  let reg = new RegExp("[\\u4E00-\\u9FFF]+");
  let reg2 = /[\u3002|\uff1f|\uff01|\uff0c|\u3001|\uff1b|\uff1a|\u201c|\u201d|\u2018|\u2019|\uff08|\uff09|\u300a|\u300b|\u3008|\u3009|\u3010|\u3011|\u300e|\u300f|\u300c|\u300d|\ufe43|\ufe44|\u3014|\u3015|\u2026|\u2014|\uff5e|\ufe4f|\uffe5]/
  for (const char of text) {
    if (char == '\n') {
      y++;
      x = 0;
      continue;
    }
    state.drawValue(position.add(new Vector(x, y)), char);
    if (reg.test(char) || reg2.test(char)) {
      x+=2;
    } else {
      x++;
    }
  }
}
