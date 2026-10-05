"use client";

import {
    useCallback,
    useEffect,
    useRef,
    useState,
} from "react";

import {
    Html5Qrcode,
} from "html5-qrcode";

import {
    getEventByClient,
    checkInGuest,
} from "@/lib/actions/scan-qr";

import {
    Button,
} from "@/components/ui/button";

import {
    Input,
} from "@/components/ui/input";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import {
    Badge,
} from "@/components/ui/badge";

import {
    toast,
} from "sonner";

import {
    Loader2,
    Camera,
    UserCheck,
    Keyboard,
} from "lucide-react";


interface Client {
    id: string;
    name: string;
}


interface Props {
    clients: Client[];
}


interface EventData {
    id: string;
    title: string;
    client_id: string;
}


interface GuestResult {
    id: string;
    guest_code: number;
    name: string;
    phone: string;
    status: "pending" | "attending" | "declined";
    attend_confirmation: boolean;
    confirmed_at: string | null;
    scanned_at: string | null;
    method: "qr" | "manual" | null;
}

export default function ScanQRClient({
    clients,
}: Props) {

    const [
        clientId,
        setClientId,
    ] = useState("");


    const [
        event,
        setEvent,
    ] = useState<EventData | null>(
        null
    );


    const [
        loadingEvent,
        setLoadingEvent,
    ] = useState(false);


    const [
        scannerStarted,
        setScannerStarted,
    ] = useState(false);


    const [
        processing,
        setProcessing,
    ] = useState(false);


    const [
        manualCode,
        setManualCode,
    ] = useState("");

    console.log("manualCode", manualCode);


    const [
        lastGuest,
        setLastGuest,
    ] = useState<GuestResult | null>(
        null
    );


    const scannerRef =
        useRef<Html5Qrcode | null>(
            null
        );


    const processingRef =
        useRef(false);

    async function handleClientChange(
        value: string
    ) {

        setClientId(value);

        setEvent(null);

        setLastGuest(null);

        if (!value) {
            return;
        }


        setLoadingEvent(true);


        try {

            const result =
                await getEventByClient(
                    value
                );


            if (!result.success) {

                toast.error(
                    result.message
                );

                return;
            }


            setEvent(
                result.event
            );

        } catch {

            toast.error(
                "حدث خطأ أثناء تحميل المناسبة"
            );

        } finally {

            setLoadingEvent(false);

        }
    }

    const handleCheckIn = useCallback(
        async (
            code: number,
            method: "qr" | "manual"
        ) => {

            if (
                !event ||
                processingRef.current
            ) {
                return;
            }

            if (
                !Number.isInteger(code) ||
                code <= 0
            ) {
                toast.error(
                    "كود المدعو غير صحيح"
                );
                return;
            }

            processingRef.current = true;
            setProcessing(true);

            try {

                const result =
                    await checkInGuest(
                        event.id,
                        code,
                        method
                    );

                if (
                    result.success &&
                    result.guest
                ) {

                    setLastGuest(
                        result.guest
                    );

                    setManualCode("");

                    toast.success(
                        `تم تسجيل حضور ${result.guest.name}`
                    );

                    return;
                }

                if (
                    result.reason ===
                    "not_found"
                ) {

                    toast.error(
                        "المدعو غير موجود في هذه المناسبة"
                    );

                    return;
                }

                if (
                    result.reason ===
                    "already_checked_in"
                ) {

                    toast.warning(
                        result.message
                    );

                    return;
                }

                toast.error(
                    result.message ||
                    "حدث خطأ أثناء تسجيل الحضور"
                );

            } catch {
                toast.error(
                    "حدث خطأ غير متوقع"
                );

            } finally {

                processingRef.current =
                    false;

                setProcessing(false);
            }
        },
        [event]
    );

    useEffect(() => {

        if (!event) {
            return;
        }

        let mounted = true;

        async function startScanner() {

            try {
                if (
                    scannerRef.current
                ) {
                    return;
                }


                const scanner =
                    new Html5Qrcode(
                        "qr-reader"
                    );


                scannerRef.current =
                    scanner;


                await scanner.start(
                    {
                        facingMode:
                            "environment",
                    },

                    {
                        fps: 10,

                        // aspectRatio: 1,
                    },

                    async (
                        decodedText
                    ) => {

                        if (
                            processingRef.current
                        ) {
                            return;
                        }

                        const parts = decodedText.split(":");
                        const codePart = parts.length === 2 ? parts[1] : parts[0];

                        const code =
                            Number(
                                codePart
                            );


                        if (
                            !Number.isInteger(
                                code
                            ) ||
                            code <= 0
                        ) {

                            toast.error(
                                "QR Code غير صحيح"
                            );

                            return;
                        }

                        if (parts.length === 2 && parts[0] !== event?.id) {
                            toast.error("هذا الكود لا يخص هذه المناسبة");
                            return;
                        }

                        await handleCheckIn(
                            code,
                            "qr"
                        );

                    },

                    () => { }
                );

                if (mounted) {
                    setScannerStarted(
                        true
                    );

                }

            } catch {

                if (mounted) {
                    setScannerStarted(
                        false
                    );
                }
                toast.error(
                    "تعذر تشغيل الكاميرا"
                );

            }
        }

        startScanner();

        return () => {

            mounted = false;


            const scanner =
                scannerRef.current;


            scannerRef.current =
                null;


            if (scanner) {

                scanner
                    .stop()
                    .catch(() => { });

            }


            setScannerStarted(
                false
            );

        };

    }, [event, handleCheckIn]);

    async function handleManualSubmit(
        e: React.FormEvent
    ) {

        e.preventDefault();
        const code =
            Number(
                manualCode
            );


        await handleCheckIn(
            code,
            "manual"
        );
    }

    return (
        <div className="space-y-6">

            <Card>

                <CardHeader>

                    <CardTitle>
                        اختيار العميل
                    </CardTitle>

                </CardHeader>


                <CardContent>

                    <select
                        value={clientId}
                        onChange={(e) =>
                            handleClientChange(
                                e.target.value
                            )
                        }
                        disabled={
                            loadingEvent
                        }
                        className="h-11 w-full rounded-md border bg-background px-3 text-sm"
                    >

                        <option value="">
                            اختر العميل
                        </option>


                        {clients.map(
                            (client) => (

                                <option
                                    key={
                                        client.id
                                    }
                                    value={
                                        client.id
                                    }
                                >
                                    {
                                        client.name
                                    }
                                </option>

                            )
                        )}

                    </select>


                    {loadingEvent && (

                        <div className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">

                            <Loader2
                                className="h-4 w-4 animate-spin"
                            />

                            جاري تحميل المناسبة...

                        </div>

                    )}

                </CardContent>

            </Card>


            {event && (

                <Card>

                    <CardHeader>

                        <div className="flex items-center justify-between gap-3">

                            <CardTitle>
                                {event.title}
                            </CardTitle>

                            <Badge>
                                المناسبة الحالية
                            </Badge>

                        </div>

                    </CardHeader>


                    <CardContent className="space-y-6">
                        <div>
                            <div className="mb-3 flex items-center gap-2">

                                <Camera
                                    className="h-5 w-5"
                                />

                                <h2 className="font-semibold">
                                    مسح QR Code
                                </h2>

                            </div>


                            <div
                                id="qr-reader"
                                className="mx-auto w-full max-w-md overflow-hidden rounded-xl border"
                            />


                            <div className="mt-3 text-center text-sm text-muted-foreground">

                                {scannerStarted
                                    ? "وجّه الكاميرا إلى QR Code الخاص بالمدعو"
                                    : "جاري تشغيل الكاميرا..."
                                }

                            </div>

                        </div>


                        <div className="border-t pt-6">

                            <div className="mb-3 flex items-center gap-2">

                                <Keyboard
                                    className="h-5 w-5"
                                />

                                <h2 className="font-semibold">
                                    تسجيل يدوي
                                </h2>

                            </div>


                            <form
                                onSubmit={
                                    handleManualSubmit
                                }
                                className="flex flex-col gap-3 sm:flex-row"
                            >

                                <Input
                                    value={
                                        manualCode
                                    }
                                    onChange={(
                                        e
                                    ) =>
                                        setManualCode(
                                            e.target.value
                                        )
                                    }
                                    placeholder="أدخل كود المدعو المكون من 6 ارقام..."
                                    inputMode="numeric"
                                    type="number"
                                    maxLength={6}
                                    disabled={
                                        processing
                                    }
                                    className="sm:flex-1"
                                />


                                <Button
                                    type="submit"
                                    disabled={
                                        processing ||
                                        !manualCode || manualCode.length < 6
                                    }
                                >

                                    {processing ? (

                                        <>
                                            <Loader2
                                                className="ml-2 h-4 w-4 animate-spin"
                                            />

                                            جاري التسجيل...

                                        </>

                                    ) : (

                                        "تسجيل الحضور"

                                    )}

                                </Button>

                            </form>

                        </div>

                        {lastGuest && (
                            <Card className="border-green-500">

                                <CardContent className="p-5">

                                    <div className="flex items-center gap-3">

                                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">

                                            <UserCheck
                                                className="h-5 w-5 text-green-600"
                                            />

                                        </div>


                                        <div>

                                            <p className="font-semibold">

                                                {
                                                    lastGuest.name
                                                }

                                            </p>

                                            <p className="text-sm text-muted-foreground">

                                                كود:

                                                {" "}

                                                {
                                                    lastGuest.guest_code
                                                }

                                            </p>

                                        </div>

                                    </div>


                                    <div className="mt-4 grid grid-cols-2 gap-3 text-sm">

                                        <div>

                                            <span className="text-muted-foreground">
                                                الطريقة
                                            </span>

                                            <p className="font-medium">
                                                {
                                                    lastGuest.method ===
                                                        "qr"
                                                        ? "QR"
                                                        : "يدوي"
                                                }
                                            </p>

                                        </div>


                                        <div>

                                            <span className="text-muted-foreground">
                                                وقت الدخول
                                            </span>

                                            <p className="font-medium">

                                                {
                                                    lastGuest.scanned_at
                                                        ? new Date(
                                                            lastGuest.scanned_at
                                                        ).toLocaleString(
                                                            "ar-EG"
                                                        )
                                                        : "-"
                                                }

                                            </p>

                                        </div>

                                    </div>

                                </CardContent>

                            </Card>
                        )}
                    </CardContent>

                </Card>

            )}

        </div>
    );
}