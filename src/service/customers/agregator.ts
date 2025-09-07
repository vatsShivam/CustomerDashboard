import { customerService } from "./index";
export function customerAggregatorService(
  customerServiceInstance: ReturnType<typeof customerService>
) {
  const { getAllCustomers, getCustomerMembership, getAllAttributes } =
    customerServiceInstance;
  async function getCustomerStats(): Promise<{
    totalCustomers: number;
    activeCustomers: number;
  }> {
    const allCustomers = await getAllCustomers();
    const customerAttributes = await getAllAttributes();
    const totalCustomers = allCustomers.length;
    const activeCustomers = customerAttributes.filter(
      (customer) => customer.status === "Active"
    ).length;

    return {
      totalCustomers,
      activeCustomers,
    };
  }

  async function getTotalCustomerCount(currentMonthStart: Date): Promise<{ totalCustomers: number }> {
    const allCustomers = await getAllCustomers();
  
    // Start of current month is already passed as currentMonthStart
    const startOfCurrentMonth = new Date(currentMonthStart);
  
    // End of current month → start of next month
    const endOfCurrentMonth = new Date(currentMonthStart);
    endOfCurrentMonth.setMonth(endOfCurrentMonth.getMonth() + 1);
    const totalCustomers = allCustomers.filter(customer => {
      const created = new Date(customer.createdAt);
      // Only keep customers created in the current month
      return created >= startOfCurrentMonth && created < endOfCurrentMonth;
    }).length;
  
    return { totalCustomers };
  }
  
  
  

  async function getActiveCustomerList(size: number) {
    const allCustomers = await getAllCustomers();
    const customerAttributes = await getAllAttributes();
    const activeCustomers = customerAttributes.filter(
      (customer) => customer.status === "Active"
    );
    const activeCustomerDetails = activeCustomers
      .slice(0, size)
      .map((customer) =>
        allCustomers.find((c) => c.id === customer.customerId)
      );
    return activeCustomerDetails;
  }

  async function getTotalMembersList(date: Date): Promise<{
    allActiveMembers: number;
    thisMonthMembers: number;
  }> {
    const customerMembership = await getCustomerMembership();
  
    // All members active on the given date
    const allActiveMembers = customerMembership.filter(member => {
      const start = new Date(member.startDate);
      const end = new Date(member.endDate);
      return start <= date && end > date; // use date instead of now
    }).length;
  
    // Members active during the month of the given date
    const startOfMonth = new Date(date);
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);
    const today = new Date();
    const endOfMonth = new Date(startOfMonth);
    endOfMonth.setMonth(endOfMonth.getMonth() + 1);
    console.log(startOfMonth,endOfMonth)
    const thisMonthMembers = customerMembership.filter(member => {
      const start = new Date(member.startDate);
      // check if start date is >= startOfMonth and < endOfMonth
      return start >= startOfMonth && start < endOfMonth  && start <= today;;
    }).length;
  
    return { allActiveMembers, thisMonthMembers };
  }
  
  

  return {
    getCustomerStats,
    getTotalMembersList,
    getActiveCustomerList,
    getTotalCustomerCount,
  };
}
