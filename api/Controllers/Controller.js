

const deleteEmptyFilters = (object) => {
    Object.keys(object).forEach(function(key) {
        const val = object[key];
        if(val === ""){
            delete(object[key])
        }
      });
  //    console.log(object);
      return object
}

module.exports = deleteEmptyFilters