'use client';

export type ModalConfirmProps = {
  title: string;
  content: string;
  isVisible?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  disabled: boolean;
};

export function ModalConfirm({
  title,
  content,
  isVisible = true,
  onConfirm,
  onCancel,
  disabled,
}: ModalConfirmProps) {
  if (!isVisible) return;

  function handleCancel() {
    if (disabled) return;
    onCancel();
  }

  return (
    <div
      className="fixed z-50 inset-0 bg-black/50 backdrop:blur-xs
      flex items-center justify-center"
      onClick={handleCancel}
    >
      <div
        className="bg-slate-100 p-6 rounded-lg text-center
          flex flex-col gap-6 max-w-2xl mx-6 shadow-black/50 shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-2xl font-extrabold">{title}</h3>
        <p className="text-lg">{content}</p>
        <div className="flex items-center justify-around">
          <button
            className="bg-slate-300 hover:bg-slate-400 transition text-slate-900
                              rounded-lg py-1 px-3 cursor-pointer flex items-center
                              disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-400"
            autoFocus
            onClick={handleCancel}
            disabled={disabled}
          >
            Cancelar
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-600 transition text-blue-50
                  rounded-lg py-1 px-3 cursor-pointer
                  disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-400"
            onClick={onConfirm}
            disabled={disabled}
          >
            Ok
          </button>
        </div>
      </div>
    </div>
  );
}
