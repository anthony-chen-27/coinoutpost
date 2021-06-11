# Coinoutpost , a clone of Coinbase

`Coinoutpost` is a clone of popular cryptocurrency platform coinbase, allowing users to sign up, trade cryptocurrencies, and add currencies to their watchlist.

# [Coinoutpost](http://coinoutpost.herokuapp.com/) 

## Technologies used in this project involves
- Rails for backend
- PostgreSQL as database
- React for frontend framework
  - And numerous react libraries such as react-icons
- Heroku as the hosting service

# Highlighted features
** Trade modal **
![](https://i.imgur.com/RHV0cse.png)
![](https://i.imgur.com/jqJbsQK.png)
![](https://i.imgur.com/cLv3taQ.png)
The modal allows users to buy/sell cryptocurrencies from the site. The modal is achieved by rendering 2 elements in fixed positions, the transparent gray background that covers 100% of the screen, and the actual trade modal. The gray background has an event listener so that when it is clicked, it closes out the modal. In addition, I didn't want the elements to be rendered on the screen instantaneously but rather have a slight transition to it. This effect was achieved by using an react package, react-transition-group.
```
<CSSTransition in={this.state.open} timeout={{enter: 0, exit: 200}}
    unmountOnExit classNames='trade-modal'>
    <Trademodal toggleBuy={this.toggleBuy}/>
</CSSTransition>
```

Combined with

```
.trade-modal {
    position: fixed;
    width: 380px;
    top: calc(50vh - 270px);
    left: calc(50vw - 190px);
    background-color: white;
    border-style: none;
    border-radius: 3px;
    opacity: 0;
    height: auto;
    max-height: 2000px;
    transition: opacity 0.2s ease-in-out, height 0.2s ease-out;
    pointer-events: none;
}

.trade-modal-enter-done *{
    opacity: 1;
    pointer-events: visible;
}
```
In addition, the trade-modal is comprised of several different components, in order to figure out which one to render, I created a property in the state to keep track of a value called display, with each component being associated with a specific value. Thus, I could simply call a function to change the current display value, and it would allow me to switch between the different components.

```
this.state = {header: 0, display: 0, ....}
.
.
render() {
  .
  .
  { this.state.display === 1 ? 
      <SelectAsset action={this.changeDisplay} changeSelect={this.buyselect} selected={this.state.buyselect}/>
  : null}
  { this.state.display === 2 ? 
      <SelectAsset action={this.changeDisplay} changeSelect={this.sellselect} selected={this.state.sellselect}/>
  : null}
  .
  .
  .
}
```

