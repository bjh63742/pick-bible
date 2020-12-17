import React, { useRef, useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Helmet } from "react-helmet";
import { AppString } from "../defin";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "white",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: "#F22929",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: "#00A8E0",
  },
  title: {
    color: "#00A8E0",
    fontFamily: "NotoSerifKR",
    fontWeight: "500",
  },
}));

export default function Login({ handleName }) {
  const classes = useStyles();
  const inputName = useRef(null);
  const [err, setErr] = useState(false);

  const onSubmitLogin = (event) => {
    event.preventDefault();
    const name = inputName.current.value.trim();
    if (name.length < 2 || name.length > 5) {
      setErr(true);
    } else {
    }
    handleName(name);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Helmet>
        <title>{AppString.title}</title>
      </Helmet>
      <div className={classes.paper}>
        <Typography component="h1" variant="h4" className={classes.title}>
          {AppString.title}
        </Typography>
        <form className={classes.form} noValidate onSubmit={onSubmitLogin}>
          <TextField
            error={err}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="name"
            label="이름"
            name="name"
            autoComplete="email"
            autoFocus
            inputRef={inputName}
            helperText={`이름은 두글자 이상으로 한사람당 한번만 입력해 주시고 나오는 말씀은 바로 저장해 주세요`}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            확인
          </Button>
        </form>
      </div>
    </Container>
  );
}
