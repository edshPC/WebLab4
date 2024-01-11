import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Header from "./Header";
import LoginAppFetcher, {getLogin} from "./login/LoginAppFetcher";
import MainAppFetcher, {LoadResults} from "./main/MainAppFetcher";
import React from "react";

export default function Routed(props) {

    const router = createBrowserRouter([{
        path: "WebLab4",
        element: <Header/>,
        children: [{
            index: true,
            element: <LoginAppFetcher/>,
            loader: getLogin
        },
            {
                path: "main",
                element: <MainAppFetcher/>,
                loader: LoadResults
            }]
    }]);

    return <RouterProvider router={router}/>;
}
