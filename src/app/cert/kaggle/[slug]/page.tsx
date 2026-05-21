import { KaggleBadgeRedirect } from "@/components/KaggleBadgeRedirect";
import { kaggleBadges } from "@/data/kaggle-badges";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return kaggleBadges.map((badge) => ({ slug: badge.slug }));
}

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function KaggleCertRedirectPage({ params }: PageProps) {
  const { slug } = await params;
  const badge = kaggleBadges.find((b) => b.slug === slug);
  if (!badge) {
    notFound();
  }

  return <KaggleBadgeRedirect url={badge.url} title={badge.title} />;
}
