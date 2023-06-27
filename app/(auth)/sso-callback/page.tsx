import SSOCallbackRedirect from "@/components/auth/sso-callback";
import { HandleOAuthCallbackParams } from "@clerk/types";

export const runtime = "edge";

export interface SSOCallbackPageProps {
    searchParams: HandleOAuthCallbackParams
}

function SSOCallback({ searchParams }: SSOCallbackPageProps) {
    return (
        <>
            <div className="min-h-[calc(100vh-5rem)] container max-w-[55rem] grid items-center gap-8 pb-8 pt-6 md:py-8">
                <SSOCallbackRedirect searchParams={searchParams} />
            </div>
        </>
    );
}

export default SSOCallback;