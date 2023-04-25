import React, { useEffect, useState } from "react";

import ItemList from "./components/itemList";
import AddItem from "./components/addItem";
import { AddItemArgumentProps, ItemProps } from "./utility/types/itemTypes";

const App: React.FC = (): React.ReactElement => {
  const [items, setItems] = useState<Array<ItemProps>>([]);
  const [activeId, setActiveId] = useState<string>();

  const addItemHandler = ({ item, quantity }: AddItemArgumentProps) => {

    let flag:Boolean = false;

    let newItem = items.filter((newitem:ItemProps) => {
      if (newitem.item === item) {
        flag = true;
        newitem.quantity = newitem.quantity + quantity;
      }
        return newitem;
    })
    setItems(newItem);
    if (flag === false) {
      let newItemList: Array<ItemProps> = [
        ...items,
        {
          id: Math.random().toString(),
          item,
          quantity,
        },
      ];
      setItems(newItemList);
    }
  };

  const deleteItemHandler = (itemId: string) => {
    setItems((prevItems) => {
      return prevItems.filter((item: ItemProps) => item.id !== itemId);
    });
  };

  const onAddQuantityHandler = (itemId: string) => {
    setActiveId(itemId);
    setItems((prevItems) => {
      return prevItems.filter((item: ItemProps) => {
        if (item.id === itemId) {
          item.quantity = +item.quantity + 1;
        }
        return item;
      });
    });
  };

  const onSubtractQuantityHandler = (itemId: string) => {
    setActiveId(itemId);
    setItems((prevItems) => {
      return prevItems.filter((item: ItemProps) => {
        if (item.id === itemId) {
          item.quantity = +item?.quantity - 1;
        }
        return item;
      });
    });
  };

  useEffect(() => {
    let selectedItem: ItemProps = items.find(
      (item: any) => item.id === activeId
    )!;
    if (selectedItem?.quantity <= 0) {
      deleteItemHandler(selectedItem.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items]);

  return (
    <div className="App">
      <AddItem addItem={addItemHandler} />
      {items.length > 0 && (
        <ItemList
          items={items}
          onDeleteItem={deleteItemHandler}
          onAddQuantity={onAddQuantityHandler}
          onSubtractQuantity={onSubtractQuantityHandler}
        />
      )}
    </div>
  );
};

export default App;
