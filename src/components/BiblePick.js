import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Img } from "react-image";
import { dbService, storageService } from "../fbase";
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
  img: {
    width: "100%",
  },
}));

const BiblePick = ({ name }) => {
  const classes = useStyles();
  const [isPick, setIsPick] = useState(false);
  //const [imgUrl, setImageUrl] = useState("");

  // useEffect(() => {
  //   async function fetchData() {
  //     const pathReference = await storageService
  //       .ref("sample.png")
  //       .getDownloadURL();
  //     setImageUrl(pathReference);
  //   }
  //   fetchData();
  // }, []);

  const handleClick = () => {
    setIsPick(true);
  };

  const download = () => {
    console.log("down");
    var xhr = new XMLHttpRequest();
    xhr.responseType = "blob";
    xhr.onload = function (event) {
      var blob = xhr.response;
      console.log(blob);
      const blobUrl = URL.createObjectURL(blob);

      // Create a link element
      const link = document.createElement("a");

      // Set link's href to point to the Blob URL
      link.href = blobUrl;
      link.download = `2021년 ${name} 의 말씀.png`;
      // Append link to the body
      document.body.appendChild(link);
      link.click();
    };
    xhr.open("GET", "https://bjh63742.github.io/pick-bible/img/sample.png");
    xhr.send();
  };

  const reflesh = () => {
    window.location.replace("/");
  };

  if (isPick) {
    return (
      <Container component="main" maxWidth="xs">
        <Helmet>
          <title>{AppString.title}</title>
        </Helmet>
        <Img
          src="https://bjh63742.github.io/pick-bible/img/sample.png"
          className={classes.img}
        />
        <Button
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={download}
        >
          저장
        </Button>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={reflesh}
        >
          처음으로
        </Button>
      </Container>
    );
  } else {
    return (
      <Container component="main" maxWidth="xs">
        <Helmet>
          <title>{AppString.title}</title>
        </Helmet>
        <div className={classes.paper}>
          <Typography component="h1" variant="h4" className={classes.title}>
            {AppString.title}
          </Typography>
          <Typography className={classes.title}>{name}</Typography>
          <div>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={handleClick}
            >
              말씀 받기
            </Button>
          </div>
        </div>
      </Container>
    );
  }
};

export default BiblePick;
