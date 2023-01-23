import { Modal } from "flowbite-react";
import { useRouter } from "next/router";
import { BsFacebook, BsTwitter } from 'react-icons/bs';
import { HiOutlineMail } from 'react-icons/hi';

interface SocialMediaData {
    outlet: string,
    label: string,
    icon: any,
    url: string,
    color: string
}

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const ShareEventModal = ({ open, onClose, eventTitle }: { open: boolean, onClose: () => void, eventTitle: string }) => {
    if (!open) return <></>

    const router = useRouter()

    const socialMediaShareData: SocialMediaData[] = [
        {
            outlet: 'Twitter',
            label: 'Share on Twitter',
            icon: <BsTwitter />,
            url: `https://twitter.com/intent/tweet?url=${baseUrl + router.asPath}&text=Join%20with%20me%20to%20${eventTitle.replace(/ /g, '%20') + '👀!'}&via=_even3`,
            color: ''
        },
        {
            outlet: 'Facebook',
            label: 'Share on Facebook',
            icon: <BsFacebook />,
            url: `https://www.facebook.com/sharer.php?u=${baseUrl + router.asPath}`,
            color: ''
        },
        {
            outlet: 'Email',
            label: 'Share via Email',
            icon: <HiOutlineMail />,
            url: `mailto:?subject=${eventTitle.replace(/ /g, '%20')}&body=${baseUrl + router.asPath}%20Check%20out%20this%20new%20event!`,
            color: ''
        }
    ]


    return (
        <div className="">
            <Modal
                show={open}
                size="md"
                color="blue"
                popup={true}
                onClose={onClose}
                position={'center'}
                className='bg-black h-screen overflow-hidden pt-72 sm:p-0 '
            >
                <Modal.Header />
                <Modal.Body>
                    <div className="flex flex-col text-center ">
                        <h2 className="mb-5 font-semibold text-black">
                            Share this event! 🚀
                        </h2>

                        <p className="pb-4">{eventTitle}</p>

                        <div className="flex flex-col gap-3 items-center">
                            {
                                socialMediaShareData.map((item: any) =>
                                    <a href={item.url} target='_blank' className="hover:bg-hoverButtonText p-2 px-4 rounded-lg">
                                        <div className="w-full flex flex-row items-center gap-2">
                                            <p className="text-xl">{item.icon}</p>
                                            <p className="text-xl">{item.outlet}</p>
                                        </div>
                                    </a>
                                )
                            }
                        </div>
                        {/* <Tooltip content={'Click to copy'}>
                            <AiOutlineLink />
                            <input type={'text'} value=" https://even3.app/afsaf/safsafas" />
                        </Tooltip> */}
                    </div>
                </Modal.Body>
            </Modal >
        </div>
    );
}