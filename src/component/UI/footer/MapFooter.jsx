import React, { useState, useLayoutEffect } from 'react';
import './MapFooter.css';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Icon, marker } from 'leaflet';
const MapFooter = () => {
    const position = [10.798915, 106.66889];

    const [unmountMap, setunmountMap] = useState(false);
    const markers = [
        {
            geocode: [12.815926, 108.273204],
            popUp: 'Hello, I am Exclusive',
        },
        {
            geocode: [10.799081, 106.668945],
            popUp: 'Hello, I am Exclusive',
        },
    ];

    const customIcon = new Icon({
        iconUrl: 'https://cdn-icons-png.flaticon.com/512/447/447031.png',
        //iconUrl: require("./icons/placeholder.png"),
        iconSize: [38, 38], // size of the icon
    });
    //to prevent map re-initialization
    useLayoutEffect(() => {
        setunmountMap(false);
        return () => {
            setunmountMap(true);
        };
    }, []);

    if (!unmountMap) {
        return (
            <>
                <MapContainer center={position} zoom={13} scrollWheelZoom={false}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {markers.map((item, key) => (
                        <Marker position={item?.geocode} icon={customIcon} key={key}>
                            <Popup>{item?.popUp}</Popup>
                        </Marker>
                    ))}
                </MapContainer>
            </>
        );
    } else return 'loading map...';
};

export default MapFooter;
