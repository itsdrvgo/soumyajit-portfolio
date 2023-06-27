import { HTMLAttributes } from "react";
import { Icons } from "../icons/icons";

interface PageProps extends HTMLAttributes<HTMLElement> { }

function Maintenance({ className }: PageProps)  {
    return (
        <div className="h-full bg-black w-full flex justify-center items-center">
            <div className="flex flex-col gap-4 justify-center items-center absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full p-10">
                <Icons.construction className="text-white h-20 w-20" />
                <div className="flex flex-col items-center justify-center gap-2 text-center w-full">
                    <p className="text-3xl font-bold">Work in progress...</p>
                    <p className="text-gray-400">Something special is cooking up, please wait until we finish it.</p>
                </div>
            </div>
        </div>
    );
};

export default Maintenance;