import React, { useEffect, useState } from "react";
import "./App.css";
import Posts from "./components/Posts/Posts";
import axios from "./axios";
import { Container, AppBar, Typography, Grow, Grid } from "@material-ui/core";
import likelion from "./images/likelion.png";
import Form from "./components/Form";
import useStyles from "./styles";
function App() {
  const [posts, setPosts] = useState([]);
  const [currentId, setCurrentId] = useState(null);
  const classes = useStyles();
  const fetchBlog = async () => {
    await axios.get("/blog/fetch").then((res) => {
      console.log("data", res.data);
      setPosts(res.data);
    });
  };

  useEffect(() => {
    console.log("into useEffect");
    fetchBlog();
  }, []);

  return (
    <>
      {" "}
      <div className="App">
        <Container maxWidth="lg">
          <AppBar className={classes.appBar} position="static" color="inherit">
            <Typography className={classes.heading} variant="h2" align="center">
              Blog App
            </Typography>
            <img
              className={classes.image}
              src={likelion}
              alt="icon"
              height="60"
            />
          </AppBar>
          <Grow in>
            <Container>
              <Grid
                className={classes.mainContainer}
                container
                justify="space-between"
                alignItems="stretch"
                spacing={3}
              >
                <Grid item xs={12} sm={7}>
                  <Posts posts={posts} setCurrentId={setCurrentId} />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Form
                    posts={posts}
                    currentId={currentId}
                    setCurrentId={setCurrentId}
                  />
                </Grid>
              </Grid>
            </Container>
          </Grow>
        </Container>
      </div>
    </>
  );
}

export default App;
