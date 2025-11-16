import PortfolioForm from "../../PortfolioForm";

export default async function Page({ params }) {
  const { id } = await params;

  return <PortfolioForm id={id} />;
}
