import React from 'react';
import ReactDOM from 'react-dom/client';
import {createBrowserRouter, Navigate, RouterProvider} from "react-router-dom";
import './main.css';
import MainAppFetcher, {LoadResults} from "./main/MainAppFetcher";
import LoginAppFetcher from "./login/LoginAppFetcher";
import Header from "./Header";

const router = createBrowserRouter([{
    path: "/",
    element: <Header/>,
    children: [{
        index: true,
        element: <LoginAppFetcher/>
    },
        {
            path: "main",
            element: <MainAppFetcher/>,
            loader: LoadResults
        },
        {
            path: "*",
            element: <Navigate to="./" relative />
        }]
}]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<RouterProvider router={router}/>);
