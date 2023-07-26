import { format } from "date-fns";

export function formatDateToReadableString(date: Date) {
  return format(date, "dd/MM/yyyy HH:mm");
}
