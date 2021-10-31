import { useState, useEffect } from 'react';
import * as S from './styles';

interface ToggleProps {
  title?: string;
  defaultValue?: boolean;
  onChange: (active: boolean) => void;
}

export default function Toggle({ title, defaultValue, onChange }: ToggleProps) {
  const [isActive, setIsActive] = useState(defaultValue || false);

  useEffect(() => {
    onChange(isActive);
  }, [isActive]);

  function handleClick() {
    setIsActive(!isActive);
  }

  return (
    <S.Container active={isActive} onClick={handleClick}>
      {title && title}
      <div className="toggle">
        <div className="toggle-boll"></div>
      </div>
    </S.Container>
  );
}
