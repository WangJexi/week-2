import React from "react";
import { Typography, IconButton, TextField, Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search"
import AddSharpIcon from '@mui/icons-material/AddSharp';
import RemoveSharpIcon from '@mui/icons-material/RemoveSharp';
import ChevronRightSharpIcon from '@mui/icons-material/ChevronRightSharp';

import "./itemList.css";
import { ItemProps } from "../utility/types/itemTypes";

interface ItemListProps {
  items: Array<ItemProps>;
  onDeleteItem: (id: string) => void;
  onAddQuantity: (id: string) => void;
  onSubtractQuantity: (id: string) => void;
}

let preSearchedItemList: Array<ItemProps>;
let postSearchedItemList: Array<ItemProps>; 

function setSearch(item:any) {
  if (item !== "") {
    postSearchedItemList = preSearchedItemList.filter((choiceItem: ItemProps) => choiceItem.item === item);
  } else {
    postSearchedItemList = preSearchedItemList;
  }
}
const ItemList: React.FC<ItemListProps> = (props): React.ReactElement => {
  preSearchedItemList = props.items;
  postSearchedItemList = preSearchedItemList;
  return (
    <section>
      <section className="checkList">
        <Typography variant="h4" sx={{mt:3}}>Store</Typography>
        </section>
        <section className="checkList">
        <TextField
         id="search-bar" 
         className="text" 
         label="Search"
         helperText="Search your item here"
         variant="outlined" 
         sx={{width:"20%", mt:3}} 
         InputProps={{
          sx:{ borderRadius: "50px", height:"40px"},
          endAdornment: <SearchIcon />,
         }}
         onChange={(e) => setSearch(e.target.value)}
         placeholder="Search..." 
         size="small"/>
      </section>
      <ul>
        {postSearchedItemList.map((item: any) => (
          <li key={item.id}>
            <span>
              <ChevronRightSharpIcon/>
            </span>
            <span>
              <strong>{item.item}</strong>
            </span>
            <span>{item.quantity}</span>
            <IconButton onClick={props.onAddQuantity.bind(null, item.id)} color="success">
              <AddSharpIcon />
            </IconButton>
            <IconButton onClick={props.onSubtractQuantity.bind(null, item.id)} color="error">
              <RemoveSharpIcon />
            </IconButton>
            <Button variant="contained" type="submit" color="warning" onClick={props.onDeleteItem.bind(null, item.id)}>Remove</Button>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default ItemList;
