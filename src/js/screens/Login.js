import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Cover from 'react-video-cover';


import Split from 'grommet/components/Split';
import Sidebar from 'grommet/components/Sidebar';
import LoginForm from 'grommet/components/LoginForm';
import Article from 'grommet/components/Article';
import Section from 'grommet/components/Section';
import Heading from 'grommet/components/Heading';
import Paragraph from 'grommet/components/Paragraph';
import Footer from 'grommet/components/Footer';
import Logo from 'grommet/components/icons/Grommet';

import { login } from '../actions/session';
import { navEnable } from '../actions/nav';
import { pageLoaded } from './utils';

class Login extends Component {
  constructor() {
    super();
    this._onSubmit = this._onSubmit.bind(this);
  }

  componentDidMount() {
    pageLoaded('Login');
    this.props.dispatch(navEnable(false));
  }

  componentWillUnmount() {
    this.props.dispatch(navEnable(true));
  }

  _onSubmit(fields) {
    const { dispatch } = this.props;
    const { router } = this.context;

    router.history.push('/dashboard');
  }

  render() {
    const { session: { error } } = this.props;

    const videoOptions = {
      src: 'https://s3.amazonaws.com/tronwallet-assets/Office+Background+Video+HD.mp4',
      autoPlay: true,
      loop: true,
    };

    return (
      <Split flex='left' separator={true}>

        <Article>
          <Section
            full={true}
            style={{ padding: 0, zIndex: 1 }}
            colorIndex='black'
            pad='large'
            justify='center'
            align='center'
          >
            <Cover
              videoOptions={videoOptions}
              remeasureOnWindowResize
              style={{ zIndex: 1 }}
            >
              <Paragraph align='center' size='large'>
                Development with Grommet is cool.
              </Paragraph>
            </Cover>
          </Section>
        </Article>

        <Sidebar justify='between' align='center' pad='none' size='large'>
          <span />
          <LoginForm
            align='start'
            logo={<Logo className='logo' colorIndex='brand' />}
            title='Webcrawler'
            onSubmit={this._onSubmit}
            errors={[error]}
            usernameType='text'
          />
          <Footer
            direction='row'
            size='small'
            pad={{ horizontal: 'medium', vertical: 'small' }}
          >
            <span className='secondary'>&copy; 2018 Infnet Labs</span>
          </Footer>
        </Sidebar>

      </Split>
    );
  }
}

Login.defaultProps = {
  session: {
    error: undefined
  }
};

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  session: PropTypes.shape({
    error: PropTypes.string
  })
};

Login.contextTypes = {
  router: PropTypes.object.isRequired,
};

const select = state => ({
  session: state.session
});

export default connect(select)(Login);
