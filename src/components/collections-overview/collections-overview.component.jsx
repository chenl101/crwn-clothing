import React from 'react';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import CollectionPreview from '../preview-collection/preview-collection.component';

import { selectCollections } from '../../redux/shop/shop.selectors';

import './collections-overview.style.scss';

const CollectionsOverview = ({ collections }) => (
  <div className='collections-overview'>
    {
      collections.map(({ id, ...otherCollectionProps }) => (
        <CollectionPreview key={id} {...otherCollectionProps} />
      ))
    }
  </div>
);

const mapToStateProps = createStructuredSelector({
  collections: selectCollections
});

export default connect(mapToStateProps)(CollectionsOverview);

