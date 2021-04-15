import React from 'react';
import { Grid, Header, Icon, Image } from 'semantic-ui-react';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    return (
      <div className="code-landing-background" >
        <Grid divided='vertically' id='landing-page' verticalAlign='middle' textAlign='center' container>
          <Grid.Row columns={2}>
            <Grid.Column width={10}>
              <Image src="https://res.cloudinary.com/practicaldev/image/fetch/s--_kKDUKi9--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/i/j5axzkjkrhfvicea7uin.jpg"/>
            </Grid.Column>
            <Grid.Column width={8}>
              <Header as='h1' inverted>Welcome to UH Code Submissions!</Header>
              <Header as='h4' inverted>A platform to prepare for technical interviews with challenging problems and quick feedback.</Header>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={3}>
            <Grid.Column textAlign='center'>
              <Icon size="huge" name="search" inverted></Icon>
              <Header as='h2' inverted>Search for Problems</Header>
              <Header as='h3' inverted></Header>
            </Grid.Column>
            <Grid.Column textAlign='center'>
              <Icon size="huge" name="pencil" inverted></Icon>
              <Header as='h2' inverted>Write Solutions</Header>
              <Header as='h3' inverted></Header>
            </Grid.Column>
            <Grid.Column textAlign='center'>
              <Icon size="huge" name="file alternate" inverted></Icon>
              <Header as='h2' inverted>Get Immediate Feedback</Header>
              <Header as='h3' inverted></Header>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>

    );
  }
}

export default Landing;
