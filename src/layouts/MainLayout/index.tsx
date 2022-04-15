import React, { useEffect, useState } from "react";

//Components
import Header from "../../components/Header";
import Container from "@material-ui/core/Container";

//Interfaces
import { IMainLayout } from "./MainLayout.type";

//Store
import { UserStore } from "../../store/user/user";

//Hooks
import { useLocaleStorage } from "../../hooks/useLocalStorage";

//Router
import { useNavigate } from "react-router";

const MainLayout: React.FC<IMainLayout> = ({ children }) => {
    const navigate = useNavigate();
    const { get } = useLocaleStorage("token");
    const [userStore] = useState(UserStore);
    const [loaded, setLoaded] = useState<boolean>(true);

    const fetchUser = async (token: string) => {
        setLoaded(false);

        const res = await userStore.getById(token);
        console.log(res);

        setLoaded(true);
    };

    useEffect(() => {
        if (!get()) {
            navigate("/auth");
        }
        fetchUser(get() as string);
    }, []);

    return (
        <>
            <Header email={userStore.data.email && userStore.data.email} />
            <Container maxWidth="xl">{children}</Container>
        </>
    );
};

export default MainLayout;
