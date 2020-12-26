import React, { useEffect, useState } from "react";
import Loading from "../components/Loading";
import { makeStyles } from "@material-ui/core/styles";
import { dbService } from "../fbase";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "auto",
    textAlign: "center",
  },
  img: {
    marginTop: "50px",
    width: "300px",
    height: "auto",
  },
}));

function numberPad(n, width) {
  n = n + "";
  return n.length >= width ? n : new Array(width - n.length + 1).join("0") + n;
}

const Admin = () => {
  const [loading, setLoading] = useState(true);
  const [pickers, setPickers] = useState([]);
  const classes = useStyles();

  const updateBibleNumber = () => {
    dbService
      .collection("picks")
      .orderBy("createdAt", "asc")
      .onSnapshot((snapshot) => {
        const nowPickers = snapshot.docs.map((doc, index) => ({
          id: index,
          ...doc.data(),
        }));
        setPickers(nowPickers);
        setLoading(false);
      });
  };

  useEffect(() => {
    updateBibleNumber();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      {pickers.map((picker) => {
        const fileName = "202100" + numberPad(picker.id + 1, 3) + ".png";
        return (
          <div className={classes.root} key={picker.id}>
            <div>{fileName}</div>
            <div>{picker.name}</div>
          </div>
        );
      })}
    </>
  );
};

export default Admin;
