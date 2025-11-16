import { designCategories } from '@/lib/data';
import Image from 'next/image';
import { notFound } from 'next/navigation';


export function generateStaticParams() {
  return designCategories.map((category) => ({
    slug: category.slug,
  }));
}

export default function DesignDetailPage({ params }) {
  const category = designCategories.find((c) => c.slug === params.slug);

  if (!category) return notFound();

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{category.title}</h1>
      <p className="mb-2 text-gray-600">{category.description}</p>
      <div
        className="w-full rounded-lg shadow-md overflow-hidden"
        style={{ height: category.layout.height }}
      >
        <Image
          src={category.image}
          alt={category.title}
          className="w-full h-full object-cover"
          height={200}
          width={200}
        />
      </div>
      <div className="mt-4 text-sm text-gray-500">
        Structure Weight: {category.layout.weight}
      </div>
    </div>
  );
}
