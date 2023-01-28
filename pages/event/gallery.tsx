import { Footer } from 'flowbite-react';
import type { NextPage } from 'next';
import { Header } from 'src/components/Layout/Header';
import { EventsGallery } from 'src/pages/event/EventsGallery';
import { ContainerX } from '../../src/components/Layout/Container';

const EventsGalleryPage: NextPage = () => {
    return (
        <>
            <div className='h-screen flex flex-col w-full'>
                <Header />
                <ContainerX>
                    <EventsGallery />
                </ContainerX>
            </div>
            <ContainerX><Footer /></ContainerX>
        </>
    );
};

export default EventsGalleryPage;
