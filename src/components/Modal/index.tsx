import React, { SyntheticEvent, useState } from "react";

//Styles
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

//Compopents
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

//Interfaces
import { IModal } from "./Modal.type";
import { useForm } from "react-hook-form";
import Field from "../Field";
import { Button, Typography } from "@material-ui/core";
import SpinnerLoad from "../SpinnerLoad";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        modal: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
        },
        paper: {
            backgroundColor: theme.palette.background.paper,
            boxShadow: theme.shadows[2],
            padding: theme.spacing(2, 4, 3),
            borderRadius: 5,
        },
        form: {
            display: "flex",
            flexDirection: "column",
            gap: theme.spacing(3),
        },
    })
);

//@ts-ignore
const ModalItem: React.FC<IModal> = ({ callBack, color = "primary", text }) => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [loaded, setLoaded] = useState<boolean>(true);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm();

    const onChangeHandler = (
        ev: SyntheticEvent<HTMLTextAreaElement | HTMLInputElement>
    ) => {
        setValue(ev.currentTarget.name, ev.currentTarget.value);
    };

    const onSubmitHandler = async (data: Record<string, string>) => {
        //@ts-ignore
        callBack(data as any);
    };

    const showError = (type: string) => {
        switch (errors[type] && errors[type].type) {
            case "minLength":
                return "Введите больше 1 символа";
            case "maxLength":
                return "Введите меньше 50 символов";
            case "required":
                return "Поле обязательно";
            default:
                return null;
        }
    };

    return (
        <div>
            <Button
                variant="contained"
                //@ts-ignore
                color={color}
                onClick={handleOpen}
            >
                {text}
            </Button>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <div className={classes.paper}>
                        <form
                            className={classes.form}
                            onSubmit={handleSubmit(onSubmitHandler)}
                            noValidate
                            autoComplete="off"
                        >
                            <Field
                                label="Имя"
                                {...register("name", {
                                    required: true,
                                    maxLength: 50,
                                })}
                                onChange={onChangeHandler}
                            />
                            {errors.name && (
                                <Typography color="secondary">
                                    {showError("name")}
                                </Typography>
                            )}
                            <Field
                                label="Номер"
                                {...register("number", {
                                    required: true,
                                    maxLength: 50,
                                })}
                                onChange={onChangeHandler}
                            />
                            {errors.number && (
                                <Typography color="secondary">
                                    {showError("number")}
                                </Typography>
                            )}
                            <Button
                                variant="contained"
                                color="primary"
                                type="submit"
                            >
                                {!loaded ? <SpinnerLoad /> : "Войти"}
                            </Button>
                        </form>
                    </div>
                </Fade>
            </Modal>
        </div>
    );
};

export default ModalItem;
