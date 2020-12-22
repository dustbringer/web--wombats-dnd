import cal from "../data/calenderDetails.json";
import { mod } from "./math";

export default class Dates {
  /**
   * Parameters: Two different dates (no error checking)
   */
  static daysBetween(d1, m1, y1, d2, m2, y2) {
    // Subtract years
    let ret = cal.totalDays * Math.abs(y2 - y1);

    // Subtract months
    const maxMonth = Math.max(m1, m2);
    const minMonth = Math.min(m1, m2);
    const monthsReversed = m2 < m1;
    for (let i = minMonth; i < maxMonth; i++) {
      ret += (monthsReversed ? -1 : 1) * cal.months[i - 1].days;
    }

    // Subtract days
    ret += d2 - d1;

    return ret;
  }

  /**
   * Parameters: Current date
   * (NOT TESTED)
   *
   * Note: dayOfWeek is indexed from 1
   */
  static dayOfWeek(day, month, year) {
    return (
      mod(
        Math.abs(
          cal.baseDate.dayOfWeek -
            1 +
            Dates.daysBetween(
              cal.baseDate.day,
              cal.baseDate.month,
              cal.baseDate.year,
              day,
              month,
              year
            )
        ),
        7
      ) + 1
    );
  }
}
