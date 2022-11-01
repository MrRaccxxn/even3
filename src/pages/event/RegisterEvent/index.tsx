import { Container } from '../../../components/Layout/Container';
import Layout from "../../../components/Layout/Layout";
import { RegisterEventForm } from './components/RegisterEventForm';


type FormValues = {
  example: string,
  exampleRequired: string,
};

export const RegisterEvent = () => {
  return (
    <Layout>
      <Container>
        <RegisterEventForm />
      </Container>
    </Layout >
  );
};
