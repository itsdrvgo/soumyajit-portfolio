import NotificationBar from "@/src/components/global/notifications/notification-bar";
import About from "@/src/components/home/about";
import Landing from "@/src/components/home/landing";
import Music from "@/src/components/home/music";

function Page() {
    return (
        <>
            <NotificationBar />
            <Landing />
            <About />
            <Music />
        </>
    );
}

export default Page;
