import "@/app/(pages)/pages.css";
import { redirect } from "next/navigation";

export default function AboutRootPage() {
  redirect("/about/vision-mission");
}
