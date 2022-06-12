import { useRouter } from "next/router";
import { MainLayout } from "../../src/components/pages/MainLayout";
import { EventDetail } from "../../src/components/sections/EventDetail";

function A() {
  const router = useRouter();
  const {
    query: { eventId },
  } = router;

  return <MainLayout children={<EventDetail eventId={eventId as string} />} />;
}

export default A;
