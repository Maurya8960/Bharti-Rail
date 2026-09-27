export interface CancellationRefundCalculation {
  totalPaid: number;
  cancellationFee: number;
  clerkageFee: number;
  nonRefundableInsurance: number;
  refundAmount: number;
  policyApplied: string;
}

export function calculateCancellationRefund(
  totalPaid: number,
  travelClass: string,
  hoursToDeparture: number = 72,
  passengerCount: number = 1
): CancellationRefundCalculation {
  const minCharges: Record<string, number> = {
    "1A": 240,
    "EC": 240,
    "2A": 200,
    "3A": 180,
    "3E": 180,
    "CC": 180,
    "SL": 120,
    "2S": 60,
  };

  const baseFlatRate = (minCharges[travelClass] || 150) * passengerCount;
  let cancellationFee = 0;
  let policyApplied = "";

  if (hoursToDeparture > 48) {
    cancellationFee = baseFlatRate;
    policyApplied = "Cancelled > 48 hours before departure (Flat cancellation charge per passenger)";
  } else if (hoursToDeparture >= 12 && hoursToDeparture <= 48) {
    cancellationFee = Math.max(baseFlatRate, Math.round(totalPaid * 0.25));
    policyApplied = "Cancelled between 12 to 48 hours before departure (25% of fare deducted)";
  } else if (hoursToDeparture >= 4 && hoursToDeparture < 12) {
    cancellationFee = Math.max(baseFlatRate, Math.round(totalPaid * 0.50));
    policyApplied = "Cancelled between 4 to 12 hours before departure (50% of fare deducted)";
  } else {
    cancellationFee = totalPaid;
    policyApplied = "Cancelled < 4 hours before departure (No refund under IRCTC T&C)";
  }

  const clerkageFee = 60 * passengerCount;
  const nonRefundableInsurance = 0.45 * passengerCount;
  const refundAmount = Math.max(0, totalPaid - cancellationFee - nonRefundableInsurance);

  return {
    totalPaid,
    cancellationFee,
    clerkageFee,
    nonRefundableInsurance,
    refundAmount,
    policyApplied,
  };
}
