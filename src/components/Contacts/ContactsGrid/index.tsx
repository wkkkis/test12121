import React from "react";

//Style
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";

//Interfaces
import { IContactsGrid } from "../Contacts.type";

//Components
import SpinnerLoad from "../../SpinnerLoad";
import ContactsItem from "../ContactsItem";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: "flex",
            flexDirection: "column",
            paddingTop: theme.spacing(2),
            width: "100%",
            height: "100%",
            gap: theme.spacing(2),
        },
    })
);

const ContactsGrid: React.FC<IContactsGrid> = ({ data }) => {
    const classes = useStyles();

    return data ? (
        <div className={classes.root}>
            {data.map((e, idx: number) => {
                const obj = {
                    ...e,
                    idx,
                };
                return <ContactsItem key={idx} {...obj} />;
            })}
        </div>
    ) : (
        <SpinnerLoad />
    );
};

export default ContactsGrid;
