import React, { useEffect, useRef, useCallback } from 'react';

interface AutoResizeTextareaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'onChange'> {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  minRows?: number;
  maxHeight?: number;
}

export const AutoResizeTextarea: React.FC<AutoResizeTextareaProps> = ({
  value,
  onChange,
  minRows = 3,
  maxHeight = 400,
  className = '',
  rows,
  style,
  ...props
}) => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const effectiveMinRows = minRows || (typeof rows === 'number' ? rows : 3);

  const adjustHeight = useCallback(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = 'auto';
    const computedHeight = Math.min(Math.max(el.scrollHeight, effectiveMinRows * 24), maxHeight);
    el.style.height = `${computedHeight}px`;
    el.style.overflowY = el.scrollHeight > maxHeight ? 'auto' : 'hidden';
  }, [effectiveMinRows, maxHeight]);

  useEffect(() => {
    adjustHeight();
  }, [value, adjustHeight]);

  return (
    <textarea
      ref={textareaRef}
      value={value}
      onChange={(e) => {
        onChange(e);
        adjustHeight();
      }}
      rows={effectiveMinRows}
      style={{
        fieldSizing: 'content',
        minHeight: `${effectiveMinRows * 24}px`,
        maxHeight: `${maxHeight}px`,
        ...style,
      } as React.CSSProperties}
      className={`resize-y transition-[height] duration-75 ${className}`}
      {...props}
    />
  );
};
