import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Img } from "react-image";
import { dbService } from "../fbase";
import { Helmet } from "react-helmet";
import { AppString, baseUrl } from "../defin";
import Loading from "./Loading";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "white",
    fontFamily: "NanumSquare",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: "#F22929",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    fontFamily: "NanumSquare",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: "#00A8E0",
    fontFamily: "NanumSquare",
  },
  title: {
    color: "#00A8E0",
    fontFamily: "NanumSquare",
    fontWeight: "500",
  },
  img: {
    width: "100%",
  },
  nameTitle: {
    marginTop: "5px",
    color: "rgba(0, 0, 0, 0.75)",
    fontWeight: "500",
    fontFamily: "NanumSquare",
  },
  subTitle: {
    fontSize: "20px",
    marginTop: "15px",
    textAlign: "center",
    fontFamily: "NanumSquare",
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
        const findpicker = nowPickers.find((picker) => picker.name === name);
        if (findpicker !== undefined) {
          setBibleNumber(findpicker.id + 1); // 0 부터 시작하므로
          setIsPick(true);
        }
        setLoading(false);
      });
  };

  useEffect(() => {
    updateBibleNumber();
    // eslint-disable-next-line
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

  const reflesh = () => {
    window.location.replace("https://bjh63742.github.io/pick-bible");
  };

  if (loading) {
    return <Loading />;
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
        <Typography className={classes.subTitle}>
          이미지를 길게 눌러 저장해 주세요
        </Typography>
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
          <Typography component="h1" variant="h5" className={classes.nameTitle}>
            {name}
          </Typography>
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
