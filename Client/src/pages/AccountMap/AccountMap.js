import React from 'react';

import {
  ComposableMap,
  Geographies,
  Geography,
  Markers,
  Marker,
  ZoomableGroup
} from "react-simple-maps";


let ajax = require('superagent');

const wrapperStyles = {
  width: "100%",
  maxWidth: 980,
  margin: "0 auto",
};


const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";




class AccountMap extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
            accounts: [],
            currentMarkers: []
        };
	}

    componentWillMount() {
        let fetchAccountsURL = '/fetch/accounts/';
        ajax.get(fetchAccountsURL)
        	.end((error, response) => {
          		if(!error && response) {
                    console.log(JSON.parse(response.text));

                    let accs = JSON.parse(response.text);
                    let markersToAdd = [];
                    accs.map((dat, index) => {
                        console.log(dat.shippinglongitude);
                        markersToAdd.push({
                            name: dat.name,
                            coordinates: [dat.billinglongitude, dat.billinglatitude],
                            markerOffset: -10
                        });
                        return dat;
                    });
                    console.log(markersToAdd);

	              	this.setState({
	                	accounts: accs,
                        currentMarkers: markersToAdd
	            	});
          		} else {
              		console.log(`Error fetching data`, error);
          		}
        	});
  	}

	render() {



		return (
			<div>
				<div class="row">
	                <div class="text-center">
	                    <h1>Account Map</h1>
	                </div>
		    	</div>
                <div class="row">
                    <div style={wrapperStyles}>
                    <ComposableMap
                    projection="albersUsa"
                        projectionConfig={{
                          scale: 1000,
                        }}
                        width={980}
                        height={551}
                        style={{
                          width: "100%",
                          height: "auto",
                        }}
                        >
                        <ZoomableGroup disablePanning>
                        <Geographies geography="/static/states.json" disableOptimization>
                            {(geographies, projection) =>
                              geographies.map((geography, i) => {
                                return (
                                  <Geography
                                    key={`state-${geography.properties.ID_1}`}
                                    cacheId={`state-${geography.properties.ID_1}`}
                                    round
                                    geography={geography}
                                    projection={projection}
                                    style={{
                                        default: {
                                          fill: "#ECEFF1",
                                          stroke: "#607D8B",
                                          strokeWidth: 0.75,
                                          outline: "none",
                                        },
                                        hover: {
                                          fill: "#79589f",
                                          stroke: "#79589f",
                                          strokeWidth: 0.75,
                                          outline: "none",
                                        },
                                        pressed: {
                                          fill: "#FF5722",
                                          stroke: "#607D8B",
                                          strokeWidth: 0.75,
                                          outline: "none",
                                        },
                                    }}
                                  />
                                )
                              }
                            )}
                          </Geographies>
                          <Markers>
                              {this.state.currentMarkers.map((marker, i) => (
                                  <Marker
                                    key={i}
                                    marker={marker}
                                    style={{
                                      default: { fill: "#FF5722" },
                                      hover: { fill: "#FFFFFF" },
                                      pressed: { fill: "#FF5722" },
                                    }}
                                    >
                                    <circle
                                      cx={0}
                                      cy={0}
                                      r={5}
                                      style={{
                                        stroke: "#FF5722",
                                        strokeWidth: 3,
                                        opacity: 0.9,
                                      }}
                                    />
                                    <text
                                      textAnchor="middle"
                                      y={marker.markerOffset}
                                      style={{
                                        fontFamily: "Roboto, sans-serif",
                                        fill: "#607D8B",
                                      }}
                                      >
                                      {marker.name}
                                    </text>
                                  </Marker>
                                ))}
                          </Markers>
                          </ZoomableGroup>
                    </ComposableMap>
                    </div>
                </div>
            </div>
		);
	}
}

export default AccountMap;
