import { NextPage } from 'next';
import Head from 'next/head';
import TaskBoard from '../components/TaskBoard';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Task Board</title>
      </Head>
      <TaskBoard />
    </>
  );
};

export default Home;
