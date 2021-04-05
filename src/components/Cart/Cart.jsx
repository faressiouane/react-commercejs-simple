import React from 'react'
import { Container, Typography, Button, Grid } from '@material-ui/core'
import CartItem from './CartItem/CartItem'
import { Link } from 'react-router-dom'
import useStyles from './styles'

const Cart = ({cart, onUpdateCart, onRemoveFromCart, onEmptyCart}) => {
    const classes = useStyles()
    const isEmpty = cart.total_items === 0  

    const EmptyCart = () => {
        return (
            <Typography variant="subtitle1">
                You have no items in your shopping cart,
                <Link to='/' className={classes.link}> start adding some</Link>!
            </Typography>
        )
    }

    const FilledCart = () => (
        <>
            <Grid container spacing={3}>
              {cart.line_items.map((item) => (
                  <Grid item xs={12} sm={4} key={item.id}>
                        <CartItem 
                        item={item}
                        onUpdateCart={onUpdateCart}
                        onRemoveFromCart={onRemoveFromCart}
                        />
                  </Grid>
              ))}
            </Grid>

            <div className={classes.cardDetails}>
                <Typography variant="h4">
                    Subtotal: {cart.subtotal.formatted_with_symbol}
                </Typography>
                <div>
                    <Button className={classes.emptyButton} size="large" type="button" variant="contained" color="secondary" onClick={onEmptyCart}>Empty cart</Button>
                    <Button component={Link} to="/checkout" className={classes.checkoutButton} size="large" type="button" variant="contained" color="primary" >Checkout</Button>
                </div>
            </div>
        </>
    )

    // if(!cart.line_items) return 'Loading...!'
    
    return (
        <Container>
            <div className={classes.toolbar} />
            <Typography variant="h3" className={classes.title} gutterBottom> Your Shopping Cart </Typography>            
            {isEmpty ? <EmptyCart /> : <FilledCart />}
        </Container>
    )
}

export default Cart
