/**
 * A boolean bit-field implementation in JS.
 */

/**
 * Creates a bit-field implementation.
 * 
 * @param {string[]} fieldNames The flag bits to define
 * @param {string} flagsVariableName The name for the flags variable. "flags" by default
 */
function defineBitField(fieldNames, flagsVariableName) {
    // Limit the fieldNames length to 32, using 32-bits integer.
    if (!fieldNames || fieldNames.length > 32) {
        throw new RangeError("Unsupported fields count for the bit-field");
    }

    /**
     * Generates the flag that selects the bit of specified index.
     * @param {number} index Bit index
     * @returns The flag
     */
    function flagFromIndex(index) {
        return 1 << index;
    }

    /**
     * Defines getter/setter pair for the flag given, to be used inside 
     * Object.defineProperties() method.
     * 
     * @param {number} flag The flag to generate getter/setters for.
     * @returns The property definition for the given flag.
     */
    function defineGetterSetterForFlag(flag) {
        return {
            get: function() {
                // check if those bits are set as is 
                return (this[flagsVariableName] & flag) == flag; 
            },

            set: function(value) { 
                // clear the flag from the flags field
                this[flagsVariableName] ^= flag; 
                // re-add the flag based on the value boolean
                this[flagsVariableName] |= value ? flag : 0; 
            },

            // to make the bitfield enumerable, just like a plain variable
            enumerable: true,
        };
    }

    /**
     * A convenience function for defining getter/setters for the bit with the 
     * specified index inside the flags field.
     * 
     * @param {number} index The bit index to generate getter/setters for
     * @returns The property definition for the given bit index
     */
    function defineGetterSetterForBitIndex(index) {
        return defineGetterSetterForFlag(flagFromIndex(index));
    }

    // Define the properties on the object to give access to bit-field bits.
    for (var bitIndex = 0; bitIndex < fieldNames.length; bitIndex++) {
        Object.defineProperty(this, fieldNames[bitIndex], defineGetterSetterForBitIndex(bitIndex));
    }
}
