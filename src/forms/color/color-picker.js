import React, { useCallback, useRef, useState } from 'react';
import { CirclePicker } from 'react-color';
import { colors } from '../../colors';

import useClickOutside from './use-click-outside';

export const ColorPicker = ({ color, onChangeComplete }) => {
  const popover = useRef();
  const [isOpen, toggle] = useState(false);

  const close = useCallback(() => toggle(false), []);
  useClickOutside(popover, close);

  function updateColor(color, event) {
    onChangeComplete(color,event);
    toggle(false);
  }

  return (
    <div className="picker">
      <div
        className="swatch"
        style={{ backgroundColor: color }}
        onClick={() => toggle(true)}
      />

      {isOpen && (
        <div className="popover" ref={popover}>
          <CirclePicker color={color} colors={colors} onChangeComplete={updateColor} width='210px' />
        </div>
      )}
    </div>
  );
};
