import ReactMarkdown from 'react-markdown';

type SafeMarkdownProps = {
  content: string;
};

export function SafeMarkdown({ content }: SafeMarkdownProps) {
  return (
    <div className="prose prose-slate w-full max-w-none md:prose-lg">
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
}
