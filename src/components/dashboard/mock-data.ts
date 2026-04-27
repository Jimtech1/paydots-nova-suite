import type { Role } from "./role-context";

export const customerData = {
  balances: { usd: 12450.67, ngn: 3_200_000, eur: 845.2, gbp: 412.5 },
  cardSpend: 1840.22,
  investmentValue: 8120,
  referrals: 312.4,
  cards: [
    { last4: "4242", expiry: "08/28", frozen: false, brand: "Visa" },
    { last4: "9931", expiry: "11/27", frozen: true, brand: "Mastercard" },
  ],
  investments: [
    { name: "T-Bills", value: 5000, apy: 18.2, maturity: "2026-09-12" },
    { name: "Real Estate", value: 2000, apy: 14.0, maturity: "2027-01-30" },
    { name: "Fixed Dollar", value: 1120, apy: 9.5, maturity: "2026-06-22" },
  ],
  transactions: [
    { id: "t1", date: "2026-04-26", desc: "Apple App Store", amount: -12.99, type: "card", status: "Completed" },
    { id: "t2", date: "2026-04-25", desc: "Salary — Acme Corp", amount: 4500, type: "deposit", status: "Completed" },
    { id: "t3", date: "2026-04-24", desc: "T-Bills purchase", amount: -1000, type: "investment", status: "Completed" },
    { id: "t4", date: "2026-04-22", desc: "Send to Ada", amount: -250, type: "transfer", status: "Completed" },
    { id: "t5", date: "2026-04-20", desc: "Spotify", amount: -9.99, type: "card", status: "Completed" },
    { id: "t6", date: "2026-04-18", desc: "Withdraw to bank", amount: -300, type: "transfer", status: "Pending" },
  ],
  trend: [3200, 3450, 3100, 3800, 4120, 3900, 4500, 4700, 5100, 4900, 5200, 5800, 6100, 6400, 6300, 6900, 7200, 7100, 7600, 7900, 8100, 8400, 8800, 9100, 9500, 10200, 10800, 11400, 12100, 12450],
  spendByCategory: [
    { name: "Food", value: 420 },
    { name: "Travel", value: 380 },
    { name: "Shopping", value: 540 },
    { name: "Bills", value: 290 },
    { name: "Subs", value: 210 },
  ],
};

export const merchantData = {
  volumeMonth: 184_320.45,
  settlementUSD: 28_400.12,
  settlementNGN: 9_800_000,
  successCount: 1842,
  avgTicket: 100.06,
  links: [
    { id: "pl1", label: "Invoice #2041", amount: 2400, status: "Paid", created: "2026-04-26" },
    { id: "pl2", label: "Consulting hours", amount: 1500, status: "Pending", created: "2026-04-25" },
    { id: "pl3", label: "Subscription", amount: 49, status: "Paid", created: "2026-04-24" },
  ],
  transactions: [
    { id: "m1", date: "2026-04-26", desc: "Order #5512", amount: 240, type: "sale", status: "Settled" },
    { id: "m2", date: "2026-04-26", desc: "Order #5511", amount: 89.5, type: "sale", status: "Settled" },
    { id: "m3", date: "2026-04-25", desc: "Refund #5497", amount: -45, type: "refund", status: "Completed" },
    { id: "m4", date: "2026-04-25", desc: "Order #5510", amount: 320, type: "sale", status: "Pending" },
    { id: "m5", date: "2026-04-24", desc: "Order #5509", amount: 1200, type: "sale", status: "Settled" },
  ],
  trend: [4200, 5100, 4800, 6100, 5800, 7200, 8100, 7800, 9200, 8900, 10100, 11200, 10800, 12400, 13100, 12900, 14200, 13800, 15100, 14900, 16200, 15800, 17100, 16800, 18200, 17900, 19400, 18800, 20100, 21000],
  payoutByDay: [
    { name: "Mon", value: 3200 },
    { name: "Tue", value: 4100 },
    { name: "Wed", value: 3800 },
    { name: "Thu", value: 5200 },
    { name: "Fri", value: 6100 },
    { name: "Sat", value: 7400 },
    { name: "Sun", value: 4800 },
  ],
};

export const agentData = {
  commissionMonth: 2_840.5,
  customersServed: 184,
  cashInVolume: 84_200,
  cashOutVolume: 61_400,
  requests: [
    { id: "r1", customer: "Tunde A.", type: "Cash-in", amount: 500, status: "Pending" },
    { id: "r2", customer: "Maria L.", type: "Cash-out", amount: 1200, status: "Pending" },
    { id: "r3", customer: "Kevin O.", type: "Cash-in", amount: 250, status: "Pending" },
    { id: "r4", customer: "Aisha K.", type: "Cash-out", amount: 80, status: "Approved" },
  ],
  commissions: [
    { id: "c1", date: "2026-04-26", source: "Cash-in #r1", amount: 5.0 },
    { id: "c2", date: "2026-04-25", source: "Cash-out #r92", amount: 12.0 },
    { id: "c3", date: "2026-04-24", source: "Cash-in #r88", amount: 7.5 },
    { id: "c4", date: "2026-04-23", source: "Cash-out #r80", amount: 18.0 },
  ],
  trend: [120, 180, 150, 210, 240, 200, 280, 310, 290, 340, 360, 320, 400, 420, 410, 460, 480, 470, 510, 540, 520, 580, 600, 590, 640, 660, 700, 720, 760, 800],
  payoutByDay: [
    { name: "Mon", value: 320 },
    { name: "Tue", value: 410 },
    { name: "Wed", value: 380 },
    { name: "Thu", value: 520 },
    { name: "Fri", value: 610 },
    { name: "Sat", value: 740 },
    { name: "Sun", value: 480 },
  ],
};

export function getRoleData(role: Role) {
  if (role === "merchant") return merchantData;
  if (role === "agent") return agentData;
  return customerData;
}

export const fmt = (n: number, currency = "USD") =>
  new Intl.NumberFormat("en-US", { style: "currency", currency, maximumFractionDigits: 2 }).format(n);
