import type { OpportunitySalary } from "@/lib/opportunities/types";
import { formatTemplate } from "@/lib/utils/format-template";

interface SalaryLabels {
  month: string;
  year: string;
  hour: string;
  from: string;
  upTo: string;
  range: string;
}

export function formatSalary(
  salary: OpportunitySalary | undefined,
  locale: string,
  labels: SalaryLabels,
) {
  const minimum = salary?.min;
  const maximum = salary?.max;
  const hasMinimum = typeof minimum === "number" && Number.isFinite(minimum) && minimum >= 0;
  const hasMaximum = typeof maximum === "number" && Number.isFinite(maximum) && maximum >= 0;

  if (!salary || (!hasMinimum && !hasMaximum)) {
    return "";
  }
  if (hasMinimum && hasMaximum && minimum > maximum) {
    return "";
  }

  const formatter = new Intl.NumberFormat(locale, {
    style: "currency",
    currency: salary.currency,
    maximumFractionDigits: 0,
  });
  const period = labels[salary.period];

  if (hasMinimum && hasMaximum) {
    return formatTemplate(labels.range, {
      minimum: formatter.format(minimum),
      maximum: formatter.format(maximum),
      period,
    });
  }

  if (hasMinimum) {
    return formatTemplate(labels.from, {
      amount: formatter.format(minimum),
      period,
    });
  }

  return formatTemplate(labels.upTo, {
    amount: formatter.format(maximum!),
    period,
  });
}
