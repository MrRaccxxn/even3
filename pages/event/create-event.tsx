import { MainLayout } from "../../src/components/pages/MainLayout";
import { NewEventForm } from "../../src/components/sections/NewEventForm";

function CreateEvent() {
  return <MainLayout children={<NewEventForm />} />;
}

export default CreateEvent;
