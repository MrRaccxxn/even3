import { SubmitHandler, useForm } from 'react-hook-form';
import { Container } from '../../../components/Layout/Container';
import Layout from "../../../components/Layout/Layout";
import { RegisterEventForm } from './components/RegisterEventForm';


type FormValues = {
  example: string,
  exampleRequired: string,
};

export const RegisterEvent = () => {
  const registerUseForm = useForm<FormValues>();
  const onSubmit: SubmitHandler<FormValues> = data => {
    alert(data)
    console.log(data)
  }

  return (
    <Layout>
      <Container>
        <RegisterEventForm form={registerUseForm} onSubmit={onSubmit} />
      </Container>
    </Layout >
  );
};
