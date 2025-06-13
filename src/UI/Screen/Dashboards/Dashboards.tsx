import {
  DashboardComponent,
  DateRangeCalendar,
  FooterCompoent,
  HeaderLoginComponent,
  TextSemiBoldComponent,
} from "../../Components";
import { useState } from "react";

interface DateRange {
  startDate: Date | null;
  endDate: Date | null;
}

const Dashboard = () => {
  const [dateRange, setDateRange] = useState<DateRange>({ startDate: null, endDate: null });
  console.log("fecha inicio: ", dateRange.startDate, "fecha final:", dateRange.endDate)
  return (
    <>
      <HeaderLoginComponent Button={false} />
      <div style={{display: 'flex', justifyContent: 'space-around', padding:20}}>
        <TextSemiBoldComponent text="SuperApp" size={30} weight="700" />
        <DateRangeCalendar
            compact={true}
            onDateRangeChange={setDateRange}
          />
      </div>

      <section style={{ minHeight: "70vh" }}>
        <DashboardComponent startDate={dateRange.startDate?.toISOString().split("T")[0]} endDate={dateRange.endDate?.toISOString().split("T")[0]} />
      </section>
      <FooterCompoent />
    </>
  );
};

export default Dashboard;
