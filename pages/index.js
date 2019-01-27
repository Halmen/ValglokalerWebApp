import Layout from '../components/MyLayout'
import {Component} from 'react'
import React from 'react'
import list from '../api/list'
import ReactPaginate from 'react-paginate'
import Table from 'rc-table';

const types = require('./types.json')
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
            value: "",
            page: 1,
            pages: null,
            data: null

        }


    }

    handlePageClick(data) {
        const page = data.selected + 1
        console.log(this.state.type, "-", this.state.value,"-" ,page)
        this.getData(this.state.type, this.state.value,page)

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

        console.log(type, value, page)
        try {

            const resp = await list.getList(type, value)

            this.setState({
                data: resp.data.entries,
                page: resp.data.page,
                pages: resp.data.pages
            })


        } catch (err) {
            this.setState({
                error: true
            })
        }
        this.setState({
            page: page,
        })
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

                <div className="form-group">
                    <select value={this.state.type} name="type" onChange={this.handleChange}>
                        {
                            columns.columns
                                ? columns.columns.map((val) => (
                                    <option key={val.key} value={val.dataIndex}>{val.title}</option> ))
                                : <option value="">Data not found</option>
                        }
                    </select>
                    {this.state.type == "county_name" ?
                        <select name="county_name" onChange={this.handleChange}>
                            <option value=""> Please select</option>
                            {
                                this.state.counties
                                    ? this.state.counties.map((val) => (
                                        <option key={val.nummer} value={val.navn}>{val.navn}</option> ))
                                    : <option value="">Data not found</option>
                            }
                        </select>
                        :
                        <input type="text" name="value" value={this.state.value}
                               placeholder="Press 'Enter' for query " onKeyPress={this.handleChange}
                               onChange={this.handleChange}></input>
                    }
                    {this.state.pages?
                    <ReactPaginate
                        previousLabel={'<'}
                        nextLabel={'>'}
                        pageCount={this.state.pages}
                        marginPagesDisplayed={0}
                        pageRangeDisplayed={1}
                        initialPage={this.state.page - 1}
                        forcePage={this.state.page - 1}
                        onPageChange={this.handlePageClick}
                        containerClassName={'pagination'}
                        subContainerClassName={'pages pagination'}
                        activeClassName={'active'}
                    /> : null
                    }
                    {this.state.data?
                        <Table columns={columns.columns} data={this.state.data} />
                    : null}

                </div>


                </body>
                </html>
            </Layout>
        )
    }
}

export default Index

