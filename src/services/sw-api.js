import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SwApi = () => {

    const [shipData, setShipData] = useState([])

    const shipImages = [{ image: 'https://external-preview.redd.it/woVb5Pix_gsE9t5yhYW49LlYHc1tuifsMiGxSuLdME0.jpg?auto=webp&s=4dcf70663c52919125f6438436b3da54aa9748a7' }, { image: 'https://lumiere-a.akamaihd.net/v1/images/Star-Destroyer_ab6b94bb.jpeg?region=0%2C50%2C1600%2C800' }]

    const fetchShip = async () => {
        try {
            const res = await axios.all([
                axios.get('https://swapi.dev/api/starships'),
                axios.get('https://swapi.dev/api/starships/?page=2'),
                axios.get('https://swapi.dev/api/starships/?page=3'),
                axios.get('https://swapi.dev/api/starships/?page=4')
            ]);
            const ships = res.map((res) => res.data.results)
            const imgShips = ships.flat()

            const newArr = imgShips.map((obj, index) => (
                { ...obj, shipImages: shipImages[index] }))
            setShipData(newArr)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        fetchShip()
    }, [])

    // shipData.map((obj) => {
    //     Object.assign(obj, img)
    // })
    console.log(shipData)

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

                                <img src={ship.shipImages?.image} alt="" />
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

