import React, {Component} from 'react';
import axios from 'axios';

function getDisplayName(WrappedComponent) {
    return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

export function withApiProgress(WrappedCoponent, apiPath) {
  return class extends Component {
      static displayName = 'ApiProgress(${getDisplayName(WrappedCoponent)})';

    state = {
        pendingApiCall: false
    }

    componentDidMount(){
        this.requestInterceptor = axios.interceptors.request.use(request => {
            console.log('running request interceptor', apiPath);
            this.updateApiCallFor(request.url, true)
            return request;
        });

        this.responseInterceptor = axios.interceptors.response.use(
        (response) => {
         this.updateApiCallFor(response.config.url, false)
           return response;
        },  
        (error) => {        
         this.updateApiCallFor(error.config.url, false)
            throw error;
        }
    );
 }

 componentWillUnmount(){
     axios.interceptors.request.eject(this.requestInterceptor);
     axios.interceptors.response.eject(this.responsetInterceptor);     
 }

updateApiCallFor = (url, inProgress) => {
    if(url === apiPath){
        this.setState({ pendingApiCall: inProgress});
      }

}
    render() {
        const{ pendingApiCall } = this.state;
    return <WrappedCoponent pendingApiCall={pendingApiCall} {...this.props} />
    }
}
 
}