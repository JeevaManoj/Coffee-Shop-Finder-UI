import React, { useEffect, useState } from 'react'
import { fetchStores } from '../../api/api'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Rating, TextField, FormControlLabel, FormGroup, Switch } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Store() {

    // State Definitions

    const [stores, setStores] = useState([])
    const [filters, setFilters] = useState({
        name: null,
        featured: false,
        minRating: 0
    });
    const [rating, setRating] = useState(0)
    const navigate = useNavigate();

    // Get all stores on screen load

    useEffect(() => {

        fetchStores(filters)
            .then((data) => {
                console.log(data)
                setStores(data.stores)
            })

    }, [])

    // Get all stores if there is any filter change

    useEffect(() => {
        fetchStores(filters)
            .then((data) => {
                console.log(data);
                setStores(data.stores);
            })
            .catch((error) => {
                console.error('Error fetching stores:', error);
            });
    }, [filters]);

    // Update rating state when changes are done

    useEffect(() => {

        setFilters((prevFilters) => ({
            ...prevFilters,
            minRating: rating
        }));

    }, [rating])

    // Update filter state when changes are done

    function handleFilterChange(event) {

        const { name, value, checked } = event.target;

        setFilters((prevFilters) => ({
            ...prevFilters,
            [name]: name === 'featured' ? checked : value,
            minRating: rating
        }));

    }

    return (
        <>
            <div className='row mb-4'>
                <div className='col-md-12'>
                    <h4 className='head'>Filters</h4>
                </div>

            </div>
            <div className='row mb-5'>
                <div className='col-md-3 alignCenterForMobile'>
                    <TextField
                        id="outlined-basic"
                        label="Store Name"
                        variant="outlined"
                        name="name"
                        value={filters.name}
                        onChange={handleFilterChange}
                    />
                </div>
                <div className='col-md-1 alignCenter'>
                    <FormGroup>
                        <FormControlLabel
                            control={<Switch checked={filters.featured} onChange={handleFilterChange} name="featured" />}
                            label="Featured"
                        />
                    </FormGroup>
                </div>
                <div className='col-md-2 alignCenter'>
                    <Rating name="simple-controlled" value={rating} precision={0.5} onChange={(event, newValue) => setRating(newValue)} />
                </div>
                <div className='col-md-2 alignCenter'>
                    <Button size="small" onClick={() => { setFilters({ name: null, featured: false, minRating: 0 }); setRating(0) }}>
                        Clear Filters
                    </Button>
                </div>
            </div>

            <div className='row'>
                {stores.map((element, index) => (
                    <div className='col-md-3 mb-5 alignCenter' key={index}>
                        <Card className='shadowEffect' sx={{ maxWidth: 345 }}>
                            <CardMedia
                                sx={{ height: 140 }}
                                image={element.storeImage}

                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {element.storeName}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {element.storeAddress}
                                </Typography>
                                <Rating className='mt-3' name="half-rating-read" value={element.rating} precision={0.5} readOnly />
                            </CardContent>
                            <CardActions>
                                <Button size="small" onClick={() => navigate(`/store/${element._id}`)}>View Store</Button>
                            </CardActions>
                        </Card>
                    </div>
                ))}

            </div>

            {stores.length == 0 &&

                <div className='row mt-3'>
                    <div className='col-md-12 alignCenter'>
                        <h4>No stores found</h4>
                    </div>
                </div>

            }
        </>

    )
}

export default Store