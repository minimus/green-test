import Tippy from '@tippyjs/react';
import React, { FC, ReactNode, useCallback, useState } from 'react';
import { Placement } from 'tippy.js';

interface Props {
  tooltip?: string;
  tooltipPlacement?: Placement;
  color?: 'primary' | 'alert';
  disabled?: boolean;
  onClick?: () => void;
  children: ReactNode | ReactNode[];
}

const ToolButton: FC<Props> = (props) => {
  const { tooltip, tooltipPlacement = 'top', color = 'primary', disabled, onClick, children } = props;

  const [tooltipVisible, setTooltipVisible] = useState(false);

  const onButtonClick = useCallback(() => {
    if (onClick) {
      setTooltipVisible(false);
      onClick();
    }
  }, [onClick]);

  const onMouseEnter = () => setTooltipVisible(true);
  const onMouseLeave = () => setTooltipVisible(false);

  if (tooltip) {
    return (
      <Tippy content={tooltip} placement={tooltipPlacement} visible={tooltipVisible} theme="antd" appendTo={document.body}>
        <button
          className={`tool-button-root ${color}`}
          disabled={!!disabled}
          onClick={onButtonClick}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          {children}
        </button>
      </Tippy>
    );
  }

  return (
    <button className={`tool-button-root ${color}`} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  );
};

export default ToolButton;
