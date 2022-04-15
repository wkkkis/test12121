import React, { useCallback, useState } from "react";

//Style
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";

//Interfaces
import { IContactsItem } from "../Contacts.type";

//Components
import { Button, Typography } from "@material-ui/core";
import SpinnerLoad from "../../SpinnerLoad";
import ModalItem from "../../Modal";
import { ContactsStore } from "../../../store/contacts/contacts";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: "flex",
            width: "100%",
            gap: theme.spacing(5),
            alignItems: "center",
        },
    })
);

const ContactsItem: React.FC<IContactsItem> = ({ id, name, number, idx }) => {
    const classes = useStyles();
    const [contactsStore] = useState(ContactsStore);
    const [loaded, setLoaded] = useState(true);

    const edit = useCallback(async (data: any) => {
        setLoaded(false);

        await contactsStore.editContact(id, data);

        setLoaded(true);
    }, []);

    return name ? (
        <div className={classes.root}>
            <Typography>{idx ? idx + 1 : 1}</Typography>
            <Typography>{name}</Typography>
            <Typography>{number}</Typography>
            <ModalItem callBack={edit} text="Изменить" />
            <Button variant="contained" color="secondary">
                Удалить
            </Button>
        </div>
    ) : (
        <SpinnerLoad />
    );
};

export default ContactsItem;
