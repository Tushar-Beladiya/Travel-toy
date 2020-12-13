import { Switch, Route } from "react-router-dom";
import React from "react";
import Login from "../components/user/Login";
import NewQuiz from "../components/newQuiz/NewQuiz";
import Home from '../components/layout/home/Home';
import ProfileResp from '../components/profile/ProfileResp/ProfileResp';
import VideoPage from '../components/video/VideoPage';
import PrivateRoute from "./PrivateRoute";

export default (
  <Switch>
    <Route exact path="/" component={Home} />
    <PrivateRoute path="/profile" component={ProfileResp} exact></PrivateRoute>
    <Route path="/login" component={Login} />
    <Route path="/quiz" component={NewQuiz} />
    <Route path="/video" component={VideoPage} />
  </Switch>
);
