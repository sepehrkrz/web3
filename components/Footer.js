import React from "react";
import { Menu } from "semantic-ui-react";
import { Link } from "../routes";
import { Container } from "semantic-ui-react";
export default () => {
  return (
    //An example of adding custom css to semantic-ui components
    <Container style={{ marginTop: "40px" }}>
      <h4 class="ui horizontal divider header">
        <i class="address card icon"></i>
        Developer Information
      </h4>
      <div class="ui list">
        <div class="item">
          <i class="users icon"></i>
          <div class="content">Sepehr Karimiziarani</div>
        </div>
        <div class="item">
          <i class="marker icon"></i>
          <div class="content">Tuscaloosa, AL</div>
        </div>
        <div class="item">
          <i class="mail icon"></i>
          <div class="content">
            <a href="mailto:mkarimiziarani@crimson.ua.edu">mkarimiziarani@crimson.ua.edu</a>
          </div>
        </div>
        <div class="item">
          <i class="linkify icon"></i>
          <div class="content">
            <a href="http://sepehr.people.ua.edu">sepehr.people.ua.edu</a>
          </div>
        </div>
      </div>
    </Container>
  );
};
