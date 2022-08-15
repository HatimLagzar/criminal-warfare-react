import {useEffect, useState} from 'react';
import toastr from 'toastr';
import {equipItem, getAuthenticatedUserInventory, unequipItem,} from '../../api/inventory-api';
import ContentArea from '../../components/ContentArea/ContentArea';
import EquippedItem from '../../components/EquippedItem/EquippedItem';
import InventoryItem from '../../components/InventoryItem/InventoryItem';
import FlexRow from '../../components/layouts/FlexRow/FlexRow';
import './InventoryPage.scss';

export default function InventoryPage() {
  const [inventory, setInventory] = useState(null);

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
                handleEquipItem={() => {
                  equipItem('weapon', weapon.itemid || weapon.id)
                    .then((response) => {
                      debugger

                      const itemInInventory =
                        inventory.userInventory.weapons.find(
                          (item) => item.id === weapon.id
                        );

                      const equippedItemInInventory = inventory.equippedItems
                        .weapon
                        ? inventory.userInventory.weapons.find(
                          (item) =>
                            item.id === inventory.equippedItems.weapon.id
                        )
                        : undefined;

                      if (itemInInventory.qty === 1) {
                        if (equippedItemInInventory === undefined) {
                          if (inventory.equippedItems.weapon) {
                            setInventory({
                              ...inventory,
                              equippedItems: {
                                ...inventory.equippedItems,
                                weapon,
                              },
                              userInventory: {
                                ...inventory.userInventory,
                                weapons: [
                                  ...inventory.userInventory.weapons.filter(
                                    (item) =>
                                      item.id !== itemInInventory.id &&
                                      item.id !== weapon.id
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
                                weapon,
                              },
                              userInventory: {
                                ...inventory.userInventory,
                                weapons: [
                                  ...inventory.userInventory.weapons.filter(
                                    (item) =>
                                      item.id !== itemInInventory.id &&
                                      item.id !== weapon.id
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
                              weapon,
                            },
                            userInventory: {
                              ...inventory.userInventory,
                              weapons: [
                                ...inventory.userInventory.weapons.filter(
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

                          if (inventory.equippedItems.weapon) {
                            setInventory({
                              ...inventory,
                              equippedItems: {
                                ...inventory.equippedItems,
                                weapon,
                              },
                              userInventory: {
                                ...inventory.userInventory,
                                weapons: [
                                  ...inventory.userInventory.weapons.filter(
                                    (item) =>
                                      item.id !== itemInInventory.id &&
                                      item.id !== weapon.id
                                  ),
                                  itemInInventory,
                                  {...inventory.equippedItems.weapon, qty: 1},
                                ],
                              },
                            });
                          } else {
                            setInventory({
                              ...inventory,
                              equippedItems: {
                                ...inventory.equippedItems,
                                weapon,
                              },
                              userInventory: {
                                ...inventory.userInventory,
                                weapons: [
                                  ...inventory.userInventory.weapons.filter(
                                    (item) =>
                                      item.id !== itemInInventory.id &&
                                      item.id !== weapon.id
                                  ),
                                  itemInInventory,
                                ],
                              },
                            });
                          }
                        } else {
                          itemInInventory.qty--;
                          equippedItemInInventory.qty++;

                          if (
                            equippedItemInInventory.id === itemInInventory.id
                          ) {
                            return;
                          }
                          setInventory({
                            ...inventory,
                            equippedItems: {
                              ...inventory.equippedItems,
                              weapon,
                            },
                            userInventory: {
                              ...inventory.userInventory,
                              weapons: [
                                ...inventory.userInventory.weapons.filter(
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
                handleEquipItem={() => {
                  equipItem('armor', armor.itemid || armor.id)
                    .then((response) => {
                      const itemInInventory =
                        inventory.userInventory.armors.find(
                          (item) => item.id === armor.id
                        );

                      const equippedItemInInventory = inventory.equippedItems
                        .armor
                        ? inventory.userInventory.armors.find(
                          (item) =>
                            item.id === inventory.equippedItems.armor.id
                        )
                        : undefined;

                      if (itemInInventory.qty === 1) {
                        if (equippedItemInInventory === undefined) {
                          if (inventory.equippedItems.armor) {
                            setInventory({
                              ...inventory,
                              equippedItems: {
                                ...inventory.equippedItems,
                                armor,
                              },
                              userInventory: {
                                ...inventory.userInventory,
                                armors: [
                                  ...inventory.userInventory.armors.filter(
                                    (item) =>
                                      item.id !== itemInInventory.id &&
                                      item.id !== armor.id
                                  ),
                                  {...inventory.equippedItems.armor, qty: 1},
                                ],
                              },
                            });
                          } else {
                            setInventory({
                              ...inventory,
                              equippedItems: {
                                ...inventory.equippedItems,
                                armor,
                              },
                              userInventory: {
                                ...inventory.userInventory,
                                armors: [
                                  ...inventory.userInventory.armors.filter(
                                    (item) =>
                                      item.id !== itemInInventory.id &&
                                      item.id !== armor.id
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
                              armor,
                            },
                            userInventory: {
                              ...inventory.userInventory,
                              armors: [
                                ...inventory.userInventory.armors.filter(
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

                          if (inventory.equippedItems.armor) {
                            setInventory({
                              ...inventory,
                              equippedItems: {
                                ...inventory.equippedItems,
                                armor,
                              },
                              userInventory: {
                                ...inventory.userInventory,
                                armors: [
                                  ...inventory.userInventory.armors.filter(
                                    (item) =>
                                      item.id !== itemInInventory.id &&
                                      item.id !== armor.id
                                  ),
                                  itemInInventory,
                                  {...inventory.equippedItems.armor, qty: 1},
                                ],
                              },
                            });
                          } else {
                            setInventory({
                              ...inventory,
                              equippedItems: {
                                ...inventory.equippedItems,
                                armor,
                              },
                              userInventory: {
                                ...inventory.userInventory,
                                armors: [
                                  ...inventory.userInventory.armors.filter(
                                    (item) =>
                                      item.id !== itemInInventory.id &&
                                      item.id !== armor.id
                                  ),
                                  itemInInventory,
                                ],
                              },
                            });
                          }
                        } else {
                          itemInInventory.qty--;
                          equippedItemInInventory.qty++;

                          if (
                            equippedItemInInventory.id === itemInInventory.id
                          ) {
                            return;
                          }
                          setInventory({
                            ...inventory,
                            equippedItems: {
                              ...inventory.equippedItems,
                              armor,
                            },
                            userInventory: {
                              ...inventory.userInventory,
                              armors: [
                                ...inventory.userInventory.armors.filter(
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
                handleEquipItem={() => {
                  equipItem('shoes', shoes.itemid || shoes.id)
                    .then((response) => {
                      const itemInInventory =
                        inventory.userInventory.shoes.find(
                          (item) => item.id === shoes.id
                        );

                      const equippedItemInInventory = inventory.equippedItems
                        .shoes
                        ? inventory.userInventory.shoes.find(
                          (item) =>
                            item.id === inventory.equippedItems.shoes.id
                        )
                        : undefined;

                      if (itemInInventory.qty === 1) {
                        if (equippedItemInInventory === undefined) {
                          if (inventory.equippedItems.shoes) {
                            setInventory({
                              ...inventory,
                              equippedItems: {
                                ...inventory.equippedItems,
                                shoes,
                              },
                              userInventory: {
                                ...inventory.userInventory,
                                shoes: [
                                  ...inventory.userInventory.shoes.filter(
                                    (item) =>
                                      item.id !== itemInInventory.id &&
                                      item.id !== shoes.id
                                  ),
                                  {...inventory.equippedItems.armor, qty: 1},
                                ],
                              },
                            });
                          } else {
                            setInventory({
                              ...inventory,
                              equippedItems: {
                                ...inventory.equippedItems,
                                shoes,
                              },
                              userInventory: {
                                ...inventory.userInventory,
                                shoes: [
                                  ...inventory.userInventory.shoes.filter(
                                    (item) =>
                                      item.id !== itemInInventory.id &&
                                      item.id !== shoes.id
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
                              shoes,
                            },
                            userInventory: {
                              ...inventory.userInventory,
                              shoes: [
                                ...inventory.userInventory.shoes.filter(
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

                          if (inventory.equippedItems.shoes) {
                            setInventory({
                              ...inventory,
                              equippedItems: {
                                ...inventory.equippedItems,
                                shoes,
                              },
                              userInventory: {
                                ...inventory.userInventory,
                                shoes: [
                                  ...inventory.userInventory.shoes.filter(
                                    (item) =>
                                      item.id !== itemInInventory.id &&
                                      item.id !== shoes.id
                                  ),
                                  itemInInventory,
                                  {...inventory.equippedItems.shoes, qty: 1},
                                ],
                              },
                            });
                          } else {
                            setInventory({
                              ...inventory,
                              equippedItems: {
                                ...inventory.equippedItems,
                                shoes,
                              },
                              userInventory: {
                                ...inventory.userInventory,
                                shoes: [
                                  ...inventory.userInventory.shoes.filter(
                                    (item) =>
                                      item.id !== itemInInventory.id &&
                                      item.id !== shoes.id
                                  ),
                                  itemInInventory,
                                ],
                              },
                            });
                          }
                        } else {
                          itemInInventory.qty--;
                          equippedItemInInventory.qty++;

                          if (
                            equippedItemInInventory.id === itemInInventory.id
                          ) {
                            return;
                          }
                          setInventory({
                            ...inventory,
                            equippedItems: {
                              ...inventory.equippedItems,
                              shoes,
                            },
                            userInventory: {
                              ...inventory.userInventory,
                              shoes: [
                                ...inventory.userInventory.shoes.filter(
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
            ? inventory.userInventory.consumables.map((consumable, index) => (
              <InventoryItem key={index + '-consumables'} item={consumable}/>
            ))
            : 'No consumables found!'}
        </FlexRow>
      </ContentArea>
    </div>
  );
}
