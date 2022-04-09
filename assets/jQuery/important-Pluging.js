/**
 * Sets a CSS style on the selected element(s) with !important priority.
 * This supports camelCased CSS style property names and calling with an object 
 * like the jQuery `css()` method. 
 * Unlike jQuery's css() this does NOT work as a getter.
 * 
 * @param {string|Object<string, string>} name
 * @param {string|undefined} value
 */   
 jQuery.fn.cssImportant = function(name, value) {
    const $this = this;
    const applyStyles = (n, v) => {
      // Convert style name from camelCase to dashed-case.
      const dashedName = n.replace(/(.)([A-Z])(.)/g, (str, m1, upper, m2) => {
        return m1 + "-" + upper.toLowerCase() + m2;
      }); 
      // Loop over each element in the selector and set the styles.
      $this.each(function(){
        this.style.setProperty(dashedName, v, 'important');
      });
    };
    // If called with the first parameter that is an object,
    // Loop over the entries in the object and apply those styles. 
    if(jQuery.isPlainObject(name)){
      for(const [n, v] of Object.entries(name)){
         applyStyles(n, v);
      }
    } else {
      // Otherwise called with style name and value.
      applyStyles(name, value);
    }
    // This is required for making jQuery plugin calls chainable.
    return $this;
  };