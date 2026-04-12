// Error Handler
export function getErrorMessage(error: any, fallback: string = "Something went wrong") {
  const err = error.response.data;
  
  const message = err?.detail || (Object.values(err) as any)?.[0]?.[0] || (Object.values(err?.items?.[0]) as any)?.[0]?.[0] 
  
  return message
}

// For Charts
export function formatY_AxisMoney(value: number) {
  if (value >= 1_000_000_000) return `${(value / 1_000_000_000).toFixed(2)}B`;
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(2)}M`;
  if (value >= 1_000) return `${(value / 1_000)}K`;
  return value.toString();
}

export function getDayLabel(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    weekday: "short",
  });
};

export function getMonthLabel(month: number) {
  return new Date(2000, month - 1).toLocaleDateString("en-US", {
    month: "short",
  });
}