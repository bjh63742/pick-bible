import React, { useRef, useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { Helmet } from "react-helmet";
import { AppString } from "../defin";
import backGround from "../assets/img/back.png";

const useStyles = makeStyles((theme) => ({
  containerPadding: {
    marginTop: "30%",
    width: "100%",
  },
  inner: {
    paddingTop: `calc(100%/2479*2200)`,
    backgroundImage: `url("${backGround}")`,
    backgroundSize: "cover",
    position: "relative",
  },
  content: {
    position: "absolute",
    top: 0,
    left: 0,
    color: "white",
    width: "100%",
  },
  form: {
    width: "60%", // Fix IE 11 issue.
    margin: "auto",
    color: "white",
    fontFamily: "NanumSquare",
  },
  submit: {
    margin: "auto",
    textAlign: "center",
    backgroundColor: "white",
    opacity: "0.5",
    width: "40%",
    color: "black",
    fontFamily: "NanumSquare",
  },
  titleContainer: {
    textAlign: "center",
    marginTop: "60px",
  },
  title: {
    color: "white",
    fontSize: "25px",
    fontFamily: "NanumSquare",
    fontWeight: 800,
    lineHeight: "29px",
  },
  font: {
    fontFamily: "NanumSquare",
    color: "white",
  },
  cssLabel: {
    color: "white",
  },
  cssOutlinedInput: {
    "&$cssFocused $notchedOutline": {
      borderColor: `white !important`,
    },
  },
  notchedOutline: {
    borderWidth: "1px",
    borderColor: "white !important",
  },
  btnContainer: {
    marginTop: "10px",
    display: "flex",
    justifyContent: "center",
  },
  copyRight: {
    position: "absolute",
    bottom: 0,
    color: "white",
    marginBottom: "10px",
    margin: "auto",
    textAlign: "center",
    fontSize: "13px",
    fontFamily: "NanumSquare",
    fontWeight: "700",
  },
}));

const helperTextStyles = makeStyles((theme) => ({
  root: {
    margin: 4,
    marginTop: "11px",
    fontSize: "11px",
    lineHeight: "12px",
    fontFamily: "NanumSquare",
    "&$error": {
      color: "white",
    },
  },
  error: {
    color: "white",
    fontSize: "11px",
    lineHeight: "12px",
    fontFamily: "NanumSquare",
  },
}));

export default function Login({ handleName }) {
  const classes = useStyles();
  const inputName = useRef(null);
  const [err, setErr] = useState(false);
  const helperTestClasses = helperTextStyles();

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
    <div className={classes.containerPadding}>
      <div className={classes.inner}>
        <div className={classes.content}>
          <Helmet>
            <title>{AppString.title}</title>
          </Helmet>
          <div className={classes.titleContainer}>
            <Typography className={classes.title}>2021년</Typography>
            <Typography className={classes.title}>내게 주신 말씀</Typography>
          </div>
          <form className={classes.form} noValidate onSubmit={onSubmitLogin}>
            <TextField
              error={err}
              variant="outlined"
              margin="normal"
              size="small"
              required
              fullWidth
              id="name"
              label="이름"
              name="name"
              FormHelperTextProps={{ classes: helperTestClasses }}
              InputLabelProps={{
                classes: {
                  root: classes.cssLabel,
                  focused: classes.cssFocused,
                },
              }}
              InputProps={{
                classes: {
                  root: classes.cssOutlinedInput,
                  focused: classes.cssFocused,
                  notchedOutline: classes.notchedOutline,
                },
              }}
              className={classes.font}
              inputRef={inputName}
              helperText={`이름은 두글자 이상으로 한사람당 한번만 입력해 주시고 나오는 말씀은 바로 저장해 주세요`}
            />
            <div className={classes.btnContainer}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                확인
              </Button>
            </div>
          </form>
        </div>
        <div className={classes.btnContainer}>
          <Typography className={classes.copyRight}>
            물댄동산 수림교회
          </Typography>
        </div>
      </div>
    </div>
  );
}
