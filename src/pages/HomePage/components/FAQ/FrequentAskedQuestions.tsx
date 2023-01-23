export const FrequentAskedQuestions = () => {
    return <section className="dark:bg-gray-800 dark:text-gray-100 mt-16">
        <div className="container flex flex-col justify-center p-4 mx-auto md:p-8">
            <p className="p-2 text-sm font-medium tracking-wider text-center uppercase">How it works</p>
            <h2 className="mb-12 text-4xl font-bold leading-none text-center sm:text-5xl">Frequently Asked Questions</h2>
            <div className="grid gap-10 md:gap-8 sm:p-3 grid-cols-2 md:grid-cols-1 lg:px-12 xl:px-32">
                <div>
                    <h3 className="font-semibold">Does even3 storage any of my personal data?</h3>
                    <p className="mt-1 dark:text-gray-400">For attendees, we only collect email address for event invitations and reminders. For event hosts, we collect additional information such as nickname and email address (provided by the google account) which is shared with attendees to improve the event experience.</p>
                </div>
                <div>
                    <h3 className="font-semibold">How much does it cost?</h3>
                    <p className="mt-1 dark:text-gray-400">Our platform is designed to be a public good, and our team is dedicated to keeping it that way as much as possible. We strive to find sustainable solutions to maintain the platform free for our users in the future.</p>
                </div>
                <div>
                    <h3 className="font-semibold">Can I attende to an event without been registered?</h3>
                    <p className="mt-1 dark:text-gray-400">Yes, you can attend an event without being registered on our platform. All you need to do is provide an email address for the event invitation and reminders to be sent to. This way you can still attend the event without having to register for an account on our platform.</p>
                </div>
                <div>
                    <a href="https://www.youtube.com/watch?v=eAO5D2NQ7SQ" target={'_blank'}><h3 className="font-semibold" style={{ cursor: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='40' height='48' viewport='0 0 100 100' style='fill:black;font-size:24px;'><text y='50%'>❤️</text></svg>")  16 0,  auto` }}>Why you guys are so cool?</h3></a>
                    <p className="mt-1 dark:text-gray-400">We are dedicated to constantly improving our platform and making it accessible to a larger community. Our team is committed to providing a secure and enjoyable event experience for all users. We strive to make our platform user-friendly and constantly work to improve it to make it even more cool!s</p>
                </div>
            </div>
        </div>
    </section>
};