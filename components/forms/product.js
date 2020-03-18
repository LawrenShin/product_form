import React from 'react';
import { Button, Form, FormGroup, Label, Input, FormFeedback } from 'reactstrap';

const Product = ({
    state,
    categoriesProp,
    handleSubmit,
    validate,
    handleSetValue,
}) => {
    const {
        name,
        brand,
        rating,
        featured,
        categories,
        itemsInStock,
        receiptDate,
        expirationDate,
        invalid: {
            name: nameInvalid,
            rating: ratingInvalid,
            categories: categoriesInvalid,
            expirationDate: expirationDateInvalid,
        }
    } = state;

    return (
        <Form>
            <FormGroup>
                <Label for='name'></Label>
                <Input type='text' name='name' id='name' placeholder='Name'
                    value={name}
                    invalid={Boolean(nameInvalid && true)}
                    onChange={({target: {name, value}}) => handleSetValue({name, value})}
                    onBlur={() => validate(state)}
                    ></Input>
                <FormFeedback>{nameInvalid}</FormFeedback>
            </FormGroup>
            <FormGroup>
                <Label for='brand'></Label>
                <Input type='text' name='brand' id='brand' placeholder='Brand'
                    value={brand}
                    onChange={({target: {name, value}}) => handleSetValue({name, value})}></Input>
            </FormGroup>
            <FormGroup>
                <Label for='rating'></Label>
                <Input type='select' name='rating' id='rating' placeholder='Rating' required 
                    value={rating}
                    invalid={Boolean(ratingInvalid && true)}
                    onChange={({target: {name, value}}) => handleSetValue({name, value})}
                    onBlur={() => validate(state)}>
                        {
                            [...Array(11).keys()]
                            .map(i => <option key={`rating${i}`} value={i}>
                                {i === 0 ? 'Unselected' : i}
                            </option>)
                        }
                </Input>
                <FormFeedback>{ratingInvalid}</FormFeedback>
            </FormGroup>
            <FormGroup>
                <Label for="featured">Featured</Label>
                <Input type="select" name="featured" id="featured"
                    value={featured}
                    onChange={({target: {name, value}}) => handleSetValue({name, value})}>
                    <option>No</option>
                    <option>Yes</option>
                </Input>
            </FormGroup>
            <FormGroup>
                <Label for='itemsInStock'></Label>
                <Input type='number' name='itemsInStock' id='itemsInStock' placeholder='Items in stock'
                    value={itemsInStock}
                    onChange={({target: {name, value}}) => handleSetValue({name, value})}></Input>
            </FormGroup>
            <FormGroup>
                <Label for="categories">Categories</Label>
                <Input type="select" name="categories" id="categories" multiple
                    value={categories}
                    invalid={Boolean(categoriesInvalid && true)}
                    onChange={({target: {name, value, options}}) => handleSetValue({name, value, options})}>
                    {
                        categoriesProp.map(({ id, name }) => <option 
                            key={`${id}${name}`}
                            value={id}
                            >{name}</option>)
                    }
                </Input>
                <FormFeedback>{categoriesInvalid}</FormFeedback>
            </FormGroup>
            <FormGroup>
                <Label for="receiptDate">Receipt date</Label>
                    <Input
                        type="date"
                        name="receiptDate"
                        id="receiptDate"
                        placeholder="Receipt date"
                        value={receiptDate}
                        onChange={({target: {name, value}}) => handleSetValue({name, value})}
                    />
            </FormGroup>
            <FormGroup>
                <Label for="expirationDate">Expirationt date</Label>
                    <Input
                        type="date"
                        name="expirationDate"
                        id="expirationDate"
                        placeholder="Expiration date"
                        value={expirationDate}
                        onChange={({target: {name, value}}) => handleSetValue({name, value})}
                        onBlur={() => validate(state)}
                        invalid={Boolean(expirationDateInvalid && true)}
                    />
                    <FormFeedback>{expirationDateInvalid}</FormFeedback>
            </FormGroup>
            <Button onClick={handleSubmit}>Submit</Button>
        </Form>
    )
}

export default Product;