import React, { Component } from 'react';
import { Table, InputGroup, Button, Form, ButtonGroup, DropdownButton, Dropdown, ButtonToolbar } from 'react-bootstrap';
import Select from 'react-select';
import _ from 'lodash';

const DEFAULT_FILTERS = {
    product: null,
    minQuantity: "",
    maxQuantity: "",
    minCost: "",
    maxCost: "",
    minDate: "",
    maxDate: ""
};

class PurchasesFilter extends Component {

    constructor(props) {
        super(props);

        const defaultOnSubmit = () => {};

        this.state = {
            onSubmit: props.onSubmit || defaultOnSubmit,
            products: props.products || { list: [], loading: false },
            filters: DEFAULT_FILTERS,
            pageSize: 10,
            changed: false
        }

        this.getLoadingMessage = this.getLoadingMessage.bind(this);
        
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleMinQuantityChange = this.handleMinQuantityChange.bind(this);
        this.handleMaxQuantityChange = this.handleMaxQuantityChange.bind(this);
        this.handleMinCostChange = this.handleMinCostChange.bind(this);
        this.handleMaxCostChange = this.handleMaxCostChange.bind(this);
        this.handleMinDateChange = this.handleMinDateChange.bind(this);
        this.handleMaxDateChange = this.handleMaxDateChange.bind(this);
        this.handlePageSizeChange = this.handlePageSizeChange.bind(this);
        this.handleClearFilter = this.handleClearFilter.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            products: nextProps.products || { list: [], loading: false },
            onSubmit: nextProps.onSubmit
        });
    }

    getProductOptions() {
        return this.state.products.list.map(product => {
            return {
                value: product.name,
                label: product.name
            }
        });
    }

    getLoadingMessage() {
        if (this.state.products.loading) {
            return "Loading products...";
        }
        return null;
    }

    isFilterClearable() {
        return !_.isEqual(DEFAULT_FILTERS, this.state.filters);
    }

    handleNameChange(product_option) {
        this.setState({
            filters: {
                ...this.state.filters,
                product: product_option
            },
            changed: true
        });
    }

    handleMinQuantityChange(event) {
        this.setState({
            filters: {
                ...this.state.filters,
                minQuantity: event.target.value.replace('.','')
            },
            changed: true
        });
    }

    handleMaxQuantityChange(event) {
        this.setState({
            filters: {
                ...this.state.filters,
                maxQuantity: event.target.value.replace('.','')
            },
            changed: true
        });
    }

    handleMinCostChange(event) {
        this.setState({
            filters: {
                ...this.state.filters,
                minCost: event.target.value
            },
            changed: true
        });
    }


    handleMaxCostChange(event) {
        this.setState({
            filters: {
                ...this.state.filters,
                maxCost: event.target.value
            },
            changed: true
        });
    }

    handleMinDateChange(event) {
        this.setState({
            filters: {
                ...this.state.filters,
                minDate: event.target.value
            },
            changed: true
        });
    }

    handleMaxDateChange(event) {
        this.setState({
            filters: {
                ...this.state.filters,
                maxDate: event.target.value
            },
            changed: true
        });
    }

    handlePageSizeChange(pageSize) {
        this.state.onSubmit({
            filters: this.getFilters(),
            pageSize
        });
        this.setState({
            pageSize: pageSize,
            changed: false
        });
    }

    getFilters() {
        var filters = [];
        if (this.state.filters.product && this.state.filters.product.value) {
            filters.push(purchase => {
                return purchase.productName === this.state.filters.product.value;
            });
        }
        if (this.state.filters.minQuantity) {
            filters.push(purchase => {
                return purchase.quantity >= parseInt(this.state.filters.minQuantity);
            });
        }
        if (this.state.filters.maxQuantity) {
            filters.push(purchase => {
                return purchase.quantity <= parseInt(this.state.filters.maxQuantity);
            });
        }
        if (this.state.filters.minCost) {
            filters.push(purchase => {
                return purchase.purchaseCost >= parseInt(this.state.filters.minCost);
            });
        }
        if (this.state.filters.maxCost) {
            filters.push(purchase => {
                return purchase.purchaseCost <= parseInt(this.state.filters.maxCost);
            });
        }
        if (this.state.filters.minDate) {
            filters.push(purchase => {
                return purchase.purchaseDate >= Date.parse(this.state.filters.minDate);
            });
        }
        if (this.state.filters.maxDate) {
            filters.push(purchase => {
                return purchase.purchaseDate <= Date.parse(this.state.filters.maxDate);
            });
        }
        return filters;
    }

    handleClearFilter(event) {
        event.preventDefault();
        this.state.onSubmit({
            filters: [],
            pageSize: this.state.pageSize
        });
        this.setState({
            filters: DEFAULT_FILTERS,
            changed: false
        })
    }

    handleSubmit(event) {
        event.preventDefault();
        if (this.state.changed) {
            this.state.onSubmit({
                filters: this.getFilters(),
                pageSize: this.state.pageSize
            });
            this.setState({
                changed: false
            });
        }
    }

    render() {
        return (
            <Form onSubmit={ this.handleSubmit }>
                <Table bordered className="filter-table">
                    <thead>
                        <tr>
                            <th colSpan={2}><h4 style={{ marginBottom: 0 }}>Filters</h4></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <InputGroup className="mb-3">
                                    <InputGroup.Prepend>
                                        <InputGroup.Text>Product Name</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <Select className="form-control"
                                        value={ this.state.filters.product } 
                                        isSearchable={ true }
                                        isClearable={ true }
                                        placeholder="Product Name" 
                                        onChange={ this.handleNameChange }
                                        loadingMessage={ this.getLoadingMessage }
                                        isLoading={ this.state.products.loading }
                                        options={ this.getProductOptions() } />
                                </InputGroup>
                            </td>
                            <td>
                                <InputGroup className="mb-3">
                                    <InputGroup.Prepend>
                                        <InputGroup.Text>Purchase Date</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <Form.Control placeholder="Minimum Date" type="date" id="min-date"
                                        value={ this.state.filters.minDate } onChange={ this.handleMinDateChange } />
                                    <Form.Control placeholder="Maximum Date" type="date" id="max-date"
                                        value={ this.state.filters.maxDate } onChange={ this.handleMaxDateChange } />
                                </InputGroup>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <InputGroup className="mb-3">
                                    <InputGroup.Prepend>
                                        <InputGroup.Text>Quantity</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <Form.Control placeholder="Minimum Quantity" type="number" id="min-quantity"
                                        value={ this.state.filters.minQuantity } onChange={ this.handleMinQuantityChange } />
                                    <Form.Control placeholder="Maximum Quantity" type="number" id="max-quantity"
                                        value={ this.state.filters.maxQuantity } onChange={ this.handleMaxQuantityChange } />
                                </InputGroup>
                            </td>
                            <td>
                            <InputGroup className="mb-3">
                                    <InputGroup.Prepend>
                                        <InputGroup.Text>Cost</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <Form.Control placeholder="Minimum Cost" type="number" id="min-cost"
                                        value={ this.state.filters.minCost } onChange={ this.handleMinCostChange } />
                                    <Form.Control placeholder="Maximum Cost" type="number" id="max-cost"
                                        value={ this.state.filters.maxCost } onChange={ this.handleMaxCostChange } />
                                </InputGroup>
                            </td>
                        </tr>
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan={2}>
                            <ButtonToolbar className="justify-content-between">
                                <ButtonGroup>
                                    <Button id="filter-submit" variant="primary" disabled={ !this.state.changed } type="Submit">Search</Button>
                                    <DropdownButton variant="outline-secondary" as={ButtonGroup} title={this.state.pageSize} onSelect={this.handlePageSizeChange}>
                                        <Dropdown.Item eventKey="10">10</Dropdown.Item>
                                        <Dropdown.Item eventKey="20">20</Dropdown.Item>
                                        <Dropdown.Item eventKey="50">50</Dropdown.Item>
                                        <Dropdown.Item eventKey="100">100</Dropdown.Item>
                                    </DropdownButton>
                                </ButtonGroup>
                                <Button id="filter-clear" variant="danger" onClick={ this.handleClearFilter } disabled={ !this.isFilterClearable() }>
                                    Clear
                                </Button>
                            </ButtonToolbar>
                            </td>
                        </tr>
                    </tfoot>
                </Table>
            </Form>
        );
    }
}

export default PurchasesFilter;