import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Anchor from 'grommet/components/Anchor';
import Tiles from 'grommet/components/Tiles';
import Tile from 'grommet/components/Tile';
import Image from 'grommet/components/Image';
import Article from 'grommet/components/Article';
import Box from 'grommet/components/Box';
import Header from 'grommet/components/Header';
import Heading from 'grommet/components/Heading';
import Label from 'grommet/components/Label';
import List from 'grommet/components/List';
import ListItem from 'grommet/components/ListItem';
import Notification from 'grommet/components/Notification';
import Paragraph from 'grommet/components/Paragraph';
import Value from 'grommet/components/Value';
import Meter from 'grommet/components/Meter';
import Spinning from 'grommet/components/icons/Spinning';
import { getMessage } from 'grommet/utils/Intl';

import NavControl from '../components/NavControl';
import {
  loadSites, unloadSites
} from '../actions/dashboard';

import { pageLoaded } from './utils';

class Dashboard extends Component {
  componentDidMount() {
    pageLoaded('Dashboard');
    this.props.dispatch(loadSites());
  }


  componentWillUnmount() {
    this.props.dispatch(unloadSites());
  }

  render() {
    const { error, tasks, sites } = this.props;
    const { intl } = this.context;

    let errorNode;
    let listNode;
    if (error) {
      errorNode = (
        <Notification
          status='critical'
          size='large'
          state={error.message}
          message='An unexpected error happened, please try again later'
        />
      );
    } else if (sites.length === 0) {
      listNode = (
        <Box
          direction='row'
          responsive={false}
          pad={{ between: 'small', horizontal: 'medium', vertical: 'medium' }}
        >
          <Spinning /><span>Loading...</span>
        </Box>
      );
    } else {
      const sitesNode = (sites || []).map(site => (
        <ListItem
          key={`task_${site._id}`}
          justify='between'
        >
          <Label><Anchor path={`/tasks/${site._id}`} label={site.name} /></Label>
          <Box
            direction='row'
            responsive={false}
            pad={{ between: 'small' }}
          >
            {/* <Value
              value={task.percentComplete}
              units='%'
              align='start'
              size='small'
            /> */}
            {/* <Meter value={task.percentComplete} /> */}
          </Box>
        </ListItem>
      ));

      listNode = (
        <List>
          {sitesNode}
        </List>
      );
    }

    return (
      <Article primary={true}>
        <Header
          direction='row'
          justify='between'
          size='large'
          pad={{ horizontal: 'medium', between: 'small' }}
        >
          <NavControl />
        </Header>
        {errorNode}
        
        <Box pad="medium" direction="row" justify="around">
          
          <div style={{ width: 200, height: 200, backgroundColor: '#F11161', borderRadius: 50, display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <span style={{ display: 'flex', color: 'white', fontWeight: 'bold', fontSize: 28 }}>Sites</span>
            <span style={{ display: 'flex', color: 'white', fontWeight: 'bold', fontSize: 28 }}>6</span>
          </div>

          <div style={{ width: 200, height: 200, backgroundColor: '#5ED1E9', borderRadius: 50, display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <span style={{ display: 'flex', color: 'white', fontWeight: 'bold', fontSize: 28 }}>Produtos</span>
            <span style={{ display: 'flex', color: 'white', fontWeight: 'bold', fontSize: 28 }}>13530</span>
          </div>

          <div style={{ width: 200, height: 200, backgroundColor: '#F8842D', borderRadius: 50, display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <span style={{ display: 'flex', color: 'white', fontWeight: 'bold', fontSize: 28 }}>Categorias</span>
            <span style={{ display: 'flex', color: 'white', fontWeight: 'bold', fontSize: 28 }}>1</span>
          </div>

          <div style={{ width: 200, height: 200, backgroundColor: '#9ADE39', borderRadius: 50, display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <span style={{ display: 'flex', color: 'white', fontWeight: 'bold', fontSize: 28 }}>Custo</span>
            <span style={{ display: 'flex', color: 'white', fontWeight: 'bold', fontSize: 28 }}>$1</span>
          </div>
        </Box>
        <Box pad='medium'>
          <Heading tag='h3' strong={true}>
            Sites
          </Heading>
        </Box>
        {listNode}
      </Article>
    );
  }
}

Dashboard.defaultProps = {
  error: undefined,
  sites: []
};

Dashboard.propTypes = {
  dispatch: PropTypes.func.isRequired,
  error: PropTypes.object,
  sites: PropTypes.arrayOf(PropTypes.object)
};

Dashboard.contextTypes = {
  intl: PropTypes.object
};

const select = state => ({ ...state.dashboard });

export default connect(select)(Dashboard);
