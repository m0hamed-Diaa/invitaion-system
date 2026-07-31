export function getStoragePath(
    value: string
): string | null {

    if (
        !value.startsWith("http://") &&
        !value.startsWith("https://")
    ) {
        return value;
    }

    try {

        const url = new URL(value);

        const marker =
            "/storage/v1/object/";

        const index =
            url.pathname.indexOf(marker);

        if (index === -1) {
            return null;
        }

        let path =
            url.pathname.slice(
                index + marker.length
            );

        path = path.replace(
            /^public\//,
            ""
        );

        if (
            path.startsWith(
                "invitations/"
            )
        ) {
            path =
                path.slice(
                    "invitations/".length
                );
        }

        return decodeURIComponent(path);

    } catch {

        return null;

    }
}
