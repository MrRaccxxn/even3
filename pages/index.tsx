import type { NextPage } from "next";
import { HomePage } from "../src/components/pages/HomePage";
import { MainLayout } from "../src/components/pages/MainLayout";

const Home: NextPage = () => {
  return (
    <MainLayout>
      <HomePage />
    </MainLayout>
  );
};

export default Home;
