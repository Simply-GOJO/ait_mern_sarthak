import { Component } from 'react';

import WrapRouter from './common/WrapRouter';
import { Navigate } from 'react-router-dom'
class MainPageLessRouter extends Component {
    constructor(props){
        super(props)
        this.state = {
			page_preference : { isLoading: true}
		};
    }

    componentDidMount () {
        const page_preference = { ...this.state.page_preference };            
        page_preference.isLoading = false;
        this.setState({ page_preference: page_preference });
    }

    render () { 
        if(!this.state.page_preference.isLoading){
            return (<Navigate to={`/student/list`}/>);
        }
        return ( 
            <>
                {this.state.page_preference.isLoading}
            </>
        )
    }
}

const MainPage = WrapRouter(MainPageLessRouter)
export default MainPage;