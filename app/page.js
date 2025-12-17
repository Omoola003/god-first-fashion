import { ConsultationForm } from "@/components/Homepage/ConsultationForm";
import { FeaturedCollections } from "@/components/Homepage/FeaturedCollection";
import { Hero } from "@/components/Homepage/Hero";
import { LookbookPreview } from "@/components/Homepage/LookbookPreview";
import { PhilosophyBrief } from "@/components/Homepage/PhilosophyBrief";

export default function Home() {
  return (
    <>
      <Hero />
      <PhilosophyBrief />
      <FeaturedCollections />
      <LookbookPreview />
      <ConsultationForm />
    </>
  )
}
