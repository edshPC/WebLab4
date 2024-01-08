import React from 'react';
import ReactDOM from 'react-dom/client';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import './main.css';
import MainAppFetcher, {LoadResults} from "./main/MainAppFetcher";
import LoginApp from "./login/LoginApp";
import Header from "./Header";

const router = createBrowserRouter([{
    path: "/",
    element: <Header/>,
    children: [{
        index: true,
        element: <LoginApp/>
    },
        {
            path: "main",
            element: <MainAppFetcher/>,
            loader: LoadResults
        }]
}]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<RouterProvider router={router}/>);
