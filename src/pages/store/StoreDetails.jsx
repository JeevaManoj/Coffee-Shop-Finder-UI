import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { fetchProducts, fetchProductsByStoreId, fetchStore } from '../../api/api';
import Typography from '@mui/material/Typography';
import { Rating, TextField, FormControlLabel, FormGroup, Switch } from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

function StoreDetails() {

    // State Definitions

    const { storeId } = useParams();
    const [storeDetails, setStoreDetails] = useState(null);
    const [fullList, setFullList] = useState([]);
    const [prodList, setProdList] = useState([]);
    const [category, setCategory] = useState('coffee');

    // Get the particular store details

    useEffect(() => {
        fetchStore(storeId)
            .then((data) => {
                console.log(data);
                setStoreDetails(data.store);
            })
            .catch((error) => {
                console.error('Error fetching stores:', error);
            });
    }, [storeId]);

    // Get the product list for the store

    useEffect(() => {

        fetchProductsByStoreId(storeId)
            .then((data) => {
                console.log(data);
                setFullList(data.products)
                setProdList(data.products.filter((element) => element.category == 'coffee'))

            })
            .catch((error) => {
                console.error('Error fetching stores:', error);
            });

    }, [storeId])

    // Update product list when category is changed

    useEffect(() => {

        setProdList(fullList.filter((element) => element.category == category))

    }, [category])

    return (
        <> {storeDetails &&

            <div className='row spaceContainer'>
                <div className='col-md-12'>

                    <div className='row'>
                        <div className='col-md-4'>
                            <img src={storeDetails.storeImage} className='storeDetailsImage'></img>
                        </div>
                        <div className='col-md-8 pt-5'>
                            <Typography variant="h4" component="h5">
                                <b>{storeDetails.storeName}</b>
                            </Typography>
                            <Typography className='mt-4' variant="h6" component="h6">
                                {storeDetails.storeDesc}
                            </Typography>
                            <div>
                                <Rating className='mt-4' size="large" name="half-rating-read size-large" value={storeDetails.rating} precision={0.5} readOnly />
                            </div>
                            <Typography className='mt-4' variant="h6" component="h6">
                                <b>Address:&nbsp;</b>{storeDetails.storeAddress}
                            </Typography>

                        </div>

                    </div>

                    <div className='row mt-5'>
                        {prodList &&

                            <div className='row mt-2'>
                                <div className='col-md-12'>

                                    <div className='row alignCenter'>
                                        <div className='col-md-12'>
                                            <Stack direction="row" spacing={1}>
                                                <Chip className='chipSize' onClick={() => setCategory('coffee')} label="Coffee" variant={category === 'coffee' ? 'default' : 'outlined'} />
                                                <Chip className='chipSize' onClick={() => setCategory('drinks')} label="Drinks" variant={category === 'drinks' ? 'default' : 'outlined'} />
                                                <Chip className='chipSize' onClick={() => setCategory('food')} label="Food" variant={category === 'food' ? 'default' : 'outlined'} />
                                            </Stack>

                                        </div>

                                    </div>

                                    <div className='row mt-5'>
                                        {prodList.map((element, index) => (

                                            <div className='col-md-4 mb-5 alignCenter' key={index}>
                                                <Card className='shadowEffect' sx={{ maxWidth: 345 }}>

                                                    <div className='row'>
                                                        <div className='col-md-4'>
                                                            <CardMedia
                                                                sx={{ height: 140 }}
                                                                image={element.productImage}
                                                            />
                                                        </div>
                                                        <div className='col-md-8'>
                                                            <CardContent>
                                                                <Typography gutterBottom variant="h6" component="div">
                                                                    {element.productName}
                                                                </Typography>
                                                                <Typography variant="body2" color="text.secondary">
                                                                    {element.productDesc}
                                                                </Typography>
                                                                <Typography className='mt-3' variant="h6" color="text.secondary">
                                                                    <b>$&nbsp;{element.price}</b>
                                                                </Typography>
                                                            </CardContent>
                                                        </div>

                                                    </div>

                                                </Card>
                                            </div>

                                        ))}

                                    </div>


                                </div>

                            </div>

                        }

                        {prodList.length == 0 &&

                            <div className='row mt-3'>
                                <div className='col-md-12 alignCenter'>
                                    <h4>No {category} found</h4>
                                </div>
                            </div>

                        }

                    </div>
                </div>

            </div>

        }

        </>
    )
}

export default StoreDetails