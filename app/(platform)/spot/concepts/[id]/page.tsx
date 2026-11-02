import { ConceptCard } from "@/components/spot/ConceptCards";

export default async function ConceptPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <ConceptCard id={id} />;
}
