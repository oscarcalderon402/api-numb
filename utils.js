function changeOrden(array, name) {
  const ordenWithOutPlayer = array.filter((e) => e !== name);
  const newOrden = [ordenWithOutPlayer, name];
  return newOrden;
}

module.exports = changeOrden;
