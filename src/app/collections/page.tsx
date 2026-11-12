import type { Metadata } from "next";
import { Collections } from "@/components/sections/Collections";

export const metadata: Metadata = {
  title: "Collections",
  description:
    "The New Edit, Signature Pieces, Everyday Expressions and Contemporary Forms: Studio Babui's collections.",
};

export default function CollectionsPage() {
  return <Collections titleAs="h1" />;
}
