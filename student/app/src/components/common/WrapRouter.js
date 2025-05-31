import { useNavigate, useLocation, useParams } from 'react-router-dom';
import Header from './../header/Header';

/*
Higher Order Component
taken an argument: 
    'Page':
        a web page
        a page fragment (ie part/portion of page)
        Note: page / fragment is in a route
returns 
    'SwitchPage':
        (Header)  +
        (Page + router)

what is Higher Order Component?
    Higher Order Component is a function 
    takes the argument as component
    and returns enhanced argument component  

use of spread operator:
    {...props} which will spreads the props here

Hooks usages:
    useNavigate, useParams, useLocation
    ! useNavigate: to navigate between router components
    ! useParams: to read router 'param' from url
*/
function WrapRouter( Page ) {
    function SwitchPage( props ) {
        const navigate = useNavigate();
        const params = useParams();
        const location = useLocation();
        const router = {navigate, params, location }
        //                
        return ( 
            <>       
                <Header/>      
                <Page {...props} router={router}/>
            </>
        );
    }
    return SwitchPage;
}

export default WrapRouter;