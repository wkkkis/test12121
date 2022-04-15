import React, { useCallback, useEffect, useState } from "react";

//Router
import { useNavigate } from "react-router";
import ContactsGrid from "../../components/Contacts/ContactsGrid";

//Hooks
import { useTitle } from "../../hooks";
import { useLocaleStorage } from "../../hooks/useLocalStorage";

//Store
import { ContactsStore } from "../../store/contacts/contacts";

//Components
import { Typography, Button } from "@material-ui/core";

//Style
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import ModalItem from "../../components/Modal";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            paddingTop: theme.spacing(4),
            display: "flex",
            justifyContent: "center",
        },
        header: {
            display: "flex",
            justifyContent: "space-between",
            gap: theme.spacing(3),
        },
    })
);

const Main = () => {
    const [contactsStore] = useState(ContactsStore);
    const { rename } = useTitle();
    const [loaded, setLoaded] = useState<boolean>(true);
    const classes = useStyles();

    const fetchContacts = async () => {
        setLoaded(false);

        await contactsStore.fetchContacts();

        setLoaded(true);
    };

    useEffect(() => {
        rename("Главная");
        fetchContacts();
    }, []);

    const add = useCallback(async (data: any) => {
        setLoaded(false);

        await contactsStore.addContact(data);
        await contactsStore.fetchContacts();

        setLoaded(true);
    }, []);

    return (
        <div className={classes.root}>
            <div>
                <div className={classes.header}>
                    <Typography variant="h6">Контакты</Typography>
                    <ModalItem callBack={add} text="Добавить" />
                </div>
                <ContactsGrid data={contactsStore.data && contactsStore.data} />
            </div>
        </div>
    );
};

export default Main;
