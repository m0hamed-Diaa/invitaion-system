import * as XLSX from "xlsx";

export interface ExcelGuest {
    name: string;
    phone: string;
}

export async function importGuests(
    file: File
): Promise<ExcelGuest[]> {

    const bytes = await file.arrayBuffer();

    const workbook = XLSX.read(bytes);

    const sheet =
        workbook.Sheets[
        workbook.SheetNames[0]
        ];

    const rows =
        XLSX.utils.sheet_to_json<Record<string, unknown>>(sheet);

    return rows
        .map((row) => ({
            name: String(row["الاسم"] ?? "").trim(),
            phone: String(row["الهاتف"] ?? "").trim(),
        }))
        .filter(
            guest =>
                guest.name !== "" &&
                guest.phone !== ""
        );
}