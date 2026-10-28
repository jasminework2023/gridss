// Versi publik: tidak ada data pribadi pengguna, jadi kalkulator memakai nilai default (isRealData=false).
export function useFinanceData() {
  return { totalIncome: 0, totalExpense: 0, assets: { liquidAssets: [], investmentAssets: [] }, isRealData: false, month: "" } as any;
}
