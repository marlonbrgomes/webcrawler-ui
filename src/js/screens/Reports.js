import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Anchor from 'grommet/components/Anchor';
import WorldMap from 'grommet/components/WorldMap';
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
import Heading from 'grommet/components/Heading'
import Chart, {Axis, Bar, Base, Layers} from 'grommet/components/chart/Chart';


import { getMessage } from 'grommet/utils/Intl';

import NavControl from '../components/NavControl';

import {
  loadProducts
} from '../actions/tasks';

import { pageLoaded } from './utils';

class Tasks extends Component {
  componentDidMount() {
    pageLoaded('Relatórios');
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
          <NavControl name={'Relatórios'} />
        </Header>
        {errorNode}
        <Box pad={{ horizontal: 'medium' }}>
          <FormField>
            <TextInput id='item1'
              name='item-1'
              value='iPhone X'
              suggestions={['iPhone X 64GB', 'iPhone X 256GB', 'iPhone X Cinza Espacial', 'iPhone X Rose Gold']} />
          </FormField>

          
          <Box pad={{ vertical: 'medium' }} direction="row">
            <Heading tag='h3' strong={true}>
              Estimativas Básicas
            </Heading>
            <Box pad={{ vertical: 'medium' }} direction="row">
              <Label>Outlier (Mais Caro)</Label>
              <Meter vertical={true}
                type='arc'
                threshold={90}
                max={100}
                value={90}
                />
              <Box justify='between'
                align='start'
                pad={{"between": "small"}}
                responsive={false}>
                <Label size='small'>
                  R$ 7400
                </Label>
                <Value value={7238}
                  units='R$'
                  align='start' />
                <Label size='small'>
                  R$ 0
                </Label>
              </Box>
            </Box>

            <Box pad={{ vertical: 'medium' }} direction="row">
              <Meter vertical={true}
                type='arc'
                threshold={90}
                max={100}
                value={30}
                />
              <Box justify='between'
                align='start'
                pad={{"between": "small"}}
                responsive={false}>
                <Label size='small'>
                  R$ 0
                </Label>
                <Value value={6999}
                  units='R$'
                  align='start' />
                <Label size='small'>
                  R$ 7.400
                </Label>
              </Box>
              <Label>Outlier (Mais Barato)</Label>
            </Box>
          </Box>

          <Heading tag='h3' strong={true}>
            Histórico de Preços
          </Heading>
          <Box pad={{ vertical: 'medium' }} align="center">
            <Chart full={false}>
              <Axis count={5}
                labels={[{"index": 2, "label": "7100"}, {"index": 4, "label": "7238"}]}
                vertical={true} />
              <Chart full={false}
                vertical={true}>
                <Base height='medium'
                  width='large' />
                <Layers>
                  <Bar values={[45, 25, 60, 12, 35, , 10, 45, 60, 100, 70, 20]}
                    colorIndex='graph-2'
                    activeIndex={11} />
                </Layers>
                <Axis count={2}
                  labels={[{"index": 0, "label": "10/10"}, {"index": 1, "label": "Hoje"}]} />
              </Chart>
            </Chart>
          </Box>

          <Box pad={{ vertical: 'medium' }}>
            <Heading tag='h3' strong={true}>
              Mapa de Calor de Coletas
            </Heading>
            <WorldMap style={{ width: '60%', alignSelf: 'center', marginTop: '10px' }} series={[{
              "continent": "NorthAmerica",
              "label": "North America",
              "colorIndex": "unset",
              "onClick": "..."
            }, {
              "continent": "SouthAmerica",
              "label": "South America",
              "colorIndex": "accent-2",
              "onClick": "..."
            }, {
              "continent": "Europe",
              "label": "Europe",
              "colorIndex": "unset",
              "onClick": "..."
            }, {
              "continent": "Africa",
              "label": "Africa",
              "colorIndex": "unset",
              "onClick": "..."
            }, {
              "continent": "Asia",
              "label": "Asia",
              "colorIndex": "unset",
              "onClick": "..."
            }, {
              "continent": "Australia",
              "label": "Australia",
              "colorIndex": "unset",
              "onClick": "...",
              "onHover": "..."
            }]} />
          </Box>
        </Box>
        
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
