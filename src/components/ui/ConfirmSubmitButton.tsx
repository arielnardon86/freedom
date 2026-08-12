"use client";

type ConfirmSubmitButtonProps = {
  label: string;
  confirmText: string;
  className?: string;
};

export function ConfirmSubmitButton({
  label,
  confirmText,
  className,
}: ConfirmSubmitButtonProps) {
  return (
    <button
      type="submit"
      className={className}
      onClick={(e) => {
        if (!confirm(confirmText)) e.preventDefault();
      }}
    >
      {label}
    </button>
  );
}
