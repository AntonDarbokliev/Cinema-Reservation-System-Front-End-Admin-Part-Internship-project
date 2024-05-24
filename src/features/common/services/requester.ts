import { store } from "../../../store/store";
import { addToast, removeToast } from "../../../store/toast/toastSlice";
import { v4 as uuidv4 } from "uuid";
import { router } from "../components/RouteComponent/RouteComponent";

interface RequestProps {
    method: "GET" | "POST" | "DELETE" | "PUT" | "PATCH";
    url: string;
    data?: object;
}

interface Options {
    headers: {
        "Content-Type"?: string;
        Authorization?: string;
    };
    body?: object | string;
    method: "GET" | "POST" | "DELETE" | "PUT" | "PATCH";
}

interface ExceptionResponse {
    statusCode: number;
    error: string;
    message: string[] | string;
}
const request = async ({ method, url, data }: RequestProps) => {
    const options: Options = {
        headers: {},
        method,
    };

    if (!url.includes("login")) {
        const token = localStorage.getItem("token");
        options.headers["Authorization"] = `Bearer ${token}`;
    }

    if (data) {
        options.body = JSON.stringify(data);
        options.headers["Content-Type"] = "application/json";
    }

    const response = await fetch(url, options);

    if (!response.ok) {
        const responseObj: ExceptionResponse = await response.json();
        const id = uuidv4();

        if (typeof responseObj.message == "object") {
            responseObj.message.forEach((m) => store.dispatch(addToast({ text: m, type: "danger", id })));
        } else {
            store.dispatch(addToast({ text: responseObj.message, type: "danger", id }));
        }

        setTimeout(() => {
            store.dispatch(removeToast(id));
        }, 5000);
    }

    if (response.status === 204) {
        return {};
    }

    if (response.status === 401) {
        await router.navigate("/login");
    }

    return response.json();
};

export const RequestFactory = () => {
    const getRequest = (url: string) => request({ method: "GET", url });
    const postRequest = (url: string, data: object) => request({ method: "POST", url, data });
    const deleteRequest = (url: string) => request({ method: "DELETE", url });
    const putRequest = (url: string, data: object) => request({ method: "PUT", url, data });
    const patchRequest = (url: string, data: object) => request({ method: "PATCH", url, data });

    return {
        get: getRequest,
        post: postRequest,
        delete: deleteRequest,
        put: putRequest,
        patch: patchRequest,
    };
};
