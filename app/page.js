import { ConsultationForm } from "@/components/Homepage/ConsultationForm";
import FeaturedCollections from "@/components/Homepage/FeaturedCollection";
import { Hero } from "@/components/Homepage/Hero";
import { LookbookPreview } from "@/components/Homepage/LookbookPreview";

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedCollections />
      <LookbookPreview />
      <ConsultationForm />
    </>
  )
}
