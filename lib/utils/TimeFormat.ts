import {
    differenceInSeconds,
    differenceInMinutes,
    differenceInHours,
    differenceInDays,
    differenceInWeeks,
    differenceInMonths,
    differenceInYears,
} from "date-fns";

export function formatTimeAgo(date: string | Date) {
    const now = new Date();
    const target = new Date(date);

    const seconds = differenceInSeconds(now, target);
    if (seconds < 10) return "الآن";
    if (seconds < 60) return `${seconds} ث`;

    const minutes = differenceInMinutes(now, target);
    if (minutes < 60) return `${minutes} د`;

    const hours = differenceInHours(now, target);
    if (hours < 24) return `${hours} س`;

    const days = differenceInDays(now, target);
    if (days < 7) return `${days} ي`;

    const weeks = differenceInWeeks(now, target);
    if (weeks < 5) return `${weeks} أ`;

    const months = differenceInMonths(now, target);
    if (months < 12) return `${months} ش`;

    const years = differenceInYears(now, target);
    return `${years} س`;
}