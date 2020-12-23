import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Img } from "react-image";
import { dbService } from "../fbase";
import { Helmet } from "react-helmet";
import { AppString, baseUrl } from "../defin";

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

function numberPad(n, width) {
  n = n + "";
  return n.length >= width ? n : new Array(width - n.length + 1).join("0") + n;
}

const BiblePick = ({ name }) => {
  const classes = useStyles();
  const [isPick, setIsPick] = useState(false); // 뽑았는지 안뽑았는지
  const [bibleNumber, setBibleNumber] = useState(0);
  const [loading, setLoading] = useState(true);

  const updateBibleNumber = () => {
    dbService
      .collection("picks")
      .orderBy("createdAt", "asc")
      .onSnapshot((snapshot) => {
        const nowPickers = snapshot.docs.map((doc, index) => ({
          id: index,
          ...doc.data(),
        }));
        console.log(nowPickers);
        const findpicker = nowPickers.find((picker) => picker.name === name);
        if (findpicker !== undefined) {
          setBibleNumber(findpicker.id + 1); // 0 부터 시작하므로
          setIsPick(true);
          console.log(findpicker);
        }
        setLoading(false);
      });
  };

  useEffect(() => {
    updateBibleNumber();
  }, []);

  // 말씀 뽑기
  const handleClick = async () => {
    const newPicker = {
      name: name,
      createdAt: Date.now(),
    };
    await dbService.collection("picks").add(newPicker);
    updateBibleNumber();
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
    xhr.open("GET", `${baseUrl}/img/sample.png`);
    xhr.send();
  };

  const reflesh = () => {
    window.location.replace("https://bjh63742.github.io/pick-bible");
  };

  if (loading) {
    return <div>Loading</div>;
  }

  if (isPick) {
    const cardNubmer = bibleNumber % 151;
    const fileName = "202100" + numberPad(cardNubmer, 3) + ".png";
    console.log(fileName);
    return (
      <Container component="main" maxWidth="xs">
        <Helmet>
          <title>{AppString.title}</title>
        </Helmet>
        <Img src={`${baseUrl}/img/${fileName}`} className={classes.img} />
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
