import {useEffect, useState} from 'react';
import toastr from 'toastr';
import {consumeItem, equipItem, getAuthenticatedUserInventory, unequipItem,} from '../../api/inventory-api';
import ContentArea from '../../components/ContentArea/ContentArea';
import EquippedItem from '../../components/EquippedItem/EquippedItem';
import InventoryItem from '../../components/InventoryItem/InventoryItem';
import FlexRow from '../../components/layouts/FlexRow/FlexRow';
import './InventoryPage.scss';
import {useDispatch, useSelector} from "react-redux";
import {setGeneralInfo} from "../../store/features/auth/authSlice";
import HouseBombItem from "../../components/HouseBombItem/HouseBombItem";
import ScatterBombItem from "../../components/ScatterBombItem/ScatterBombItem";

export default function InventoryPage() {
  const [inventory, setInventory] = useState(null);
  const dispatch = useDispatch();
  const generalInfo = useSelector(state => state.auth.generalInfo);
  const HOUSE_BOMB_ITEM_ID = 33;
  const SCATTER_BOMB_ITEM_ID = 34;

  useEffect(() => {
    if (inventory === null) {
      getAuthenticatedUserInventory()
        .then((response) => {
          setInventory(response.data);
          // toastr.success(response.data.message);
        })
        .catch((error) => {
          if (error.response) {
            toastr.error(error.response.data.message);
          }
        });
    }
  });

  if (inventory === null) {
    return 'Loading...';
  }

  /**
   * Unequip an item from the state
   *
   * @param type {string}
   */
  function handleUnequip(type) {
    let itemInInventory;
    let typeSingularName;
    let typePluralName;

    if (type === 'weapon') {
      itemInInventory = inventory.userInventory.weapons.find(
        (item) => item.id === inventory.equippedItems.weapon.id
      );
      typeSingularName = 'weapon'
      typePluralName = 'weapons'
    } else if (type === 'armor') {
      itemInInventory = inventory.userInventory.armors.find(
        (item) => item.id === inventory.equippedItems.armor.id
      );
      typeSingularName = 'armor'
      typePluralName = 'armors'
    } else {
      itemInInventory = inventory.userInventory.shoes.find(
        (item) => item.id === inventory.equippedItems.shoes.id
      );
      typeSingularName = 'shoes'
      typePluralName = 'shoes'
    }

    if (itemInInventory === undefined) {
      // Add a new item to the appropriate category
      setInventory({
        ...inventory,
        equippedItems: {
          ...inventory.equippedItems,
          [typeSingularName]: null,
        },
        userInventory: {
          ...inventory.userInventory,
          [typePluralName]: [
            ...inventory.userInventory[typePluralName],
            {...inventory.equippedItems[typeSingularName], qty: 1},
          ],
        },
      });
    } else {
      itemInInventory.qty++;

      setInventory({
        ...inventory,
        equippedItems: {
          ...inventory.equippedItems,
          [typeSingularName]: null,
        },
        userInventory: {
          ...inventory.userInventory,
          [typePluralName]: [
            ...inventory.userInventory[typePluralName].filter(
              (item) => item.id !== itemInInventory.id
            ),
            itemInInventory,
          ],
        },
      });
    }
  }

  /**
   * Equip an item on the state
   *
   * @param type {string}
   * @param selectedItem {Object}
   */
  function handleEquip(type, selectedItem) {
    let itemInInventory;
    let typeSingularName;
    let typePluralName;

    if (type === 'weapon') {
      itemInInventory = inventory.userInventory.weapons.find(
        (item) => item.id === selectedItem.id
      );
      typeSingularName = 'weapon'
      typePluralName = 'weapons'
    } else if (type === 'armor') {
      itemInInventory = inventory.userInventory.armors.find(
        (item) => item.id === selectedItem.id
      );
      typeSingularName = 'armor'
      typePluralName = 'armors'
    } else {
      itemInInventory = inventory.userInventory.shoes.find(
        (item) => item.id === selectedItem.id
      );
      typeSingularName = 'shoes'
      typePluralName = 'shoes'
    }

    const equippedItemInInventory = inventory.equippedItems[typeSingularName]
      ? inventory.userInventory[typePluralName].find(
        (item) =>
          item.id === inventory.equippedItems[typeSingularName].id
      )
      : undefined;

    if (itemInInventory.qty === 1) {
      if (equippedItemInInventory === undefined) {
        if (inventory.equippedItems[typeSingularName]) {
          setInventory({
            ...inventory,
            equippedItems: {
              ...inventory.equippedItems,
              [typeSingularName]: selectedItem,
            },
            userInventory: {
              ...inventory.userInventory,
              [typePluralName]: [
                ...inventory.userInventory[typePluralName].filter(
                  (item) =>
                    item.id !== itemInInventory.id &&
                    item.id !== selectedItem.id
                ),
                {...inventory.equippedItems.weapon, qty: 1},
              ],
            },
          });
        } else {
          setInventory({
            ...inventory,
            equippedItems: {
              ...inventory.equippedItems,
              [typeSingularName]: selectedItem,
            },
            userInventory: {
              ...inventory.userInventory,
              [typePluralName]: [
                ...inventory.userInventory[typePluralName].filter(
                  (item) =>
                    item.id !== itemInInventory.id &&
                    item.id !== selectedItem.id
                ),
              ],
            },
          });
        }
      } else {
        equippedItemInInventory.qty++;

        setInventory({
          ...inventory,
          equippedItems: {
            ...inventory.equippedItems,
            [typeSingularName]: selectedItem,
          },
          userInventory: {
            ...inventory.userInventory,
            [typePluralName]: [
              ...inventory.userInventory[typePluralName].filter(
                (item) =>
                  item.id !== itemInInventory.id &&
                  item.id !== equippedItemInInventory.id
              ),
              {...equippedItemInInventory},
            ],
          },
        });
      }
    } else {
      if (equippedItemInInventory === undefined) {
        itemInInventory.qty--;

        if (inventory.equippedItems[typeSingularName]) {
          setInventory({
            ...inventory,
            equippedItems: {
              ...inventory.equippedItems,
              [typeSingularName]: selectedItem,
            },
            userInventory: {
              ...inventory.userInventory,
              [typePluralName]: [
                ...inventory.userInventory.weapons.filter(
                  (item) =>
                    item.id !== itemInInventory.id &&
                    item.id !== selectedItem.id
                ),
                itemInInventory,
                {...inventory.equippedItems[typeSingularName], qty: 1},
              ],
            },
          });
        } else {
          setInventory({
            ...inventory,
            equippedItems: {
              ...inventory.equippedItems,
              [typeSingularName]: selectedItem,
            },
            userInventory: {
              ...inventory.userInventory,
              [typePluralName]: [
                ...inventory.userInventory[typePluralName].filter(
                  (item) =>
                    item.id !== itemInInventory.id &&
                    item.id !== selectedItem.id
                ),
                itemInInventory,
              ],
            },
          });
        }
      } else {
        itemInInventory.qty--;
        equippedItemInInventory.qty++;

        if (equippedItemInInventory.id === itemInInventory.id) {
          return;
        }

        setInventory({
          ...inventory,
          equippedItems: {
            ...inventory.equippedItems,
            [typeSingularName]: selectedItem,
          },
          userInventory: {
            ...inventory.userInventory,
            [typePluralName]: [
              ...inventory.userInventory[typePluralName].filter(
                (item) =>
                  item.id !== itemInInventory.id &&
                  item.id !== equippedItemInInventory.id
              ),
              itemInInventory,
              {...equippedItemInInventory},
            ],
          },
        });
      }
    }
  }

  function handleUseItem(consumable, targetId = null) {
    return consumeItem(consumable.itemid, targetId)
      .then(response => {
        const itemInInventory = inventory.userInventory.consumables.find(
          (item) => item.id === consumable.id
        );

        if (itemInInventory.qty <= 1) {
          setInventory({
            ...inventory,
            useInventory: {
              ...inventory.userInventory,
              consumables: [
                ...inventory.userInventory.consumables.filter(item => item.id !== consumable.id)
              ]
            }
          })
        } else {
          itemInInventory.qty--;

          setInventory({
            ...inventory,
            useInventory: {
              ...inventory.userInventory,
              consumables: [
                ...inventory.userInventory.consumables.filter(item => item.id !== consumable.id),
                {...itemInInventory}
              ]
            }
          })
        }

        dispatch(setGeneralInfo({...generalInfo, health: generalInfo.healthMax}))

        toastr.success(response.data.message)
      })
      .catch(error => {
        if (error.response) {
          toastr.error(error.response.data.message)
        }

        console.log(error)
      })
  }

  return (
    <div className='inventory-page'>
      <ContentArea title='Equipped Items'>
        <FlexRow className={'justify-content-between equipped-items-wrapper'}>
          <EquippedItem
            title={'Weapon'}
            type={1}
            image={
              inventory.equippedItems.weapon
                ? inventory.equippedItems.weapon.image
                : null
            }
            handleUnequipItem={() => {
              unequipItem('weapon')
                .then((response) => {
                  handleUnequip('weapon')

                  toastr.success(response.data.message);
                })
                .catch((error) => {
                  if (error.response) {
                    toastr.error(error.response.data.message);
                  }
                });
            }}
          />

          <EquippedItem
            title={'Armor'}
            type={2}
            image={
              inventory.equippedItems.armor
                ? inventory.equippedItems.armor.image
                : null
            }
            handleUnequipItem={() => {
              unequipItem('armor')
                .then((response) => {
                  handleUnequip('armor')

                  toastr.success(response.data.message);
                })
                .catch((error) => {
                  if (error.response) {
                    toastr.error(error.response.data.message);
                  }
                });
            }}
          />

          <EquippedItem
            title={'Shoes'}
            type={3}
            image={
              inventory.equippedItems.shoes
                ? inventory.equippedItems.shoes.image
                : null
            }
            handleUnequipItem={() => {
              unequipItem('shoes')
                .then((response) => {
                  handleUnequip('shoes')

                  toastr.success(response.data.message);
                })
                .catch((error) => {
                  if (error.response) {
                    toastr.error(error.response.data.message);
                  }
                });
            }}
          />
        </FlexRow>
      </ContentArea>
      <ContentArea title={'Weapons'} centerHeader>
        <FlexRow>
          {inventory.userInventory.weapons.length > 0
            ? inventory.userInventory.weapons.map((weapon, index) => (
              <InventoryItem
                key={index + '-weapons'}
                item={weapon}
                handleUseItem={() => {
                  equipItem('weapon', weapon.itemid || weapon.id)
                    .then((response) => {
                      handleEquip('weapon', weapon)

                      toastr.success(response.data.message);
                    })
                    .catch((error) => {
                      if (error.response) {
                        toastr.error(error.response.data.message);
                      }

                      console.log(error);
                    });
                }}
              />
            ))
            : 'No weapons found!'}
        </FlexRow>
      </ContentArea>
      <ContentArea title={'Armors'} centerHeader>
        <FlexRow>
          {inventory.userInventory.armors.length > 0
            ? inventory.userInventory.armors.map((armor, index) => (
              <InventoryItem
                key={index + '-armors'}
                item={armor}
                handleUseItem={() => {
                  equipItem('armor', armor.itemid || armor.id)
                    .then((response) => {
                      handleEquip('armor', armor)

                      toastr.success(response.data.message);
                    })
                    .catch((error) => {
                      if (error.response) {
                        toastr.error(error.response.data.message);
                      }

                      console.log(error);
                    });
                }}
              />
            ))
            : 'No armors found!'}
        </FlexRow>
      </ContentArea>
      <ContentArea title={'Shoes'} centerHeader>
        <FlexRow>
          {inventory.userInventory.shoes.length > 0
            ? inventory.userInventory.shoes.map((shoes, index) => (
              <InventoryItem
                key={index + '-shoes'}
                item={shoes}
                handleUseItem={() => {
                  equipItem('shoes', shoes.itemid || shoes.id)
                    .then((response) => {
                      handleEquip('shoes', shoes)

                      toastr.success(response.data.message);
                    })
                    .catch((error) => {
                      if (error.response) {
                        toastr.error(error.response.data.message);
                      }

                      console.log(error);
                    });
                }}
              />
            ))
            : 'No shoes found!'}
        </FlexRow>
      </ContentArea>
      <ContentArea title={'Consumables'} centerHeader>
        <FlexRow>
          {inventory.userInventory.consumables &&
          inventory.userInventory.consumables.length > 0
            ? inventory.userInventory.consumables.map((consumable, index) => {
              if (consumable.itemid === HOUSE_BOMB_ITEM_ID) {
                return <HouseBombItem
                  key={index + '-consumables'}
                  item={consumable}
                  handleUseItem={handleUseItem}
                />
              } else if (consumable.itemid === SCATTER_BOMB_ITEM_ID) {
                return <ScatterBombItem
                  key={index + '-consumables'}
                  item={consumable}
                  handleUseItem={handleUseItem}
                />
              } else {
                return <InventoryItem
                  key={index + '-consumables'}
                  item={consumable}
                  handleUseItem={handleUseItem}
                  isUsable
                />
              }
            })
            : 'No consumables found!'}
        </FlexRow>
      </ContentArea>
    </div>
  );
}
