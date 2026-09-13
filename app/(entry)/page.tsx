import { cookies } from "next/headers";
import { redirect } from "next/navigation";
export default async function Entry() {
  const preference = (await cookies()).get("portfolio-locale")?.value;
  redirect(preference === "ar" ? "/ar" : "/en");
}
