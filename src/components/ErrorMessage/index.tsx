type ErrorMessageProps = {
  title: string;
  contentTitle: string;
  contentDescription: string;
};

export default function ErrorMessage({
  title,
  contentTitle,
  contentDescription,
}: ErrorMessageProps) {
  return (
    <>
      <title>{title}</title>
      <div className="min-h-80 flex items-center justify-center mb-16 p-8 rounded-xl bg-slate-600 text-slate-100">
        <div>
          <h1 className="items-center justify-center text-center text-7xl/tight font-extrabold pb-8">
            {contentTitle}
          </h1>
          <div>{contentDescription}</div>
        </div>
      </div>
    </>
  );
}
