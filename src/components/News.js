import React, { Component } from 'react'
import Newsitem from './Newsitem'
import Spinner from './Spinner';

export class News extends Component {
    constructor(){
        super();
        this.state={

            articles:[],
            loading:false,
            page:1
        }
    }
    async componentDidMount(){
        console.log("cdm");
        let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=757efd0e1109483197450973b7f9b010&page=1&pagesize=${this.props.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        this.setState({articles: parsedData.articles, totalResults:parsedData.totalResults})
        }

        handlePreClick=async ()=>{
            console.log("pre")
            let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=757efd0e1109483197450973b7f9b010&page=${this.state.page-1}&pagesize=${this.props.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json()
        console.log(parsedData);
        this.setState({
            page:this.state.page-1,
            articles: parsedData.articles
            
        })
        }
        handleNextClick=async ()=>{
            console.log("next")
            if ( this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)){
            }else{
                let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=757efd0e1109483197450973b7f9b010&page=${this.state.page+1}&pagesize=${this.props.pageSize}`;
                let data = await fetch(url);
                let parsedData = await data.json()
                console.log(parsedData);
                this.setState({
                    page:this.state.page+1,
                    articles: parsedData.articles
                })
            }
            
        }

    render() {
        return (
            <div className='container my-3'>
                <h2 className='text-center'>ThunderNews - Top Headlines</h2>
                {this.state.loading && <Spinner/>}
                
                <div className="row my-3">
                {this.state.articles.map((element)=>{
                           return <div className="col-md-4" key={element.url}>
                            <Newsitem  title={element.title?element.title.slice(0,40):""} description={element.description?element.description.slice(0,50):""} imageUrl={element.urlToImage} newsurl={element.url} />
                            </div>
                        })}
                   
                </div>
                <div className="container d-flex justify-content-between">
                <button disabled={this.state.page<=1} type="button" class="btn btn-dark" onClick={this.handlePreClick}>&larr; Previous</button>
                <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" class="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
                </div>
            </div>
        )
    }
}

export default News
