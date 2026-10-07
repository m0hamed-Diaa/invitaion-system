export interface ReportGuest {
    id: string;
    guest_code: string;
    name: string;
    phone: string;

    status: "pending" | "attending" | "declined";

    invitation_sent: boolean;

    attend_confirmation: boolean;

    method: "qr" | "manual" | null;

    scanned_at: string | null;
}

export interface ReportData {
    title: string;

    client: {
        name: string;
    };

    invitation_image: string;

    reportDate: string;

    totalGuests: number;

    attended: number;

    declined: number;

    pending: number;

    guests: ReportGuest[];

    cairoFontBase64: string;
}


export interface Guest {
    id: string;
    guest_code: string;
    name: string;
    phone: string;
    status: "pending" | "attending" | "declined";
    invitation_sent: boolean;
    attend_confirmation: boolean;
    method: "qr" | "manual" | null;
    scanned_at: string | null;
}