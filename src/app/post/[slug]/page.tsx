type PostPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  return (
    <div className="container">
      <h1 className="text-3xl font-bold mb-4">Post Page - {slug}</h1>
    </div>
  );
}
