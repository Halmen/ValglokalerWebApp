import Layout from '../components/MyLayout'
import {Component} from 'react'
import React from 'react'
import list from '../api/list'
import ReactPaginate from 'react-paginate'
import Table from 'rc-table';

const columns = require('./columns.json')


class Index extends React.Component {

    static async getInitialProps(params) {

        //This function fetches the data even if the client side JS is disabled
        try {
            const resp = await list.getList(null, null, null, true)
            const counties = resp.data.entries
            return {counties}
        } catch (err) {
            return {error: true}
        }

    }

    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this)
        this.getData = this.getData.bind(this)
        this.handlePageClick = this.handlePageClick.bind(this)
        this.state = {
            counties: !props.error ? props.counties : false,
            type: "county_name",
            value: null,
            page: 1,
            pages: null,
            data: null,
            key: 1
        }

    }

    handlePageClick(data) {
        const page = data.selected + 1
        this.getData(this.state.type, this.state.value, page)

    }

    handleChange(e) {

        const name = e.target.name
        const value = e.target.value

        if (name == "type") {
            this.setState({type: value})
        } else {
            this.setState({value: value})
        }
        if (e.target.name == "county_name" || e.key == 'Enter') {

            this.getData(this.state.type, value)
        }
    }

    async getData(type, value, page = 1) {

        try {
            const resp = await list.getList(type, value, page)

            this.setState({
                data: resp.data.entries,
                page: resp.data.page,
                pages: resp.data.pages,
                key: this.state.key + 1
            })

        } catch (err) {
            this.setState({
                error: true
            })
        }
    }

    render(props) {

        return (
            <Layout>
                <html lang="en">
                <head>
                    <meta httpEquiv="content-type" content="text/html; charset=utf-8"></meta>
                    <link rel="stylesheet"
                          href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"
                          integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u"
                          crossOrigin="anonymous"></link>
                </head>
                <body>

                <div>
                    <div class="container">
                        <div class="input-group">
                            <select class="form-control" value={this.state.type} name="type"
                                    onChange={this.handleChange}>
                                {
                                    columns.columns
                                        ? columns.columns.map((val) => (
                                            <option key={val.key} value={val.dataIndex}>{val.title}</option> ))
                                        : <option value="">Data not found</option>
                                }
                            </select>
                            <span class="input-group-addon">-</span>
                            {this.state.type == "county_name" ?
                                <select class="form-control" name="county_name" onChange={this.handleChange}>
                                    <option value=""> Please select</option>
                                    {
                                        this.state.counties
                                            ? this.state.counties.map((val) => (
                                                <option key={val.nummer} value={val.navn}>{val.navn}</option> ))
                                            : <option value="">Data not found</option>
                                    }
                                </select>
                                :
                                <input class="form-control" type="text" name="value" value={this.state.value}
                                       placeholder="Press 'Enter' for query " onKeyPress={this.handleChange}
                                       onChange={this.handleChange}></input>
                            }
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-2 col-md-offset-5">
                            {this.state.pages ?
                                <ReactPaginate
                                    previousLabel={'<'}
                                    nextLabel={'>'}
                                    pageCount={this.state.pages}
                                    marginPagesDisplayed={0}
                                    pageRangeDisplayed={3}
                                    initialPage={this.state.page - 1}
                                    forcePage={this.state.page - 1}
                                    onPageChange={this.handlePageClick}
                                    containerClassName={'pagination'}
                                    subContainerClassName={'pages pagination'}
                                    activeClassName={'active'}
                                /> : null
                            }
                        </div>
                    </div>
                    <div>
                        {this.state.data ?
                            <Table columns={columns.columns} data={this.state.data} key={this.state.key}/>
                            : null}
                    </div>
                </div>
                </body>
                </html>
            </Layout>
        )
    }
}

export default Index

