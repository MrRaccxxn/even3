import { MainLayout } from "../../src/components/pages/MainLayout";
import { EventList } from "../../src/components/sections/EventList";

function MyEvents() {
  return <MainLayout children={<EventList />} />;
}

export default MyEvents;
