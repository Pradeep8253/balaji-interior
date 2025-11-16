import ServiceForm from "../../ServicesForm";

export default async function Page({ params }) {
  const { id } = await params;

  return <ServiceForm id={id} />;
}
