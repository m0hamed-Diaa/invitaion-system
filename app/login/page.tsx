
import { redirect } from "next/navigation";
import LoginComponent from "@/components/LoginComponent";
import { getCurrentAdmin } from "@/lib/database/GetCurrentAdmin";

export default async function LoginPage() {
    const admin = await getCurrentAdmin();
    if (admin) {
        redirect("/admin");
    }

    return (
        <LoginComponent />
    );
}