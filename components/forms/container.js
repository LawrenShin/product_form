import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { fetchCategories } from '../../actions/categories';
import { createProduct, updateProduct } from '../../actions/products';
import moment from 'moment';
import Product from './product';

const Container = ({
        categoriesProp,
        getCategories,
        type,
        createProduct,
        updateProduct,
        product,
    }) => {

    const initialState = {
        brand: '',
        rating: 0,
        featured: 'No',
        creationDate: moment().format("YYYY-MM-DD"),
        invalid: {
            initial: '_',
        },
    };

    const [state, setState] = useState(type === 'create' ? initialState : {...product, invalid: {initial: '_'}});

    const setOptions = options => options.filter(o => o.selected).map(o => o.value);

    const handleSetValue = ({name, value, options}) => setState({
        ...state,
        [name]: options ? setOptions([...options]) : value,
        invalid: {
            ...state.invalid,
            [name]: '',
        }
    });

    const validate = (state) => {
        let { invalid } = state;
        const { rating, name, categories, expirationDate } = state;

        if (!name || name.length > 200) invalid = {
            ...invalid,
            initial: '',
            name: 'Name has to be within 200 symbols.'
        }

        if (rating === 0) invalid = {
            ...invalid,
            initial: '',
            rating: 'Rating has to be selected from 1 to 10',
        }

        if (categories === undefined || 
            categories.length < 1 || 
            categories.length > 5) invalid = {
            ...invalid,
            initial: '',
            categories: 'Product should have from 1 to 5 categories',
        }

        if (expirationDate && moment().diff(expirationDate,'days') > -30) invalid = {
            ...invalid,
            initial: '',
            expirationDate: 'Expiration date has to be at least 30 days since now.'
        }

        setState({
            ...state,
            featured: rating > 8 ? 'Yes' : 'No',
            invalid,
        });
    }

    const handleSubmit = e => {
        e.preventDefault();
        validate(state);
        if (Object.values(state.invalid).join('') === '') {
            const { invalid, ...product } = state;
            if (type === 'create') createProduct(product);
            if (type === 'update') updateProduct(product);
        }
    }

    useEffect(() => {
        if (!categoriesProp.length) getCategories();
    }, [getCategories, categoriesProp, state])

    return (
        <Product
            state={state}
            categoriesProp={categoriesProp}
            handleSubmit={handleSubmit}
            validate={validate}
            handleSetValue={handleSetValue}
        />
    )
}

export default connect(
    ({
        categories: categoriesProp,
        products,
    },
    { id }) => ({
        categoriesProp,
        product: products.filter(p => p.id === +id)[0],
    }),
    dispatchEvent => ({
        getCategories: () => dispatchEvent(fetchCategories()),
        createProduct: payload => dispatchEvent(createProduct(payload)),
        updateProduct: payload => dispatchEvent(updateProduct(payload)),
    })
)(Container);
