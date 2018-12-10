import React, { Component } from 'react';


const WithLoading = (ComponentLoading) => {

  return class LoadedComponent extends Component {

    render() {
      return (
        <div>

        </div>
      );
    }
  }

  export default LoadedComponent;
}

export default WithLoading;
