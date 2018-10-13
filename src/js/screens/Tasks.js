import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Anchor from 'grommet/components/Anchor';
import FormField from 'grommet/components/FormField';
import TextInput from 'grommet/components/TextInput';
import Image from 'grommet/components/Image';
import Article from 'grommet/components/Article';
import Box from 'grommet/components/Box';
import Header from 'grommet/components/Header';
import Label from 'grommet/components/Label';
import List from 'grommet/components/List';
import ListItem from 'grommet/components/ListItem';
import Notification from 'grommet/components/Notification';
import Meter from 'grommet/components/Meter';
import Paragraph from 'grommet/components/Paragraph';
import Value from 'grommet/components/Value';
import Spinning from 'grommet/components/icons/Spinning';
import { getMessage } from 'grommet/utils/Intl';

import NavControl from '../components/NavControl';

import {
  loadProducts
} from '../actions/tasks';

import { pageLoaded } from './utils';

class Tasks extends Component {
  componentDidMount() {
    pageLoaded('Produtos');
    this.props.dispatch(loadProducts());
  }

  render() {
    const { error, tasks, products } = this.props;
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
    } else if (products.length === 0) {
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
      const productsNode = (products || []).map(product => (
        <ListItem
          key={`task_${product._id}`}
          justify='between'
        >
          <Image src={product.image} size='small' />
          <Label><Anchor path={product.siteUrl} label={product.siteName} /></Label>
          <Label><Anchor path={product.url} label={product.name.slice(0, 70)} />{product.name.length > 70 ? '...' : ''}</Label>
          <Box
            direction='row'
            responsive={false}
            pad={{ between: 'small' }}
          >
            <Label>R$: {product.price}</Label>
            {/* <Value
              value={task.percentComplete}
              units='%'
              align='start'
              size='small'
            />
            <Meter value={task.percentComplete} /> */}
          </Box>
        </ListItem>
      ));

      listNode = (
        <List>
          {productsNode}
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
          <NavControl name={'Produtos'} />
        </Header>
        {errorNode}
        <Box pad={{ horizontal: 'medium' }}>
          <FormField>
            <TextInput id='item1'
              name='item-1'
              value='iPhone X Cinza Espacial'
              suggestions={['iPhone X Cinza Espacial 64GB', 'iPhone X Cinza Espacial 256GB']} />
          </FormField>
        </Box>
        {listNode}
      </Article>
    );
  }
}

Tasks.defaultProps = {
  error: undefined,
  tasks: []
};

Tasks.propTypes = {
  dispatch: PropTypes.func.isRequired,
  error: PropTypes.object,
  tasks: PropTypes.arrayOf(PropTypes.object)
};

Tasks.contextTypes = {
  intl: PropTypes.object
};

const select = state => ({ ...state.tasks });

export default connect(select)(Tasks);
