import { redirect } from "next/navigation";

export default function Home() {
  redirect("/payments");
  return null; // This will never render because of the redirect
}
