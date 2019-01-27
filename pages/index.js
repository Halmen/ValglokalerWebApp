import Layout from '../components/MyLayout'
import {Component} from 'react'
import React from 'react'
import weather from '../api/weather'


class Index extends React.Component {

    static async getInitialProps(params) {
        // Get the query parameter, if no city provided we use the default (Copenhagen)
        const {city = 'Copenhagen'} = params.query
        // Make the API request and fetch the data
        try {
            const resp = await weather.getWeather(city)
            return {resp}
        } catch (err) {
            return {error: true}
        }

    }

    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)

        this.state = {
            def_city: props.error ? "You failed from geography, or correct spelling :P " : props.resp.city,
            temperature: props.error ? "Go out and you'll feel it :P" : props.resp.temperature,
            humidity: props.error ? "Like the Jungle ;) " : props.resp.humidity,
            wind: props.error ? "Put your wet tumb up in the air and you'll know it ;)" : props.resp.wind,
            wind_deg: props.error ? "You don't realy care" : props.resp.wind_deg,
            city: ""
        };

    }

    handleChange(e) {
        this.setState({city: e.target.value})
    }

    async handleSubmit(e) {
        e.preventDefault()

        try {
            const resp = await weather.getWeather(this.state.city)
            history.pushState(null, null, "?city=" + this.state.city)
            this.setState({
                def_city: resp.city,
                temperature: resp.temperature,
                humidity: resp.humidity,
                wind: resp.wind,
                wind_deg: resp.wind_deg
            })

        } catch (err) {
            this.setState({
                def_city: "You failed from geography, or correct spelling :P ",
                temperature: "Go out and you'll feel it :P",
                humidity: "Like the Jungle ;)",
                wind: "Put your wet tumb up in the air and you'll know it ;)",
                wind_deg: "You don't realy care"
            })
        }

    }

    render() {
        return (
            <Layout>
                <html lang="en">
                <head>
                    <meta httpEquiv="content-type" content="text/html; charset=utf-8"></meta>
                    <title>Weather widget</title>
                    <link rel="stylesheet"
                          href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"
                          integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u"
                          crossOrigin="anonymous"></link>
                </head>
                <body>
                <div className="widget" style={{margin: '10px', width: '300px'}}>
                    <div className="panel panel-info">
                        <div className="panel-heading">Weather in <b>{this.state.def_city}</b></div>
                        <ul className="list-group">
                            <li className="list-group-item">Temperature: <b>{this.state.temperature}°C</b></li>
                            <li className="list-group-item">Humidity: <b>{this.state.humidity}</b></li>
                            <li className="list-group-item">Wind: <b>{this.state.speed} m/s {this.state.wind}
                                ({this.state.wind_deg})</b></li>
                            <li className="list-group-item">
                                <form className="form-inline" onSubmit={this.handleSubmit}>
                                    <div className="form-group">
                                        <input type="text" className="form-control" name="city" value={this.state.city}
                                               placeholder="City" onChange={this.handleChange}></input>
                                    </div>
                                    <button type="submit" value="Submit" className="btn btn-default">Search</button>
                                </form>
                            </li>
                        </ul>
                    </div>
                </div>
                </body>
                </html>
            </Layout>
        )
    }
}

export default Index

