export function ModalConfirm() {
  return (
    <div
      className="fixed z-50 inset-0 bg-black/50 backdrop:blur-xs
      flex items-center justify-center"
    >
      <div
        className="bg-slate-100 p-6 rounded-lg text-center
          flex flex-col gap-6 max-w-2xl mx-6 shadow-black/50 shadow-lg"
      >
        <h3 className="text-2xl font-extrabold"> Titulo do form </h3>
        <p className="text-lg">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dignissimos esse libero ullam
          dolor facilis? Perferendis soluta, aliquid neque non eius quo quos excepturi quam alias
          quidem possimus, magnam corporis veniam.{' '}
        </p>
        <div className="flex items-center justify-around">
          <button
            className="bg-slate-300 hover:bg-slate-400 transition text-slate-900
                              rounded-lg py-1 px-3 cursor-pointer flex items-center"
            autoFocus
          >
            Cancelar
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-600 transition text-blue-50
                  rounded-lg py-1 px-3 cursor-pointer"
          >
            Ok
          </button>
        </div>
      </div>
    </div>
  );
}
