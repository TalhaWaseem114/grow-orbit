import PortfolioClient from "./PortfolioClient";
import { PORTFOLIO_ITEMS } from "@/data/portfolioData";

export function generateStaticParams() {
  return PORTFOLIO_ITEMS.map((item) => ({
    id: item.id,
  }));
}

export default function Page() {
  return <PortfolioClient />;
}
