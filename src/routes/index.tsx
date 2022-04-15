import React from "react";
import { Route, Routes } from 'react-router-dom'

//Pages
import Auth from "../pages/AuthPage/Auth";
import Main from "../pages/MainPage/Main";

//Layouts
import MainLayout from "../layouts/MainLayout";
import AuthLayout from "../layouts/AuthLayout";

//Router
import { router } from "../utils/router";

type AppRouteLayout = "main" | "auth";

interface AppRoute {
    url: string;
    layout: AppRouteLayout;
    component: React.FC;
    className?: string;
    title?: string;
}

const allRoutes: AppRoute[] = [
    {
        url: router.main,
        component: Main,
        layout: "main",
        className: "main",
        title: "Главная страница",
    },
    {
        url: router.auth,
        component: Auth,
        layout: "auth",
        className: "auth",
        title: "Страница входа",
    },
];

export const AppRoutes: React.FC = () => {
    return (
        <Routes>
            {
                allRoutes.map((route) => {
                    let routeInner: React.ReactNode

                    switch(route.layout) {
                        case 'main':

                            routeInner = (
                                <MainLayout     
                                    key={route.url} 
                                >
                                    <route.component />
                                </MainLayout>
                            )

                            break
                        case 'auth':

                            routeInner = (
                                <AuthLayout 
                                    key={route.url}
                                >
                                    <route.component />
                                </AuthLayout>
                            )

                            break
                        default:
                            break
                    }

                    return (
                        <Route 
                            path={route.url}
                            element={routeInner}
                            key={route.url}
                        />
                    )
                })
            }
        </Routes>
    )
}
