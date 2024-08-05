import { formatDistanceToNow, parseISO } from "date-fns";

export function formatRelativeTime(
  dateString = "2000-01-01 12:00:00.000000+00",
) {
  const parsedDate = parseISO(dateString);

  const distance = formatDistanceToNow(parsedDate, { addSuffix: true });
  if (!distance.includes("ago") && /^\d/.test(distance))
    return distance.replace(/^in /, "") + " ago";
  return distance.replace(/^in /, "");
}

export function tagsFormat(tags) {
  return tags
    ?.split?.(",")
    .map((tag) => {
      return "#" + tag.trim();
    })
    .join("");
}
