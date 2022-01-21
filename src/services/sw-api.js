import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SwApi = () => {

    const [shipData, setShipData] = useState([])

    const fetchShip = async () => {
        try {
            const res = await axios.all([
                axios.get('https://swapi.dev/api/starships'),
                axios.get('https://swapi.dev/api/starships/?page=2'),
                axios.get('https://swapi.dev/api/starships/?page=3'),
                axios.get('https://swapi.dev/api/starships/?page=4')
            ]);
            const ships = res.map((res) => res.data.results)
            setShipData(ships.flat())

        } catch (error) { console.error(error) }
    }

    useEffect(() => {
        fetchShip()
    }, [])

    return (
        <>
            <div id="main-header">
                <h1>STAR WARS STARSHIPS</h1>
            </div>
            <div className='cards-container'>
                {
                    shipData.map((ship) => {
                        return (
                            <div className='cards' key={ship.name}>
                                <h1 id='names'>{ship.name}</h1>
                                <h3 className='txt'>
                                    <span>Model</span>
                                    {ship.model}</h3>
                                <h3 className='txt'>
                                    <span>Manufacturer</span>
                                    {ship.manufacturer}
                                </h3>
                                <p>Crew: {ship.crew}</p>
                                <p>Passengers: {ship.passengers}</p>

                            </div>

                        )
                    })
                }
            </div>
        </>

    );
}

export default SwApi;

