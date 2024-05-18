import { Outlet } from "react-router-dom";
import { SideNav } from "../../../SideNav/components/SideNav/SideNav";
import { ToastList } from "../Toast/ToastList";

export const RootOverlay = () => {
    
    return (
        <>
            <ToastList/>
            <SideNav />
            <Outlet/>
        </>
    );
};
