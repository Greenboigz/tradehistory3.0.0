import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Pagination } from 'react-bootstrap';
import icons from 'glyphicons';
import dateformat from 'dateformat';
import ClipLoader from 'react-spinners/ClipLoader';
import PurchasesFilter from './PurchasesFilter';
import ReactDataGrid from 'react-data-grid';

class PurchasesPage extends Component {

    constructor(props) {
        super(props);

        this.handleFilter = this.handleFilter.bind(this);
        this.getPurchaseRow = this.getPurchaseRow.bind(this);
        this.paginatePurchaseList = this.paginatePurchaseList.bind(this);
        this.onRowsSelected = this.onRowsSelected.bind(this);
        this.onRowsDeselected = this.onRowsDeselected.bind(this);
        this.setSort = this.setSort.bind(this);

        this.initializeState(props);
    }

    initializeState(props) {
        var purchases = props.purchases || {
            loading: false,
            list: [],
            error: false
        };
        var products = props.products || {
            loading: false,
            list: [],
            error: false
        };
        var query = {
            sort: {
                column: "id",
                direction: "ASC"
            },
            filters: [],
            page: {
                currentPage: 1,
                pageSize: 10
            }
        };

        this.state = {
            purchases,
            products,
            query,
            select: [],
            sortedFilteredList: this.filterAndSortPurchaseList(purchases.list, query),
            sortedFilteredPaginatedList: this.paginatePurchaseList(purchases.list, query),
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            purchases: nextProps.purchases || {
                loading: false,
                list: [],
                error: false
            },
            products: nextProps.products || {
                loading: false,
                list: [],
                error: false
            },
            sortedFilteredList: this.filterAndSortPurchaseList(nextProps.purchases.list, this.state.query),
            sortedFilteredPaginatedList: this.paginatePurchaseList(nextProps.purchases.list, this.state.query),
        });
    }

    getTotalPages() {
        return Math.ceil(this.state.sortedFilteredList.length / this.state.query.page.pageSize)
    }

    changePage(pageNumber) {
        let query = {
            ...this.state.query,
            page: {
                ...this.state.query.page,
                currentPage: pageNumber
            }
        }
        this.setState({
            query,
            sortedFilteredPaginatedList: this.paginatePurchaseList(this.state.sortedFilteredList, query)
        })
    }

    compareItems(query, item1, item2) {
        if (query.sort.direction === "ASC") {
            if (item1[query.sort.column] < item2[query.sort.column])
                return -1;
            if (item1[query.sort.column] > item2[query.sort.column])
                return 1;
            return 0;
        } else if (query.sort.direction === "DESC") {
            if (item2[query.sort.column] < item1[query.sort.column])
                return -1;
            if (item2[query.sort.column] > item1[query.sort.column])
                return 1;
        }
    }

    filterAndSortPurchaseList(purchases_list, query) {
        if (query.filters.length > 0) {
            purchases_list = purchases_list.filter(purchase => {
                var include = true;
                query.filters.forEach(filter => include &= filter(purchase));
                return include;
            });
        }
        if (query.sort.column !== "") {
            purchases_list.sort((p1, p2) => this.compareItems(query, p1, p2));
        }
        return purchases_list;
    }

    paginatePurchaseList(purchases_list, query) {
        if (purchases_list.length > query.page.pageSize) {
            purchases_list = purchases_list.filter((purchase, index) => {
                return Math.floor(index / query.page.pageSize) === query.page.currentPage - 1;
            })
        }
        return purchases_list || [];
    }

    getPagination() {
        return (
            <Pagination className=" justify-content-center">
                <Pagination.First disabled={this.state.query.page.currentPage === 1} 
                    onClick={ () => this.changePage(1) } />
                <Pagination.Prev disabled={this.state.query.page.currentPage === 1} 
                    onClick={ () => this.changePage(this.state.query.page.currentPage - 1) } />
                { (this.state.query.page.currentPage > 2) ? <Pagination.Ellipsis disabled /> : null }
                { 
                    (this.state.query.page.currentPage > 1) ? 
                        <Pagination.Item onClick={ () => this.changePage(this.state.query.page.currentPage - 1) }>{ this.state.query.page.currentPage - 1 }</Pagination.Item> : 
                        null 
                }
                <Pagination.Item active>{ this.state.query.page.currentPage }</Pagination.Item>
                { 
                    (this.state.query.page.currentPage < this.getTotalPages() - 1) ? 
                        <Pagination.Item onClick={ () => this.changePage(this.state.query.page.currentPage + 1) }>{ this.state.query.page.currentPage + 1 }</Pagination.Item> : 
                        null 
                }
                { (this.state.query.page.currentPage < this.getTotalPages() - 2) ? <Pagination.Ellipsis disabled /> : null }
                <Pagination.Next disabled={this.state.query.page.currentPage === this.getTotalPages()} 
                    onClick={ () => this.changePage(this.state.query.page.currentPage + 1) } />
                <Pagination.Last disabled={this.state.query.page.currentPage === this.getTotalPages()} 
                    onClick={ () => this.changePage(this.getTotalPages()) } />
            </Pagination>
        )
    }

    getColumns() {
        const defaultColumnProperties = { sortable: true, minWidth: 80, resizable: true };
        return [
            { key: "id", name: "Product ID", ...defaultColumnProperties },
            { key: "productName", name: "Product Name", ...defaultColumnProperties },
            { key: "quantity", name: "Quantity", ...defaultColumnProperties },
            { key: "purchaseCost", name: "Purchase Cost", ...defaultColumnProperties },
            { key: "purchaseDate", name: "Purchase Date", ...defaultColumnProperties }
        ];
    }

    getPurchaseRow(r) {
        let purchase = this.state.sortedFilteredPaginatedList[r];
        if (purchase) {
            return {
                id: purchase.id,
                productName: purchase.productName,
                quantity: purchase.quantity + " lbs",
                purchaseCost: "$" + Number(purchase.purchaseCost).toFixed(2),
                purchaseDate: dateformat(purchase.purchaseDate, "mm/dd/yyyy")
            }
        }
        return {
            id: -1,
            productName: "Error",
            quantity: -1,
            purchaseCost: -1,
            purchaseDate: "Error",
        }
    }

    setSort(sortColumn, sortDirection) {
        var query = {
            ...this.state.query,
            page: {
                ...this.state.query.page,
                currentPage: 1
            },
            sort: {
                column: sortColumn,
                direction: sortDirection
            }
        };
        var sortedFilteredList = this.filterAndSortPurchaseList(this.state.purchases.list, query);
        this.setState({
            query,
            sortedFilteredList,
            sortedFilteredPaginatedList: this.paginatePurchaseList(sortedFilteredList, query)
        });
    }

    onRowsSelected(rows) {
        var select = this.state.select.filter(() => true);
        rows.forEach(row => {
            if (select.findIndex(id => id === row.row.id) === -1) {
                select.push(row.row.id);
            }
        });
        this.setState({
            select
        });
    }

    onRowsDeselected(rows) {
        var select = this.state.select.filter(() => true);
        var unselect = [];
        rows.forEach(row => {
            unselect.push(row.row.id);
        });
        select = select.filter(select_id => unselect.findIndex(unselect_id => select_id === unselect_id) === -1);
        this.setState({
            select
        });
    }

    getIndexes() {
        return this.state.sortedFilteredPaginatedList
            .map((purchase, index) => { return { index, id: purchase.id} })
            .filter(item => this.state.select.indexOf(item.id) !== -1)
            .map(item => item.index);
    }

    getPurchasesTable() {
        return (
            <div>
                <ReactDataGrid
                    columns={ this.getColumns() }
                    rowGetter={ this.getPurchaseRow }
                    rowsCount={ this.state.sortedFilteredPaginatedList.length }
                    onGridSort={ this.setSort }
                    minHeight={ 500 }
                    rowSelection={{
                        showCheckbox: true,
                        onRowsSelected: this.onRowsSelected,
                        onRowsDeselected: this.onRowsDeselected,
                        selectBy: {
                            indexes: this.getIndexes()
                        }
                    }}
                    />
                { this.getPagination() }
            </div>
        );
    }

    getLoadingMessage() {
        return (
            <div className="loading-page">
                <h2>Loading</h2>
                <ClipLoader sizeUnit={"px"} size={150} color={"#123abc"} loading={this.state.purchases.loading} />
            </div>
        )
    }

    handleFilter(filter) {
        var query = {
            ...this.state.query,
            filters: filter.filters,
            page: {
                ...this.state.query.page,
                pageSize: filter.pageSize
            }
        };
        var sortedFilteredList = this.filterAndSortPurchaseList(this.state.purchases.list, query);
        this.setState({
            query,
            sortedFilteredList,
            sortedFilteredPaginatedList: this.paginatePurchaseList(sortedFilteredList, query)
        });
    }

    render() {
        return <div className="main">
            <h1>Purchase History</h1>
            <PurchasesFilter onSubmit={ this.handleFilter } onChangePageSize={ this.handleChangePageSize } products={ this.state.products } />
            { (this.state.purchases.loading) ? this.getLoadingMessage() : this.getPurchasesTable() }
        </div>
    }

}

function mapStateToProps(state) {
    var purchase_list = [];
    if (state.loadStoreReducer.purchases && state.loadStoreReducer.purchases.list) {
        const getProduct = id => state.loadStoreReducer.products.list.find(product => product.id === id);
        purchase_list = state.loadStoreReducer.purchases.list.map(purchase => {
            const product = getProduct(purchase.productId);
            return {
                ...purchase,
                productName: product.name,
                productValue: product.value,
                purchaseCost: product.value * purchase.quantity
            }
        });
    }

    return {
        purchases: {
            ...state.loadStoreReducer.purchases,
            list: purchase_list
        },
        products: state.loadStoreReducer.products
    };
}

function mapDispatchToProps(dispatch) {
    return {
        
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PurchasesPage);