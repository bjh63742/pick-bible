import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Image from "material-ui-image";
import { dbService } from "../fbase";
import { Helmet } from "react-helmet";
import { AppString, baseUrl } from "../defin";
import Loading from "./Loading";
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
  titleContainer: {
    textAlign: "center",
    marginTop: "60px",
  },
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
    margin: "auto",
    textAlign: "center",
    backgroundColor: "white",
    opacity: "0.5",
    width: "30%",
    color: "black",
    fontFamily: "NanumSquare",
    fontWeight: "900",
  },
  submitFirst: {
    marginTop: "20px",
    marginBottom: "20px",
    textAlign: "center",
    backgroundColor: "black",
    opacity: "0.5",
    width: "30%",
    color: "white",
    fontFamily: "NanumSquare",
  },
  title: {
    color: "white",
    fontSize: "25px",
    fontFamily: "NanumSquare",
    fontWeight: 800,
    lineHeight: "29px",
  },
  name: {
    marginTop: "45px",
    marginBottom: "50px",
    color: "black",
    fontSize: "30px",
    fontFamily: "NanumSquare",
    fontWeight: 800,
    lineHeight: "29px",
  },
  img: {
    width: "100%",
    height: "auto",
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
  btnContainer: {
    marginTop: "10px",
    display: "flex",
    justifyContent: "center",
  },
  btnTestContainer: {
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

function numberPad(n, width) {
  n = n + "";
  return n.length >= width ? n : new Array(width - n.length + 1).join("0") + n;
}

const BiblePick = ({ name }) => {
  const classes = useStyles();
  const [isPick, setIsPick] = useState(false); // 뽑았는지 안뽑았는지
  const [bibleNumber, setBibleNumber] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setAdmin] = useState(false);
  const [pickers, setPickers] = useState([]);

  const updateBibleNumber = async () => {
    const querySnapshot = await dbService
      .collection("picks")
      .orderBy("createdAt", "asc")
      .get();
    console.log(querySnapshot);
    const nowPickers = querySnapshot.docs.map((doc, index) => ({
      id: index,
      ...doc.data(),
    }));
    if (name === "#1122#") {
      setPickers(nowPickers);
      setAdmin(true);
    } else {
      const findpicker = nowPickers.find((picker) => picker.name === name);
      if (findpicker !== undefined) {
        setBibleNumber(findpicker.id + 1); // 0 부터 시작하므로
        setIsPick(true);
      }
    }
    setLoading(false);
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

  if (isAdmin) {
    return (
      <Container component="main" maxWidth="xs">
        <Helmet>
          <title>{AppString.title}</title>
        </Helmet>
        {pickers.map((picker) => {
          const cardNubmer = (picker.id + 1) % 151;
          const fileName = "202100" + numberPad(cardNubmer, 3) + ".png";
          return (
            <>
              <Image
                src={`${baseUrl}/img/${fileName}`}
                className={classes.img}
                cover
                aspectRatio={729 / 1579}
              />
              <Typography className={classes.subTitle}>
                {picker.name}
              </Typography>
            </>
          );
        })}
        <Typography className={classes.subTitle}>
          이미지를 길게 눌러 저장해 주세요
        </Typography>
      </Container>
    );
  } else if (isPick) {
    const cardNubmer = bibleNumber % 151;
    const fileName = "202100" + numberPad(cardNubmer, 3) + ".png";
    return (
      <Container component="main" maxWidth="xs">
        <Helmet>
          <title>{AppString.title}</title>
        </Helmet>
        <Image
          src={`${baseUrl}/img/${fileName}`}
          className={classes.img}
          cover
          aspectRatio={729 / 1579}
        />
        <Typography className={classes.subTitle}>
          이미지를 길게 눌러 저장해 주세요
        </Typography>
        <div className={classes.btnTestContainer}>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submitFirst}
            onClick={reflesh}
          >
            처음으로
          </Button>
        </div>
      </Container>
    );
  } else {
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
              <Typography className={classes.name}>{name}</Typography>
            </div>
            <div className={classes.btnContainer}>
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
          <div className={classes.btnContainer}>
            <Typography className={classes.copyRight}>
              물댄동산 수림교회
            </Typography>
          </div>
        </div>
      </div>
    );
  }
};

export default BiblePick;
