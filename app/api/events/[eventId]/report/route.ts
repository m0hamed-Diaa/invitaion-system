import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";
import puppeteer from "puppeteer";
import { reportTemplate } from "@/lib/pdf/report-template";
import { Guest } from "@/lib/pdf/report-types";


async function urlToBase64(url: string | null | undefined): Promise<string> {

    if (!url) return "";

    try {
        const res = await fetch(url, { signal: AbortSignal.timeout(15000) });

        if (!res.ok) {
            console.error("فشل تحميل صورة الدعوة:", res.status);
            return "";
        }

        const buffer = await res.arrayBuffer();
        const contentType = res.headers.get("content-type") || "image/jpeg";

        return `data:${contentType};base64,${Buffer.from(buffer).toString("base64")}`;

    } catch (err) {
        console.error("خطأ أثناء تحميل صورة الدعوة:", err);
        return "";
    }
}

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ eventId: string }> }
) {
    try {
        const { eventId } = await params;
        const supabase = await createClient();

        const { data: event, error: eventError } = await supabase
            .from("events")
            .select(`*, client:clients(*), guests(*)`)
            .eq("id", eventId)
            .single();

        if (eventError || !event) {
            return NextResponse.json(
                { error: "المناسبة غير موجودة" },
                { status: 404 }
            );
        }

        const guests: Guest[] = event.guests ?? [];

        const attended = guests.filter(g => g.status === "attending").length;
        const declined = guests.filter(g => g.status === "declined").length;
        const pending = guests.filter(g => g.status === "pending").length;

        const [invitationBase64] = await Promise.all([
            urlToBase64(event.invitation_image),
        ]);

        const browser = await puppeteer.launch({
            headless: true,
            args: ["--no-sandbox", "--disable-setuid-sandbox"],
        });

        const page = await browser.newPage();

        const html = reportTemplate({
            title: event.title,
            client: { name: event.client.name },
            invitation_image: invitationBase64,
            reportDate: new Date().toLocaleDateString("ar-EG"),
            totalGuests: guests.length,
            attended,
            declined,
            pending,
            guests,
        });

        await page.setContent(html, { waitUntil: "domcontentloaded" });

        const pdf = await page.pdf({
            format: "A4",
            printBackground: true,
            preferCSSPageSize: true,
            margin: { top: "20px", bottom: "20px", left: "20px", right: "20px" },
        });

        await browser.close();

        const fileName = encodeURIComponent(`تقرير-${event.title}.pdf`);

        return new NextResponse(Buffer.from(pdf), {
            headers: {
                "Content-Type": "application/pdf",
                "Content-Disposition": `attachment; filename="report.pdf"; filename*=UTF-8''${fileName}`,
            },
        });

    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "Failed to generate report" },
            { status: 500 }
        );
    }
}